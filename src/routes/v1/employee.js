const router = require('express').Router();
const { updateEmployee, getOneEmployee, getAllEmployees, createAddress, getAllAdresses, updateAddress, deleteAddress, deleteEmployee } = require('../../controllers/employee');

router
    .get('/getAllEmployees', getAllEmployees)
    .get('/getOneEmployee/:id', getOneEmployee)
    .put('/updateEmployee/:id', updateEmployee)
    .delete('/deleteEmployee/:id', deleteEmployee)
    .post('/createAddress', createAddress)
    .get('/getAllAddresses', getAllAdresses)
    .put('/updateAddress/:id', updateAddress)
    .delete('/deleteAddress/:id', deleteAddress)

module.exports = router;
