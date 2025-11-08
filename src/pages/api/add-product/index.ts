export const prerender = false;

import type { APIRoute } from "astro";
import { purgeCache } from "@netlify/functions";

import { ProductRepository } from "@/product/product-repository";
import { uploadImages } from "src/utils/upload-images/upload-images";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = (formData.get("description") as string) || null;

    const imageFiles = formData.getAll("image") as File[];

    if (!name || !price || imageFiles.length === 0) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const imageUrls = await uploadImages(imageFiles)

    const result = await ProductRepository.insertProductWithImages(
      name,
      price,
      description,
      imageUrls
    );

    await purgeCache({ tags: ["products"] });

    return new Response(
      JSON.stringify({
        message: "Producto creado correctamente",
        ...result,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Error al crear producto:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
