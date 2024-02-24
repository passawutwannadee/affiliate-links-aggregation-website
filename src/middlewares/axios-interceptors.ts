import axiosInstance from '@/configs/axios-instance';

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
    if (error.response.request.status === 404) {
      window.location.href = '/404';
    }
    if (error.response.request.status === 500) {
      window.location.href = '/500';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
