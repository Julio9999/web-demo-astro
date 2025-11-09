import { createSignal } from "solid-js";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description?: string;
}

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const [index, setIndex] = createSignal(0);

  const next = () => setIndex((i) => (i + 1) % product.images.length);
  const prev = () => setIndex((i) => (i - 1 + product.images.length) % product.images.length);

  let startX = 0;

  const handleTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) prev(); // swipe derecha
    if (startX - endX > 50) next(); // swipe izquierda
  };

  return (
    <div class="bg-white shadow-lg rounded-2xl max-w-3xl w-full overflow-hidden">
      {/* Slider */}
      <div
        class="relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          class="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index() * 100}%)`,
          }}
        >
          {product?.images?.map((img) => (
            <img
              src={img}
              alt={product.name}
              class="w-full h-96 object-cover shrink-0"
              loading="lazy"
            />
          ))}
        </div>

        {/* Controles */}
        <button
          onClick={prev}
          class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition"
        >
          ‹
        </button>
        <button
          onClick={next}
          class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition"
        >
          ›
        </button>
      </div>

      {/* Detalles */}
      <div class="p-6 space-y-3">
        <h1 class="text-2xl font-bold text-gray-900">{product.name}</h1>
        <p class="text-emerald-600 text-xl font-semibold">${product.price}</p>
        {product.description && (
          <p class="text-gray-600 leading-relaxed">{product.description}</p>
        )}
      </div>
    </div>
  );
}
