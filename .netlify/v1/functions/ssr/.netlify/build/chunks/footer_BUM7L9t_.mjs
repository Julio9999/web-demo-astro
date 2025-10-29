import { c as createComponent$1, m as maybeRenderHead, r as renderComponent, a as renderTemplate, b as createAstro, g as addAttribute, j as renderHead, k as renderSlot } from './astro/server_C1J1IgZe.mjs';
import { mergeProps, ssrElement, isServer, escape, ssr, ssrHydrationKey, createComponent } from 'solid-js/web';
import { splitProps, createSignal, createMemo, createEffect, onCleanup } from 'solid-js';
import 'clsx';

function IconTemplate(iconSrc, props) {
  const mergedProps = mergeProps(iconSrc.a, props);
  const [_, svgProps] = splitProps(mergedProps, ["src"]);
  const [content, setContent] = createSignal("");
  const rawContent = createMemo(() => props.title ? `${iconSrc.c}<title>${props.title}</title>` : iconSrc.c);
  createEffect(() => setContent(rawContent()));
  onCleanup(() => {
    setContent("");
  });
  return ssrElement("svg", mergeProps({
    get stroke() {
      return iconSrc.a?.stroke;
    },
    get color() {
      return props.color || "currentColor";
    },
    get fill() {
      return props.color || "currentColor";
    },
    "stroke-width": "0",
    get style() {
      return {
        ...props.style,
        overflow: "visible"
      };
    }
  }, svgProps, {
    get height() {
      return props.size || "1em";
    },
    get width() {
      return props.size || "1em";
    },
    xmlns: "http://www.w3.org/2000/svg",
    get innerHTML() {
      return content();
    }
  }), () => isServer && escape(ssr(rawContent())), true);
}

function FiHome(props) {
      return IconTemplate({
        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
        c: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22 9 12 15 12 15 22"/>'
      }, props)
  }
  function FiMenu(props) {
      return IconTemplate({
        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
        c: '<path d="M3 12 21 12"/><path d="M3 6 21 6"/><path d="M3 18 21 18"/>'
      }, props)
  }
  function FiPhone(props) {
      return IconTemplate({
        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
        c: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
      }, props)
  }
  function FiX(props) {
      return IconTemplate({
        a: {"fill":"none","stroke":"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2","viewBox":"0 0 24 24"},
        c: '<path d="M18 6 6 18"/><path d="M6 6 18 18"/>'
      }, props)
  }

var _tmpl$ = ["<button", ' class="md:hidden z-50 text-primary hover:opacity-85 transition cursor-pointer" aria-label="Abrir menú">', "</button>"], _tmpl$2 = ["<div", ' class="', '"></div>'], _tmpl$3 = ["<aside", ' class="', '"><div class="flex items-center justify-between p-4 border-b"><h2 class="text-lg font-semibold text-primary">Menú</h2><button class="text-primary hover:opacity-85 cursor-pointer">', '</button></div><ul class="p-4 space-y-4 text-primary"><a href="#" class="flex items-center gap-3 hover:text-[#6c70b8]"><!--$-->', '<!--/--><span>Acerca de</span></a><a href="#" class="flex items-center gap-3 hover:text-[#6c70b8]"><!--$-->', '<!--/--><span>Menú</span></a><a href="#" class="flex items-center gap-3 hover:text-[#6c70b8]"><!--$-->', '<!--/--><span>Contáctanos</span></a><button class="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-3xl hover:opacity-85 transition cursor-pointer">🛒 Pedir online</button></ul></aside>'];
const SideMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  return [ssr(_tmpl$, ssrHydrationKey(), isOpen() ? escape(createComponent(FiX, {
    size: 28
  })) : escape(createComponent(FiMenu, {
    size: 28
  }))), ssr(_tmpl$2, ssrHydrationKey(), `fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen() ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`), ssr(_tmpl$3, ssrHydrationKey(), `fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen() ? "translate-x-0" : "-translate-x-full"}`, escape(createComponent(FiX, {
    size: 24
  })), escape(createComponent(FiHome, {
    size: 20
  })), escape(createComponent(FiMenu, {
    size: 20
  })), escape(createComponent(FiPhone, {
    size: 20
  })))];
};

const $$Navbar = createComponent$1(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="flex justify-between items-center px-5 py-4 border-b border-[#414581]"> <p class="text-[#414581] font-bold text-lg">Logo</p> <ul class="hidden md:flex gap-10 text-[#414581]"> <li class="cursor-pointer hover:opacity-85">Acerca de</li> <li class="cursor-pointer hover:opacity-85">Menú</li> <li class="cursor-pointer hover:opacity-85">Contáctanos</li> </ul> ${renderComponent($$result, "SideMenu", SideMenu, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/proyectos/astro/web-demo/src/components/side-menu", "client:component-export": "SideMenu" })} </nav>`;
}, "D:/proyectos/astro/web-demo/src/components/navbar.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent$1(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Web demo</title>${renderHead()}</head> <body class="flex flex-col min-h-lvh"> ${renderComponent($$result, "Navbar", $$Navbar, {})} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/proyectos/astro/web-demo/src/layouts/Layout.astro", void 0);

const $$Footer = createComponent$1(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="align-bottom border-primary border flex items-center justify-center"> <section> <article class="text-center"> <span>Dirección</span> <p>Av. Fray Antonio Alcalde 10, 44100 Guadalajara, Jal., México</p> </article> <article class="text-center"> <span>Contacto</span> <p>Info@misitio.com +52-1-33-12345678</p> </article> <article class="text-center"> <span>Horarios</span> <div class="flex flex-col"> <span> Dom - Jue: 10:00 - 22:00 </span> <span> Vie - Sáb: 10:00 - 35:00 </span> </div> </article> <article> <ul class="flex items-center justify-center flex-col"> <li>Instagram</li> <li>Facebook</li> <li>TikTok</li> </ul> </article> </section> </footer>`;
}, "D:/proyectos/astro/web-demo/src/components/footer.astro", void 0);

export { $$Layout as $, $$Footer as a };
