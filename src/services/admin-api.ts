/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import axios, { AxiosResponse } from 'axios';

interface ReportFunctions {
  userId?: string;
  reportId?: string;
}

export const getUserReports = async (
  args: ReportFunctions
): Promise<AxiosResponse> => {
  try {
    console.log(args);
    const response = await axiosInstance.get(`/admin`, {});

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};

interface BanInfo {
  userId?: string;
  banReason?: string;
}

export const banAPI = async (arg: BanInfo): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.put(`/admin/user`, {
      user_id: arg.userId,
      ban_reason: arg.banReason,
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
