export const prerender = false;

import type { APIRoute } from "astro";
import ImageKit from "imagekit";
import { db, Product, ProductImage } from "astro:db";
import { purgeCache } from "@netlify/functions";

const imagekit = new ImageKit({
  publicKey: import.meta.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: import.meta.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: import.meta.env.IMAGEKIT_URL_ENDPOINT,
});

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
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const uploadResponses = await Promise.all(
      imageFiles.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString("base64");
        const upload = await imagekit.upload({
          file: base64,
          fileName: file.name,
          folder: "/uploads",
        });
        return `${upload.url}?tr=f-avif,q-80,w-800`;
      })
    );

    const [product, images] = await db.transaction(async (tx) => {
      const [newProduct] = await tx.insert(Product).values({
        name,
        price,
        description,
      }).returning();

      const insertedImages = await tx.insert(ProductImage).values(
        uploadResponses.map((url) => ({
          productId: newProduct.id,
          url,
        }))
      ).returning();

      return [newProduct, insertedImages];
    });

    await purgeCache({ tags: ["products"] });

    return new Response(
      JSON.stringify({
        message: "Producto creado correctamente",
        product,
        images,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error(" Error al crear producto:", err);
    return new Response(
      JSON.stringify({
        error: err.message || "Error interno del servidor",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
