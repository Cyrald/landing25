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

  const [designVariant, setDesignVariant] = useState(0);

  const cardVariants = [
    // 1. Classic (Current)
    (product: any) => (
      <motion.div 
        key={product.id} 
        className="flex flex-col md:flex-row rounded-lg overflow-hidden card-shadow scale-[0.9] origin-center mb-0 md:mb-0 relative" 
        style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}`, zIndex: 1 }}
      >
        <div className="w-full md:w-[40%] shrink-0" style={{ backgroundColor: colors.bgAlt }}>
          <div className="w-full aspect-[3/4] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <product.icon className="w-full h-full max-w-[4rem] max-h-[4rem]" style={{ color: colors.accent }} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: colors.accent }}>{product.id}</span>
            <h3 className="text-2xl font-bold" style={{ color: colors.text }}>{product.name}</h3>
          </div>
          <p className="text-base leading-relaxed mb-6" style={{ color: colors.textSecondary }}>{product.description}</p>
          <button className="px-6 py-3 text-base font-medium rounded-lg transition-all hover:scale-105 active-elevate-2" style={{ backgroundColor: colors.button, color: colors.buttonText }}>Подробнее</button>
        </div>
      </motion.div>
    ),
    // 2. Minimalist
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-primary/20 transition-all duration-300">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-slate-50/50 flex items-center justify-center group">
          <product.icon className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-500" />
        </div>
        <div className="w-full md:w-[60%] p-8 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">Organic Series</div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">{product.name}</h3>
            <p className="text-sm text-slate-500 line-clamp-3">{product.description}</p>
          </div>
          <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all">
            LEARN MORE <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    ),
    // 3. Brutalist
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-white">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-primary/10 border-r-4 border-black flex items-center justify-center">
          <product.icon className="w-20 h-20 text-black" />
        </div>
        <div className="w-full md:w-[60%] p-6">
          <h3 className="text-3xl font-black uppercase mb-4 italic">{product.name}</h3>
          <p className="text-lg font-bold mb-6">{product.description}</p>
          <button className="w-full py-4 bg-primary text-white font-black border-4 border-black uppercase text-xl hover:bg-white hover:text-black transition-colors">
            Order Now
          </button>
        </div>
      </motion.div>
    ),
    // 4. Glassmorphism
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full" />
            <product.icon className="w-20 h-20 text-white relative z-10" />
          </div>
        </div>
        <div className="w-full md:w-[60%] p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
          <p className="text-white/70 mb-8 leading-relaxed italic">"{product.description}"</p>
          <button className="py-3 px-8 rounded-full bg-white text-primary font-bold hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Explore Synergy
          </button>
        </div>
      </motion.div>
    ),
    // 5. Dark Premium
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-[#1a1a1a] rounded-sm border border-white/5 hover:border-primary/50 transition-colors group">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-[#222] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
            <product.icon className="w-24 h-24 text-primary opacity-50 group-hover:opacity-100" />
          </div>
        </div>
        <div className="w-full md:w-[60%] p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-serif text-white mb-4">{product.name}</h3>
            <div className="w-12 h-1 bg-primary mb-6" />
            <p className="text-white/40 font-light leading-relaxed">{product.description}</p>
          </div>
          <button className="border border-white/20 py-4 px-8 text-white tracking-[0.3em] uppercase text-xs hover:bg-white hover:text-black transition-all">
            Details
          </button>
        </div>
      </motion.div>
    ),
    // 6. Neo-Organic
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-[40px] bg-emerald-50/30 border border-emerald-100 p-4 gap-4">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-white rounded-[32px] shadow-inner flex items-center justify-center">
          <product.icon className="w-16 h-16 text-emerald-500" />
        </div>
        <div className="w-full md:w-[60%] p-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold mb-4 bg-emerald-100/50 px-3 py-1 rounded-full w-fit">
            <Leaf className="w-3 h-3" /> 100% NATURAL
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">{product.name}</h3>
          <p className="text-slate-600 text-sm mb-6">{product.description}</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-emerald-200">Get It</button>
            <button className="w-12 h-12 flex items-center justify-center border-2 border-emerald-100 rounded-2xl text-emerald-600"><Star className="w-5 h-5" /></button>
          </div>
        </div>
      </motion.div>
    ),
    // 7. High-Tech / Cyber
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row relative group bg-black overflow-hidden border-l-4 border-primary">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl group-hover:bg-primary/30 transition-all" />
        <div className="w-full md:w-[40%] aspect-[3/4] bg-slate-900 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <product.icon className="w-20 h-20 text-primary animate-pulse" />
        </div>
        <div className="w-full md:w-[60%] p-8 relative z-10 flex flex-col justify-center">
          <div className="text-[10px] text-primary mb-2 font-mono tracking-tighter">PHASE_01 // ACTIVE</div>
          <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase">{product.name}</h3>
          <p className="text-slate-400 text-sm mb-8 font-mono">{product.description}</p>
          <button className="group/btn relative py-3 bg-white text-black font-bold uppercase tracking-widest text-xs overflow-hidden">
            <span className="relative z-10">Initialize</span>
            <div className="absolute inset-0 w-0 group-hover/btn:w-full bg-primary transition-all duration-300" />
          </button>
        </div>
      </motion.div>
    ),
    // 8. Soft Shadows (Apple-like)
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500 p-2">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-slate-50 rounded-2xl flex items-center justify-center">
          <product.icon className="w-24 h-24 text-slate-800" />
        </div>
        <div className="w-full md:w-[60%] p-10 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-3xl font-semibold text-slate-900 mb-4">{product.name}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{product.description}</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium">Buy</button>
            <button className="px-8 py-3 bg-slate-100 text-slate-900 rounded-full font-medium">Learn More</button>
          </div>
        </div>
      </motion.div>
    ),
    // 9. Retro / Vintage
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-[#fdf6e3] border-2 border-[#b58900] rounded-lg p-1">
        <div className="w-full md:w-[40%] aspect-[3/4] border-2 border-[#b58900] bg-white flex items-center justify-center grayscale contrast-125">
          <product.icon className="w-20 h-20 text-[#b58900]" />
        </div>
        <div className="w-full md:w-[60%] p-8 font-serif">
          <h3 className="text-4xl text-[#268bd2] mb-4 underline decoration-[#b58900] decoration-double">{product.name}</h3>
          <p className="text-[#586e75] leading-snug first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">{product.description}</p>
          <div className="mt-10 border-t-2 border-[#b58900] pt-4 text-[10px] uppercase text-[#93a1a1]">Est. 1924 // London</div>
        </div>
      </motion.div>
    ),
    // 10. Gradient Pop
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-gradient-to-tr from-primary to-accentDark flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <product.icon className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="w-full md:w-[60%] p-8 relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <product.icon className="w-32 h-32" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accentDark bg-clip-text text-transparent mb-4">{product.name}</h3>
          <p className="text-slate-600 mb-8">{product.description}</p>
          <button className="w-full py-3 bg-gradient-to-r from-primary to-accentDark text-white font-bold rounded-xl shadow-lg">View Package</button>
        </div>
      </motion.div>
    ),
    // 11. Split Bold
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row border-t-8 border-primary bg-slate-900 text-white">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-white flex items-center justify-center">
          <product.icon className="w-28 h-28 text-primary" />
        </div>
        <div className="w-full md:w-[60%] p-12 flex flex-col justify-center">
          <h3 className="text-5xl font-black mb-6 italic transform -skew-x-12">{product.name}</h3>
          <p className="text-xl font-light opacity-60 mb-10 leading-tight tracking-tighter">{product.description}</p>
          <button className="self-start text-primary font-black border-b-4 border-primary pb-1 hover:pr-4 transition-all">TAKE ACTION</button>
        </div>
      </motion.div>
    ),
    // 12. Neumorphism
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-[#e0e0e0] rounded-[50px] p-6 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] gap-6">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-[#e0e0e0] rounded-[40px] shadow-[inset_20px_20px_60px_#bebebe,inset_-20px_-20px_60px_#ffffff] flex items-center justify-center">
          <product.icon className="w-20 h-20 text-[#333]" />
        </div>
        <div className="w-full md:w-[60%] p-4 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">{product.name}</h3>
          <p className="text-slate-600 mb-8">{product.description}</p>
          <button className="w-full py-4 bg-[#e0e0e0] rounded-2xl shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-shadow text-slate-700 font-bold">Discover</button>
        </div>
      </motion.div>
    ),
    // 13. Abstract Patterns
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row border border-slate-200 rounded-3xl overflow-hidden group">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-slate-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:12px_12px]" />
          </div>
          <product.icon className="w-20 h-20 text-slate-900 group-hover:rotate-12 transition-transform duration-500" />
        </div>
        <div className="w-full md:w-[60%] p-10 bg-white">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-light text-slate-900">{product.name}</h3>
            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">NEW</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-10">{product.description}</p>
          <div className="w-full h-px bg-slate-100 mb-6" />
          <button className="text-xs font-black tracking-widest uppercase flex items-center gap-2 group-hover:gap-4 transition-all">Check Collection</button>
        </div>
      </motion.div>
    ),
    // 14. Bento Box
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row gap-2 p-2 bg-slate-50 rounded-3xl">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <product.icon className="w-20 h-20 text-primary" />
        </div>
        <div className="w-full md:w-[60%] grid grid-rows-2 gap-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
             <h3 className="text-xl font-bold mb-2">{product.name}</h3>
             <p className="text-xs text-slate-400">{product.description}</p>
          </div>
          <div className="bg-primary/5 rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:bg-primary transition-colors">
            <span className="font-bold text-primary group-hover:text-white">Learn More</span>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </motion.div>
    ),
    // 15. Typographic
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row border-b border-slate-200 py-12 group">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-transparent flex items-center justify-start">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <span className="absolute text-[120px] font-black opacity-[0.03] select-none group-hover:opacity-10 transition-opacity">PROD</span>
            <product.icon className="w-32 h-32 relative z-10 text-slate-900 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        <div className="w-full md:w-[60%] flex flex-col justify-center">
          <h3 className="text-4xl font-light mb-6 flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {product.name}
          </h3>
          <p className="text-lg text-slate-500 max-w-md leading-relaxed mb-8">{product.description}</p>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-300 uppercase font-bold mb-1">Weight</span>
              <span className="text-sm font-mono">500ml</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-300 uppercase font-bold mb-1">Origin</span>
              <span className="text-sm font-mono">Alps</span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  ];

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <HeroSection />

      {/* How it Works Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Как это <span style={{ color: colors.accent }}>работает</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: colors.gradient }}></div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-sm border" style={{ backgroundColor: colors.cardBg, borderColor: colors.accentLight }}>
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-5/12 shrink-0">
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
              <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
                {variants[0].content}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12 md:py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Каталог <span style={{ color: colors.accent }}>продуктов</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: colors.gradient }}></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[...Array(15)].map((_, i) => (
              <button
                key={i}
                onClick={() => setDesignVariant(i)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  designVariant === i 
                    ? 'bg-primary text-white shadow-lg scale-110' 
                    : 'bg-white text-slate-400 hover:bg-slate-100'
                }`}
              >
                Вариант {i + 1}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 md:px-0">
            {products.map((product) => cardVariants[designVariant](product))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* FAQ Section */}
      <section className="py-12 md:py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: colors.text }}>Вопросы и ответы</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div key={idx} className="rounded-lg overflow-hidden card-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}>
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

      {/* Footer Section */}
      <footer className="w-full border-t border-slate-200/50">
        <div className="w-full py-20 px-6" style={{ backgroundColor: colors.accentDark }}>
          <div className="max-w-4xl mx-auto text-center text-white relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Естество природы в руках человека</h2>
            <p className="text-lg md:text-xl opacity-80 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Ваше здоровье - это ваш главный актив, от которого зависит каждый ваш день. <br /> Начните заботиться о нем прямо сейчас!
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
