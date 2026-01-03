const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

// CRUD routes
router.post("/", shopController.createShop);
router.get("/", shopController.getAllShops);
router.get("/:id", shopController.getShopById);
router.put("/:id", shopController.updateShop);
router.delete("/:id", shopController.deleteShop);
router.get("/dealer/:dealerId", shopController.getShopByDealerId);

module.exports = router;
