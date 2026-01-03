"use client";
import { useEffect, useState } from "react";
import { useShopStore } from "@/stores/shopStore";

const dealerId = "6950d799c1c4b16acd8f086b";

export default function ShopInfoPage() {
  const { shop, loading, fetchDealerShop, saveShop } = useShopStore();
  const [form, setForm] = useState({
    shopName: "",
    address: "",
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load dealer shop
  useEffect(() => {
    fetchDealerShop(dealerId).then((data) => {
      if (data) {
        setForm({
          shopName: data.shopName || "",
          address: data.address || "",
          isActive: data.isActive ?? true,
        });
      }
    });
  }, [fetchDealerShop]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Save or update shop
  const handleSave = async () => {
    try {
      await saveShop({ ...form, dealerId, _id: shop?._id });
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading shop info...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Shop Information
      </h1>

      {/* Display shop info or editing form */}
      {shop && !isEditing ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-gray-800">
            {shop.shopName || "—"}
          </h2>
          <p className="text-gray-500">{shop.address || "—"}</p>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full w-max ${
              shop.isActive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {shop.isActive ? "Active" : "Inactive"}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition w-max self-start"
          >
            Edit Shop
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition">
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">Shop Name</span>
            <input
              name="shopName"
              value={form.shopName || ""}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter shop name"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 font-medium mb-1">Address</span>
            <input
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter shop address"
            />
          </label>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive ?? true}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            <span className="text-gray-700">Active</span>
          </div>

          <button
            onClick={handleSave}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition w-max self-start"
          >
            {shop ? "Update Shop" : "Save Shop"}
          </button>
        </div>
      )}
    </div>
  );
}
