const Product = require("../models/Product");
const Dealer = require("../models/Dealer");

const createProduct = async (data) => {
    const dealer = await Dealer.findById(data.dealerId);
    if (!dealer || !dealer.isApproved)
        throw new Error("Dealer not approved");

    return await Product.create(data);
};

const getProducts = async (filter = {}) => {
    return await Product.find(filter)
        .populate("dealerId", "shopName location");
};

module.exports = { createProduct, getProducts };
