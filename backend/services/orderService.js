const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = async ({ customerId, productId, quantity }) => {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }
    
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    const totalPrice = product.price * quantity;

    return await Order.create({
        customerId,
        dealerId: product.dealerId,
        productId,
        quantity,
        totalPrice
    });
};

const getOrders = async (filter = {}) => {
    return await Order.find(filter)
        .populate("productId", "name price")
        .populate("dealerId", "shopName")
        .populate("customerId", "fullName");
};

module.exports = { createOrder, getOrders };
