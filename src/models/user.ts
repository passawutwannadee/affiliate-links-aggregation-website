interface User {
  username: string;
}

export type { User as UserType };

interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  category: string;
  productImage: Blob;
  productLinks: { value: string }[];
}

export type { Product as ProductType };
