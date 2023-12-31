import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  // withCredentials: true,
  // Other configuration options...
});

export default axiosInstance;
