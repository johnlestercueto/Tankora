"use client";

import { useEffect, useState } from "react";
import { useDealerStore } from "@/stores/dealerStore";

const USER_ID = "69461bf6c2a3e5838da70452"; // replace with actual auth context

export default function DealerProfilePage() {
  const { dealer, loading, message, fetchDealer, saveDealer } =
    useDealerStore();
  const [form, setForm] = useState({
    shopName: "",
    contactNumber: "",
    location: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDealer(USER_ID).then((data) => {
      if (data)
        setForm({
          shopName: data.shopName,
          contactNumber: data.contactNumber,
          location: data.location,
        });
    });
  }, [fetchDealer]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await saveDealer({ ...form, userId: USER_ID }, !!dealer);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Dealer Profile
      </h1>

      {dealer && !isEditing ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{dealer.shopName}</h2>
          <p className="text-gray-600">📞 {dealer.contactNumber || "-"}</p>
          <p className="text-gray-600">📍 {dealer.location || "-"}</p>

          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition w-max"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          {message && (
            <div className="bg-green-100 text-green-700 p-2 rounded">
              {message}
            </div>
          )}

          <label className="flex flex-col">
            <span className="font-medium text-gray-700 mb-1">Shop Name</span>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-medium text-gray-700 mb-1">
              Contact Number
            </span>
            <input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <label className="flex flex-col">
            <span className="font-medium text-gray-700 mb-1">Location</span>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
            >
              {dealer ? "Update Profile" : "Save Profile"}
            </button>

            {dealer && (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
