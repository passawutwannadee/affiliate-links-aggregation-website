/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import axios, { AxiosResponse } from 'axios';

interface ReportFunctions {
  userId?: string;
  reportId?: string;
  products?: string;
  collections?: string;
}

export const getUserReports = async (
  args: ReportFunctions
): Promise<AxiosResponse> => {
  try {
    console.log(args);
    const response = await axiosInstance.get(
      `/admin?products=${args.products}&collections=${args.collections}`,
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

export const getBanAppeals = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`/admin/ban-appeals`, {});

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
  userId: number;
  reportId: number;
  banReason?: string;
  reportCategoryId?: string;
}

export const banAPI = async (arg: BanInfo): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/admin/user`, {
      user_id: arg.userId,
      report_id: arg.reportId,
      report_category_id: arg.reportCategoryId,
      ban_reason_detail: arg.banReason,
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

interface WarnInfo {
  userId: number;
  reportId: number;
  reportCategoryId: number;
  warnReasonDetail: string;
  productId?: number;
  collectionId?: number;
}

export const warnAPI = async (arg: WarnInfo): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/admin/user/warn`, {
      user_id: arg.userId,
      report_id: arg.reportId,
      report_category_id: arg.reportCategoryId,
      warn_reason_detail: arg.warnReasonDetail,
      product_id: arg.productId,
      collection_id: arg.collectionId,
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

interface UnbanInfo {
  appealId: number;
  userId: number;
  banId: number;
  unbanReasonDetail: string;
}

export const unbanAPI = async (arg: UnbanInfo): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.put(`/admin/user/unban`, {
      appeal_id: arg.appealId,
      user_id: arg.userId,
      ban_id: arg.banId,
      unban_reason_detail: arg.unbanReasonDetail,
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

export const ticketStausesAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`/admin/ticket`, {});

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};

interface TicketInfo {
  appealId?: number;
  reportId?: number;
  ticketStatusId: number;
}

export const ticketAPI = async (arg: TicketInfo): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.put(`/admin/ticket`, {
      report_id: arg.reportId,
      ticket_status_id: arg.ticketStatusId,
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
