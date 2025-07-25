const express = require('express')
const router = express.Router()
const { getPool } = require('../db/database.js');

router.post('/', async (req, res) => {

    var { id, val } = req.body;

    const query = {
        text: "UPDATE metadato SET publico = $1 where idmetadato = $2",
        values: [val, id]
    }

    try {
        const pg = getPool();
        await pg.query(query);
        res.status(200).send({});
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})


module.exports = router;
