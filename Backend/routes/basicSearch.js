const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();

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
function getValuesFromFilters(filters, word) {
  var vals = [`%${word}%`]
  for (let i in filters) {
    if (filters[i] !== "Select") {
      vals.push(filters[i])
    }
  }
  return vals;
}
// ------------------------------------------------------------------------------------


// ||||||||||||||||||||||| Ruta ||||||||||||||||||||||| 
// Retorna los resutlados correspondientes a una busqueda en particular
// Teniendo Filtros o no
router.post('/search_by_filter', async (req, res) => {

  const { filters, word, currentPage } = req.body;
  
  var { counter } = getHowMany(filters);

  var limitResults = 20;
  var initPage = currentPage * limitResults;

  if (counter == 0 && word == "") {
    // ENTRA SI SOLO HAY HAY PALABRA CLAVE (SIN FILTROS) Y SI ESTA PALABRA ESTA VACIA.

    res.status(200).send({ result: [], counts: { AC: 0, AP: 0, IC: 0, IP: 0, C: 0 } });
  } else {

    if (counter > 0 && word == "") {
      // Entra si hay al menos un filtro. Y si la palabra esta vacia
      // AQUI DEBE ENTRAR CUANDO EN LA APP SOLO SE BUSCA FILTRAR POR PROPIEDAD SIN INCLUIR PALABRA CLAVE
      // 

      var text = "select distinct idmetadato, titulo, formato, tamano, resumen, tipo, creado, disponibilidad, publico from metafull where pclave iLike $1";
      var countText = "select distinct idmetadato, tipo from metafull where pclave iLike $1";

    } else {
      // Aqui entra si tiene palabra clave, algun, o ningun filtro;

      var text = "select distinct idmetadato, titulo, formato, tamano, resumen, tipo, creado, disponibilidad, publico from metafull where $1 % ANY(STRING_TO_ARRAY(pclave, ' '))";
      var countText = "select distinct idmetadato, tipo from metafull where $1 % ANY(STRING_TO_ARRAY(pclave, ' '))";

    }

    var query_text = getTextWithFilters(text, filters);
    query_text = query_text + " OFFSET " + initPage + " LIMIT " + limitResults;
    var values = getValuesFromFilters(filters, word);

    countText = getTextWithFilters(countText, filters);
    countText = "select tipo, count(*) from (" + countText + ") as foo GROUP BY foo.tipo";
    var countValues = getValuesFromFilters(filters, word);

    // console.log(query_text, values)

    var query = { text: query_text, values: values };
    var countQuery = {text: countText, values: countValues};
    
    try {
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
      let npages = totalResults / limitResults ;

      let pages = [];
      for (let i = 0; i < npages; i++) {
        pages.push(i);
      }

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


module.exports = router;
