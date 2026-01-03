"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/productStore";

const SHOP_ID = "6950dc7b4d592aab0f55507d";

export default function ProductPage() {
  const {
    products,
    productsLoading,
    productsError,
    fetchShopProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const [form, setForm] = useState({
    name: "",
    weight: 0,
    brand: "",
    price: 0,
    stock: 0,
    image: null,
    imagePreview: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products for this shop
  useEffect(() => {
    fetchShopProducts(SHOP_ID);
  }, [fetchShopProducts]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { ...form, shopId: SHOP_ID };

    try {
      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await addProduct(productData);
      }
      setForm({
        name: "",
        weight: 0,
        brand: "",
        price: 0,
        stock: 0,
        image: null,
        imagePreview: null,
      });
      setEditingId(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    if (product.shopId?._id !== SHOP_ID) return;

    setForm({
      name: product.name,
      weight: product.weight,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      image: null,
      imagePreview: product.imageUrl,
    });
    setEditingId(product._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
        Product Management
      </h1>

      {/* Search + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 pl-10 rounded-full shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-200"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          New Product
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-100 bg-opacity-50 p-4 overflow-auto">
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative flex flex-col"
            style={{ maxHeight: "90vh" }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => {
                setIsModalOpen(false);
                setEditingId(null);
                setForm({
                  name: "",
                  weight: 0,
                  brand: "",
                  price: 0,
                  stock: 0,
                  image: null,
                  imagePreview: null,
                });
              }}
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {editingId ? "Update Product" : "Add Product"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-6"
            >
              {/* Left: Inputs */}
              <div className="flex-1 grid grid-cols-1 gap-4">
                {["name", "brand", "weight", "price", "stock"].map((field) => (
                  <div className="flex flex-col" key={field}>
                    <label className="text-gray-700 font-medium mb-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      name={field}
                      type={
                        field === "weight" ||
                        field === "price" ||
                        field === "stock"
                          ? "number"
                          : "text"
                      }
                      placeholder={`Enter ${field}`}
                      value={form[field]}
                      onChange={handleChange}
                      className="border border-gray-300 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                ))}

                <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-2">
                  {editingId ? "Update Product" : "Add Product"}
                </button>
              </div>

              {/* Right: Image Upload */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <label className="text-gray-700 font-medium mb-2">
                  Product Image
                </label>
                <label className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all">
                  {form.imagePreview ? (
                    <img
                      src={form.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <span className="text-sm">Click to select an image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                {form.imagePreview && (
                  <p className="mt-2 text-sm text-gray-500">
                    {form.image?.name || "Selected image"}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productsLoading ? (
          <p className="col-span-full text-center text-gray-500 mt-10">
            Loading products...
          </p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition hover:shadow-lg"
            >
              <img
                src={p.imageUrl || form.imagePreview || "/placeholder.png"}
                alt={p.name}
                className="w-44 h-44 object-cover rounded-xl mb-3"
              />
              <h2 className="font-bold text-lg text-gray-900">{p.name}</h2>
              <p className="text-gray-500">{p.brand}</p>
              <p className="text-gray-700 font-medium mt-1">₱{p.price}</p>
              <p className="text-gray-500 text-sm">Stock: {p.stock}</p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 mt-10">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
