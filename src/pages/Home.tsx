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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [howItWorksVariant, setHowItWorksVariant] = useState(5);
  const swiperRef = useRef<any>(null);

  const renderHowItWorks = () => {
    switch (howItWorksVariant) {
      case 1: // Generative Cloud
        return (
          <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 p-8">
              {["Биорезонанс", "Очищение", "Регенерация", "Обмен веществ", "Гармония", "Энергия", "Тонус"].map((text, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  className="bg-white/80 backdrop-blur-md p-6 rounded-full shadow-lg border border-accent/20 cursor-pointer"
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="font-medium" style={{ color: colors.accent }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 2: // Interactive Microscope
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl font-light leading-relaxed" style={{ color: colors.text }}>
                Исследуйте процесс на клеточном уровне. Натуральные компоненты проникают глубоко в структуру ткани, активируя естественные механизмы обновления.
              </p>
            </div>
            <div className="flex justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-80 h-80 rounded-full border-8 border-slate-100 shadow-inner flex items-center justify-center bg-white overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
                <Leaf className="w-32 h-32 opacity-20" style={{ color: colors.accent }} />
                <div className="absolute inset-0 border-[20px] border-white/50 rounded-full"></div>
              </motion.div>
            </div>
          </div>
        );
      case 3: // Glass Layers
        return (
          <div className="relative h-[400px] w-full">
            {[1, 2, 3].map((layer) => (
              <motion.div
                key={layer}
                className="absolute inset-0 bg-white/30 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl"
                style={{ top: layer * 20, left: layer * 20, zIndex: 10 - layer }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: layer * 0.2 }}
              >
                <p className="text-lg font-light max-w-lg" style={{ color: colors.text }}>
                  {layer === 1 && "Наши продукты основаны на принципах биорезонанса."}
                  {layer === 2 && "Процесс начинается с мягкого очищения клеток."}
                  {layer === 3 && "Глубокая регенерация возвращает жизненный тонус."}
                </p>
              </motion.div>
            ))}
          </div>
        );
      case 4: // Pulse of Life
        return (
          <div className="flex flex-col items-center gap-8">
            <p className="text-xl text-center max-w-2xl font-light" style={{ color: colors.text }}>
              Наши продукты активируют внутренние ресурсы здоровья, гармонизируя работу всех систем.
            </p>
            <div className="w-full h-32 flex items-center justify-center">
              <motion.svg width="100%" height="100" viewBox="0 0 1000 100">
                <motion.path
                  d="M0 50 Q 250 0, 500 50 T 1000 50"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="3"
                  animate={{
                    d: [
                      "M0 50 Q 250 0, 500 50 T 1000 50",
                      "M0 50 Q 250 100, 500 50 T 1000 50",
                      "M0 50 Q 250 0, 500 50 T 1000 50"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.svg>
            </div>
          </div>
        );
      case 5: // Spectrum Accordion
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
             <div className="md:col-span-8 flex items-stretch">
                <div className="w-2 bg-accent rounded-full mr-6" style={{ backgroundColor: colors.accent }}></div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 bg-slate-50 p-10 rounded-xl shadow-sm"
                >
                  <p className="text-xl font-light leading-relaxed" style={{ color: colors.text }}>
                    Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. 
                    Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. 
                    Благодаря уникальному сочетанию природных компонентов и современных технологий, продукты активируют внутренние 
                    ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование 
                    помогает не только устранить симптомы, но и воздействует на первопричину дискомфорта, возвращая вам 
                    природную энергию и жизненный тонус.
                  </p>
                </motion.div>
             </div>
             <div className="md:col-span-4">
                <div className="w-full aspect-[3/4] rounded-xl bg-white border-2 border-dashed flex items-center justify-center" style={{ borderColor: colors.accentLight }}>
                   <Leaf className="w-20 h-20 opacity-20" style={{ color: colors.accent }} />
                </div>
             </div>
          </div>
        );
      case 6: // Mask Image
        return (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 flex items-center justify-center group">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <h3 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-white mix-blend-difference text-center px-4">
              ПРИРОДНАЯ ЭНЕРГИЯ
            </h3>
          </div>
        );
      case 7: // Digital Alchemy
        return (
          <div className="bg-slate-900 p-12 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent"></div>
            <motion.p 
              className="text-2xl font-mono text-white/90 leading-relaxed relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {"> "}System status: Initializing regeneration...
              <br />
              {"> "}Processing natural components...
              <br />
              {"> "}Bio-resonance alignment: 100%
              <br />
              {"> "}Body harmony restored.
            </motion.p>
          </div>
        );
      case 8: // Liquid Boundary
        return (
          <div className="flex flex-col md:flex-row items-center gap-0 rounded-3xl overflow-hidden border">
            <div className="flex-1 bg-white p-12 relative z-10">
              <p className="text-xl font-light" style={{ color: colors.text }}>
                Активируют внутренние ресурсы здоровья и гармонизируют работу всех систем.
              </p>
              <div className="absolute top-0 right-[-50px] bottom-0 w-[100px] bg-white hidden md:block" style={{ borderRadius: "50% 0 0 50% / 50% 0 0 50%", transform: "scaleX(2)" }}></div>
            </div>
            <div className="flex-1 w-full aspect-[3/4] bg-slate-50 flex items-center justify-center">
              <Leaf className="w-24 h-24 opacity-20" style={{ color: colors.accent }} />
            </div>
          </div>
        );
      case 9: // Tarot Cards
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ rotateY: 180 }}
                className="aspect-[2/3] bg-white border-2 rounded-2xl p-6 shadow-md flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500"
                style={{ borderColor: colors.accentLight, transformStyle: "preserve-3d" }}
              >
                <div style={{ backfaceVisibility: "hidden" }}>
                  <Star className="w-12 h-12 mb-4" style={{ color: colors.accent }} />
                  <span className="font-bold text-lg" style={{ color: colors.text }}>КАРТА {i}</span>
                </div>
                <div className="absolute inset-0 bg-accent text-white p-6 rounded-2xl flex items-center justify-center" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
                   <p className="text-sm font-medium">Секрет здоровья {i} раскрыт</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 10: // Architectural Blueprint
        return (
          <div className="relative p-12 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl overflow-hidden">
            <div className="absolute top-4 left-4 text-[10px] text-slate-400 font-mono">ID: W-2025-REGEN</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
              <div className="border-l border-t border-slate-300 p-6">
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Technical Description</div>
                <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                  Комплексное воздействие на клеточную структуру. Нормализация метаболических процессов.
                </p>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-48 h-48 border border-slate-300 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 border-t border-slate-200 rotate-45"></div>
                  <div className="absolute inset-0 border-t border-slate-200 -rotate-45"></div>
                  <Leaf className="w-16 h-16 opacity-30" style={{ color: colors.accent }} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 font-mono">SCALE: 1:1 NAT</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <HeroSection />

      <section className="py-10 md:py-14" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <motion.h2 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>
              Как это работает
            </motion.h2>
            
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-lg justify-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                <button
                  key={v}
                  onClick={() => setHowItWorksVariant(v)}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${howItWorksVariant === v ? 'bg-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          
          {renderHowItWorks()}
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
