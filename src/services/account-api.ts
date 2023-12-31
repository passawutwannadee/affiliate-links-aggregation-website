import axiosInstance from '@/middlewares/axios-interceptors';

export const accountAPI = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`auth/account`);

    console.log(response);

    return response;
  } catch (err) {
    return err;
  }
};
