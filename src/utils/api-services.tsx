import axios from 'axios';

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

ApiService.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: { response: { request: { status: number } } }) => {
    if (error.response.request.status === 401) {
      sessionStorage.clear();
      //   window.location = '/NotAuthorized';
    }
    return Promise.reject(error);
  }
);

export default ApiService;
