import axiosInstance from '@/configs/axios-instance';

axiosInstance.interceptors.response.use(
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
