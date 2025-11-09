import { db, Product, ProductImage, sql, eq } from "astro:db";
import { parseArrayField } from "db/utils";

export const ProductRepository = {

  
  async getProductById(id: string) {
    const product = await db
      .select({
        id: Product.id,
        name: Product.name,
        description: Product.description,
        price: Product.price,
        images: sql<string[]>`json_group_array(${ProductImage.url})`.as("images"),
      })
      .from(Product)
      .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(eq(Product.id, Number(id)))
      .groupBy(Product.id)
      .limit(1)
      .then((res) => parseArrayField(res, "images"));
    return product[0];
  },

  async getAllProducts() {
    const products = await db
      .select({
        id: Product.id,
        name: Product.name,
        description: Product.description,
        price: Product.price,
        images: sql<string[]>`json_group_array(${ProductImage.url})`.as("images"),
      })
      .from(Product)
      .leftJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .groupBy(Product.id)
      .all()
      .then((res) => parseArrayField(res, "images"));

    return products;
  },

  async insertProductWithImages(
    name: string,
    price: number,
    description: string | null,
    imageUrls: string[]
  ) {
    const [product, images] = await db.transaction(async (tx) => {
      const [newProduct] = await tx
        .insert(Product)
        .values({
          name,
          price,
          description,
        })
        .returning();

      const insertedImages = await tx
        .insert(ProductImage)
        .values(
          imageUrls.map((url) => ({
            productId: newProduct.id,
            url,
          }))
        )
        .returning();

      return [newProduct, insertedImages];
    });

    return { product, images };
  },
};
