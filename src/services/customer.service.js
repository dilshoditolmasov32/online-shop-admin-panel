import api from "../api/axios";

export const getCustomers = async (params = {}) => {
  const response = await api.get("/customers", { params });
  return response.data?.data ?? response.data;
};

export const getCustomer = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data?.data ?? response.data;
};

export const createCustomer = async (data) => {
  const response = await api.post("/customers", data);
  return response.data?.data ?? response.data;
};

export const updateCustomer = async (id, data) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data?.data ?? response.data;
};

export const deleteCustomer = async (id) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data?.data ?? response.data;
};

export const massUpdateCustomers = async (data) => {
  const response = await api.post("/customers/mass-update", data);
  return response.data?.data ?? response.data;
};

export const massDestroyCustomers = async (data) => {
  const response = await api.post("/customers/mass-destroy", data);
  return response.data?.data ?? response.data;
};
