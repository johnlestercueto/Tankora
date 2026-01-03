const orderService = require("../services/orderService");

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;

    const order = await orderService.createOrder({
      customerId,
      productId,
      quantity,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// ✅ GET ORDERS
exports.getOrders = async (req, res) => {
  try {
    const { shopId, customerId } = req.query;

    // dynamic filter
    let filter = {};
    if (shopId) filter.shopId = shopId;
    if (customerId) filter.customerId = customerId;

    const orders = await orderService.getOrders(filter);
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // order id
    const { status } = req.body;

    const updatedOrder = await orderService.updateOrderStatus(id, status);

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
