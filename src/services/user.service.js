import api from "../api/axios";

export const getUsers = async (params = {}) => {
  const response = await api.get("/settings/users", { params });
  return response.data;
};


export const getUser = async (id) => {
  const response = await api.get(`/settings/users/${id}`);
  return  response.data;
};

export const createUser = async (data) => {
  const isFormData = data instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await api.post("/settings/users", data, config);
  return  response.data;
};

export const updateUser = async (id, data) => {
  const isFormData = data instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await api.put(`/settings/users/${id}`, data, config);
  return response.data;
};


export const deleteUser = async (id) => {
  const response = await api.delete(`/settings/users/${id}`);
  return response.data;
};



