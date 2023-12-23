import axios from 'axios';

const token = sessionStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // Adjust the content type based on your API requirements
  },
  // withCredentials: true,
  // Other configuration options...
});

export default axiosInstance;
