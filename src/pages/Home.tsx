import { useState, useRef } from "react";
import { ChevronDown, ExternalLink, Star, Shield, CircleDot, Droplets, Activity, Glasses, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import HeroVariants from "../components/HeroVariants";
import { usePalette } from "../context/PaletteContext";

const products = [
  {
    id: 1,
    name: "Пластырь",
    shortName: "Пластырь",
    description: "Точечное воздействие на проблемные зоны. Активные компоненты проникают глубоко в ткани.",
    benefits: ["Глубокое проникновение", "До 12 часов действия", "Удобное применение"],
    icon: CircleDot,
  },
  {
    id: 2,
    name: "Очиститель воды",
    shortName: "Вода",
    description: "Структурирует и очищает воду, насыщая минералами. Улучшает вкус и биодоступность.",
    benefits: ["Природная минерализация", "Улучшение вкуса воды", "Польза для организма"],
    icon: Droplets,
  },
  {
    id: 3,
    name: "Очелье",
    shortName: "Очелье",
    description: "Снимает напряжение и головную боль. Улучшает кровообращение и расслабляет.",
    benefits: ["Снятие головной боли", "Расслабление", "Улучшение сна"],
    icon: Activity,
  },
  {
    id: 4,
    name: "Наочники",
    shortName: "Наочники", 
    description: "Снимают усталость глаз и отёчность. Освежают взгляд после работы за компьютером.",
    benefits: ["Снятие усталости глаз", "Уменьшение отёков", "Освежающий эффект"],
    icon: Glasses,
  },
  {
    id: 5,
    name: "Кушак",
    shortName: "Кушак",
    description: "Поддержка поясницы и мягкое тепло. Оздоравливает внутренние органы и поясницу.",
    benefits: ["Поддержка поясницы", "Мягкое прогревание", "Комфорт в движении"],
    icon: Shield,
  },
  {
    id: 6,
    name: "Тесьма",
    shortName: "Тесьма",
    description: "Универсальное средство. Легко фиксируется на суставах или дополняет другие продукты.",
    benefits: ["Универсальность", "Легкость и прочность", "Природная фиксация"],
    icon: Activity,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Мария К.",
    city: "Москва",
    text: "Пользуюсь пластырями уже три месяца. Забыла о болях в спине после долгого рабочего дня. Натуральный состав — это именно то, что я искала. Рекомендую всем своим друзьям и коллегам.",
  },
  {
    id: 2,
    name: "Андрей С.",
    city: "Санкт-Петербург", 
    text: "Очелье стало моим спасением от мигреней. Надеваю при первых признаках — и боль отступает. Рекомендую всем, кто страдает головными болями.",
  },
  {
    id: 3,
    name: "Елена В.",
    city: "Казань",
    text: "Наочники — находка для тех, кто много работает за компьютером. Глаза отдыхают, отёки уходят. Использую каждый вечер и очень довольна результатом.",
  },
  {
    id: 4,
    name: "Дмитрий П.",
    city: "Новосибирск",
    text: "Кушак помог с хронической болью в пояснице. Ношу на работе под одеждой — никто не замечает, а эффект ощутимый.",
  },
  {
    id: 5,
    name: "Светлана М.",
    city: "Екатеринбург",
    text: "Очиститель воды заметно улучшил качество воды из крана. Вода стала вкуснее, а организм получает только пользу. Спасибо за прекрасный продукт!",
  },
  {
    id: 6,
    name: "Петр В.",
    city: "Минск",
    text: "Комбинирую несколько продуктов из каталога. Натуральные ингредиенты не раздражают кожу, эффект заметен уже через несколько дней применения.",
  },
];

const faqItems = [
  {
    q: "Из чего сделаны ваши продукты?",
    a: "Все наши изделия созданы на основе натуральных компонентов: целебных трав, минералов и природных экстрактов. Мы не используем синтетические добавки.",
  },
  {
    q: "Как быстро наступает эффект?",
    a: "Первые ощущения появляются уже через 15-20 минут применения. Для достижения стойкого результата рекомендуем курсовое использование.",
  },
  {
    q: "Можно ли использовать при чувствительной коже?",
    a: "Да, наши продукты гипоаллергенны и подходят для чувствительной кожи. При индивидуальной непереносимости рекомендуем проконсультироваться с врачом.",
  },
  {
    q: "Как долго длится эффект одного применения?",
    a: "В зависимости от продукта, эффект сохраняется от 6 до 12 часов. Подробные рекомендации указаны в инструкции к каждому изделию.",
  },
  {
    q: "Где можно приобрести вашу продукцию?",
    a: "Полный каталог с ценами и возможностью заказа доступен на нашем основном сайте. Там же вы найдёте актуальные акции и специальные предложения.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Природные компоненты",
    desc: "Активные вещества из целебных растений и минералов начинают работать сразу при контакте с телом.",
  },
  {
    step: 2,
    title: "Постепенное высвобождение",
    desc: "Компоненты медленно проникают в ткани, обеспечивая длительное и равномерное воздействие.",
  },
  {
    step: 3,
    title: "Целебный эффект",
    desc: "Улучшение кровообращения, снятие напряжения и восстановление естественного баланса организма.",
  },
];

export default function DesignVariants() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<any>(null);
  const { currentPalette } = usePalette();
  
  const colors = {
    bg: currentPalette.colors.bg,
    bgAlt: currentPalette.colors.bgAlt,
    accent: currentPalette.colors.accent,
    accentLight: currentPalette.colors.accentLight,
    accentDark: currentPalette.colors.accentDark,
    text: currentPalette.colors.text,
    textSecondary: currentPalette.colors.textSecondary,
    cardBg: currentPalette.colors.card,
    catalogBg: currentPalette.colors.bgAlt,
    button: currentPalette.colors.button,
    buttonText: currentPalette.colors.buttonText,
    gradient: `linear-gradient(135deg, ${currentPalette.colors.accent} 0%, ${currentPalette.colors.accentDark} 50%, ${currentPalette.colors.text} 100%)`,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Hero Section */}
      <HeroVariants />

      {/* How It Works */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2 
            className="text-2xl md:text-4xl font-bold text-center mb-12"
            style={{ color: colors.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Как это работает
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              {howItWorks.map((item, idx) => (
                <motion.div 
                  key={item.step} 
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-xl md:text-2xl font-bold"
                    style={{ backgroundColor: colors.accent, color: "#fff" }}
                  >
                    {item.step}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold mb-1 text-base md:text-lg" style={{ color: colors.text }}>{item.title}</h3>
                    <p className="text-sm md:text-base" style={{ color: colors.textSecondary }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="w-full aspect-[3/4] rounded-xl flex items-center justify-center backdrop-blur-sm order-first md:order-last scale-95"
              style={{ backgroundColor: `${colors.cardBg}ee` }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span style={{ color: colors.accent }}>Иллюстрация 3:4</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.catalogBg }} data-testid="section-products">
        <div className="max-w-7xl xl:max-w-[90rem] mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-2"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Каталог продуктов
            </motion.h2>
            <div className="w-24 h-0.5 mx-auto" style={{ backgroundColor: colors.accent }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                className="flex flex-row rounded-xl overflow-hidden"
                style={{ backgroundColor: colors.bg, border: `1px solid ${colors.accentLight}` }}
                data-testid={`card-product-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div 
                  className="w-[40%] aspect-[3/4] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.bgAlt }}
                  data-testid={`img-product-${product.id}`}
                >
                  <div className="text-center p-6">
                    <product.icon className="w-16 h-16 mx-auto mb-3" style={{ color: colors.accent }} />
                    <span className="text-base" style={{ color: colors.accent }}>Фото {product.name}</span>
                  </div>
                </div>
                <div className="w-[60%] p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold"
                      style={{ backgroundColor: colors.accent }}
                    >
                      {product.id}
                    </span>
                    <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{product.name}</h3>
                  </div>
                  <p className="text-base leading-relaxed mb-6" style={{ color: colors.textSecondary }}>
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="px-6 py-3 text-base font-medium rounded-lg transition-all hover:scale-105"
                      style={{ backgroundColor: colors.button, color: colors.buttonText }}
                      data-testid={`button-order-${product.id}`}
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2 
            className="text-2xl md:text-4xl font-bold text-center mb-12"
            style={{ color: colors.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Истории наших клиентов
          </motion.h2>
          
          <div style={{ position: 'relative' }}>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
              className="pb-6"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div
                    className="rounded-2xl p-5 flex flex-col h-80"
                    style={{
                      backgroundColor: colors.cardBg,
                      border: `1px solid ${colors.accentLight}`,
                    }}
                    data-testid={`card-testimonial-${testimonial.id}`}
                  >
                    {/* Name */}
                    <h3 
                      className="font-bold text-base mb-1"
                      style={{ color: colors.text }}
                      data-testid={`text-name-${testimonial.id}`}
                    >
                      {testimonial.name}
                    </h3>

                    {/* City */}
                    <div
                      className="text-sm mb-2"
                      style={{ color: colors.textSecondary }}
                      data-testid={`text-city-${testimonial.id}`}
                    >
                      {testimonial.city}
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-3" data-testid={`stars-${testimonial.id}`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill="#FFD700"
                          color="#FFD700"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p
                      className="leading-relaxed text-sm flex-1 overflow-hidden"
                      style={{ color: colors.text }}
                      data-testid={`text-review-${testimonial.id}`}
                    >
                      "{testimonial.text}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons - Hidden on Mobile */}
            <button
              className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 lg:-translate-x-24 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10 hidden md:flex"
              style={{
                backgroundColor: `${colors.accent}20`,
                color: colors.accent,
                border: `1px solid ${colors.accent}40`,
              }}
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 lg:translate-x-24 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10 hidden md:flex"
              style={{
                backgroundColor: `${colors.accent}20`,
                color: colors.accent,
                border: `1px solid ${colors.accent}40`,
              }}
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Indicators - Only on mobile (1 slide visible) */}
            <div className="flex items-center justify-center gap-2 mt-6 md:hidden" data-testid="pagination-indicators">
              {[...Array(testimonials.length)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full transition-all cursor-pointer"
                  style={{
                    backgroundColor: currentSlide === idx ? colors.accent : `${colors.accent}40`,
                  }}
                  onClick={() => {
                    if (swiperRef.current?.swiper) {
                      swiperRef.current.swiper.slideTo(idx);
                    }
                  }}
                  data-testid={`pagination-dot-${idx}`}
                />
              ))}
            </div>
            <div className="text-center mt-3 text-sm md:hidden" style={{ color: colors.textSecondary }} data-testid="pagination-text">
              {currentSlide + 1} из {testimonials.length}
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-4xl xl:max-w-5xl mx-auto px-6 lg:px-8">
          <motion.h2 
            className="text-2xl md:text-4xl font-bold text-center mb-12"
            style={{ color: colors.text }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Вопросы и ответы
          </motion.h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div 
                key={idx}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  data-testid={`button-faq-${idx}`}
                >
                  <span className="font-semibold pr-4" style={{ color: colors.text }}>{item.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    style={{ color: colors.accent }}
                  />
                </button>
                {openFaq === idx && (
                  <motion.div 
                    className="px-5 pb-5"
                    style={{ borderTop: `1px dashed ${colors.accentLight}` }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <p className="pt-4" style={{ color: colors.textSecondary }}>{item.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: colors.gradient }}>
        <div className="max-w-4xl xl:max-w-5xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Добро пожаловать в мир здоровья
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Откройте для себя полный ассортимент продукции на нашем сайте.
            </p>
            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "#fff", color: colors.accent }}
              data-testid="button-go-to-site"
            >
              Перейти в каталог
              <ExternalLink className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
