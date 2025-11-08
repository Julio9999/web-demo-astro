export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description?: string;
}

export interface ProductForm {
  name: string;
  price: string;
  image: File | null;
  description: string;
}
