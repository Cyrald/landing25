import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const softGreen = {
  50: "#f0f7f3",
  100: "#dff1e3",
  200: "#b7e0c2",
  300: "#8fcf9f",
  400: "#6bbc82",
  500: "#5fa97a",
  600: "#4d8e64",
};

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const carouselImages = [
    { id: 1, alt: "Пластырь 1" },
    { id: 2, alt: "Пластырь 2" },
    { id: 3, alt: "Пластырь 3" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: softGreen[50] }}>
      {/* Header - компактный */}
      <header className="py-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: softGreen[600] }}>
            Лечебный пластырь
          </h1>
          <a
            href="https://наш.магазин"
            className="px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: softGreen[500] }}
          >
            Заказать
          </a>
        </div>
      </header>

      {/* Hero - Карусель 3:4 */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {carouselImages.map((image) => (
                  <div key={image.id} className="flex-[0_0_100%] min-w-0 px-2">
                    <div
                      className="relative w-full rounded-2xl overflow-hidden"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center text-white text-4xl font-bold"
                        style={{ backgroundColor: softGreen[300] }}
                      >
                        {image.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки навигации */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: softGreen[600] }} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Следующий слайд"
            >
              <ChevronRight className="w-6 h-6" style={{ color: softGreen[600] }} />
            </button>
          </div>

          {/* Заголовок под каруселью */}
          <div className="text-center mt-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Гармония природы и науки
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Откройте для себя целительную силу природы в современной форме.
              Лечебный пластырь для вашего благополучия.
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder для остальных секций */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500">
            Здесь будут остальные блоки лендинга - опишите их и я добавлю
          </p>
        </div>
      </section>
    </div>
  );
}
