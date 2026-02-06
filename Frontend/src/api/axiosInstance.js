import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
