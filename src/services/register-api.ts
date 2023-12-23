import axiosInstance from '@/middlewares/axios-interceptors';

interface RegisterForm {
  email: string;
  password: string;
  username: string;
  display_name: string;
}

export const registerAPI = async (form: RegisterForm): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/auth/register`, {
      email: form.email,
      password: form.password,
      username: form.username,
      display_name: form.display_name,
    });

    return response;
  } catch (err) {
    return err;
  }
};
