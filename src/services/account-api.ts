/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import { AxiosResponse } from 'axios';

export const accountAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`auth/account`);

    console.log(response);

    return response;
  } catch (err: any) {
    return err;
  }
};
