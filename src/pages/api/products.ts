// src/pages/api/products.ts
import { db, Product } from "astro:db";

export async function get() {
  const products = await db
  .select({ id: Product.id, name: Product.name, price: Product.price })
  .from(Product)
  .all();

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}
