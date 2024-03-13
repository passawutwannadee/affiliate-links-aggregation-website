/* eslint-disable @typescript-eslint/no-explicit-any */
// interface VerifyEmailToken {
//   email_verify_token: string;
// }

import axiosInstance from '@/middlewares/axios-interceptors';
import axios, { AxiosResponse } from 'axios';

export const verifyEmailAPI = async (args: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.patch(`auth/verify-email`, {
      email_verify_token: args,
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

export const sendEmailVerificationlAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`auth/verify-email`, {});

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};
