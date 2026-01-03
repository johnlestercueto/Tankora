"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProductStore } from "@/stores/productStore";

export default function ProductsPage() {
  const { shopId } = useParams();
  const { products, productsLoading, productsError, fetchProductsByShop } =
    useProductStore();

  useEffect(() => {
    if (!shopId) return;
    fetchProductsByShop(shopId);
  }, [shopId, fetchProductsByShop]);

  if (productsLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading products...
      </div>
    );

  if (productsError)
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {productsError}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        LPG Gas Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-400">
          No LPG products available for this shop.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
            >
              <div className="flex justify-center">
                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image}`
                      : "/lpg-placeholder.png"
                  }
                  alt={product.name}
                  className="w-40 h-40 object-contain"
                />
              </div>

              <div className="mt-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-sm text-gray-500">
                  Weight: {product.weight} kg
                </p>

                <p className="text-xl font-bold text-green-600 mt-2">
                  ₱{product.price}
                </p>

                <p
                  className={`text-sm mt-1 ${
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `Available (${product.stock})`
                    : "Out of Stock"}
                </p>
              </div>

              <Link
                href={`/product/${product._id}`}
                className="mt-4 py-2 rounded-xl text-center font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
