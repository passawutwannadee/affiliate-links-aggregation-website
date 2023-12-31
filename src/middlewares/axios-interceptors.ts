import axiosInstance from '@/configs/axios-instance';

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: { response: { request: { status: number } } }) => {
    if (error.response.request.status === 401) {
      document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      sessionStorage.clear();
      //   window.location = '/NotAuthorized';
    }
    if (error.response.request.status === 404) {
      console.log('Hellofrommiddleware');
      // window.location.href = '/404';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
