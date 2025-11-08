export const prerender = false;
import { ProductRepository } from "@/product/product-repository";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const products = await ProductRepository.getAllProducts();
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}
