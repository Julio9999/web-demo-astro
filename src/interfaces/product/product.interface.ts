export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface ProductForm {
  name: string;
  price: string;
  image: File | null;
  description: string;
}
