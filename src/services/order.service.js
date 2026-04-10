import api from "../api/axios";

export const getOrders = async (params = {}) => {
  const response = await api.get("/sales/orders", { params });
  return response.data?.data ?? response.data;
};

export const getOrder = async (id) => {
  const response = await api.get(`/sales/orders/${id}`);
  return response.data?.data ?? response.data;
};

export const createOrder = async (data) => {
  const response = await api.post("/sales/orders", data);
  return response.data?.data ?? response.data;
};

export const updateOrder = async (id, data) => {
  const response = await api.put(`/sales/orders/${id}`, data);
  return response.data?.data ?? response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/sales/orders/${id}`);
  return response.data?.data ?? response.data;
};

export const massUpdateOrders = async (data) => {
  const response = await api.post("/sales/orders/mass-update", data);
  return response.data?.data ?? response.data;
};

export const massDestroyOrders = async (data) => {
  const response = await api.post("/sales/orders/mass-destroy", data);
  return response.data?.data ?? response.data;
};
