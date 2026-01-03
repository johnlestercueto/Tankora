const Shop = require("../models/Shop");

// CREATE shop
const createShop = async (data) => {
  const shop = new Shop(data);
  return await shop.save();
};

// GET all shops
const getAllShops = async () => {
  return await Shop.find().populate("dealerId", "username email"); // example populate
};

// GET shop by ID
const getShopById = async (id) => {
  return await Shop.findById(id).populate("dealerId", "username email");
};

// UPDATE shop
const updateShop = async (id, data) => {
  return await Shop.findByIdAndUpdate(id, data, { new: true });
};

// DELETE shop
const deleteShop = async (id) => {
  return await Shop.findByIdAndDelete(id);
};

module.exports = {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
};
