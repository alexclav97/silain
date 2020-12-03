const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();

router.post("/register", async (req, res) => {

    const { nombres, apellidos, email, pais, departamento, ciudad, institucion, ocupacion, password } = req.body;

    const query = {
        text: "INSERT INTO usuario (nombres, apellidos, email, pais, departamento, ciudad, institucion, ocupacion, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 2)",
        values: [nombres, apellidos, email, pais, departamento, ciudad, institucion, ocupacion, password]
    }
    try {
        const result = await pg.query(query);
        res.status(200).send({ msg: "success" });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})


router.post("/login", async (req, res) => {

    const { user, password } = req.body;

    const query = {
        text: "SELECT email, role from usuario where email=$1 and password=$2",
        values: [user, password]
    }

    try {
        const result = await pg.query(query);
        var email = result.rows[0].email;
        var role = result.rows[0].role;  
        if (email) {
            res.status(200).send({ user_id: email, role: role});
        } else {
            res.sendStatus(400);
        }

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

router.get("/user/:id", async (req, res) => {

    var id = req.params.id;

    const query = {
        text: "SELECT nombres, apellidos, email, pais from usuario where email=$1",
        values: [id]
    }
    try {
        const result = await pg.query(query);
        var id = result.rows[0];
        if (id) {
            res.status(200).send({ user: result.rows[0] });
        } else {
            res.sendStatus(400);
        }

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }

})

router.get("/user/des_hist/:id", async (req, res) => {

    var id = req.params.id;

    const query = {
        text: "select titulo, idmetadato, fecha as orderfecha, hora as orderhora, to_char(fecha, 'DD/MM/YYYY') as fecha, to_char(hora, 'HH24:MI:SS') as hora from descargas inner join metadato on id_metadato=idmetadato where email_usuario=$1 order by orderfecha DESC, orderhora DESC;",
        values: [id]
    }
    try {
        var hist = []
        const result = await pg.query(query);
        hist = result.rows;
        res.status(200).send({ hist: hist });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }

})

module.exports = router;