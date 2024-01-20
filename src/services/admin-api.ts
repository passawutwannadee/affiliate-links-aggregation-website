/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import { AxiosResponse } from 'axios';

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
  } catch (err: any) {
    return err;
  }
};
