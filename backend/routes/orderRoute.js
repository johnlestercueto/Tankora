const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// 👉 Customer creates order
router.post("/", orderController.createOrder);

// 👉 Get orders
router.get("/", orderController.getOrders);

// 👉 Update order status
router.patch("/:id", orderController.updateOrderStatus);

module.exports = router;
