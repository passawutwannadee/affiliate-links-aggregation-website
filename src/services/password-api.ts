import axiosInstance from '@/middlewares/axios-interceptors';

interface PasswordCredentials {
  old_password: string;
  new_password: string;
}

export const changePasswordAPI = async (
  credentials: PasswordCredentials
): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`/auth/password`, {
      old_password: credentials.old_password,
      new_password: credentials.new_password,
    });

    return response;
  } catch (err) {
    return err;
  }
};
