/* eslint-disable @typescript-eslint/no-explicit-any */
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
