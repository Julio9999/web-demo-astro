export const prerender = false;
import { type APIRoute } from "astro";
import { ProductRepository } from "@/product/product-repository";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  const product = await ProductRepository.getProductById(id!)

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
  });
};
