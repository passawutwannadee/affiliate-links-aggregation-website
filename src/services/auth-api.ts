import axiosInstance from '@/middlewares/axios-interceptors';

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginAPI = async (credentials: LoginCredentials): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      email: credentials.email,
      password: credentials.password,
    });

    return response;
  } catch (err) {
    return err;
  }
};

export const logoutAPI = async (): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/auth/logout`, {});

    return response;
  } catch (err) {
    return err;
  }
};
