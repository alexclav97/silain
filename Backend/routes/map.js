const express = require('express')
const router = express.Router()
const { getPool } = require('../db/database.js');

// ||||||||||||||||||||||| AUXILIARES ||||||||||||||||||||||| 
// ------------------------------------------------------------------------------------

// Funcion Auxiliar que retorna el numero de filtros SELECCIONADOS que hay 
function getHowMany(filters) {
  j = 0;
  for (let i in filters) {
    if (filters[i] !== "Select") {
      j++;
    }
  }
  return { counter: j };
}

// Funcion Auxiliar que formatea el query dependiendo de los filtros que lleguen
function getTextWithFilters(text, filters) {
  var s = "";
  var c = false;
  j = 1;
  for (let i in filters) {
    if (filters[i] !== "Select") {
      j++;
      if (c) {
        s += " and";
        c = false;
      }
      s += " " + i + " = $" + j + "";
      c = true
    }
  }

  if (s !== "") {
    text = text + " and" + s;
  }
  return text;
}

// Funcion auxiliar que guarda los valores correspondientes a los filtros que lleguen
function getValuesFromFilters(filters, ubication) {
  var vals = [ubication]
  for (let i in filters) {
    if (filters[i] !== "Select") {
      vals.push(filters[i])
    }
  }
  return vals;
}

// Funcion auxiliar para invertir la latitud y la longitud cuando se realiza la consulta
function swapCoors(data) {
  for (let i in data) {
    var aux = JSON.parse(data[i].poly).coordinates[0][0];
    for (let j = 0; j < aux.length; j++) {
      var row = aux[j];
      var new_row = [row[1], row[0]];
      aux[j] = new_row;
    }
    data[i].poly = aux;
  }
  return data;
}

// FUncion axiliar que formatea el centroide que viene de la consulta,
// ya que viene en un string 'POINT(-76.5186596676343 3.85885075589076)'
function formatCentroidPoint(data) {
  var { centroid } = data[0];
  var s = centroid.split(" ");
  var s2 = s[0].split("(");
  var c = [parseFloat(s[1]), parseFloat(s2[1])];
  data[0].centroid = c;

  return data;
}


// ------------------------------------------------------------------------------------


// ||||||||||||||||||||||| Ruta ||||||||||||||||||||||| 
// Retorna toda la informacion espacial de cada finca que este almacenada
// Aqui se consultan los POLIGONOS de las fincas
// router.get('/', async (req, res) => {

//   const query = {
//     text: "select finca.finca, idfinca, st_asgeojson(geom) from finca inner join geofincas on finca_idfi = idfinca;",
//   }

//   const queryDeps = {
//     text: "select departamento.departamento, st_asgeojson(geom) from departamento inner join geodeptos on iddepartamento = id_depto;",
//   }

//   const queryMunis = {
//     text: "select municipio.municipio, st_asgeojson(geom) from municipio inner join geomunic on idmunicipio = idmuni;",
//   }

//   try {
//     const result = await pg.query(query);
//     const resultDeps = await pg.query(queryDeps);
//     const resultMunis = await pg.query(queryMunis);

//     var data = result.rows;
//     var dataDeps = resultDeps.rows;
//     var dataMunis = resultMunis.rows;

//     data = swapCoors(data);
//     dataDeps = swapCoors(dataDeps);
//     dataMunis = swapCoors(dataMunis);

//     // console.log(data);
//     res.status(200).send({ fincas: data, departamentos: dataDeps, municipios: dataMunis });
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(400);
//   }
// })

