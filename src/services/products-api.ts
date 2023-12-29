import axiosInstance from '@/middlewares/axios-interceptors';

export const productsAPI = async (args: String): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/products?username=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err) {
    return err;
  }
};

export const productAPI = async (args: String): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/products?product_id=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err) {
    return err;
  }
};

export const productCategoriesAPI = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/products/categories`, {});

    return response;
  } catch (err) {
    return err;
  }
};

interface ProductInfo {
  product_name: string;
  product_description: string;
  category: string;
  product_image: Blob;
  product_links: { value: string }[];
}

export const addProductsAPI = async (info: ProductInfo): Promise<any> => {
  // Create a FormData object
  const formData = new FormData();

  // Append data to the FormData object
  formData.append('product_name', info.product_name);
  formData.append('product_description', info.product_description);
  formData.append('category_id', info.category);
  formData.append('product_image', info.product_image);
  info.product_links.forEach((element, index) => {
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
    return err;
  }
};

export const removeProductsAPI = async (args: String): Promise<any> => {
  try {
    const response = await axiosInstance.delete(
      `/products?id=${args ? args : ''}`,
      {}
    );

    return response;
  } catch (err) {
    return err;
  }
};
