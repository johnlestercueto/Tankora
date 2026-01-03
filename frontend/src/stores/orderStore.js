// stores/orderStore.js
import { create } from "zustand";
import {
  fetchOrdersByCustomer,
  createOrder,
  fetchDealerOrders,
  updateOrderStatus,
} from "../services/orderService";

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,
  message: "",

  fetchOrdersByCustomer: async (customerId) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchOrdersByCustomer(customerId);
      set({ orders: data });
      return data;
    } catch (err) {
      set({ error: err.message, orders: [] });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  placeOrder: async (orderData) => {
    try {
      return await createOrder(orderData);
    } catch (err) {
      throw err;
    }
  },

  fetchDealerOrders: async (shopId, dealerId) => {
    set({ loading: true, message: "" });
    try {
      const data = await fetchDealerOrders(shopId, dealerId);
      set({ orders: data });
    } catch (err) {
      set({ message: err.message, orders: [] });
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ loading: true, message: "" });
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      set((state) => ({
        orders: state.orders.map((o) =>
          o._id === orderId ? { ...updatedOrder, isEditing: false } : o
        ),
        message: "Order status updated",
      }));
    } catch (err) {
      set({ message: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  editLocalOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o._id === orderId ? { ...o, isEditing: true } : o
      ),
    })),

  changeLocalStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o._id === orderId ? { ...o, status } : o
      ),
    })),
}));
