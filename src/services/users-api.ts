/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import { AxiosResponse } from 'axios';

export const usersAPI = async (args: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/users?username=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err: any) {
    return err;
  }
};
