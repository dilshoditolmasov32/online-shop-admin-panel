import api from "../api/axios";

const unwrapResponseData = (response) => response.data?.data ?? response.data;

export const getProducts = async (params = {}) => {
  const response = await api.get("/catalog/products", { params });
  return unwrapResponseData(response);
};

export const getProduct = async (id) => {
  const response = await api.get(`/catalog/products/${id}`);
  return unwrapResponseData(response);
};

export const createProduct = async (data) => {
  const response = await api.post("/catalog/products", data);
  return unwrapResponseData(response);
};

export const updateProduct = async (id, data) => {
  const isFormData = data instanceof FormData;
  const response = await api.post(`/catalog/products/${id}`, data, {
    headers: isFormData
      ? {
          "Content-Type": "multipart/form-data",
        }
      : undefined,
  });
  return unwrapResponseData(response);
};

export const updateProductConfigurable = async (id, data) => {
  const response = await api.put(`/catalog/products/${id}`, data);
  return unwrapResponseData(response);
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/catalog/products/${id}`);
  return unwrapResponseData(response);
};

export const updateProductInventory = async (id, data) => {
  const response = await api.post(`/catalog/products/${id}/inventories`, data);
  return unwrapResponseData(response);
};

export const massUpdateProducts = async (data) => {
  const response = await api.post("/catalog/products/mass-update", data);
  return unwrapResponseData(response);
};

export const massDestroyProducts = async (data) => {
  const response = await api.post("/catalog/products/mass-destroy", data);
  return unwrapResponseData(response);
};
