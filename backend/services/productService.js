const Product = require("../models/Product");
const Dealer = require("../models/Dealer");
const Shop = require("../models/Shop");

// ✅ CREATE PRODUCT
const createProduct = async (data) => {
  const shop = await Shop.findById(data.shopId);
  if (!shop) throw new Error("Shop not found");

  const dealer = await Dealer.findById(shop.dealerId);
  if (!dealer || !dealer.isApproved) throw new Error("Dealer not approved");

  return await Product.create(data);
};

// ✅ GET SINGLE PRODUCT
const getProduct = async (productId) => {
  const product = await Product.findById(productId).populate(
    "shopId",
    "shopName address"
  ); // populate shop info

  if (!product) throw new Error("Product not found");

  return product;
};

// ✅ GET ALL PRODUCTS (optionally filter by shopId)
const getAllProducts = async (shopId = null) => {
  let query = {};
  if (shopId) query.shopId = shopId; // filter by shopId if provided

  return await Product.find(query).populate("shopId", "shopName address");
};

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
};
