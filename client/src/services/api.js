import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5001/api';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response) {
      console.error("API Error:", error.response.data.message);

      // Example: auto logout on 401
      if (error.response.status === 401) {
        Cookies.remove('token');
        window.location.href = "/login";
      }
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;