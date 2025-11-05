export const prerender = false;

import type { APIRoute } from "astro";
import ImageKit from "imagekit";
import { db, Product } from "astro:db";
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
    const imageFile = formData.get("image") as File | null;

    if (!name || !price || !imageFile) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const base64 = buffer.toString("base64");

    const uploadResponse = await imagekit.upload({
      file: base64,
      fileName: imageFile.name,
      folder: "/uploads",
    });

     const optimizedUrl = `${uploadResponse.url}?tr=f-avif,q-80,w-800`;

    await db.insert(Product).values({
      name,
      price,
      image: optimizedUrl,
      description,
    });

    await purgeCache({ tags: ["products"] });

    return new Response(
      JSON.stringify({
        message: "Producto creado correctamente",
        imageUrl: uploadResponse.url,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("❌ Error al procesar producto:", err);
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
