import { d as db, P as Product } from '../../chunks/_astro_db_cAh6hLIZ.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = Number(formData.get("price"));
  const image = formData.get("image");
  const description = formData.get("description");
  if (!name || !price || !image) {
    return new Response("Faltan campos obligatorios", { status: 400 });
  }
  await db.insert(Product).values({
    name,
    price,
    image,
    description
  });
  return new Response(null, {
    status: 303,
    headers: { Location: "/" }
    // redirige tras crear
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
