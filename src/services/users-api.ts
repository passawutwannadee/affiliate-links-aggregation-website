import axiosInstance from '@/middlewares/axios-interceptors';
import axios, { AxiosResponse } from 'axios';

export const usersAPI = async (args: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/users?username=${args ? args : ''}`,
      {}
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

export const banReasonAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`/users/ban`);

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

interface BanAppealForm {
  ban_id: string;
  appeal_information: string;
  appeal_picture?: File;
}

export const banAppealAPI = async (
  args: BanAppealForm
): Promise<AxiosResponse> => {
  // Create a FormData object
  const formData = new FormData();

  // Append data to the FormData object
  formData.append('ban_id', args.ban_id);
  formData.append('appeal_information', args.appeal_information);

  if (args.appeal_picture) {
    formData.append('appeal_picture', args.appeal_picture);
  }

  try {
    const response = await axiosInstance.post(`/users/ban/appeal`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for sending FormData
      },
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
