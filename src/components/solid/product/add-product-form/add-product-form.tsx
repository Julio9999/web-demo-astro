import { useAddProductForm } from "./use-add-product-form";

export const AddProductForm = () => {
  const {
    handleChange,
    handleSubmit,
    handleFileChange,
    form,
    isLoading
  } = useAddProductForm();

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
        <label for="image">Imagenes</label>
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

      <button type="submit"
        class={`w-full bg-blue-600 text-white py-2 rounded-lg ${isLoading() ? "cursor-disabled" : "cursor-pointer"}`}
        disabled={isLoading()}
      >
        {isLoading() ? "Guardando..." :"Guardar producto"}
      </button>
    </form>
  );
};
