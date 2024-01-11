/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/middlewares/axios-interceptors';
import { AxiosResponse } from 'axios';

export const collectionsAPI = async (args: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/collections?username=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err: any) {
    return err;
  }
};

export const collectionAPI = async (args: string): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/collections?collectionId=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err: any) {
    return err;
  }
};

interface CollectionInfo {
  collectionId?: string;
  collectionName: string;
  collectionDescription: string;
  products: string[];
}

export const createCollectionsAPI = async (
  args: CollectionInfo
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.post(`/collections`, {
      collection_name: args.collectionName,
      collection_description: args.collectionDescription,
      products: args.products,
    });

    return response;
  } catch (err: any) {
    return err;
  }
};

export const ManageCollectionsAPI = async (
  args: CollectionInfo
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.put(`/collections`, {
      collection_id: args.collectionId,
      collection_name: args.collectionName,
      collection_description: args.collectionDescription,
      products: args.products,
    });

    return response;
  } catch (err: any) {
    return err;
  }
};

export const removeCollectionsAPI = async (
  args: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.delete(
      `/collections?collectionId=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err: any) {
    return err;
  }
};
