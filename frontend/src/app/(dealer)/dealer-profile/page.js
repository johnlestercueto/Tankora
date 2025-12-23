"use client";

import { useState, useEffect } from "react";

const USER_ID = "69461bf6c2a3e5838da70452"; // Option 2
const BACKEND_URL = "http://localhost:5000"; // Express backend port

export default function DealerProfilePage() {
  const [form, setForm] = useState({
    shopName: "",
    contactNumber: "",
    location: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isEdit, setIsEdit] = useState(false); // true if editing

  // Check if dealer profile exists
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/dealer/profile/${USER_ID}`);
        console.log("FETCH STATUS:", res.status);

        if (res.status === 404) {
          // No profile yet, keep isEdit = false
          return;
        }

        const data = await res.json();
        console.log("FETCHED dealer:", data);

        // Only set edit mode if data is valid
        if (data && (data.shopName || data.contactNumber || data.location)) {
          setForm({
            shopName: data.shopName || "",
            contactNumber: data.contactNumber || "",
            location: data.location || ""
          });
          setIsEdit(true); // profile exists, edit mode
        }
      } catch (error) {
        console.error("Error fetching dealer profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const url = isEdit
        ? `${BACKEND_URL}/api/dealer/profile` // PUT for edit
        : `${BACKEND_URL}/api/dealer`;        // POST for create

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: USER_ID })
      });

      const data = await res.json();
      console.log("SUBMIT RESPONSE:", data);

      if (res.ok) {
        setMessage({ type: "success", text: isEdit ? "Profile updated!" : "Profile created!" });
        if (!isEdit) setIsEdit(true); // switch to edit after create
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong." });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Network error. Try again." });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Dealer Profile" : "Create Dealer Profile"}
      </h1>

      {message.text && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Shop Name</label>
          <input
            type="text"
            name="shopName"
            value={form.shopName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isEdit ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </div>
  );
}
