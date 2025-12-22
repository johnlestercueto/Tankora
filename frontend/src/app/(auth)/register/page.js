"use client";

import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // dito mo tatawag ang API (POST /api/auth/register)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Choose Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Customer */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "customer" })}
                className={`border rounded-lg p-4 text-left transition
                  ${formData.role === "customer"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                  }`}
              >
                <p className="font-medium text-gray-800">Customer</p>
                <p className="text-xs text-gray-500 mt-1">
                  Order products and track purchases
                </p>
              </button>

              {/* Dealer */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "dealer" })}
                className={`border rounded-lg p-4 text-left transition
                  ${formData.role === "dealer"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                  }`}
              >
                <p className="font-medium text-gray-800">Dealer</p>
                <p className="text-xs text-gray-500 mt-1">
                  Sell products and manage orders
                </p>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
