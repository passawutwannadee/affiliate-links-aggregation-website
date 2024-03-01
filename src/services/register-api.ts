import axiosInstance from '@/middlewares/axios-interceptors';
import axios, { AxiosResponse } from 'axios';

interface RegisterForm {
  email: string;
  password: string;
  username: string;
  display_name: string;
}

export const registerAPI = async (
  form: RegisterForm
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/auth/register`, {
      email: form.email,
      password: form.password,
      username: form.username,
      display_name: form.display_name,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};
