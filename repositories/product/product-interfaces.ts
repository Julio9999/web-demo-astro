
export type ProductRow = {
  id: number;
  name: string;
  description: string | null;
  price: number;
};

export type ProductWithImages = ProductRow & {
  images: string[];
};

export type ProductUpdate = Partial<ProductWithImages>;
