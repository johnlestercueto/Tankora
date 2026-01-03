// services/productService.js

export const fetchProductById = async (productId) => {
  const res = await fetch(`http://localhost:5000/api/products/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const fetchProductsByShop = async (shopId) => {
  const res = await fetch(
    `http://localhost:5000/api/products?shopId=${shopId}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchShopProducts = async (shopId) => {
  const res = await fetch(
    `http://localhost:5000/api/products?shopId=${shopId}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.map((p) => ({
    ...p,
    imageUrl: p.image
      ? `http://localhost:5000/uploads/${p.image}`
      : "/placeholder.png",
  }));
};

export const createProduct = async (productData) => {
  const formData = new FormData();
  Object.entries(productData).forEach(
    ([k, v]) => v !== null && formData.append(k, v)
  );

  const res = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create product");
  return data;
};

export const updateProduct = async (id, productData) => {
  const formData = new FormData();
  Object.entries(productData).forEach(
    ([k, v]) => v !== null && formData.append(k, v)
  );

  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "PUT",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update product");
  return data;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
};
