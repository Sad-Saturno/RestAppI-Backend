const router = require('express').Router();
const { addNewTable, getAllTables, getOneTable, updateTable, deleteTable, getAllTablesWithOrders, getOneTableWithOrders, habilitarMesa } = require('../../controllers/tables');

router
    .post('/addNewTable', addNewTable)
    .get('/getAllTables', getAllTables)
    .get('/getAllTablesWithOrders', getAllTablesWithOrders)
    .get('/getOneTableWithOrders/:id', getOneTableWithOrders)
    .get('/getOneTable/:id', getOneTable)
    .put('/updateTable/:id', updateTable)
    .delete('/deleteTable/:id', deleteTable)
    .put('/habilitarMesa/:id', habilitarMesa)

module.exports = router;