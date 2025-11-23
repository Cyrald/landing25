import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImages, getImageSources } from "../utils/imageLoader";
import { SmartImage } from "../components/SmartImage";
import { motion, AnimatePresence } from "framer-motion";

const softGreen = {
  50: "#f0f7f3",
  100: "#dff1e3",
  200: "#b7e0c2",
  300: "#8fcf9f",
  400: "#6bbc82",
  500: "#5fa97a",
  600: "#4d8e64",
};

const products = [
  {
    id: 1,
    name: "MediPatch Классик",
    description: "Универсальный пластырь для снятия боли и воспаления. Идеально подходит для ежедневного применения при мышечных болях, растяжениях и усталости.",
    features: [
      "Быстрое действие через 15 минут",
      "Эффект до 12 часов",
      "100% натуральные компоненты"
    ],
    price: "990 ₽"
  },
  {
    id: 2,
    name: "MediPatch Форте",
    description: "Усиленная формула для интенсивной терапии. Рекомендуется при сильных болях, артрите и хронических воспалениях.",
    features: [
      "Двойная концентрация активных веществ",
      "Глубокое проникновение",
      "Длительное действие до 24 часов"
    ],
    price: "1 490 ₽"
  },
  {
    id: 3,
    name: "MediPatch Спорт",
    description: "Специально разработан для спортсменов. Помогает при травмах, растяжениях, ускоряет восстановление после тренировок.",
    features: [
      "Охлаждающий эффект",
      "Поддержка связок и суставов",
      "Водостойкий"
    ],
    price: "1 290 ₽"
  },
  {
    id: 4,
    name: "MediPatch Релакс",
    description: "Успокаивающая формула с экстрактами лаванды и ромашки. Снимает напряжение, улучшает кровообращение, расслабляет мышцы.",
    features: [
      "Ароматерапевтический эффект",
      "Снятие стресса и напряжения",
      "Мягкое согревающее действие"
    ],
    price: "1 190 ₽"
  },
  {
    id: 5,
    name: "MediPatch Сустав",
    description: "Целенаправленная терапия для суставов. Содержит хондроитин и глюкозамин для поддержки суставной ткани и хрящей.",
    features: [
      "Восстановление хрящевой ткани",
      "Уменьшение отёка",
      "Улучшение подвижности"
    ],
    price: "1 390 ₽"
  },
  {
    id: 6,
    name: "MediPatch Термо",
    description: "Инновационный термопластырь с регулируемой температурой. Обеспечивает глубокое прогревание тканей для максимального эффекта.",
    features: [
      "Термотерапия до 8 часов",
      "Усиление кровотока",
      "Безопасная температура 40-45°C"
    ],
    price: "1 590 ₽"
  }
];

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

