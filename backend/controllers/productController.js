const productService = require("../services/productService");

exports.createProduct = async (req, res) => {
     try {

        const productData = {
         ...req.body,
        image: req.file ? req.file.filename : null
        };

        const product = await productService.createProduct(productData)

        res.status(201).json({
            message: "create product sucessfully",
            product
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
};

exports.getProducts = async (req, res) => {
    const products = await productService.getProducts();
    res.json(products);
};
