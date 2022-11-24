const router = require('express').Router();
const { kpiGananciaPorMes, kpiGananciasTotales, kpiCuentasPorMes, kpiCuentasTotales } = require('../../controllers/kpi');

router
      .get('/gananciaXMes/:mes', kpiGananciaPorMes)
      .get('/gananciasTotales', kpiGananciasTotales)
      .get('/cuentasXMes/:mes', kpiCuentasPorMes)
      .get('/cuentasTotales', kpiCuentasTotales)
    
module.exports = router;