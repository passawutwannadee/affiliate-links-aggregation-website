import axiosInstance from '@/configs/axios-instance';

export const registerAPI = async (
  email: string,
  password: string,
  username: string,
  display_name: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/auth/register`, {
      email: email,
      password: password,
      username: username,
      display_name: display_name,
    });

    return response;
  } catch (err) {
    return err;
  }
};
