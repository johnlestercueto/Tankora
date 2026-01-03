const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require("../middlewares/uploadMiddleware");

// 👉 Public (customers can view ALL products)
router.get('/', productController.getAllProducts);

// 👉 Public (customers can view SINGLE product)
router.get('/:id', productController.getProduct);

// 👉 Dealer only (add product)
router.post('/', upload.single("image"), productController.createProduct);

module.exports = router;
