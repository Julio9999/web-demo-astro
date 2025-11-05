import { createSignal, createEffect } from "solid-js";

interface ProductForm {
  name: string;
  price: string;
  image: File | null;
  description: string;
}

export const AddProductForm = () => {
  const [form, setForm] = createSignal<ProductForm>({
    name: "",
    price: "",
    image: null,
    description: "",
  });

  createEffect(() => {
    console.log(form());
  });

  const handleChange = (field: keyof Omit<ProductForm, "image">, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setForm(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', form().image!)
      formData.append("name", form().name);
      formData.append("price", form().price);
      formData.append("description", form().description ?? "");
      const res = await fetch("/api/add-product", {
        method: "POST",
        body: formData,
      });
     
      if (!res.ok) throw new Error("Error al enviar el formulario");

      setForm({ name: "", price: "", image: null, description: "" });
      window.location.href = "/";

    } catch (err) {
      console.error("Error en validación o envío:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="flex flex-col gap-5 text-white">
      <div>
        <label for="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={form().name}
          onInput={(e) => handleChange("name", e.currentTarget.value)}
          required
          class="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label for="price">Precio</label>
        <input
          type="number"
          id="price"
          step="0.01"
          value={form().price}
          onInput={(e) => handleChange("price", e.currentTarget.value)}
          required
          class="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label for="image">Imagen</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onInput={(e) => handleFileChange(e.currentTarget.files?.[0] ?? null)}
          required
          class="w-full px-4 py-2 border rounded-lg cursor-pointer"
        />
      </div>

      <div>
        <label for="description">Descripción</label>
        <textarea
          id="description"
          rows={3}
          value={form().description}
          onInput={(e) => handleChange("description", e.currentTarget.value)}
          class="w-full px-4 py-2 border rounded-lg"
        ></textarea>
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer">
        Guardar producto
      </button>
    </form>
  );
};
