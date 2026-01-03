"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import { useCustomerStore } from "@/stores/customerStore";
import { useOrderStore } from "@/stores/orderStore";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const customerId = "6947700e6da0d042d9e76769"; // replace with actual auth

  const {
    product,
    fetchProductById,
    loading: productLoading,
    error: productError,
  } = useProductStore();

  const {
    customerProfile,
    fetchCustomerProfile,
    loading: customerLoading,
  } = useCustomerStore();

  const { placeOrder } = useOrderStore();

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (productId) fetchProductById(productId);
    if (customerId) fetchCustomerProfile(customerId);
  }, [productId, customerId]);

  if (productLoading || customerLoading)
    return <p className="text-center mt-10">Loading...</p>;
  if (productError || !product)
    return (
      <p className="text-center mt-10 text-red-500">Error loading product</p>
    );

  const increment = () => quantity < product.stock && setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  const handleOpenModal = () => {
    setOrderData({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity,
      totalPrice: product.price * quantity,
      shopId: product.shopId?._id,
      shopName: product.shopId?.shopName,
      shopAddress: product.shopId?.address,
    });
    setShowModal(true);
  };

  const handleConfirmOrder = async () => {
    if (!orderData) return;
    setSubmitting(true);
    try {
      await placeOrder({
        customerId,
        productId: orderData.productId,
        quantity: orderData.quantity,
      });
      alert("Order confirmed!");
      setShowModal(false);
      setQuantity(1);
    } catch (err) {
      console.error(err);
      alert("Failed to save order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={
            product.image
              ? `http://localhost:5000/uploads/${product.image}`
              : "/lpg-placeholder.png"
          }
          alt={product.name}
          className="w-80 h-80 object-contain mx-auto"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.brand}</p>
          <p className="text-gray-500">Weight: {product.weight}kg</p>
          <p className="text-3xl text-green-600 font-bold mt-4">
            ₱{product.price}
          </p>
          <p className="mt-2 text-sm">
            Stock:{" "}
            <span
              className={product.stock > 0 ? "text-green-600" : "text-red-500"}
            >
              {product.stock}
            </span>
          </p>

          <div className="mt-4 flex items-center">
            <span className="mr-3 font-medium">Quantity</span>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={decrement}
                className="px-3 bg-gray-200 hover:bg-gray-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-l border-r focus:outline-none"
              />
              <button
                onClick={increment}
                className="px-3 bg-gray-200 hover:bg-gray-300"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            disabled={product.stock === 0}
          >
            Book Gas
          </button>
        </div>
      </div>

      {showModal && orderData && customerProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h2 className="text-xl font-bold mb-4">Order Receipt</h2>
            <div className="mb-2">
              <h3 className="font-semibold">Customer Info</h3>
              <p>Name: {customerProfile.fullName}</p>
              <p>Contact: {customerProfile.contactNumber}</p>
              <p>Address: {customerProfile.address}</p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold">Shop Info</h3>
              <p>Shop Name: {orderData.shopName || "N/A"}</p>
              <p>Address: {orderData.shopAddress || "N/A"}</p>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold">Product Info</h3>
              <p>Name: {orderData.productName}</p>
              <p>Price: ₱{orderData.price}</p>
              <p>Quantity: {orderData.quantity}</p>
              <p>Total Price: ₱{orderData.totalPrice}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                disabled={submitting}
              >
                {submitting ? "Ordering..." : "Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
