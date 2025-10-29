import { c as createComponent, b as createAstro, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_C1J1IgZe.mjs';
import { $ as $$Layout, a as $$Footer } from '../chunks/footer_BUM7L9t_.mjs';
import { d as db, P as Product } from '../chunks/_astro_db_cAh6hLIZ.mjs';
import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import { $ as $$Picture } from '../chunks/_astro_assets_DfiliVtW.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const myImage = new Proxy({"src":"/_astro/torta.Dvhx1mo-.jpg","width":5254,"height":6567,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/proyectos/astro/web-demo/src/assets/torta.jpg";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition p-4 flex flex-col"> ${renderComponent($$result, "Picture", $$Picture, { "src": myImage, "formats": ["avif", "webp"], "alt": "A description of my image." })} <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3> ${product.description && renderTemplate`<p class="text-gray-500 text-sm mt-1">${product.description}</p>`} <p class="font-bold text-gray-900 mt-2">$${product.price.toFixed(2)}</p> <button class="mt-3 bg-primary text-white py-2 px-4 rounded-3xl hover:opacity-85 transition cursor-pointer">
Agregar
</button> </div>`;
}, "D:/proyectos/astro/web-demo/src/components/product-card.astro", void 0);

const $$ProductSection = createComponent(async ($$result, $$props, $$slots) => {
  const products = await db.select().from(Product);
  return renderTemplate`${maybeRenderHead()}<section class="py-12 bg-gray-50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <h2 class="text-3xl font-bold text-gray-800 mb-8">Nuestros Productos</h2> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> ${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product, "key": product.id })}`)} </div> </div> </section>`;
}, "D:/proyectos/astro/web-demo/src/components/product-section.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex-1"> ${renderComponent($$result2, "ProductSection", $$ProductSection, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/proyectos/astro/web-demo/src/pages/index.astro", void 0);

const $$file = "D:/proyectos/astro/web-demo/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
