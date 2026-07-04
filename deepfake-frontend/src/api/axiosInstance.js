import axios from "axios";
import { API_BASE_URL, TOKEN_STORAGE_KEY } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT to every outgoing request, if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Central place to react to auth failures once the real backend is wired in
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      // window.location.href = "/login"; // enable once routing for protected pages is in place
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
