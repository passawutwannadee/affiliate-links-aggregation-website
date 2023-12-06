import axiosInstance from '@/configs/axios-instance';

export const loginAPI = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      email: email,
      password: password,
    });

    return response;
  } catch (err) {
    return err;
  }
};
