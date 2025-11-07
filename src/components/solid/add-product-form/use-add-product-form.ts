import type { ProductForm } from "@/product/product.interface";
import { createSignal } from "solid-js";

export const useAddProductForm = () => {

  const [form, setForm] = createSignal<ProductForm>({
    name: "",
    price: "",
    image: null,
    description: "",
  });

  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  const handleChange = (field: keyof Omit<ProductForm, "image">,value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", form().image!);
      formData.append("image", form().image!);
      formData.append("image", form().image!);
      formData.append("name", form().name);
      formData.append("price", form().price);
      formData.append("description", form().description ?? "");
      setIsLoading(() => true)
      const res = await fetch("/api/add-product", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al enviar el formulario");

      setForm({ name: "", price: "", image: null, description: "" });
      // window.location.href = "/";
    } catch (err) {
      console.error("Error en validación o envío:", err);
    } finally{
        setIsLoading(() => false)
    }
  };
  return {
    handleChange,
    handleSubmit,
    handleFileChange,
    form,
    isLoading
  };
};
