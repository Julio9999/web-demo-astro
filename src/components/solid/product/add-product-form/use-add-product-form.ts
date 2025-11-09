import { createSignal } from "solid-js";
import { actions } from "astro:actions";

import type { ProductForm } from "@/interfaces/product/product.interface";

export const useAddProductForm = () => {
  const [form, setForm] = createSignal<ProductForm>({
    name: "",
    price: "",
    image: null,
    description: "",
  });

  const [isLoading, setIsLoading] = createSignal(false);

  const handleChange = (field: keyof Omit<ProductForm, "image">, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const { name, price, image, description } = form();
    if (!name || !price || !image) return alert("Faltan campos obligatorios");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description || "");
    formData.append("image", image);

    try {
      setIsLoading(true);

      const res = await actions.createProduct(formData); 
      if (res.error) throw new Error(res.error.message);

      console.log("Producto creado:", res.data);
      setForm({ name: "", price: "", image: null, description: "" });
    } catch (err) {
      console.error("Error al enviar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleFileChange,
    form,
    isLoading,
  };
};
