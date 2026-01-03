"use client";

import { useState, useEffect } from "react";
import { useCustomerStore } from "@/stores/customerStore";

export default function CustomerProfilePage() {
  const USER_ID = "6947700e6da0d042d9e76769"; // replace with actual auth
  const {
    customerProfile,
    fetchProfile,
    saveProfile,
    loading: profileLoading,
  } = useCustomerStore();

  const [form, setForm] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(USER_ID);
        setForm({
          fullName: data.fullName || "",
          contactNumber: data.contactNumber || "",
          address: data.address || "",
        });
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load profile" });
      }
    };
    loadProfile();
  }, [USER_ID, fetchProfile]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({});
    try {
      await saveProfile(customerProfile?._id, form);
      setShowModal(false);
      setMessage({ type: "success", text: "Profile saved successfully!" });
    } catch {
      setMessage({ type: "error", text: "Saving failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {message.text && (
          <div
            className={`mb-4 px-4 py-3 rounded border text-sm font-medium
              ${
                message.type === "success"
                  ? "bg-green-100 text-black border-green-600"
                  : "bg-red-100 text-black border-red-600"
              }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white border-2 border-green-600 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">
              Profile Information
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
            >
              {customerProfile ? "Edit Profile" : "Create Profile"}
            </button>
          </div>

          <div className="space-y-4">
            <ProfileItem label="Full Name" value={customerProfile?.fullName} />
            <ProfileItem
              label="Contact Number"
              value={customerProfile?.contactNumber}
            />
            <ProfileItem label="Address" value={customerProfile?.address} />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 border-2 border-green-600 shadow-lg">
            <h3 className="text-xl font-bold text-black mb-6">
              {customerProfile ? "Edit Profile" : "Create Profile"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <Input
                label="Contact Number"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  disabled={profileLoading}
                >
                  {profileLoading ? "Saving..." : "Save"}
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

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-bold text-black mb-1">{label}</p>
    <p className="text-base text-black">{value || "—"}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-bold text-black mb-1">{label}</label>
    <input
      {...props}
      className="w-full border-2 border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-bold text-black mb-1">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full border-2 border-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
    />
  </div>
);
