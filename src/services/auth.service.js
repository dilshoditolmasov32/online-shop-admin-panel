import api from "../api/axios";
import { removeAccessToken } from "../utils/token";

export const login = async (data) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const logout = async () => {
  try {
    await api.delete("/logout");
  } catch {
    // ignore logout failure and clear local token
  } finally {
    removeAccessToken();
  }
};
