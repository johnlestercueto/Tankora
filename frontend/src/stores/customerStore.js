// stores/customerStore.js
import { create } from "zustand";
import {
  fetchCustomerProfile,
  saveCustomerProfile,
} from "../services/customerService";

export const useCustomerStore = create((set) => ({
  customerProfile: null,
  loading: false,
  error: null,

  fetchProfile: async (userId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCustomerProfile(userId);
      set({ customerProfile: data });
      return data;
    } catch (err) {
      set({ error: err.message, customerProfile: null });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  saveProfile: async (userId, profileData) => {
    set({ loading: true, error: null });
    try {
      const data = await saveCustomerProfile(userId, profileData);
      set({ customerProfile: data });
      return data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
