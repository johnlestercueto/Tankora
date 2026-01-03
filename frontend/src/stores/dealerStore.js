// stores/dealerStore.js
import { create } from "zustand";
import {
  fetchDealerProfile,
  saveDealerProfile,
} from "../services/dealerService";

export const useDealerStore = create((set) => ({
  dealer: null,
  loading: false,
  message: "",

  fetchDealer: async (userId) => {
    set({ loading: true, message: "" });
    try {
      const data = await fetchDealerProfile(userId);
      set({ dealer: data });
      return data;
    } catch (err) {
      set({ dealer: null, message: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  saveDealer: async (data, isUpdate = false) => {
    set({ loading: true, message: "" });
    try {
      const saved = await saveDealerProfile(data, isUpdate);
      set({ dealer: saved, message: "Profile saved successfully!" });
      return saved;
    } catch (err) {
      set({ message: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
