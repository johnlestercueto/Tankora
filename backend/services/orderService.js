const Order = require("../models/Order");
const Product = require("../models/Product");
const Shop = require("../models/Shop");

const createOrder = async ({ customerId, productId, quantity }) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  // 1️⃣ Get product
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // 2️⃣ Get shop from product
  const shop = await Shop.findById(product.shopId);
  if (!shop) throw new Error("Shop not found");

  // 3️⃣ Compute total
  const totalPrice = product.price * quantity;

  // 4️⃣ Create order (SHOP-BASED)
  return await Order.create({
    customerId,
    shopId: shop._id,
    productId,
    quantity,
    totalPrice,
  });
};

// ✅ GET ORDERS (flexible filter)
const getOrders = async (filter = {}) => {
  return await Order.find(filter)
    .populate("productId", "name price")
    .populate({
      path: "shopId",
      select: "shopName address dealerId",
      populate: { path: "dealerId", select: "_id fullName" }, // optional dealer details
    })
    .populate("customerId", "fullName");
};

// ✅ UPDATE ORDER STATUS
const updateOrderStatus = async (orderId, status) => {
  // Validate status
  const validStatuses = [
    "pending",
    "confirmed",
    "out_for_delivery",
    "delivered",
  ];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  )
    .populate("productId", "name price")
    .populate({
      path: "shopId",
      select: "shopName address dealerId",
      populate: { path: "dealerId", select: "_id fullName" },
    })
    .populate("customerId", "fullName");

  if (!updatedOrder) throw new Error("Order not found");

  return updatedOrder;
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
