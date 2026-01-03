const productService = require("../services/productService");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? req.file.filename : null,
    };

    const product = await productService.createProduct(productData);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✅ GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const { shopId } = req.query; // kunin ang shopId mula sa query
    const products = await productService.getAllProducts(shopId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET SINGLE PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
