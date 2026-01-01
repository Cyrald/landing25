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
        className="flex flex-row h-full rounded-lg overflow-hidden card-shadow mb-0 relative" 
        style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}`, zIndex: 1 }}
      >
        <div className="w-[40%] shrink-0" style={{ backgroundColor: colors.bgAlt }}>
          <div className="w-full aspect-[3/4] flex items-center justify-center relative overflow-hidden h-full">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <product.icon className="w-full h-full max-w-[4rem] max-h-[4rem]" style={{ color: colors.accent }} />
            </div>
          </div>
        </div>
        <div className="w-[60%] p-6 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: colors.accent }}>{product.id}</span>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>{product.name}</h3>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: colors.textSecondary }}>{product.description}</p>
          <button className="mt-auto px-6 py-3 text-base font-medium rounded-lg transition-all hover:scale-105 active-elevate-2" style={{ backgroundColor: colors.button, color: colors.buttonText }}>Подробнее</button>
        </div>
      </motion.div>
    ),
    // 2. Modern Wide (Minimalist)
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white/40 backdrop-blur-md border border-slate-200 hover:border-primary/40 transition-all duration-500 w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[35%] aspect-[3/4] bg-slate-50 flex items-center justify-center">
          <product.icon className="w-16 h-16 text-primary/30" />
        </div>
        <div className="w-full md:w-[65%] p-10 flex flex-col justify-center">
          <div className="text-[10px] uppercase tracking-widest text-primary font-black mb-3">Premium Wellness</div>
          <h3 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{product.description}</p>
          <button className="w-fit px-8 py-3 bg-primary text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">Explore Product</button>
        </div>
      </motion.div>
    ),
    // 3. Brutalist Edge
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[30%] aspect-[3/4] bg-primary border-r-4 border-black flex items-center justify-center">
          <product.icon className="w-20 h-20 text-black" />
        </div>
        <div className="w-full md:w-[70%] p-10">
          <h3 className="text-4xl font-black uppercase mb-4 italic tracking-tighter">{product.name}</h3>
          <p className="text-xl font-bold mb-8 leading-tight">{product.description}</p>
          <button className="px-10 py-4 bg-black text-white font-black uppercase text-lg border-2 border-black hover:bg-white hover:text-black transition-colors">
            Order
          </button>
        </div>
      </motion.div>
    ),
    // 4. Floating Glass
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center relative">
          <div className="absolute w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
          <product.icon className="w-24 h-24 text-white relative z-10 drop-shadow-2xl" />
        </div>
        <div className="w-full md:w-[60%] p-12 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-white mb-6">{product.name}</h3>
          <p className="text-white/60 mb-10 leading-relaxed text-lg font-light italic">"{product.description}"</p>
          <button className="w-fit py-4 px-12 rounded-2xl bg-white text-slate-900 font-black hover:scale-105 transition-transform">
            Unlock Potential
          </button>
        </div>
      </motion.div>
    ),
    // 5. Dark Edge Premium
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-slate-950 rounded-lg border border-white/10 hover:border-primary/40 transition-all group w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[35%] aspect-[3/4] bg-slate-900 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
          <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-1000">
            <product.icon className="w-24 h-24 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="w-full md:w-[65%] p-12 flex flex-col justify-between">
          <div>
            <h3 className="text-4xl font-serif text-white mb-6">{product.name}</h3>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="text-slate-400 font-light leading-relaxed text-lg">{product.description}</p>
          </div>
          <button className="w-fit border-b border-primary py-2 text-primary tracking-[0.4em] uppercase text-xs font-bold hover:tracking-[0.6em] transition-all">
            Discover More
          </button>
        </div>
      </motion.div>
    ),
    // 6. Bio-Organic Wide
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-[50px] bg-emerald-50/50 border border-emerald-100 p-6 gap-8 w-full md:w-[125%] md:-ml-[12.5%] shadow-lg shadow-emerald-900/5 relative z-0 hover:z-10">
        <div className="w-full md:w-[38%] aspect-[3/4] bg-white rounded-[40px] shadow-inner flex items-center justify-center">
          <product.icon className="w-20 h-20 text-emerald-500" />
        </div>
        <div className="w-full md:w-[62%] p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-black mb-6 bg-emerald-100 px-4 py-2 rounded-full w-fit">
            <Leaf className="w-4 h-4" /> 100% ECO-FRIENDLY
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{product.name}</h3>
          <p className="text-slate-600 text-lg mb-8 leading-snug">{product.description}</p>
          <div className="flex gap-4">
            <button className="flex-1 bg-emerald-600 text-white py-4 rounded-3xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-colors">Order Now</button>
            <button className="w-16 h-16 flex items-center justify-center bg-white border-2 border-emerald-100 rounded-3xl text-emerald-600 hover:border-emerald-500 transition-all"><Star className="w-6 h-6" /></button>
          </div>
        </div>
      </motion.div>
    ),
    // 7. Tech Frame
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row relative group bg-black border border-primary/20 hover:border-primary transition-colors w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
        <div className="w-full md:w-[40%] aspect-[3/4] bg-slate-900/50 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <product.icon className="w-24 h-24 text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
        </div>
        <div className="w-full md:w-[60%] p-12 flex flex-col justify-center">
          <div className="text-[10px] text-primary mb-4 font-mono font-bold tracking-[0.5em]">SYSTEM_CHECK // OK</div>
          <h3 className="text-4xl font-black text-white mb-6 tracking-tight uppercase">{product.name}</h3>
          <p className="text-slate-400 text-base mb-10 font-mono leading-tight">{product.description}</p>
          <button className="relative py-4 bg-primary text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-all">
            Execute Purchase
          </button>
        </div>
      </motion.div>
    ),
    // 8. Studio White
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.12)] transition-all duration-700 p-4 w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[35%] aspect-[3/4] bg-slate-50 rounded-[2.5rem] flex items-center justify-center">
          <product.icon className="w-28 h-28 text-slate-900" />
        </div>
        <div className="w-full md:w-[65%] p-12 flex flex-col justify-center">
          <h3 className="text-4xl font-bold text-slate-900 mb-6">{product.name}</h3>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">{product.description}</p>
          <div className="flex gap-6">
            <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-colors">Shop</button>
            <button className="px-10 py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-colors">Learn</button>
          </div>
        </div>
      </motion.div>
    ),
    // 9. Newspaper Bold
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-[#fdf6e3] border-y-4 border-black p-4 w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[40%] aspect-[3/4] border-4 border-black bg-white flex items-center justify-center">
          <product.icon className="w-24 h-24 text-black grayscale" />
        </div>
        <div className="w-full md:w-[60%] p-10 font-serif">
          <div className="text-sm font-bold border-b border-black mb-4 flex justify-between">
            <span>VOL. 012</span>
            <span>PRICE: PURE</span>
          </div>
          <h3 className="text-5xl font-black text-black mb-6 uppercase leading-none">{product.name}</h3>
          <p className="text-black leading-tight text-xl mb-8 font-medium">{product.description}</p>
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold uppercase underline">Read Full Story</span>
            <product.icon className="w-8 h-8 opacity-20" />
          </div>
        </div>
      </motion.div>
    ),
    // 10. Aurora Glow
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white shadow-2xl shadow-primary/10 hover:-translate-y-4 transition-all duration-500 w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[35%] aspect-[3/4] bg-gradient-to-tr from-primary via-accentDark to-indigo-900 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl animate-pulse" />
           <product.icon className="w-24 h-24 text-white relative z-10 drop-shadow-2xl" />
        </div>
        <div className="w-full md:w-[65%] p-12 relative bg-white">
          <h3 className="text-4xl font-black bg-gradient-to-r from-primary via-accentDark to-indigo-900 bg-clip-text text-transparent mb-6">{product.name}</h3>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">{product.description}</p>
          <button className="w-full py-5 bg-gradient-to-r from-primary to-accentDark text-white font-black rounded-2xl shadow-2xl shadow-primary/40 hover:scale-105 transition-transform uppercase tracking-widest">Buy Package</button>
        </div>
      </motion.div>
    ),
    // 11. Kinetic Split
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-slate-900 text-white overflow-hidden group w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[45%] aspect-[3/4] bg-white flex items-center justify-center group-hover:bg-primary transition-colors duration-700">
          <product.icon className="w-32 h-32 text-slate-900 group-hover:text-white group-hover:scale-125 transition-all duration-700" />
        </div>
        <div className="w-full md:w-[55%] p-16 flex flex-col justify-center">
          <h3 className="text-6xl font-black mb-8 italic tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-700">{product.name}</h3>
          <p className="text-2xl font-light text-slate-400 mb-12 leading-none group-hover:text-white transition-colors">{product.description}</p>
          <button className="w-fit text-primary font-black border-b-8 border-primary text-2xl pb-2 hover:pr-8 transition-all">GET IT NOW</button>
        </div>
      </motion.div>
    ),
    // 12. Neumorphic Deep
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row bg-[#e0e0e0] rounded-[60px] p-8 shadow-[30px_30px_60px_#bebebe,-30px_-30px_60px_#ffffff] gap-10 w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[35%] aspect-[3/4] bg-[#e0e0e0] rounded-[50px] shadow-[inset_15px_15px_30px_#bebebe,inset_-15px_-15px_30px_#ffffff] flex items-center justify-center">
          <product.icon className="w-24 h-24 text-slate-700" />
        </div>
        <div className="w-full md:w-[65%] p-4 flex flex-col justify-center">
          <h3 className="text-4xl font-black text-slate-800 mb-6 tracking-tight">{product.name}</h3>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">{product.description}</p>
          <button className="w-full py-5 bg-[#e0e0e0] rounded-3xl shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all text-slate-800 font-black text-xl uppercase tracking-tighter">Experience</button>
        </div>
      </motion.div>
    ),
    // 13. Grid Line
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row border border-slate-200 bg-white group hover:bg-slate-50 transition-colors w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[40%] aspect-[3/4] bg-slate-50 flex items-center justify-center relative border-r border-slate-200">
           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.03]">
             {[...Array(16)].map((_, i) => <div key={i} className="border border-black" />)}
           </div>
           <product.icon className="w-24 h-24 text-slate-900 group-hover:-rotate-12 transition-transform duration-500" />
        </div>
        <div className="w-full md:w-[60%] p-16">
          <div className="text-xs font-black tracking-[0.4em] text-primary mb-6">COLLECTION_2026</div>
          <h3 className="text-5xl font-light text-slate-900 mb-8 tracking-tighter">{product.name}</h3>
          <p className="text-slate-500 text-lg leading-snug mb-12 max-w-md">{product.description}</p>
          <button className="text-sm font-black tracking-[0.2em] uppercase border-b-2 border-slate-900 pb-1 hover:pb-3 transition-all">Explore</button>
        </div>
      </motion.div>
    ),
    // 14. Bento Wide
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-100 rounded-[40px] w-full md:w-[125%] md:-ml-[12.5%] shadow-xl shadow-black/5 relative z-0 hover:z-10">
        <div className="w-full md:w-[35%] aspect-[3/4] bg-white rounded-[32px] flex items-center justify-center shadow-sm">
          <product.icon className="w-24 h-24 text-primary animate-pulse" />
        </div>
        <div className="w-full md:w-[65%] grid grid-rows-2 gap-4">
          <div className="bg-white rounded-[32px] p-10 flex flex-col justify-center">
             <h3 className="text-3xl font-black mb-4 tracking-tighter">{product.name}</h3>
             <p className="text-base text-slate-400 leading-tight">{product.description}</p>
          </div>
          <div className="bg-primary rounded-[32px] p-10 flex items-center justify-between group cursor-pointer hover:bg-accentDark transition-all active:scale-[0.98]">
            <span className="text-2xl font-black text-white uppercase italic">Order Now</span>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <ChevronRight className="w-8 h-8" />
            </div>
          </div>
        </div>
      </motion.div>
    ),
    // 15. Typographic Giant
    (product: any) => (
      <motion.div key={product.id} className="flex flex-col md:flex-row border-b-2 border-slate-100 py-20 group w-full md:w-[125%] md:-ml-[12.5%] relative z-0 hover:z-10">
        <div className="w-full md:w-[40%] aspect-[3/4] flex items-center justify-center relative overflow-hidden">
          <span className="absolute text-[180px] font-black text-slate-100 group-hover:text-primary/5 transition-colors select-none leading-none -translate-x-12">0{product.id}</span>
          <product.icon className="w-40 h-40 relative z-10 text-slate-900 group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="w-full md:w-[60%] flex flex-col justify-center pl-12">
          <h3 className="text-6xl font-black mb-8 tracking-tighter flex items-center gap-6">
            <div className="w-4 h-4 bg-primary rounded-full group-hover:scale-[3] transition-transform duration-500" />
            {product.name}
          </h3>
          <p className="text-2xl text-slate-400 font-light leading-snug mb-12 group-hover:text-slate-900 transition-colors">{product.description}</p>
          <div className="flex gap-16">
            <div className="flex flex-col">
              <span className="text-xs text-slate-300 uppercase font-black tracking-widest mb-2">Category</span>
              <span className="text-lg font-bold">Wellness</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-300 uppercase font-black tracking-widest mb-2">Benefit</span>
              <span className="text-lg font-bold">Regeneration</span>
            </div>
            <div className="flex flex-col">
               <button className="mt-auto text-primary font-black text-xl hover:translate-x-4 transition-transform flex items-center gap-4">VIEW <ChevronRight className="w-6 h-6"/></button>
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

          <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto px-4 md:px-0 scale-[0.7] origin-top">
            {products.map((product) => (
              <div key={product.id} className="w-full h-full">
                {cardVariants[designVariant](product)}
              </div>
            ))}
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
