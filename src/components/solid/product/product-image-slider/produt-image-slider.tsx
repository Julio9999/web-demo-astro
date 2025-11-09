import { createSignal } from "solid-js";

interface ProductImageSliderProps {
  images: string[];
  name: string;
}

export default function ProductImageSlider(props: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = createSignal(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % props.images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? props.images.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div class="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex() * 100}%)`,
        }}
      >
        {props.images.map((image, i) => (
          <div
            class="w-full h-96 flex justify-center items-center bg-gray-100 shrink-0"
            style={{ width: "100%" }}
          >
            <img
              src={image}
              alt={`Imagen ${i + 1} de ${props.name}`}
              class="h-full w-full object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {props.images.length >= 2 && (
        <>
          <button
            onClick={prevSlide}
            class="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow transition"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            class="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow transition"
          >
            ›
          </button>
        </>
      )}

      {props.images.length > 1 && (
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {props.images.map((_, i) => (
            <button
              type="button"
              onClick={() => goToSlide(i)}
              class={`w-3 h-3 rounded-full transition ${
                i === currentIndex()
                  ? "bg-primary scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir a la imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
