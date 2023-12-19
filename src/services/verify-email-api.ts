// interface VerifyEmailToken {
//   email_verify_token: string;
// }

import axiosInstance from '@/middlewares/axios-interceptors';

export const verifyEmailAPI = async (args: string): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`auth/verifyEmail`, {
      email_verify_token: args,
    });

    return response;
  } catch (err) {
    return err;
  }
};
