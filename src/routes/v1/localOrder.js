const router = require('express').Router();
const { createLocalOrder, getAllLocalOrders, getOrdersByTable, getOneLocalOrder, getLocalOrderWithStatusCerrado, closeOrders} = require('../../controllers/localOrders');

router
    .post('/newLocalOrder', createLocalOrder)
    .get('/getAllLocalOrders', getAllLocalOrders)
    .get('/getOrdersByTable/:id', getOrdersByTable)
    .get('/getOneLocalOrder/:id', getOneLocalOrder)
    .get('/getCloseOrders/:id', getLocalOrderWithStatusCerrado)
    .put('/closeOrder', closeOrders)

module.exports = router;