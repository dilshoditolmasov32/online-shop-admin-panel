import api from "../api/axios";

export const getInventorySources = async (params = {}) => {
  const response = await api.get("/inventory-sources", { params });
  return response.data?.data ?? response.data;
};

export const getInventorySource = async (id) => {
  const response = await api.get(`/inventory-sources/${id}`);
  return response.data?.data ?? response.data;
};

export const createInventorySource = async (data) => {
  const response = await api.post("/inventory-sources", data);
  return response.data?.data ?? response.data;
};

export const updateInventorySource = async (id, data) => {
  const response = await api.put(`/inventory-sources/${id}`, data);
  return response.data?.data ?? response.data;
};

export const deleteInventorySource = async (id) => {
  const response = await api.delete(`/inventory-sources/${id}`);
  return response.data?.data ?? response.data;
};

export const massUpdateInventorySources = async (data) => {
  const response = await api.post("/inventory-sources/mass-update", data);
  return response.data?.data ?? response.data;
};

export const massDestroyInventorySources = async (data) => {
  const response = await api.post("/inventory-sources/mass-destroy", data);
  return response.data?.data ?? response.data;
};
