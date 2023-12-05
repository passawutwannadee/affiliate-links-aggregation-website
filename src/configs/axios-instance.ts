import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Other configuration options...
});

export default axiosInstance;
