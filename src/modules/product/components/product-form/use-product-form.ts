import { createSignal } from "solid-js";
import { actions } from "astro:actions";

import type { ProductForm } from "@/shared/interfaces/product/product.interface";

export const useProductForm = () => {
  const [form, setForm] = createSignal<ProductForm>({
    name: "",
    price: "",
    image: [],
    description: "",
  });

  const [isLoading, setIsLoading] = createSignal(false);

  const handleChange = (field: keyof Omit<ProductForm, "image">, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    setForm((prev) => ({ ...prev, image: Array.from(files) }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const { name, price, image, description } = form();
    if (!name || !price || !image) return alert("Faltan campos obligatorios");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description || "");
    image.forEach((file) => {
      formData.append("image", file); 
    });

    try {
      setIsLoading(true);

      const res = await actions.createProduct(formData); 
      if (res.error) throw new Error(res.error.message);

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
