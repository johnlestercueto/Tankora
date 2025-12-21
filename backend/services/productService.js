const Product = require("../models/Product");
const Dealer = require("../models/Dealer");

const createProduct = async (data) => {
    const dealer = await Dealer.findById(data.dealerId);
    if (!dealer || !dealer.isApproved)
        throw new Error("Dealer not approved");

    return await Product.create(data);
};

// ✅ GET SINGLE PRODUCT
const getProduct = async (productId) => {
    const product = await Product.findById(productId)
        .populate("dealerId", "shopName location");

    if (!product)
        throw new Error("Product not found");

    return product;
};

// ✅ GET ALL PRODUCTS
const getAllProducts = async () => {
    return await Product.find()
        .populate("dealerId", "shopName location");
};

module.exports = { 
    createProduct, 
    getProduct, 
    getAllProducts 
};
