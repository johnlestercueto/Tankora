// services/orderService.js

export const fetchOrdersByCustomer = async (customerId) => {
  const res = await fetch(
    `http://localhost:5000/api/orders?customerId=${customerId}`
  );
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const createOrder = async ({ customerId, productId, quantity }) => {
  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
};

export const fetchDealerOrders = async (shopId, dealerId) => {
  const res = await fetch(`http://localhost:5000/api/orders?shopId=${shopId}`);
  if (!res.ok) throw new Error("Failed to fetch orders");

  const data = await res.json();
  return data
    .filter((o) => o.shopId?.dealerId?._id === dealerId)
    .map((o) => ({ ...o, isEditing: false }));
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update order");
  return data.order;
};
