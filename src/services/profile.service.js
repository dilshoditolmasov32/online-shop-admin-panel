import api from "../api/axios";

/**
 * Get current user profile
 */
export const getCurrentProfile = async () => {
  const response = await api.get("/settings/profile");
  return response.data?.data ?? response.data;
};

/**
 * Update current user profile
 * @param {Object} data - Profile data (name, phone, email, etc.)
 * @param {FormData|Object} data - Can include file for avatar
 */
export const updateProfile = async (data) => {
  const isFormData = data instanceof FormData;
  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};
  const response = await api.put("/settings/profile", data, config);
  return response.data?.data ?? response.data;
};

/**
 * Change password
 * @param {Object} data - { old_password, new_password, new_password_confirmation }
 */
export const changePassword = async (data) => {
  const response = await api.post("/settings/profile/change-password", data);
  return response.data?.data ?? response.data;
};

/**
 * Upload profile avatar
 * @param {File} file - Avatar file
 */
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await api.post("/settings/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data?.data ?? response.data;
};
