const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();

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



// ||||||||||||||||||||||| Ruta |||||||||||||||||||||||
// Retorna la informacion correspondiente a un articulo deacuerdo a su ID 
router.get('/get/:id', async (req, res) => {

    var id = req.params.id;

    const query = {
        text: "select * from metafull where idmetadato=$1;",
        values: [id]
    }

    try {
        const result = await pg.query(query);
        var queryresults = result.rows[0];

        const { publico } = queryresults;

        // Capturar el poligono correspondiente a la finca del dato 
        var queryFin = {
            text: "select st_asgeojson(geom) as poly, st_astext(st_centroid(geom)) as centroid from finca where finca = $1;",
            values: [queryresults.finca]
        }

        var dataFin = await pg.query(queryFin);
        dataFin = await swapCoors(dataFin.rows);
        dataFin = await formatCentroidPoint(dataFin);

        // console.log(result.rows);
        res.status(200).send({ info: queryresults, finca: dataFin, publico: publico });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})


// ||||||||||||||||||||||| Ruta |||||||||||||||||||||||
// Retorna la informacion correspondiente a un articulo deacuerdo a su ID 
router.get('/get/:id/:userid', async (req, res) => {

    var id = req.params.id;
    var userid = req.params.userid;

    const query = {
        text: "select * from metafull where idmetadato = $1;",
        values: [id]
    }

    try {
        const result = await pg.query(query);
        var queryresults = result.rows[0];

        // Verificar que el articulo este publico
        // si lo esta envia el estado publico true
        // si no busca en la tabla disponibilidad
        // si lo esta envia true
        // si no envia falso

        var statePublico = true;
        const { publico } = queryresults;
        if (!publico) {
            const queryConfirmDist = {
                text: "select email_usuario, id_metadato from licencias where email_usuario = $1 and id_metadato = $2;",
                values: [userid, id]
            };
            const confirmDist = await pg.query(queryConfirmDist);
            if (confirmDist.rows.length == 0) {
                statePublico = false;
            }
        }


        // Capturar el poligono correspondiente a la finca del dato 
        var queryFin = {
            text: "select st_asgeojson(geom) as poly, st_astext(st_centroid(geom)) as centroid from finca where finca = $1;",
            values: [queryresults.finca]
        }

        var dataFin = await pg.query(queryFin);
        dataFin = await swapCoors(dataFin.rows);
        dataFin = await formatCentroidPoint(dataFin);

        // console.log(result.rows);
        res.status(200).send({ info: queryresults, finca: dataFin, publico: statePublico });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

// ||||||||||||||||||||||| Ruta |||||||||||||||||||||||
router.get('/download/:id', async (req, res) => {

    var id = req.params.id;
    var path = "D:/Datos SILAIN";

    const query = {
        text: "select url from metadato where idmetadato = $1",
        values: [id]
    }

    try {
        const result = await pg.query(query);
        var url = result.rows[0].url;
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }

    res.download(path + url, err => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        }
    });
})


// ||||||||||||||||||||||| Ruta |||||||||||||||||||||||
router.get('/download/filename/:id', async (req, res) => {

    var id = req.params.id;

    const query = {
        text: "select url from metadato where idmetadato = $1",
        values: [id]
    }

    try {
        const result = await pg.query(query);
        var url = result.rows[0].url;
        var splitted = url.split("/");
        var filename = splitted[splitted.length - 1];
        res.status(200).send({ filename: filename });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

// ||||||||||||||||||||||| Ruta |||||||||||||||||||||||
router.post('/proposito', async (req, res) => {

    const { id_usuario, id_metadato, proposito } = req.body;
    const query = {
        text: "insert into descargas (email_usuario, id_metadato, proposito, fecha, hora) values ($1, $2, $3, current_timestamp, current_timestamp)",
        values: [id_usuario, id_metadato, proposito]
    }

    try {
        const result = await pg.query(query);
        res.status(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

// ||||||||||||||||||||||| Ruta |||||||||||||||||||||||
router.post('/crear', async (req, res) => {
    if (req.files) {
        var file = req.files.file;
        var filename = file.name;

        // console.log(req.body, file);

        let { titulo, resumen, descripcion, lote, fase, pclave, publico, filters } = req.body;
        filters = JSON.parse(filters);
        let { categoria, subcategoria, tipo, formato, finca } = filters;

        let tamano = file.size + " B";
        let url = "/root/" + categoria + "/" + subcategoria + "/" + filename;

        const queryID = {
            text: "select count(*) from metadato"
        }

        const querySubcategoriaID = {
            text: "select idsubcategoria from categoria inner join subcategoria on idcategoria = categoria_idcategoria where categoria = $1 and subcategoria = $2",
            values: [categoria, subcategoria]
        }

        const queryFincaID = {
            text: "select idfinca from finca where finca = $1",
            values: [finca]
        }

        let ID, subID, finID;

        try {
            const resultID = await pg.query(queryID);
            ID = parseInt(resultID.rows[0].count) + 1;

            const resultSubcategoriaID = await pg.query(querySubcategoriaID);
            subID = parseInt(resultSubcategoriaID.rows[0].idsubcategoria);

            const resultFincaID = await pg.query(queryFincaID);
            finID = parseInt(resultFincaID.rows[0].idfinca);

            // console.log("==============>", ID, subID, finID);

        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }

        const queryInsertMetadato = {
            text: "INSERT INTO metadato(idmetadato, titulo, pclave, creado, disponibilidad, resumen, descripcion, " +
                "tipo, lote, fase, publico, formato, tamano, url) " +
                "VALUES($1, $2, $3, current_timestamp, current_timestamp, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
            values: [ID, titulo, pclave, resumen, descripcion, tipo, lote, fase, publico, formato, tamano, url]
        }

        const queryInsertSub = {
            text: "INSERT INTO metadato_has_subcategoria(subcategoria_idsubcategoria, metadato_idmetadato) VALUES ($1, $2)",
            values: [subID, ID]
        }

        const queryInsertFin = {
            text: "INSERT INTO metadatos_has_finca(finca_idfinca, metadato_idmetadato) VALUES ($1, $2)",
            values: [finID, ID]
        }

        try {
            await pg.query(queryInsertMetadato);
            await pg.query(queryInsertSub);
            await pg.query(queryInsertFin);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
        console.log("D:/Datos SILAIN/" + url);
        file.mv("D:/Datos SILAIN/" + url, err => {
            if (err) {
                res.send(err);
            } else {
                res.send({});
            }
        })
    }
})


module.exports = router;
