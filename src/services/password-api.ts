import axiosInstance from '@/middlewares/axios-interceptors';
import axios, { AxiosResponse } from 'axios';

interface PasswordCredentials {
  old_password: string;
  new_password: string;
}

export const changePasswordAPI = async (
  credentials: PasswordCredentials
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.patch(`/auth/password`, {
      old_password: credentials.old_password,
      new_password: credentials.new_password,
    });

    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response;
    } else {
      throw e;
    }
  }
};

export const forgotPasswordAPI = async (
  email: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/auth/forgot-password`, {
      email,
    });

    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response;
    } else {
      throw e;
    }
  }
};

export const resetPasswordAPI = async ({
  new_password,
  reset_password_token,
}: {
  new_password: string;
  reset_password_token: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.patch(`/auth/reset-password`, {
      new_password,
      reset_password_token,
    });

    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response;
    } else {
      throw e;
    }
  }
};
