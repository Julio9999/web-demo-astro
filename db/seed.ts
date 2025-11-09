import { db, Comment, Author, Product, ProductImage } from 'astro:db';

export default async function() {
  await db.insert(Author).values([
    { id: 1, name: "Kasim" },
    { id: 2, name: "Mina" },
	{id: 3, name: "Julio"}
  ]);

  await db.insert(Comment).values([
    { authorId: 1, body: 'Hope you like Astro DB!' },
    { authorId: 2, body: 'Enjoy!'},
  ])

  await db.insert(Product).values([
    {id: 1 ,name: "Producto 1", price: 2500, description: "Descripcion del producto 1"},
    {id: 2 ,name: "Producto 2", price: 2500, description: "Descripcion del producto 2"},
    {id: 3 ,name: "Producto 3", price: 2500, description: "Descripcion del producto 3"},
  ])

  await db.insert(ProductImage).values([
    {id: 1, productId: 1, url: "https://ik.imagekit.io/yjgkpb07n/uploads/HB7xXoDRbqh3m7rV4xXo_iStock-472209533_tWjHQTHzv.jpeg?tr=f-avif,q-80,w-800"},
    {id: 4, productId: 1, url: "https://ik.imagekit.io/yjgkpb07n/uploads/5MnBLjKTAiuVGUjgUucA_Moving-to-Ottawa-1150_6ufCOglOQ.jpg?updatedAt=1762381361055?tr=f-avif,q-80,w-800"},
    {id: 2, productId: 2, url: "https://ik.imagekit.io/yjgkpb07n/uploads/HB7xXoDRbqh3m7rV4xXo_iStock-472209533_tWjHQTHzv.jpeg?tr=f-avif,q-80,w-800"},
    {id: 3, productId: 3, url: "https://ik.imagekit.io/yjgkpb07n/uploads/HB7xXoDRbqh3m7rV4xXo_iStock-472209533_tWjHQTHzv.jpeg?tr=f-avif,q-80,w-800"},
  ])
  
}