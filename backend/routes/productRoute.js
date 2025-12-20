const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const upload = require("../middlewares/uploadMiddleware")

// 👉 Public (customers can view products)
router.get('/',productController.getProducts)

// 👉 Dealer only (add product)
router.post('/', upload.single("image"), productController.createProduct)

module.exports = router
