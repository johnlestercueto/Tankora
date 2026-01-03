"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/stores/orderStore"; // ✅ updated store

export default function MyOrdersPage() {
  const currentCustomerId = "6947700e6da0d042d9e76769"; // replace with actual auth
  const { orders, fetchOrdersByCustomer, loading, error } = useOrderStore();

  useEffect(() => {
    fetchOrdersByCustomer(currentCustomerId);
  }, [currentCustomerId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error: {error}</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <table className="w-full border rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.productId?.name || "N/A"}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">₱{order.totalPrice}</td>
              <td className="border p-2 capitalize">
                {order.status.replaceAll("_", " ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
