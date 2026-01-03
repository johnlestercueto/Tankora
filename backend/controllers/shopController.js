const Shop = require("../models/Shop");

// CREATE shop
const createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all shops
const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("dealerId", "username email");
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET shop by ID
const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate(
      "dealerId",
      "username email"
    );
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE shop
const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json(shop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE shop
const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET shop by dealerId
const getShopByDealerId = async (req, res) => {
  try {
    const shop = await Shop.findOne({ dealerId: req.params.dealerId }).populate(
      "dealerId",
      "username email"
    );
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
  getShopByDealerId,
};
