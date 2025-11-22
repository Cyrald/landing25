import { useState, useCallback, useEffect } from "react";
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

const testimonials = [
  {
    id: 1,
    initials: "МА",
    name: "Мария Александрова",
    city: "Москва",
    text: "Пользуюсь MediPatch Классик уже полгода. Отличное средство при болях в спине после работы. Действует быстро, хватает на весь день. Рекомендую!",
  },
  {
    id: 2,
    initials: "ДС",
    name: "Дмитрий Соколов",
    city: "Санкт-Петербург",
    text: "Занимаюсь спортом профессионально. MediPatch Спорт - настоящее спасение после тренировок. Снимает напряжение и ускоряет восстановление.",
  },
  {
    id: 3,
    initials: "ЕП",
    name: "Елена Петрова",
    city: "Екатеринбург",
    text: "У меня проблемы с суставами. MediPatch Сустав помог уменьшить боль и вернуть подвижность. Пользуюсь курсами, результат отличный!",
  },
  {
    id: 4,
    initials: "АК",
    name: "Андрей Козлов",
    city: "Новосибирск",
    text: "Форте версия действительно мощная! При обострении радикулита использую именно её. Эффект наступает быстро и держится долго.",
  },
  {
    id: 5,
    initials: "ОВ",
    name: "Ольга Васильева",
    city: "Казань",
    text: "MediPatch Релакс - моё открытие! После напряжённого дня клею на плечи, и сразу чувствую расслабление. Приятный аромат - дополнительный бонус.",
  },
  {
    id: 6,
    initials: "ИМ",
    name: "Игорь Михайлов",
    city: "Краснодар",
    text: "Термопластырь просто чудо техники! Тепло держится весь рабочий день. При остеохондрозе незаменимая вещь. Буду брать ещё!",
  },
  {
    id: 7,
    initials: "НК",
    name: "Наталья Кузнецова",
    city: "Воронеж",
    text: "Пользуюсь MediPatch больше года. Качество на высоте, состав натуральный. Помогает при мигренях и головных болях. Очень довольна!",
  },
  {
    id: 8,
    initials: "ВР",
    name: "Виктор Романов",
    city: "Нижний Новгород",
    text: "Работаю водителем, постоянно болит поясница. MediPatch Классик всегда в аптечке. Клею перед рейсом - и весь день без боли. Спасибо!",
  },
  {
    id: 9,
    initials: "ТС",
    name: "Татьяна Смирнова",
    city: "Самара",
    text: "После операции на колене врач посоветовал MediPatch Сустав. Восстановление прошло быстрее, чем ожидала. Рекомендую всем!",
  },
  {
    id: 10,
    initials: "СП",
    name: "Сергей Павлов",
    city: "Уфа",
    text: "Занимаюсь тяжёлой атлетикой. MediPatch Спорт использую после каждой тренировки. Снимает боль в мышцах, ускоряет восстановление. Отлично работает!",
  },
  {
    id: 11,
    initials: "ЛИ",
    name: "Людмила Иванова",
    city: "Челябинск",
    text: "У мужа артрит. Перепробовали много средств, но MediPatch Форте помогает лучше всего. Боль уходит надолго, может спокойно работать.",
  },
  {
    id: 12,
    initials: "АБ",
    name: "Александр Белов",
    city: "Омск",
    text: "MediPatch Термо - просто находка! Греет равномерно и долго. При радикулите снимает боль уже через 20 минут. Всем советую!",
  },
];

