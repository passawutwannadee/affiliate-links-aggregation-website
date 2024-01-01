/* eslint-disable @typescript-eslint/no-explicit-any */
// interface VerifyEmailToken {
//   email_verify_token: string;
// }

import axiosInstance from '@/middlewares/axios-interceptors';
import { AxiosResponse } from 'axios';

export const verifyEmailAPI = async (args: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.patch(`auth/verify-email`, {
      email_verify_token: args,
    });

    return response;
  } catch (err: any) {
    return err;
  }
};

export const sendEmailVerificationlAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`auth/verify-email`, {});

    return response;
  } catch (err: any) {
    return err;
  }
};
