interface User {
  username: string;
  displayName: string;
}

export type { User as UserType };

interface Product {
  productId?: number;
  productName: string;
  productDescription: string;
  category: string;
  otherCategory?: string;
  productImage: Blob;
  productLinks: { value: string }[];
}

export type { Product as ProductType };