// Компонент карусели продуктов
function ProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const currentProduct = products[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const goToProduct = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const imageSources = getImageSources(`products/product-${currentProduct.id}`, 1);

  return (
    <div className="relative">
      <div className="flex flex-row gap-4 md:gap-10 items-start">
        {/* Фото слева */}
        <div className="flex justify-center sm:justify-start w-full max-w-sm sm:max-w-full sm:basis-[39%] lg:basis-[33%] mx-auto sm:mx-0 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div
                className="w-full rounded-xl overflow-hidden"
                style={{ aspectRatio: "3/4", backgroundColor: softGreen[200] }}
              >
                <SmartImage
                  sources={imageSources}
                  alt={`${currentProduct.name}`}
                  className="w-full h-full object-cover"
                  placeholderContent={
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg font-semibold">
                      {currentProduct.name}
                    </div>
                  }
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Текст справа */}
        <div className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 leading-tight" style={{ color: softGreen[600] }}>
                {currentProduct.name}
              </h3>
              <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-2 md:mb-4 hidden md:block">
                {currentProduct.description}
              </p>
              <ul className="space-y-1 md:space-y-2 mb-3 md:mb-6">
                {currentProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1 md:gap-2 text-gray-700 text-sm md:text-base">
                    <span className="flex-shrink-0" style={{ color: softGreen[600] }}>✓</span>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-base md:text-3xl font-bold mb-2 md:mb-4" style={{ color: softGreen[600] }}>
                {currentProduct.price}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Стрелки навигации */}
      <motion.button
        onClick={goToPrevious}
        className="absolute left-0 md:left-4 top-[20%] md:top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
        aria-label="Предыдущий продукт"
        data-testid="button-products-prev"
        animate={showHint ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={showHint ? { repeat: Infinity, duration: 1.5 } : {}}
      >
        <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" style={{ color: softGreen[600] }} />
      </motion.button>
      
      <motion.button
        onClick={goToNext}
        className="absolute right-0 md:right-4 top-[20%] md:top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
        aria-label="Следующий продукт"
        data-testid="button-products-next"
        animate={showHint ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={showHint ? { repeat: Infinity, duration: 1.5, delay: 0.3 } : {}}
      >
        <ChevronRight className="w-7 h-7 md:w-8 md:h-8" style={{ color: softGreen[600] }} />
      </motion.button>

      {/* Подсказка */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-white px-4 py-2 rounded-lg shadow-md z-30 hidden md:block"
        >
          <p className="text-sm font-medium whitespace-nowrap" style={{ color: softGreen[600] }}>
            Листайте товары ←→
          </p>
        </motion.div>
      )}

      {/* Индикаторы и счётчик */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex justify-center gap-3">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToProduct(idx)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: idx === currentIndex ? softGreen[600] : softGreen[200],
              }}
              aria-label={`Перейти к продукту ${idx + 1}`}
              data-testid={`indicator-product-${idx}`}
            />
          ))}
        </div>
        <div className="text-sm font-semibold" style={{ color: softGreen[600] }}>
          {currentIndex + 1} из {products.length}
        </div>
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
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg hidden md:flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        aria-label="Предыдущий отзыв"
        data-testid="button-testimonials-prev"
      >
        <ChevronLeft className="w-6 h-6" style={{ color: softGreen[600] }} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg hidden md:flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
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

  const carouselImages = getImages('carousel', 6);

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
                      <SmartImage
                        sources={image.sources}
                        alt={`Пластырь ${image.id}`}
                        className="w-full h-full object-cover"
                        placeholderContent={
                          <div className="w-full h-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                            {image.id}
                          </div>
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки навигации */}
            <button
              onClick={scrollPrev}
              className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg hidden md:flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
              aria-label="Предыдущий слайд"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: softGreen[600] }} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg hidden md:flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
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
            
            <div className="flex flex-row gap-4 md:gap-6 lg:gap-8">
              {/* Картинка слева - всегда слева */}
              <div className="flex justify-start w-full max-w-sm sm:max-w-full sm:basis-[39%] lg:basis-[33%] flex-shrink-0">
                <div
                  className="w-full rounded-xl overflow-hidden"
                  style={{ aspectRatio: "3/4", backgroundColor: softGreen[300] }}
                >
                  <SmartImage
                    sources={getImageSources('how-it-works', 1)}
                    alt="Фото продукта - как это работает"
                    className="w-full h-full object-cover"
                    placeholderContent={
                      <div className="w-full h-full flex items-center justify-center text-white text-sm sm:text-lg md:text-xl font-semibold">
                        Фото продукта
                      </div>
                    }
                  />
                </div>
              </div>

              {/* Текст справа - всегда справа */}
              <div className="flex-1 min-w-0">
                <div className="space-y-3 md:space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-2" style={{ color: softGreen[600] }}>
                      Активные компоненты
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                      Пластырь содержит уникальную формулу натуральных экстрактов, которые проникают глубоко в ткани и начинают действовать уже через 15-20 минут после нанесения.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-2" style={{ color: softGreen[600] }}>
                      Принцип действия
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                      Благодаря трансдермальной технологии, активные вещества постепенно высвобождаются и обеспечивают длительный терапевтический эффект в течение 8-12 часов.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-2" style={{ color: softGreen[600] }}>
                      Результат применения
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
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

          <ProductsCarousel />
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
