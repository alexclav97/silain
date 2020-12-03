const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();

router.post('/add', async (req, res) => {

    var { iduser, idarticulo } = req.body;

    const query = {
        text: "INSERT into licencias (email_usuario, id_metadato) VALUES ($1, $2);",
        values: [iduser, idarticulo]
    }

    try {
        await pg.query(query);
        res.status(200).send({});
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})


module.exports = router;
