/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import { AxiosResponse } from 'axios';

interface ReportInfo {
  reportCategoryId: string;
  reportInformation: string;
  reportLink: string;
  username: string;
}

export const submitReportsAPI = async (
  args: ReportInfo
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/reports`, {
      report_category_id: args.reportCategoryId,
      report_information: args.reportInformation,
      report_link: args.reportLink,
      username: args.username,
    });

    return response;
  } catch (err: any) {
    return err;
  }
};

export const reportCategoriesAPI = async (
  args: number
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/reports/categories?parentId=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err: any) {
    return err;
  }
};
