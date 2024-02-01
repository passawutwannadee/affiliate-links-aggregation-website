/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import axios, { AxiosResponse } from 'axios';

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

export const banReasonAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`/users/ban`);

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
}

export const banAppealAPI = async (
  args: BanAppealForm
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/users/ban/appeal`, {
      ban_id: args.ban_id,
      appeal_information: args.appeal_information,
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
