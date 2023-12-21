import axiosInstance from '@/middlewares/axios-interceptors';

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

export const addProductsAPI = async (args: string): Promise<any> => {
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

export const removeProductsAPI = async (args: string): Promise<any> => {
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
