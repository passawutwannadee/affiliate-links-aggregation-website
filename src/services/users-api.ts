import axiosInstance from '@/middlewares/axios-interceptors';

export const usersAPI = async (args: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/users?username=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err) {
    return err;
  }
};
