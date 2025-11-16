import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { purgeCache } from "@netlify/functions";

import { ProductRepository } from "@repositories/product/product-repository";
import { uploadImages } from "@/shared/utils/upload-images/upload-images";

export const updateProduct = defineAction({
  accept: "form",
  input: z.object({
    id: z.number(),
    name: z.string(),
    price: z.coerce.number(),
    description: z.string().nullable().optional(),
    image: z.instanceof(File).array(),
  }),
  handler: async ({ id, name, price, description, image }) => {
    try {
      const images = await uploadImages(image);

      const result = await ProductRepository.updateProduct(id, {
        name,
        price,
        description,
        images,
      });

      await purgeCache({ tags: [`product/${id}`] });

      return {
        message: "Producto actualizado correctamente",
        ...result,
      };
    } catch (err: any) {
      console.error("Error al actualizar producto:", err);
      throw new Error(err.message || "Error interno del servidor");
    }
  },
});
