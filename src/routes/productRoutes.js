const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');

// Subida de imagenes
const fileUpload = require('../middlewares/productImgUpload');
// Validaciion de producto
const productValidation = require('../middlewares/productValidation');

// Rutas
productRoutes.get('/cart', productController.cart);

productRoutes.get('/controlpanel', productController.controlPanel);

productRoutes.get('/list', productController.productList);
productRoutes.get('/detail/:id', productController.product);

productRoutes.get('/create', productController.new);
// Ruta de proceso de nuevo producto
productRoutes.post('/create', fileUpload.single('img'), productValidation, productController.create);

productRoutes.get('/:id/edit', productController.edit);
productRoutes.put('/:id', fileUpload.single('img'), productController.update);

productRoutes.delete('/:id', productController.delete);

module.exports = productRoutes;
