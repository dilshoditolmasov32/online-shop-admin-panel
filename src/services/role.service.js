import api from "../api/axios";

/**
 * Get all available roles
 * @param {Object} params - Query parameters (limit, page, etc.)
 */
export const getRoles = async (params = {}) => {
  const response = await api.get("/settings/roles", { params });
  return response.data?.data ?? response.data;
};

/**
 * Get single role details
 * @param {number|string} id - Role ID
 */
export const getRole = async (id) => {
  const response = await api.get(`/settings/roles/${id}`);
  return response.data?.data ?? response.data;
};

/**
 * Create new role
 * @param {Object} data - { name, description, permissions }
 */
export const createRole = async (data) => {
  const response = await api.post("/settings/roles", data);
  return response.data?.data ?? response.data;
};

/**
 * Update role
 * @param {number|string} id - Role ID
 * @param {Object} data - { name, description, permissions }
 */
export const updateRole = async (id, data) => {
  const response = await api.put(`/settings/roles/${id}`, data);
  return response.data?.data ?? response.data;
};

/**
 * Delete role
 * @param {number|string} id - Role ID
 */
export const deleteRole = async (id) => {
  const response = await api.delete(`/settings/roles/${id}`);
  return response.data?.data ?? response.data;
};
