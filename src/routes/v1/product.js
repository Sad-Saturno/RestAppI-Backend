const router = require('express').Router();
const upload = require('../../../lib/multer');
const { createCategory, getAllProducts, getOneProduct, updateProduct, deleteProduct, addDiscountToProduct, 
    deleteDiscountToProduct, getAllCategories, updateCategory, deleteCategory, createProduct, productExpirated, getOneCategory } = require('../../controllers/product');

router
    .post('/createProduct', upload.single('imagen'), createProduct)
    .get('/getAllProducts', getAllProducts)
    .get('/getOneProduct/:id', getOneProduct)
    .put('/updateProduct/:id', updateProduct)
    .delete('/deleteProduct/:id', deleteProduct)
    .put('/addDiscount/:id', addDiscountToProduct)
    .put('/deleteDiscount/:id', deleteDiscountToProduct)
    .get('/expiratedProduct', productExpirated)
    .post('/createCategory', upload.single('image'), createCategory)
    .get('/getAllCategories', getAllCategories)
    .get('/getOneCategory/:id', getOneCategory)
    .put('/updateCategory/:id', updateCategory)
    .delete('/deleteCategory/:id', deleteCategory)


module.exports = router;