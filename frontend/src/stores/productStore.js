// stores/productStore.js
import { create } from "zustand";
import {
  fetchProductsByShop,
  fetchShopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  message: "",

  fetchProductsByShop: async (shopId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProductsByShop(shopId);
      set({ products: data });
      return data;
    } catch (err) {
      set({ error: err.message, products: [] });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  fetchShopProducts: async (shopId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchShopProducts(shopId);
      set({ products: data });
      return data;
    } catch (err) {
      set({ error: err.message, products: [] });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (productData) => {
    const newProduct = await createProduct(productData);
    set((state) => ({ products: [newProduct, ...state.products] }));
    return newProduct;
  },

  editProduct: async (id, productData) => {
    const updatedProduct = await updateProduct(id, productData);
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? updatedProduct : p)),
    }));
    return updatedProduct;
  },

  removeProduct: async (id) => {
    await deleteProduct(id);
    set((state) => ({ products: state.products.filter((p) => p._id !== id) }));
  },
}));
