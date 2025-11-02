export const prerender = false;
import { db, Product } from "astro:db";
import { purgeCache } from "@netlify/functions";

export const POST = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const image = formData.get("image") as string;
  const description = formData.get("description") as string | null;

  if (!name || !price || !image) {
    return new Response("Faltan campos obligatorios", { status: 400 });
  }

  const response = await db.insert(Product).values({
    name,
    price,
    image,
    description,
  });

  await purgeCache({ tags: ["products"] });

  return new Response(null, {
    status: 200,
  });
};
