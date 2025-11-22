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
    align: "start",
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const carouselImages = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    alt: `Пластырь ${i + 1}`,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: softGreen[50] }}>
      {/* Отступ сверху */}
      <div className="h-5"></div>

      {/* Hero - Карусель 3:4 */}
      <section className="pb-12 bg-white">
        <div className="w-full flex justify-center">
          <div className="relative w-full px-6" style={{ maxWidth: "calc(100vw - 48px)" }}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {carouselImages.map((image, idx) => (
                  <div
                    key={image.id}
                    className="flex-[0_0_calc(25%-12px)] min-w-0"
                    style={idx === carouselImages.length - 1 ? { marginRight: "16px" } : {}}
                  >
                    <div
                      className="w-full rounded-xl overflow-hidden"
                      style={{ aspectRatio: "3/4", backgroundColor: softGreen[300] }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
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
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="w-5 h-5" style={{ color: softGreen[600] }} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
              aria-label="Следующий слайд"
            >
              <ChevronRight className="w-5 h-5" style={{ color: softGreen[600] }} />
            </button>
          </div>
        </div>

        {/* Текст под каруселью */}
        <div className="flex justify-center mt-12 px-6">
          <p className="text-gray-800" style={{ fontSize: "24px", maxWidth: "900px", textAlign: "center" }}>
            Надёжное средство для профилактики и лечения начальных этапов заболеваний! А так же рекомендуем к применению в комплексной терапии!
          </p>
        </div>
      </section>

    </div>
  );
}
