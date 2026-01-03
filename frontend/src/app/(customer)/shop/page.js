"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useShopStore } from "@/stores/shopStore";

export default function ShopPage() {
  const { shops, shopsLoading, fetchShops } = useShopStore();

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  if (shopsLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading shops...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Choose an LPG Shop Near You
      </h1>

      {shops.length === 0 ? (
        <p className="text-center text-gray-400">No shops available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <Link
              key={shop._id}
              href={`/shop/${shop._id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  🛢️
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {shop.shopName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {shop.address || "No address provided"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    shop.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {shop.isActive ? "Open" : "Closed"}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-blue-500 transition">
                  View Products →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
