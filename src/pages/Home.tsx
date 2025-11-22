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
      <section className="pb-8 md:pb-12 mb-12 md:mb-16 bg-white">
        <div className="w-full flex justify-center">
          <div className="relative w-full px-4 md:px-6" style={{ maxWidth: "calc(100vw - 32px)" }}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-3 md:gap-4">
                {carouselImages.map((image, idx) => (
                  <div
                    key={image.id}
                    className="flex-[0_0_calc(100%-12px)] sm:flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(33.333%-12px)] lg:flex-[0_0_calc(25%-12px)] min-w-0"
                    style={idx === carouselImages.length - 1 ? { marginRight: "12px" } : {}}
                  >
                    <div
                      className="w-full rounded-xl overflow-hidden"
                      style={{ aspectRatio: "3/4", backgroundColor: softGreen[300] }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
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
        <div className="flex justify-center mt-8 md:mt-12 px-4 md:px-6">
          <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed" style={{ maxWidth: "900px", textAlign: "center" }}>
            Надёжное средство для профилактики и лечения начальных этапов заболеваний! А так же рекомендуем к применению в комплексной терапии!
          </p>
        </div>
      </section>

      {/* Блок 2: Тезис и Как это работает */}
      <section className="py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Тезис */}
          <div className="mb-12 md:mb-16">
            <p className="text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-center">
              Пластырь MediPatch создан для тех, кто ищет быстрое и эффективное решение для облегчения боли и ускорения восстановления организма
            </p>
          </div>

          {/* Как это работает */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
              Как это работает?
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
              {/* Картинка слева (сверху на мобильных) - 30% ширины на десктопе */}
              <div className="w-full lg:w-[30%] flex-shrink-0">
                <div
                  className="w-full rounded-xl overflow-hidden"
                  style={{ aspectRatio: "3/4", backgroundColor: softGreen[300] }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-xl md:text-2xl font-semibold">
                    Фото продукта
                  </div>
                </div>
              </div>

              {/* Текст справа (снизу на мобильных) */}
              <div className="w-full lg:flex-1">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3" style={{ color: softGreen[600] }}>
                      Активные компоненты
                    </h3>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      Пластырь содержит уникальную формулу натуральных экстрактов, которые проникают глубоко в ткани и начинают действовать уже через 15-20 минут после нанесения.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3" style={{ color: softGreen[600] }}>
                      Принцип действия
                    </h3>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      Благодаря трансдермальной технологии, активные вещества постепенно высвобождаются и обеспечивают длительный терапевтический эффект в течение 8-12 часов.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3" style={{ color: softGreen[600] }}>
                      Результат применения
                    </h3>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      Снятие болевого синдрома, улучшение микроциркуляции крови, уменьшение воспаления и ускорение процессов регенерации тканей.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
