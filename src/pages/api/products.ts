export const prerender = false;
import { db, sql } from "astro:db";
import { parseArrayField } from "db/utils";

export async function GET() {
  const products = await db
    .select({
      id: sql`p.id`,
      name: sql`p.name`,
      description: sql`p.description`,
      price: sql`p.price`,
      images: sql`json_group_array(pi.url)`.as("images"),
    })
    .from(sql`Product p LEFT JOIN ProductImage pi ON pi.productId = p.id`)
    .groupBy(sql`p.id`)
    .all()
    .then((res) => parseArrayField(res, "images"));

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}
