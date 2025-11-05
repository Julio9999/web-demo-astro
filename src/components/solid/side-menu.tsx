import { createSignal } from "solid-js";
import { FiMenu, FiX, FiHome, FiPhone } from "solid-icons/fi"; 

export const SideMenu = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggleMenu = () => setIsOpen(!isOpen());
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        class="md:hidden z-50 text-primary hover:opacity-85 transition cursor-pointer"
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        {isOpen() ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Fondo oscuro */}
      <div
        class={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen() ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Menú lateral */}
      <aside
        class={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen() ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-semibold text-primary">Menú</h2>
          <button onClick={closeMenu} class="text-primary hover:opacity-85 cursor-pointer">
            <FiX size={24} />
          </button> 
        </div>

        <ul class="p-4 space-y-4 text-primary">
          <a href="#" class="flex items-center gap-3 hover:text-[#6c70b8]" onClick={closeMenu}>
            <FiHome size={20} />
            <span>Acerca de</span>
          </a>
          <a href="#" class="flex items-center gap-3 hover:text-[#6c70b8]" onClick={closeMenu}>
            <FiMenu size={20} />
            <span>Menú</span>
          </a>
          <a href="#" class="flex items-center gap-3 hover:text-[#6c70b8]" onClick={closeMenu}>
            <FiPhone size={20} />
            <span>Contáctanos</span>
          </a>
          <button
            class="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-3xl hover:opacity-85 transition cursor-pointer"
            onClick={closeMenu}
          >
            🛒 Pedir online
          </button>
        </ul> 
      </aside>
    </>
  );
};
