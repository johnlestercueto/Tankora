// stores/shopStore.js
import { create } from "zustand";
import { fetchShops, fetchDealerShop, saveShop } from "../services/shopService";

export const useShopStore = create((set) => ({
  shops: [],
  shop: null,
  loading: false,
  error: null,

  fetchShops: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchShops();
      set({ shops: data });
      return data;
    } catch (err) {
      set({ error: err.message, shops: [] });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  fetchDealerShop: async (dealerId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchDealerShop(dealerId);
      set({ shop: data });
      return data;
    } catch (err) {
      set({ error: err.message, shop: null });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  saveShop: async (shopData) => {
    set({ loading: true, error: null });
    try {
      const savedShop = await saveShop(shopData, shopData._id);
      set({ shop: savedShop });
      return savedShop;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
