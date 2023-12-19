import axiosInstance from '@/middlewares/axios-interceptors';

interface User {
  username: string;
}

export const productsAPI = async (args: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/products?username=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err) {
    return err;
  }
};
