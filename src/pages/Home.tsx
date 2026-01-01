import { useState, useRef } from "react";
import { ChevronDown, Star, ChevronLeft, ChevronRight, Leaf, Quote, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { products, testimonials, faqItems } from "../data";
import { getImageSources, palettes } from "../lib";

// --- SmartImage Component ---
interface SmartImageProps {
  sources: string[];
  alt: string;
  className?: string;
  placeholderContent?: React.ReactNode;
}

function SmartImage({ sources, alt, className, placeholderContent }: SmartImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentIndex < sources.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return <div className={className}>{placeholderContent}</div>;
  }

  return (
    <img
      src={sources[currentIndex]}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}

// --- Constants ---
const currentPalette = palettes[0];
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

// --- Page Components ---
function ProductImage({ text = "Продукт", aspectRatio = "3/4", className = "", bgColor }: { text?: string; aspectRatio?: string; className?: string; bgColor: string }) {
  return (
    <div
      className={`rounded-lg overflow-hidden ${className}`}
      style={{ aspectRatio, backgroundColor: bgColor }}
    >
      <SmartImage
        sources={getImageSources('hero-product', 1)}
        alt={text}
        className="w-full h-full object-cover"
        placeholderContent={
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Leaf className="w-10 h-10 text-white/70" />
            <span className="text-white/80 text-sm font-medium">{text}</span>
          </div>
        }
      />
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="pt-8 pb-12 md:pt-10 md:pb-16" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-[85rem] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Quote className="w-10 h-10 mb-6" style={{ color: colors.accent }} />
            <blockquote 
              className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed italic"
              style={{ color: colors.text }}
            >
              "После многих лет боли я наконец нашла облегчение в простом натуральном средстве"
            </blockquote>
            <p className="mb-8" style={{ color: colors.textSecondary }}>
              — Мария, 54 года, Москва
            </p>
            <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: colors.text }}>
              Тысячи историй <span style={{ color: colors.accent }}>исцеления</span>
            </h2>
            <p className="mb-8" style={{ color: colors.textSecondary }}>
              Каждый день we получаем благодарности от людей, которые вернули себе радость движения.
            </p>
            <button
              className="px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105 shadow-md active-elevate-2"
              style={{ backgroundColor: colors.button, color: colors.buttonText }}
              data-testid="button-hero-stories"
            >
              Читать истории
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ProductImage text="Продукт" aspectRatio="3/4" className="shadow-xl rounded-lg" bgColor={colors.accentLight} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  const variants = [
    {
      id: 1,
      name: "Потоковая Регенерация",
      content: (
        <div className="h-full flex flex-col justify-center py-2 space-y-6">
          <div className="space-y-6">
            <h3 className="text-2xl font-light leading-tight" style={{ color: colors.text }}>
              Биорезонансная синергия и клеточный баланс
            </h3>
            <div className="space-y-4 text-sm leading-relaxed opacity-90" style={{ color: colors.textSecondary }}>
              <p>
                Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. 
              </p>
              <p>
                Благодаря уникальному сочетанию природных компонентов и современных технологий, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование помогает не только устранить симптомы, но и воздействует на первопричину дискомфорта.
              </p>
              <p>
                Возвращая вам природную энергию и жизненный тонус, мы создаем условия для естественного долголетия и высокого качества жизни в любом возрасте. Все компоненты подобраны с учетом синергического эффекта.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t" style={{ borderColor: colors.accentLight }}>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40" style={{ color: colors.textSecondary }}>Биодоступность</span>
                <p className="text-xs font-medium" style={{ color: colors.text }}>98% активного усвоения тканями.</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40" style={{ color: colors.textSecondary }}>Метод</span>
                <p className="text-xs font-medium" style={{ color: colors.text }}>Квантовая активация клеток.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const renderSteps = () => {
    return (
      <div className="flex flex-col md:flex-row-reverse items-stretch gap-8 origin-center">
        <div className="w-full md:w-5/12 shrink-0 rounded-lg overflow-hidden" style={{ border: `0.0625rem solid ${colors.accentLight}` }}>
          <div className="aspect-[4/5] h-full">
            <SmartImage
              sources={getImageSources('how-it-works', 1)}
              alt="How it works"
              className="w-full h-full object-cover"
              placeholderContent={
                <div className="w-full h-full flex items-center justify-center bg-slate-50">
                  <Activity className="w-14 h-14 text-slate-300" />
                </div>
              }
            />
          </div>
        </div>
        <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center rounded-lg" style={{ backgroundColor: colors.cardBg, border: `0.0625rem solid ${colors.accentLight}` }}>
          <div className="h-full flex flex-col justify-center py-2 space-y-8">
            <div className="space-y-8">
              <h3 className="text-3xl font-light leading-tight" style={{ color: colors.text }}>
                Биорезонансная синергия и клеточный баланс
              </h3>
              <div className="space-y-6 text-base leading-relaxed opacity-90" style={{ color: colors.textSecondary }}>
                <p>
                  Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. 
                </p>
                <p>
                  Благодаря уникальному сочетанию природных компонентов и современных технологий, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование помогает не только устранить симптомы, но и воздействует на первопричину дискомфорта.
                </p>
                <p>
                  Возвращая вам природную энергию и жизненный тонус, мы создаем условия для естественного долголетия и высокого качества жизни в любом возрасте. Все компоненты подобраны с учетом синергического эффекта.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t" style={{ borderColor: colors.accentLight }}>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-40" style={{ color: colors.textSecondary }}>Биодоступность</span>
                  <p className="text-sm font-medium" style={{ color: colors.text }}>98% активного усвоения тканями.</p>
                </div>
                <div className="space-y-2 text-right">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-40" style={{ color: colors.textSecondary }}>Метод</span>
                  <p className="text-sm font-medium" style={{ color: colors.text }}>Квантовая активация клеток.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <HeroSection />

      {/* How it Works Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-[85rem] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Как это <span style={{ color: colors.accent }}>работает</span>
            </h2>
            <div className="w-[6rem] h-[0.25rem] mx-auto rounded-full" style={{ background: colors.gradient }}></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderSteps()}
          </motion.div>
        </div>
      </section>

      <section id="catalog" className="py-12 md:py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-[115rem] mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Каталог <span style={{ color: colors.accent }}>продуктов</span>
            </h2>
            <div className="w-[6rem] h-[0.25rem] mx-auto rounded-full" style={{ background: colors.gradient }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 max-w-[85rem] mx-auto px-4 md:px-0">
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                className="flex flex-col md:flex-row rounded-lg overflow-hidden card-shadow scale-[0.95] origin-center mb-0 md:mb-0 relative" 
                style={{ backgroundColor: colors.cardBg, border: `0.0625rem solid ${colors.accentLight}`, zIndex: 1 }}
              >
                <div className="w-full md:w-[40%] shrink-0" style={{ backgroundColor: colors.bgAlt }}>
                  <div className="w-full aspect-[3/4] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-[1rem]">
                      <product.icon className="w-full h-full max-w-[4rem] max-h-[4rem]" style={{ color: colors.accent }} />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[60%] p-[1.5rem] md:p-[2rem] flex flex-col justify-center">
                  <div className="flex items-center gap-[1rem] mb-[1rem]">
                    <span className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: colors.accent }}>{product.id}</span>
                    <h3 className="text-[1.5rem] font-bold" style={{ color: colors.text }}>{product.name}</h3>
                  </div>
                  <p className="text-base leading-relaxed mb-[1.5rem]" style={{ color: colors.textSecondary }}>{product.description}</p>
                  <button className="px-[1.5rem] py-[0.75rem] text-base font-medium rounded-lg transition-all hover:scale-105 active-elevate-2" style={{ backgroundColor: colors.button, color: colors.buttonText }}>Подробнее</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-[85rem] mx-auto px-4 md:px-0">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: colors.text }}>Истории наших клиентов</h2>
          <div className="relative group">
            <Swiper 
              ref={swiperRef} 
              modules={[Navigation, Pagination]} 
              spaceBetween={20} 
              slidesPerView={1} 
              loop={true} 
              navigation={{ 
                nextEl: '.swiper-button-next-custom', 
                prevEl: '.swiper-button-prev-custom' 
              }} 
              breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 24 } }} 
              className="px-4"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="rounded-lg p-5 flex flex-col h-80 card-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}>
                    <h3 className="font-bold text-base mb-1" style={{ color: colors.text }}>{testimonial.name}</h3>
                    <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>{testimonial.city}</div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" fill="#FFD700" color="#FFD700" />)}
                    </div>
                    <p className="leading-relaxed text-sm flex-1 overflow-hidden" style={{ color: colors.text }}>"{testimonial.text}"</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <button 
              className="swiper-button-prev-custom absolute left-[-1.25rem] top-1/2 -translate-y-1/2 z-10 w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: colors.cardBg, color: colors.accent, border: `1px solid ${colors.accentLight}` }}
              data-testid="button-testimonials-prev"
            >
              <ChevronLeft className="w-[1.5rem] h-[1.5rem]" />
            </button>
            <button 
              className="swiper-button-next-custom absolute right-[-1.25rem] top-1/2 -translate-y-1/2 z-10 w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: colors.cardBg, color: colors.accent, border: `1px solid ${colors.accentLight}` }}
              data-testid="button-testimonials-next"
            >
              <ChevronRight className="w-[1.5rem] h-[1.5rem]" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: colors.text }}>Вопросы и ответы</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div key={idx} className="rounded-lg overflow-hidden card-shadow" style={{ backgroundColor: colors.cardBg, border: `0.0625rem solid ${colors.accentLight}` }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-[1.25rem] text-left">
                  <span className="font-semibold pr-[1rem]" style={{ color: colors.text }}>{item.q}</span>
                  <ChevronDown className={`w-[1.25rem] h-[1.25rem] flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} style={{ color: colors.accent }} />
                </button>
                {openFaq === idx && (
                  <motion.div className="px-[1.25rem] pb-[1.25rem]" style={{ borderTop: `0.0625rem dashed ${colors.accentLight}` }} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <p className="pt-[1rem]" style={{ color: colors.textSecondary }}>{item.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full border-t border-slate-200/50">
        <div className="w-full py-20 px-6" style={{ backgroundColor: colors.accentDark }}>
          <div className="max-w-5xl mx-auto text-center text-white relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Естество природы в руках человека</h2>
            <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Ваше здоровье - это ваш главный актив, от которого зависит каждый ваш день. Начните заботиться о нем прямо сейчас!
            </p>
            <button className="px-14 py-4 bg-white rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all shadow-xl" 
                    style={{ color: colors.accentDark }}
                    onClick={() => window.location.hash = 'catalog'}>
              Перейти в каталог
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
