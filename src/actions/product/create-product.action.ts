import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { purgeCache } from "@netlify/functions";

import { ProductRepository } from "@repositories/product/product-repository";
import { uploadImages } from "@/shared/utils/upload-images/upload-images";

export const createProduct = defineAction({
  accept: "form",
  input: z.object({
    name: z.string(),
    price: z.coerce.number(),
    description: z.string().nullable().optional(),
    image: z.instanceof(File).array(),
  }),
  handler: async ({ name, price, description, image }) => {
    try {
      const imageUrls = await uploadImages(image);

      const result = await ProductRepository.insertProductWithImages(
        name,
        price,
        description!,
        imageUrls
      );

      await purgeCache({ tags: ["products"] });

      return {
        message: "Producto creado correctamente",
        ...result,
      };
    } catch (err: any) {
      console.error("Error al crear producto:", err);
      throw new Error(err.message || "Error interno del servidor");
    }
  },
});
