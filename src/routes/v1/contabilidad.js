const { generarCierre, consultarCierre } = require('../../controllers/contabilidad');

const router = require('express').Router();

router
    .post('/nuevoCierre', generarCierre)
    .get('/getAllCierres', consultarCierre)

module.exports = router;