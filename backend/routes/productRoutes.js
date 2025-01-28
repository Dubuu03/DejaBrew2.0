const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Routes for Product CRUD operations
router.post('/products', productController.createProduct); // Create product
router.get('/products', productController.getAllProducts); // Get all products
router.get('/type/:type', productController.getProductsByType); // Get products by type
router.get('/products/:id', productController.getProductById); // Get product by ID
router.put('/products/:id', productController.updateProduct); // Update product by ID
router.delete('/products/:id', productController.deleteProduct); // Delete product by ID

router.put('/product/:productId/stock', productController.updateStock); // Update stock quantity for a product
router.get('/product/:productId/stock', productController.getStock); // Get current stock for a product

module.exports = router;
