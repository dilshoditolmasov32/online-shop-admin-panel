import api from "../api/axios";

export const getUsers = async (params = {}) => {
  const response = await api.get("/settings/users", { params });
  return response.data?.data ?? response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/settings/users/${id}`);
  return response.data?.data ?? response.data;
};

export const createUser = async (data) => {
  const response = await api.post("/settings/users", data);
  return response.data?.data ?? response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/settings/users/${id}`, data);
  return response.data?.data ?? response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/settings/users/${id}`);
  return response.data?.data ?? response.data;
};

export const massUpdateUsers = async (data) => {
  const response = await api.post("/settings/users/mass-update", data);
  return response.data?.data ?? response.data;
};

export const massDestroyUsers = async (data) => {
  const response = await api.post("/settings/users/mass-destroy", data);
  return response.data?.data ?? response.data;
};
