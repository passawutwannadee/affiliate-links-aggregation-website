/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import { AxiosResponse } from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginAPI = async (
  credentials: LoginCredentials
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      email: credentials.email,
      password: credentials.password,
    });

    return response;
  } catch (err: any) {
    return err;
  }
};

export const logoutAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/auth/logout`, {});

    return response;
  } catch (err: any) {
    return err;
  }
};
