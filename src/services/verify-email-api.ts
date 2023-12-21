// interface VerifyEmailToken {
//   email_verify_token: string;
// }

import axiosInstance from '@/middlewares/axios-interceptors';

export const verifyEmailAPI = async (args: string): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`auth/verify-email`, {
      email_verify_token: args,
    });

    return response;
  } catch (err) {
    return err;
  }
};

export const sendEmailVerificationlAPI = async (): Promise<any> => {
  try {
    const response = await axiosInstance.post(`auth/verify-email`, {});

    return response;
  } catch (err) {
    return err;
  }
};
