const router = require('express').Router();
const { getAllUsers, getOneUser, createAddress, getAllAdresses,
    updateAddress, deleteAddress, updateUser } = require('../../controllers/user');

router
    .get('/getAllUsers', getAllUsers)
    .get('/getOneUser/:id', getOneUser)
    .put('/updateUser/:id', updateUser)
    .post('/createAddress', createAddress)
    .get('/getAllAddresses', getAllAdresses)
    .put('/updateAddress/:id', updateAddress)
    .delete('/deleteAddress/:id', deleteAddress)

module.exports = router;