// ||||||||||||||||||||||| Ruta ||||||||||||||||||||||| 
// Retorna los resutlados correspondientes a una busqueda en particular POR DEPARTAMENTO, MUNICIPIO O FINCA
// Teniendo Filtros o no  
router.post('/ubication_by_filter', async (req, res) => {

  const { filters, ubication, ubi_type, currentPage } = req.body;
  // console.log(filters, ubication);
  var { counter } = getHowMany(filters);

  var limitResults = 20;
  var initPage = currentPage * limitResults;

  if (counter == 0 && ubication == "") {
    res.status(200).send({ result: [], counts: { AC: 0, AP: 0, IC: 0, IP: 0, C: 0 } });
  } else {

    var text = "select idmetadato, titulo, formato, tamano, resumen, tipo, publico from metafull where " + ubi_type + " = $1";
    var countText = "select tipo from metafull where " + ubi_type + " = $1";

    var query_text = getTextWithFilters(text, filters);
    query_text = query_text + " OFFSET " + initPage + " LIMIT " + limitResults;
    var values = getValuesFromFilters(filters, ubication);

    countText = getTextWithFilters(countText, filters);
    countText = "select tipo, count(*) from (" + countText + ") as foo GROUP BY foo.tipo";
    var countValues = getValuesFromFilters(filters, ubication);

    // console.log(query_text, countText);

    var query = { text: query_text, values: values };
    var countQuery = { text: countText, values: countValues };

    try {
      const pg = getPool();
      const result = await pg.query(query);
      const resultCounts = await pg.query(countQuery);

      let AC = 0, AP = 0, IC = 0, IP = 0, C = 0;

      for (let i in resultCounts.rows) {
        var tipo = resultCounts.rows[i].tipo;
        var count = parseInt(resultCounts.rows[i].count);

        switch (tipo) {
          case "Archivo crudo":
            AC = count;
            break;
          case "Archivo procesado":
            AP = count;
            break;
          case "Imagen cruda":
            IC = count;
            break;
          case "Imagen procesada":
            IP = count;
            break;
          case "Compilación":
            C = count;
            break;
          default:
            break;
        }
      }

      let totalResults = AC + AP + IC + IP + C;
      let npages = totalResults / limitResults;

      let pages = [];
      for (let i = 0; i < npages; i++) {
        pages.push(i);
      }

      // console.log({ result: result.rows, counts: { AC: AC, AP: AP, IC: IC, IP: IP, C: C } })
      res.status(200).send({
        totalResults: totalResults,
        result: result.rows,
        pages: pages,
        counts: { AC: AC, AP: AP, IC: IC, IP: IP, C: C }
      });

    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
});


// ||||||||||||||||||||||| Ruta ||||||||||||||||||||||| 
// Retorna la informacion espacial (poligono) de un elemento en particular
// Departamento, Municipio, Finca
router.post('/getpoly', async (req, res) => {

  const { filters } = req.body;

  var { counter } = getHowMany(filters);

  if (counter === 0) {
    res.status(200).send({ departamento: [], municipio: [], finca: [] });
  } else {

    const { departamento, municipio, finca } = filters;

    try {
      const pg = getPool();

      var dataDept = [];
      var dataMuni = [];
      var dataFin = [];

      if (departamento !== 'Select') {
        var query = {
          text: "select departamento, st_asgeojson(geom) as poly, st_astext(st_centroid(geom)) as centroid from departamento where departamento = $1;",
          values: [departamento]
        }
        dataDept = await pg.query(query);
        dataDept = await swapCoors(dataDept.rows);
        dataDept = await formatCentroidPoint(dataDept);
      }

      if (municipio !== 'Select') {
        var query = {
          text: "select municipio, st_asgeojson(geom) as poly, st_astext(st_centroid(geom)) as centroid from municipio where municipio = $1;",
          values: [municipio]
        }
        dataMuni = await pg.query(query);
        dataMuni = await swapCoors(dataMuni.rows);
        dataMuni = await formatCentroidPoint(dataMuni);
      }

      if (finca !== 'Select') {
        var queryFin = {
          text: "select finca, st_asgeojson(geom) as poly, st_astext(st_centroid(geom)) as centroid from finca where finca = $1;",
          values: [finca]
        }
        dataFin = await pg.query(queryFin);
        dataFin = await swapCoors(dataFin.rows);
        dataFin = await formatCentroidPoint(dataFin);
      }

      res.status(200).send({
        departamento: dataDept,
        municipio: dataMuni,
        finca: dataFin
      });

    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
})

// ||||||||||||||||||||||| Ruta ||||||||||||||||||||||| 
// Retorna la lista de fincas mas cercanas a una posicion

router.post('/finca_closer', async (req, res) => {

  const marker = req.body.marker;
  
  var query = {
    text: "select finca, ROUND(CAST(st_distance(st_transform(geom,3115), st_transform(st_setsrid(st_makepoint($1,$2),4326),3115)) / 1000 as numeric), 3) as distancia_km from finca ORDER BY distancia_km",
    values: [marker[1], marker[0]]
  }

  try {
    const pg = getPool();
    var data = await pg.query(query);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }

  res.json(data.rows);
})


module.exports = router;