// frontend/src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // backend proxy (vite.config.js me set karna hoga)
});

// ✅ Automatically attach JWT token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

