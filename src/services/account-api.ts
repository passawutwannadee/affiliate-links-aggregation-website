/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import { UserType } from '@/models/user';
import axios, { AxiosResponse } from 'axios';

export const accountAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`auth/account`);

    console.log(response);

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};

export const editProfileAPI = async (
  args: UserType
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.patch(`users/profile`, {
      display_name: args.displayName,
      username: args.username,
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

export const editProfilePictureAPI = async (
  arg: Blob
): Promise<AxiosResponse> => {
  // Create a FormData object
  const formData = new FormData();

  // Append data to the FormData object
  formData.append('profile_picture', arg);

  try {
    const response = await axiosInstance.patch(
      `/users/profile_picture`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending FormData
        },
      }
    );

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};
