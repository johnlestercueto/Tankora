"use client";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
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

  // Fetch products
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
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

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("weight", form.weight);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("dealerId", "6946949c5d4cf9fadcdb361e");
    if (form.image) formData.append("image", form.image);

    await fetch(url, { method, body: formData });

    setForm({ name: "", weight: 0, brand: "", price: 0, stock: 0, image: null, imagePreview: null });
    setEditingId(null);
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      weight: product.weight,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      image: null,
      imagePreview: product.image ? `http://localhost:5000/uploads/${product.image}` : null,
    });
    setEditingId(product._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">Product Management</h1>

      {/* Search + Add Button */}
<div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
  {/* Search Input */}
  <div className="relative w-full md:w-1/2">
    <input
  type="text"
  placeholder="Search products..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full border border-gray-300 px-4 py-3 pl-10 rounded-full shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-200"
/>

    {/* Search Icon */}
    <svg
      className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
      />
    </svg>
  </div>

  {/* Add Button */}
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
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative flex flex-col"
         style={{ maxHeight: '90vh' }}>
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        onClick={() => {
          setIsModalOpen(false);
          setEditingId(null);
          setForm({ name: "", weight: 0, brand: "", price: 0, stock: 0, image: null, imagePreview: null });
        }}
      >
        ×
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{editingId ? "Update Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        {/* Left: Inputs */}
        <div className="flex-1 grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Product Name</label>
            <input
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Brand</label>
            <input
              name="brand"
              placeholder="Enter brand"
              value={form.brand}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Weight</label>
            <input
              name="weight"
              type="number"
              placeholder="Enter weight"
              value={form.weight}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Price</label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              placeholder="Enter stock"
              value={form.stock}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-2">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* Right: Image Upload */}
<div className="flex-1 flex flex-col items-center justify-center">
  <label className="text-gray-700 font-medium mb-2">Product Image</label>

  <label className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all">
    {form.imagePreview ? (
      <img
        src={form.imagePreview}
        alt="Preview"
        className="w-full h-full object-contain rounded-lg"
      />
    ) : (
      <div className="flex flex-col items-center justify-center text-gray-400">
        <svg
          className="w-12 h-12 mb-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 16v-4m0 0l4 4m-4-4l-4 4M12 20h.01M12 4v16" />
        </svg>
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
    <p className="mt-2 text-sm text-gray-500">{form.image?.name || "Selected image"}</p>
  )}
</div>

      </form>
    </div>
  </div>
)}


      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition hover:shadow-lg">
              <img
                src={p.image ? `http://localhost:5000/uploads/${p.image}` : "/placeholder.png"}
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
          <p className="col-span-full text-center text-gray-400 mt-10">No products found</p>
        )}
      </div>
    </div>
  );
}
