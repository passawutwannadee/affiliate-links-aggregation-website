import axiosInstance from '@/configs/axios-instance';
import globalRouter from '@/lib/global-navigate';

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: { response: { request: { status: number } } }) => {
    if (error.response.request.status === 401) {
      // make session expire and clear token
      document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      sessionStorage.clear();
      window.location.href = '/';
    }
    if (error.response.request.status === 404 && globalRouter.navigate) {
      globalRouter.navigate('/405');
    }
    if (error.response.request.status === 500 && globalRouter.navigate) {
      globalRouter.navigate('/500');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
