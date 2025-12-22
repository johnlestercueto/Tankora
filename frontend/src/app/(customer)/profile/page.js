"use client";
import { useEffect, useState } from "react";

export default function CustomerProfilePage() {
  const USER_ID = "694946978b5962fab2d0f1c2"; // OPTION 2
  

  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
  });

  // FETCH PROFILE
  const fetchProfile = async () => {
    const res = await fetch(`http://localhost:5000/api/customers/${USER_ID}`);
    const data = await res.json();

    console.log("FETCHED CUSTOMER:", data);

    if (data) {
      setProfile(data);
      setForm({
        fullName: data.fullName || "",
        contactNumber: data.contactNumber || "",
        address: data.address || "",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({});

    try {
      const method = profile ? "PUT" : "POST";
      const url = profile
        ? `http://localhost:5000/api/customers/${profile._id}`
        : "http://localhost:5000/api/customers";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: USER_ID }),
      });

      if (!res.ok) throw new Error();

      setShowModal(false);
      setMessage({ type: "success", text: "Profile saved successfully!" });
      fetchProfile();
    } catch {
      setMessage({ type: "error", text: "Saving failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* MESSAGE */}
        {message.text && (
          <div
            className={`mb-4 px-4 py-3 rounded border text-sm font-medium
              ${message.type === "success"
                ? "bg-green-100 text-black border-green-600"
                : "bg-red-100 text-black border-red-600"
              }`}
          >
            {message.text}
          </div>
        )}

        {/* PROFILE CARD */}
        <div className="bg-white border-2 border-green-600 rounded-xl p-6">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">
              Profile Information
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
            >
              {profile ? "Edit Profile" : "Create Profile"}
            </button>
          </div>

          {/* CONTENT */}
          <div className="space-y-4">
            <ProfileItem label="Full Name" value={profile?.fullName} />
            <ProfileItem label="Contact Number" value={profile?.contactNumber} />
            <ProfileItem label="Address" value={profile?.address} />
          </div>
        </div>
      </div>

      {/* MODAL */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-xl p-6 border-2 border-green-600 shadow-lg">

      {/* HEADER */}
      <h3 className="text-xl font-bold text-black mb-6">
        {profile ? "Edit Profile" : "Create Profile"}
      </h3>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Full Name
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Contact Number
          </label>
          <input
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-none"
            required
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="flex-1 border-2 border-gray-400 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  </div>
)}

    </div>
  );
}

/* SMALL COMPONENTS */

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-bold text-black mb-1">{label}</p>
    <p className="text-base text-black">
      {value || "—"}
    </p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-bold text-black mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border-2 border-black rounded px-3 py-2
      focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-bold text-black mb-1">
      {label}
    </label>
    <textarea
      {...props}
      rows="3"
      className="w-full border-2 border-black rounded px-3 py-2
      focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
    />
  </div>
);
