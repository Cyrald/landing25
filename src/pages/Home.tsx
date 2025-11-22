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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const carouselImages = [
    { id: 1, alt: "Пластырь 1" },
    { id: 2, alt: "Пластырь 2" },
    { id: 3, alt: "Пластырь 3" },
    { id: 4, alt: "Пластырь 4" },
    { id: 5, alt: "Пластырь 5" },
    { id: 6, alt: "Пластырь 6" },
    { id: 7, alt: "Пластырь 7" },
    { id: 8, alt: "Пластырь 8" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: softGreen[50] }}>
      {/* Header - компактный */}
      <header className="py-3 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <div className="flex items-center justify-between w-full max-w-4xl">
            <h1 className="text-xl font-bold" style={{ color: softGreen[600] }}>
              Лечебный пластырь
            </h1>
            <a
              href="https://наш.магазин"
              className="px-5 py-2 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: softGreen[500] }}
            >
              Заказать
            </a>
          </div>
        </div>
      </header>

      {/* Hero - Карусель 3:4 */}
      <section className="py-12 bg-white">
        <div className="w-full flex justify-center px-6">
          <div className="relative w-full max-w-5xl">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {carouselImages.map((image) => (
                  <div key={image.id} className="flex-[0_0_calc(25%-12px)] min-w-0">
                    <div
                      className="relative w-full rounded-xl overflow-hidden"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: softGreen[600] }} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              aria-label="Следующий слайд"
            >
              <ChevronRight className="w-5 h-5" style={{ color: softGreen[600] }} />
            </button>
          </div>
        </div>

        {/* Заголовок под каруселью */}
        <div className="text-center mt-8 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Гармония природы и науки
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Откройте для себя целительную силу природы в современной форме.
            Лечебный пластырь для вашего благополучия.
          </p>
        </div>
      </section>

    </div>
  );
}
