// stores/authStore.js
import { create } from "zustand";
import { loginUser, registerUser } from "../services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (formData) => {
    set({ loading: true, error: null });
    try {
      const data = await loginUser(formData);
      set({ user: data });
      return data;
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      return await registerUser(formData);
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => set({ user: null }),
}));
