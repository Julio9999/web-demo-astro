// src/pages/api/products.ts
export const prerender = false;
import { db, Product } from "astro:db";

export async function GET() {
  const products = await db
  .select({ id: Product.id, name: Product.name, price: Product.price })
  .from(Product)
  .all();

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}
