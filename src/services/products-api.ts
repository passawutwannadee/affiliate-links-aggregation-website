import axiosInstance from '@/middlewares/axios-interceptors';
import { ProductType } from '@/models/user';
import axios, { AxiosResponse } from 'axios';

export const productsAPI = async (
  args: string,
  category: string,
  product_name: string,
  limit?: number,
  page?: number
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/products?username=${args ? args : ''}&category_id=${
        category ? category : ''
      }&product-name=${product_name ? product_name : ''}&_limit=${
        limit ? limit : ''
      }&_page=${page ? page : ''}`,
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

export const productToCollectionAPI = async (
  args: string
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/products?username=${args ? args : ''}`,
      {}
    );

    console.log('heyyyyyyyyyyyyyyyyyyyy2', response);
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};

export const productAPI = async (args: number): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(
      `/products?product_id=${args ? args : ''}`,
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

export const productCategoriesAPI = async (): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.get(`/products/categories`, {});

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response;
    } else {
      throw err;
    }
  }
};

export const addProductsAPI = async (
  info: ProductType
): Promise<AxiosResponse> => {
  // Create a FormData object
  const formData = new FormData();

  // Append data to the FormData object
  formData.append('product_name', info.productName);
  formData.append('product_description', info.productDescription);
  formData.append('category_id', info.category);
  formData.append('product_image', info.productImage);
  info.productLinks.forEach((element, index) => {
    formData.append(`product_links[${index}]`, element.value);
  });

  try {
    const response = await axiosInstance.post(`/products`, formData, {
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

export const editProductsAPI = async (
  info: ProductType
): Promise<AxiosResponse> => {
  // Create a FormData object
  const formData = new FormData();

  // Append data to the FormData object
  formData.append('product_id', info.productId!.toString());
  formData.append('product_name', info.productName);
  formData.append('product_description', info.productDescription);
  formData.append('category_id', info.category);
  formData.append('product_image', info.productImage);
  info.productLinks.forEach((element, index) => {
    formData.append(`product_links[${index}]`, element.value);
  });

  try {
    const response = await axiosInstance.put(`/products`, formData, {
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

export const removeProductsAPI = async (
  args: number
): Promise<AxiosResponse> => {
  try {
    const response = await axiosInstance.delete(
      `/products?id=${args ? args : ''}`,
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
