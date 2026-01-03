"use client";
import { useEffect } from "react";
import { useOrderStore } from "@/stores/orderStore";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "out_for_delivery",
  "delivered",
];

const dealerId = "6950d799c1c4b16acd8f086b";
const shopId = "6950d90e4d592aab0f555067";

export default function ManageOrdersPage() {
  const {
    orders,
    loading,
    message,
    fetchDealerOrders,
    editLocalOrder,
    changeLocalStatus,
    saveOrderStatus,
  } = useOrderStore();

  useEffect(() => {
    fetchDealerOrders(shopId, dealerId);
  }, [fetchDealerOrders]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found for your shop.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {orders.map((order) => (
        <div key={order._id} className="border rounded p-4 mb-4 shadow-sm">
          <p>
            <b>Customer:</b> {order.customerId?.fullName || order.customerName}
          </p>
          <p>
            <b>Product:</b> {order.productId?.name || order.productName}
          </p>
          <p>
            <b>Quantity:</b> {order.quantity}
          </p>
          <p>
            <b>Total:</b> ₱{order.totalPrice}
          </p>

          <div className="mt-2">
            <label className="block font-semibold">Status</label>
            <select
              className="border p-2 rounded w-60"
              disabled={!order.isEditing}
              value={order.status}
              onChange={(e) => changeLocalStatus(order._id, e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex gap-2">
            {!order.isEditing ? (
              <button
                onClick={() => editLocalOrder(order._id)}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => saveOrderStatus(order._id, order.status)}
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
