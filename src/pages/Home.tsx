import { useState, useRef } from "react";
import { ChevronDown, ExternalLink, Star, ChevronLeft, ChevronRight, Leaf, Quote, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
function ProductImage({ text = "Продукт", aspectRatio = "1/1", className = "", bgColor }: { text?: string; aspectRatio?: string; className?: string; bgColor: string }) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
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
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
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
              Каждый день мы получаем благодарности от людей, которые вернули себе радость движения.
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
            <ProductImage text="Продукт" aspectRatio="4/5" className="shadow-xl rounded-2xl" bgColor={colors.accentLight} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- How It Works Typography Variants (Strict Layout: Text Left, Photo Right) ---
const howItWorksVariants = [
  {
    id: 1,
    name: "Гармония природы",
    textClass: "space-y-6",
    pClass: "text-xl font-light leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-none",
    accent: "border-l-2 pl-8 border-accent/30",
    pStyle: { color: colors.textSecondary }
  },
  {
    id: 2,
    name: "Дзен-баланс",
    textClass: "space-y-4",
    pClass: "text-lg italic font-medium leading-loose text-center md:text-left",
    accent: "bg-accent-light/5 p-10 rounded-[4rem] border border-white/40",
    pStyle: { color: colors.accentDark }
  },
  {
    id: 3,
    name: "Чистое прикосновение",
    textClass: "space-y-4",
    pClass: "text-xl tracking-tight font-medium leading-snug",
    accent: "relative before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-transparent",
    pStyle: { color: colors.text }
  },
  {
    id: 4,
    name: "Органический поток",
    textClass: "space-y-4",
    pClass: "text-lg font-light leading-relaxed",
    accent: "p-8 border-2 border-dashed rounded-3xl",
    pStyle: { color: colors.textSecondary, borderColor: colors.accentLight }
  },
  {
    id: 5,
    name: "Мудрость веков",
    textClass: "space-y-4",
    pClass: "text-xl font-serif italic leading-relaxed",
    accent: "drop-shadow-sm",
    pStyle: { color: colors.text }
  },
  {
    id: 6,
    name: "Эфирный свет",
    textClass: "space-y-2",
    pClass: "text-lg tracking-widest font-light uppercase opacity-80",
    accent: "border-b-2 pb-10",
    pStyle: { color: colors.accentDark, borderBottomColor: colors.accentLight }
  },
  {
    id: 7,
    name: "Сила земли",
    textClass: "space-y-4",
    pClass: "text-lg font-bold leading-relaxed",
    accent: "bg-accent-light/10 p-8 rounded-tr-[3rem] rounded-bl-[3rem] shadow-inner",
    pStyle: { color: colors.accentDark }
  },
  {
    id: 8,
    name: "Журнальный фокус",
    textClass: "space-y-6",
    pClass: "text-xl font-medium leading-relaxed underline decoration-accent/20 decoration-8 underline-offset-[-2px] decoration-skip-ink-none",
    accent: "",
    pStyle: { color: colors.text }
  },
  {
    id: 9,
    name: "Утренняя роса",
    textClass: "space-y-4",
    pClass: "text-lg leading-relaxed font-light",
    accent: "backdrop-blur-sm bg-white/40 p-8 rounded-2xl shadow-sm border border-white/60",
    pStyle: { color: colors.textSecondary }
  },
  {
    id: 10,
    name: "Глубокое дыхание",
    textClass: "space-y-4",
    pClass: "text-2xl font-bold tracking-tighter leading-none uppercase",
    accent: "opacity-70 hover:opacity-100 transition-opacity duration-700",
    pStyle: { color: colors.accent }
  },
  {
    id: 11,
    name: "Природный кристалл",
    textClass: "space-y-4",
    pClass: "text-lg font-medium leading-relaxed",
    accent: "border-2 p-8 rounded-lg shadow-[4px_4px_0px_0px_rgba(61,107,79,0.1)]",
    pStyle: { color: colors.text, borderColor: colors.accentLight }
  },
  {
    id: 12,
    name: "Лесной туман",
    textClass: "space-y-4",
    pClass: "text-xl font-light italic leading-loose",
    accent: "bg-gradient-to-r from-accent-light/10 to-transparent p-10",
    pStyle: { color: colors.textSecondary }
  },
  {
    id: 13,
    name: "Золотое сечение",
    textClass: "space-y-4",
    pClass: "text-lg leading-relaxed",
    accent: "border-r-4 pr-10 text-right",
    pStyle: { color: colors.text, borderRightColor: colors.accent }
  },
  {
    id: 14,
    name: "Шепот листьев",
    textClass: "space-y-4",
    pClass: "text-lg font-medium leading-relaxed",
    accent: "selection:bg-accent selection:text-white px-4",
    pStyle: { color: colors.textSecondary }
  },
  {
    id: 15,
    name: "Минимал-шик",
    textClass: "space-y-2",
    pClass: "text-3xl font-light tracking-tight leading-tight",
    accent: "py-8 border-y border-accent-light/20",
    pStyle: { color: colors.accentDark }
  },
  {
    id: 16,
    name: "Экологичный лофт",
    textClass: "space-y-4",
    pClass: "text-lg font-mono leading-relaxed",
    accent: "bg-slate-50 p-8 rounded shadow-sm",
    pStyle: { color: colors.textSecondary }
  },
  {
    id: 17,
    name: "Атмосфера покоя",
    textClass: "space-y-4",
    pClass: "text-xl font-light leading-relaxed",
    accent: "relative after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-accent",
    pStyle: { color: colors.text }
  },
  {
    id: 18,
    name: "Эстетика велнеса",
    textClass: "space-y-6",
    pClass: "text-lg font-medium leading-relaxed first-line:text-accent first-line:font-bold",
    accent: "p-8 bg-white/80 rounded-3xl card-shadow",
    pStyle: { color: colors.textSecondary }
  },
  {
    id: 19,
    name: "Природный контраст",
    textClass: "space-y-4",
    pClass: "text-xl font-bold italic leading-relaxed",
    accent: "text-accent/80 hover:text-accent transition-colors duration-500",
    pStyle: {}
  },
  {
    id: 20,
    name: "Гармония Сфер",
    textClass: "space-y-4",
    pClass: "text-lg font-medium leading-relaxed text-center",
    accent: "flex flex-col items-center justify-center p-12 bg-accent/5 rounded-full border-2 border-white aspect-square",
    pStyle: { color: colors.accentDark }
  }
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const swiperRef = useRef<any>(null);

  const v = howItWorksVariants[variantIndex];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <HeroSection />

      {/* Панель выбора */}
      <div className="fixed bottom-4 left-4 z-[100]">
        <motion.div 
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border p-4 w-64"
          animate={{ height: isPanelOpen ? "auto" : "56px" }}
        >
          <button 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="flex items-center justify-between w-full mb-2 font-bold text-sm uppercase tracking-wider opacity-60 hover:opacity-100"
          >
            <span>Варианты текста (20)</span>
            {isPanelOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
          
          <AnimatePresence>
            {isPanelOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-5 gap-2 pt-2"
              >
                {howItWorksVariants.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setVariantIndex(idx)}
                    className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${variantIndex === idx ? 'bg-black text-white scale-110 shadow-lg' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                  >
                    {item.id}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <section className="py-10 md:py-14" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: colors.text }}>
            Как это работает
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div 
              key={`text-${variantIndex}`}
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`md:col-span-7 ${v.textClass}`}
            >
              <div className={v.accent}>
                <p 
                  className={v.pClass}
                  style={v.pStyle}
                >
                  Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. 
                  Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. 
                  Благодаря уникальному сочетанию природных компонентов и современных технологий, продукты активируют внутренние 
                  ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование 
                  помогает не только устранить симптомы, но и воздействует на первопричину дискомфорта, возвращая вам 
                  природную энергию и жизненный тонус.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              key={`img-${variantIndex}`}
              className="md:col-span-5 w-full flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-full aspect-[3/4] flex items-center justify-center rounded-xl bg-white p-4 card-shadow hover-elevate cursor-pointer transition-all duration-300"
              >
                <div className="w-full h-full flex items-center justify-center bg-accent-light/5 rounded-lg border border-accent-light/10">
                  <Leaf className="w-20 h-20 opacity-20" style={{ color: colors.accent }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.text }}>Каталог продуктов</h2>
            <div className="w-24 h-0.5 mx-auto" style={{ backgroundColor: colors.accent }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <motion.div key={product.id} className="flex flex-row rounded-xl overflow-hidden card-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}>
                <div className="w-[40%] aspect-[3/4] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.bgAlt }}>
                  <product.icon className="w-16 h-16 mx-auto mb-3" style={{ color: colors.accent }} />
                </div>
                <div className="w-[60%] p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: colors.accent }}>{product.id}</span>
                    <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{product.name}</h3>
                  </div>
                  <p className="text-base leading-relaxed mb-6" style={{ color: colors.textSecondary }}>{product.description}</p>
                  <button className="px-6 py-3 text-base font-medium rounded-lg transition-all hover:scale-105 active-elevate-2" style={{ backgroundColor: colors.button, color: colors.buttonText }}>Подробнее</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
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
                  <div className="rounded-2xl p-5 flex flex-col h-80 card-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}>
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
              className="swiper-button-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: colors.cardBg, color: colors.accent, border: `1px solid ${colors.accentLight}` }}
              data-testid="button-testimonials-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="swiper-button-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: colors.cardBg, color: colors.accent, border: `1px solid ${colors.accentLight}` }}
              data-testid="button-testimonials-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: colors.text }}>Вопросы и ответы</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div key={idx} className="rounded-xl overflow-hidden card-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold pr-4" style={{ color: colors.text }}>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} style={{ color: colors.accent }} />
                </button>
                {openFaq === idx && (
                  <motion.div className="px-5 pb-5" style={{ borderTop: `1px dashed ${colors.accentLight}` }} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <p className="pt-4" style={{ color: colors.textSecondary }}>{item.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: colors.gradient }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Добро пожаловать в мир здоровья</h2>
          <p className="text-white/90 text-lg mb-8">Откройте для себя полный ассортимент продукции на нашем сайте.</p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 bg-white shadow-lg active-elevate-2" style={{ color: colors.accent }}>
            Перейти в каталог <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
