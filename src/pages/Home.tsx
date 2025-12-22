import { useState, useRef, useEffect, createContext, useContext, type ReactNode } from "react";
import { ChevronDown, ExternalLink, Star, Shield, CircleDot, Droplets, Activity, Glasses, ChevronLeft, ChevronRight, Leaf, Quote, Palette, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { products, testimonials, faqItems, howItWorks } from "../data";
import { getImageSources, palettes, type Palette as PaletteType } from "../lib";

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

// --- Palette Context ---
interface PaletteContextType {
  currentPalette: PaletteType;
  setPaletteById: (id: number) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const STORAGE_KEY = "selected-palette-id";

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [currentPalette, setCurrentPalette] = useState<PaletteType>(() => {
    if (typeof window !== "undefined") {
      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const id = parseInt(savedId, 10);
        const found = palettes.find((p) => p.id === id);
        if (found) return found;
      }
    }
    return palettes[0];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentPalette.id.toString());
  }, [currentPalette]);

  const setPaletteById = (id: number) => {
    const found = palettes.find((p) => p.id === id);
    if (found) {
      setCurrentPalette(found);
    }
  };

  return (
    <PaletteContext.Provider value={{ currentPalette, setPaletteById }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
}

// --- PaletteSwitcher Component ---
function PaletteSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPalette, setPaletteById } = usePalette();

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{ 
          backgroundColor: currentPalette.colors.accent,
          color: currentPalette.colors.buttonText 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-palette-switcher"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: currentPalette.colors.card }}
          >
            <div 
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: currentPalette.colors.accentLight }}
            >
              <div>
                <h2 className="text-xl font-bold" style={{ color: currentPalette.colors.text }}>Выбор палитры</h2>
                <p className="text-sm" style={{ color: currentPalette.colors.textSecondary }}>Текущая: {currentPalette.name}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: currentPalette.colors.bgAlt,
                  color: currentPalette.colors.text 
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-3">
                {palettes.map((palette) => {
                  const isSelected = palette.id === currentPalette.id;
                  return (
                    <button
                      key={palette.id}
                      onClick={() => setPaletteById(palette.id)}
                      className="p-3 rounded-lg text-left transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: palette.colors.bg,
                        outline: isSelected ? `2px solid ${palette.colors.accent}` : "none",
                        outlineOffset: "2px",
                      }}
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: palette.colors.bg, borderColor: palette.colors.accentLight }} />
                        <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: palette.colors.card, borderColor: palette.colors.accentLight }} />
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.colors.accent }} />
                      </div>
                      <div className="text-xs font-medium truncate" style={{ color: palette.colors.text }}>{palette.id}. {palette.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
  const { currentPalette } = usePalette();
  const colors = currentPalette.colors;

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24" style={{ backgroundColor: colors.bg }}>
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
              Каждый день we получаем благодарности от людей, которые вернули себе радость движения.
            </p>
            <button
              className="px-8 py-4 rounded-lg font-semibold transition-transform hover:scale-105"
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
    buttonHover: currentPalette.colors.accentDark,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <HeroSection />
      <PaletteSwitcher />

      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2 className="text-2xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>Как это работает</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              {howItWorks.map((item, idx) => (
                <motion.div key={item.step} className="flex gap-4" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-xl md:text-2xl font-bold" style={{ backgroundColor: colors.accent, color: "#fff" }}>{item.step}</div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold mb-1 text-base md:text-lg" style={{ color: colors.text }}>{item.title}</h3>
                    <p className="text-sm md:text-base" style={{ color: colors.textSecondary }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="w-full aspect-[3/4] rounded-xl flex items-center justify-center backdrop-blur-sm order-first md:order-last scale-95" style={{ backgroundColor: `${colors.cardBg}ee` }}>
              <span style={{ color: colors.accent }}>Иллюстрация 3:4</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: colors.catalogBg }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>Каталог продуктов</h2>
            <div className="w-24 h-0.5 mx-auto" style={{ backgroundColor: colors.accent }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, idx) => (
              <motion.div key={product.id} className="flex flex-row rounded-xl overflow-hidden" style={{ backgroundColor: colors.bg, border: `1px solid ${colors.accentLight}` }}>
                <div className="w-[40%] aspect-[3/4] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.bgAlt }}>
                  <product.icon className="w-16 h-16 mx-auto mb-3" style={{ color: colors.accent }} />
                </div>
                <div className="w-[60%] p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: colors.accent }}>{product.id}</span>
                    <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{product.name}</h3>
                  </div>
                  <p className="text-base leading-relaxed mb-6" style={{ color: colors.textSecondary }}>{product.description}</p>
                  <button className="px-6 py-3 text-base font-medium rounded-lg transition-all hover:scale-105" style={{ backgroundColor: colors.button, color: colors.buttonText }}>Подробнее</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>Истории наших клиентов</h2>
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
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
              className="px-4"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="rounded-2xl p-5 flex flex-col h-80" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}>
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
            
            {/* Custom Navigation Buttons */}
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

      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>Вопросы и ответы</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div key={idx} className="rounded-xl overflow-hidden" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}>
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

      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: colors.gradient }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Добро пожаловать в мир здоровья</h2>
          <p className="text-white/90 text-lg mb-8">Откройте для себя полный ассортимент продукции на нашем сайте.</p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105" style={{ backgroundColor: "#fff", color: colors.accent }}>
            Перейти в каталог <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
