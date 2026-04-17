import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/token";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAccessToken();
      toast.error("Iltimos qaytadan urinib ko'ring");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default api;