// Компонент галереи продукта
function ProductGallery({ productId }: { productId: number }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const images = Array.from({ length: 5 }, (_, i) => ({
    id: `${productId}-${i + 1}`,
    alt: `Продукт ${productId}, фото ${i + 1}`,
  }));

  return (
    <div className="relative bg-white rounded-xl p-[4%] md:p-[5%]">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div key={image.id} className="flex-[0_0_100%] min-w-0 px-2">
              <div
                className="w-full rounded-xl overflow-hidden"
                style={{ aspectRatio: "3/4", backgroundColor: softGreen[200] }}
              >
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg font-semibold">
                  {image.alt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки навигации */}
      <button
        onClick={scrollPrev}
        className="absolute left-8 sm:left-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        aria-label="Предыдущее фото"
        data-testid={`button-prev-${productId}`}
      >
        <ChevronLeft className="w-6 h-6" style={{ color: softGreen[600] }} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-8 sm:right-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        aria-label="Следующее фото"
        data-testid={`button-next-${productId}`}
      >
        <ChevronRight className="w-6 h-6" style={{ color: softGreen[600] }} />
      </button>

      {/* Индикаторы */}
      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: idx === selectedIndex ? softGreen[600] : softGreen[200],
            }}
            aria-label={`Перейти к фото ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Компонент карусели отзывов
function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative">
      <div className="overflow-hidden -mx-4 md:-mx-6" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 px-4 md:px-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="basis-full md:basis-1/2 min-w-0 flex-shrink-0"
            >
              <div className="bg-white border rounded-xl p-6 md:p-8 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0" 
                    style={{ backgroundColor: softGreen[500] }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.city}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ color: softGreen[500] }}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки навигации */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        aria-label="Предыдущий отзыв"
        data-testid="button-testimonials-prev"
      >
        <ChevronLeft className="w-6 h-6" style={{ color: softGreen[600] }} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        aria-label="Следующий отзыв"
        data-testid="button-testimonials-next"
      >
        <ChevronRight className="w-6 h-6" style={{ color: softGreen[600] }} />
      </button>

      {/* Индикаторы */}
      <div className="flex justify-center gap-3 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: idx === selectedIndex ? softGreen[600] : softGreen[200],
            }}
            aria-label={`Перейти к отзыву ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const carouselImages = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    alt: `Пластырь ${i + 1}`,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: softGreen[50] }}>
      {/* Отступ сверху */}
      <div className="h-10 md:h-16"></div>

      {/* Hero - Карусель 3:4 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full px-6 md:px-10 lg:px-16">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-1.5 md:-ml-2">
                {carouselImages.map((image) => (
                  <div
                    key={image.id}
                    className="basis-1/2 md:basis-1/3 min-w-0 flex-shrink-0 pl-1.5 md:pl-2 pr-1.5 md:pr-2"
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
              className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
              aria-label="Предыдущий слайд"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: softGreen[600] }} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
              aria-label="Следующий слайд"
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-6 h-6" style={{ color: softGreen[600] }} />
            </button>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center gap-3 mt-8">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: idx === selectedIndex ? softGreen[600] : softGreen[200],
                }}
                aria-label={`Перейти к слайду ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </section>

      {/* Блок 2: Тезис и Как это работает */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Тезис */}
          <div className="mb-20 md:mb-28">
            <p className="text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-center">
              Пластырь MediPatch создан для тех, кто ищет быстрое и эффективное решение для облегчения боли и ускорения восстановления организма
            </p>
          </div>

          {/* Как это работает */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-16 text-center">
              Как это работает?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
              {/* Картинка слева (сверху на мобильных) - адаптивная */}
              <div className="flex justify-center sm:justify-start w-full max-w-sm sm:max-w-full sm:basis-2/5 lg:basis-1/3 mx-auto sm:mx-0 flex-shrink-0">
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
              <div className="sm:flex-1 min-w-0">
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

      {/* Блок 3: Наша продукция */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-20 text-center">
            Наша продукция
          </h2>

          <div className="space-y-20 md:space-y-28">
            {/* Продукт 1 - Фото слева */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
              {/* Галерея фото */}
              <div className="w-full md:w-5/12 flex-shrink-0">
                <ProductGallery productId={1} />
              </div>
              {/* Текст */}
              <div className="w-full md:flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  MediPatch Классик
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  Универсальный пластырь для снятия боли и воспаления. Идеально подходит для ежедневного применения при мышечных болях, растяжениях и усталости.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Быстрое действие через 15 минут</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Эффект до 12 часов</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>100% натуральные компоненты</span>
                  </li>
                </ul>
                <div className="text-2xl md:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  990 ₽
                </div>
              </div>
            </div>

            {/* Продукт 2 - Фото справа */}
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 md:items-start">
              <div className="w-full md:w-5/12 flex-shrink-0">
                <ProductGallery productId={2} />
              </div>
              <div className="w-full md:flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  MediPatch Форте
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  Усиленная формула для интенсивной терапии. Рекомендуется при сильных болях, артрите и хронических воспалениях.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Двойная концентрация активных веществ</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Глубокое проникновение</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Длительное действие до 24 часов</span>
                  </li>
                </ul>
                <div className="text-2xl md:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  1 490 ₽
                </div>
              </div>
            </div>

            {/* Продукт 3 - Фото слева */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
              <div className="w-full md:w-5/12 flex-shrink-0">
                <ProductGallery productId={3} />
              </div>
              <div className="w-full md:flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  MediPatch Спорт
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  Специально разработан для спортсменов. Помогает при травмах, растяжениях, ускоряет восстановление после тренировок.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Охлаждающий эффект</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Поддержка связок и суставов</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Водостойкий</span>
                  </li>
                </ul>
                <div className="text-2xl md:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  1 290 ₽
                </div>
              </div>
            </div>

            {/* Продукт 4 - Фото справа */}
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 md:items-start">
              <div className="w-full md:w-5/12 flex-shrink-0">
                <ProductGallery productId={4} />
              </div>
              <div className="w-full md:flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  MediPatch Релакс
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  Успокаивающая формула с экстрактами лаванды и ромашки. Снимает напряжение, улучшает кровообращение, расслабляет мышцы.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Ароматерапевтический эффект</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Снятие стресса и напряжения</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Мягкое согревающее действие</span>
                  </li>
                </ul>
                <div className="text-2xl md:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  1 190 ₽
                </div>
              </div>
            </div>

            {/* Продукт 5 - Фото слева */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
              <div className="w-full md:w-5/12 flex-shrink-0">
                <ProductGallery productId={5} />
              </div>
              <div className="w-full md:flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  MediPatch Сустав
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  Целенаправленная терапия для суставов. Содержит хондроитин и глюкозамин для поддержки суставной ткани и хрящей.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Восстановление хрящевой ткани</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Уменьшение отёка</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Улучшение подвижности</span>
                  </li>
                </ul>
                <div className="text-2xl md:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  1 390 ₽
                </div>
              </div>
            </div>

            {/* Продукт 6 - Фото справа */}
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 md:items-start">
              <div className="w-full md:w-5/12 flex-shrink-0">
                <ProductGallery productId={6} />
              </div>
              <div className="w-full md:flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  MediPatch Термо
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                  Инновационный термопластырь с регулируемой температурой. Обеспечивает глубокое прогревание тканей для максимального эффекта.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Термотерапия до 8 часов</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Усиление кровотока</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span style={{ color: softGreen[600] }}>✓</span>
                    <span>Безопасная температура 40-45°C</span>
                  </li>
                </ul>
                <div className="text-2xl md:text-3xl font-bold mb-4" style={{ color: softGreen[600] }}>
                  1 590 ₽
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок 4: Отзывы */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "white" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-20 text-center">
            Отзывы наших клиентов
          </h2>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Блок 5: Призыв к покупке (CTA) */}
      <section className="py-16 md:py-24" style={{ backgroundColor: softGreen[500] }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8">
            Закажите MediPatch сегодня
          </h2>
          <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 md:mb-12 opacity-95">
            Получите быстрое облегчение боли и верните радость движения уже сегодня!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 md:mb-14">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3" style={{ color: softGreen[600] }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-white font-semibold">100% натурально</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3" style={{ color: softGreen[600] }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-white font-semibold">Быстрая доставка</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3" style={{ color: softGreen[600] }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-white font-semibold">Гарантия качества</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl max-w-md mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
              Оставьте заявку
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-2"
                style={{ borderColor: "var(--focus, #6bbc82)" }}
                onFocus={(e) => e.currentTarget.style.setProperty('--focus', softGreen[500])}
                data-testid="input-name"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-2"
                style={{ borderColor: "var(--focus, #6bbc82)" }}
                onFocus={(e) => e.currentTarget.style.setProperty('--focus', softGreen[500])}
                data-testid="input-phone"
              />
              <button
                type="submit"
                className="w-full py-3 md:py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: softGreen[600] }}
                data-testid="button-submit-order"
              >
                Заказать сейчас
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
