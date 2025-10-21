import axios from "axios";
import { getAccessToken } from "../helpers/helpers";


const API_URL = axios.create({
  baseURL: "https://online-shop.milliybiz.uz/",
});


API_URL.interceptors.request.use((config) => {
  const access_token = getAccessToken();
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config; 
}, (error) => {
  return Promise.reject(error);
});

export default API_URL;
