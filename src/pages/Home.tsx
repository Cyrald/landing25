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
            <ProductImage text="Продукт" aspectRatio="3/4" className="shadow-xl rounded-2xl" bgColor={colors.accentLight} />
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

  const [ctaVariant, setCtaVariant] = useState(1);

  const ctaVariants = [
    {
      id: 1,
      name: "Harmonious Balance",
      content: (
        <div className="w-full py-16 px-6 text-center border-t" style={{ backgroundColor: colors.bgAlt, borderColor: colors.accentLight }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>Ваше здоровье в надежных руках</h2>
            <p className="text-lg opacity-70 mb-8" style={{ color: colors.textSecondary }}>Присоединяйтесь к тысячам людей, выбравших путь осознанного восстановления.</p>
            <button className="px-10 py-4 rounded-xl font-bold shadow-lg hover-elevate active-elevate-2 transition-all" 
                    style={{ backgroundColor: colors.button, color: colors.buttonText }}
                    onClick={() => window.location.hash = 'catalog'}>
              В каталог магазина
            </button>
            <div className="mt-12 flex justify-center gap-8 text-[10px] uppercase tracking-widest font-bold opacity-30" style={{ color: colors.text }}>
              <span>© 2026 Wellness</span>
              <span>Доставка по РФ</span>
              <span>Гарантия качества</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      name: "Natural Zen",
      content: (
        <div className="w-full py-20 px-6 text-center" style={{ backgroundColor: colors.bg }}>
          <div className="max-w-3xl mx-auto">
            <Leaf className="w-8 h-8 mx-auto mb-6 opacity-30" style={{ color: colors.accent }} />
            <h2 className="text-2xl font-serif italic mb-6" style={{ color: colors.text }}>Прислушайтесь к своему телу сегодня</h2>
            <button className="px-12 py-3 border-b-2 font-bold uppercase tracking-widest text-sm hover:opacity-60 transition-opacity" 
                    style={{ borderBottomColor: colors.accent, color: colors.accent }}
                    onClick={() => window.location.hash = 'catalog'}>
              Открыть витрину
            </button>
            <div className="mt-16 text-xs opacity-40 italic" style={{ color: colors.textSecondary }}>Чистота. Сила. Природа.</div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      name: "Structured Professional",
      content: (
        <div className="w-full py-16 px-6 border-t" style={{ backgroundColor: colors.bgAlt, borderColor: colors.accentLight }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>Готовы к обновлению?</h2>
              <p className="opacity-70" style={{ color: colors.textSecondary }}>Начните путь к легкости с нашими бестселлерами.</p>
            </div>
            <button className="px-12 py-4 rounded-lg font-bold shadow-md hover-elevate active-elevate-2" 
                    style={{ backgroundColor: colors.accent, color: "white" }}
                    onClick={() => window.location.hash = 'catalog'}>
              В МАГАЗИН
            </button>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-black/5 flex justify-between items-center text-[10px] uppercase tracking-tighter opacity-40">
            <div>Wellness Products 2026</div>
            <div className="flex gap-4 font-bold">
              <a href="#">Политика</a>
              <a href="#">Оплата</a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      name: "Soft Shadow Focus",
      content: (
        <div className="w-full py-12 px-6" style={{ backgroundColor: colors.bg }}>
          <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border text-center" style={{ borderColor: colors.accentLight }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>Почувствуйте разницу с первого дня</h2>
            <button className="px-10 py-4 rounded-2xl font-black text-white hover-elevate active-elevate-2 shadow-xl shadow-accent/10" 
                    style={{ backgroundColor: colors.accent }}
                    onClick={() => window.location.hash = 'catalog'}>
              ПЕРЕЙТИ К ПОКУПКАМ
            </button>
          </div>
        </div>
      )
    },
    {
      id: 5,
      name: "Serene Gradient",
      content: (
        <div className="w-full py-24 px-6 text-center text-white overflow-hidden relative" style={{ background: colors.gradient }}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
             <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white blur-3xl"></div>
          </div>
          <h2 className="text-4xl font-black mb-10 leading-none">ЖИЗНЬ БЕЗ БОЛИ ВОЗМОЖНА</h2>
          <button className="px-16 py-5 bg-white rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-transform" 
                  style={{ color: colors.accent }}
                  onClick={() => window.location.hash = 'catalog'}>
            В КАТАЛОГ
          </button>
        </div>
      )
    },
    {
      id: 6,
      name: "Bento Minimal",
      content: (
        <div className="w-full py-12 px-6" style={{ backgroundColor: colors.bgAlt }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 bg-white p-10 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-bold mb-2">Начните новую главу</h2>
                <p className="opacity-60 text-sm">Ваше тело скажет вам спасибо за этот выбор.</p>
              </div>
              <button className="px-8 py-3 bg-black text-white rounded-xl font-bold" onClick={() => window.location.hash = 'catalog'}>В каталог</button>
            </div>
            <div className="bg-accent p-10 rounded-3xl flex items-center justify-center text-white font-black text-4xl">
              24/7
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      name: "Technical Foundation",
      content: (
        <div className="w-full py-16 px-6 border-t" style={{ backgroundColor: colors.bg, borderColor: colors.accentLight }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Наука на службе природы</h2>
              <div className="space-y-4 opacity-70">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Сертифицированные материалы</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Клинически проверенные методы</span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <button className="px-12 py-5 bg-accent text-white rounded-full font-black text-xl hover-elevate shadow-2xl" onClick={() => window.location.hash = 'catalog'}>В МАГАЗИН</button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      name: "Geometric Accent",
      content: (
        <div className="w-full h-64 flex overflow-hidden border-t" style={{ borderColor: colors.accentLight }}>
          <div className="w-1/4 bg-white hidden md:block border-r border-slate-50"></div>
          <div className="flex-1 flex flex-col justify-center items-center px-6 text-center" style={{ backgroundColor: colors.bgAlt }}>
            <h2 className="text-2xl font-bold mb-6">Выберите свой путь к здоровью</h2>
            <button className="px-12 py-3 bg-black text-white font-bold tracking-widest uppercase text-xs" onClick={() => window.location.hash = 'catalog'}>Shop Now</button>
          </div>
          <div className="w-1/4 bg-accent hidden md:block"></div>
        </div>
      )
    },
    {
      id: 9,
      name: "Eco Statement",
      content: (
        <div className="w-full py-20 px-6 text-center border-t border-accent/10" style={{ backgroundColor: "#f4f9f5" }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif italic mb-8" style={{ color: colors.text }}>Чистота намерений в каждом изделии</h2>
            <button className="px-12 py-4 bg-transparent border-2 font-bold rounded-lg transition-all hover:bg-accent hover:text-white" 
                    style={{ borderColor: colors.accent, color: colors.accent }}
                    onClick={() => window.location.hash = 'catalog'}>
              ПЕРЕЙТИ К ПРОДУКТАМ
            </button>
            <p className="mt-12 text-[10px] uppercase tracking-[0.4em] opacity-30">Pure Wellness. Est 2026.</p>
          </div>
        </div>
      )
    },
    {
      id: 10,
      name: "Split CTA",
      content: (
        <div className="w-full flex flex-col md:flex-row border-t" style={{ borderColor: colors.accentLight }}>
          <div className="flex-1 p-16 bg-white flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-bold mb-4">Остались вопросы?</h3>
            <button className="px-8 py-2 border border-black rounded-full font-bold text-xs">Связаться</button>
          </div>
          <div className="flex-1 p-16 bg-accent flex flex-col justify-center items-center text-center text-white">
            <h3 className="text-xl font-bold mb-4">Готовы купить?</h3>
            <button className="px-8 py-2 bg-white text-accent rounded-full font-bold text-xs" onClick={() => window.location.hash = 'catalog'}>В каталог</button>
          </div>
        </div>
      )
    },
    {
      id: 11,
      name: "Social Community",
      content: (
        <div className="w-full py-16 px-6 border-t" style={{ backgroundColor: colors.bgAlt, borderColor: colors.accentLight }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Присоединяйтесь к сообществу</h2>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-200"></div>)}
                <span className="text-sm self-center font-bold opacity-40">+ 12k участников</span>
              </div>
            </div>
            <button className="px-10 py-4 bg-accent text-white rounded-xl font-bold shadow-xl" onClick={() => window.location.hash = 'catalog'}>Магазин Wellness</button>
          </div>
        </div>
      )
    },
    {
      id: 12,
      name: "The Final Quote",
      content: (
        <div className="w-full py-24 px-6 text-center" style={{ backgroundColor: colors.bg }}>
          <div className="max-w-3xl mx-auto">
            <Quote className="w-10 h-10 mx-auto mb-10 opacity-20" style={{ color: colors.accent }} />
            <h2 className="text-4xl font-light italic mb-12 leading-tight">"Здоровье — это не отсутствие болезни, а полнота жизни"</h2>
            <button className="px-12 py-5 bg-black text-white rounded-none font-bold tracking-widest uppercase hover:bg-accent transition-all" onClick={() => window.location.hash = 'catalog'}>В КАТАЛОГ</button>
          </div>
        </div>
      )
    },
    {
      id: 13,
      name: "Modern Bento High",
      content: (
        <div className="w-full py-12 px-6" style={{ backgroundColor: colors.bgAlt }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col justify-end h-48">
              <span className="text-xs uppercase opacity-40 font-bold mb-2">Надежность</span>
              <div className="font-bold">Гарантия возврата</div>
            </div>
            <div className="bg-accent p-8 rounded-3xl flex flex-col justify-center items-center h-48 text-white cursor-pointer" onClick={() => window.location.hash = 'catalog'}>
              <div className="font-black text-2xl mb-2">МАГАЗИН</div>
              <ChevronRight />
            </div>
            <div className="bg-black p-8 rounded-3xl text-white flex flex-col justify-end h-48">
               <span className="text-xs uppercase opacity-40 font-bold mb-2">Локация</span>
               <div className="font-bold">Доставка по РФ</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 14,
      name: "Clean Navigation",
      content: (
        <div className="w-full bg-white border-t border-slate-100 pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Сделайте шаг навстречу себе</h2>
              <button className="px-8 py-3 bg-accent text-white rounded-lg font-bold" onClick={() => window.location.hash = 'catalog'}>Магазин</button>
            </div>
            <div className="text-sm opacity-60 flex flex-col gap-3">
              <div className="font-bold text-black opacity-100 mb-2">Каталог</div>
              <a href="#catalog">Все товары</a>
              <a href="#">Акции</a>
            </div>
            <div className="text-sm opacity-60 flex flex-col gap-3">
              <div className="font-bold text-black opacity-100 mb-2">Компания</div>
              <a href="#">О нас</a>
              <a href="#">Контакты</a>
            </div>
          </div>
          <div className="text-center text-[9px] uppercase tracking-[0.6em] opacity-20">© 2026 Wellness Solutions</div>
        </div>
      )
    },
    {
      id: 15,
      name: "Bold Impact",
      content: (
        <div className="w-full py-32 px-6 text-center bg-black text-white">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter italic uppercase leading-none">Верни свою энергию</h2>
          <button className="px-20 py-6 bg-white text-black rounded-full font-black text-2xl hover:bg-accent hover:text-white transition-all shadow-2xl" onClick={() => window.location.hash = 'catalog'}>В МАГАЗИН</button>
        </div>
      )
    },
    {
      id: 16,
      name: "Soft Leaf Minimal",
      content: (
        <div className="w-full py-20 px-6 text-center" style={{ backgroundColor: colors.bgAlt }}>
           <Leaf className="w-12 h-12 mx-auto mb-8 opacity-40" style={{ color: colors.accent }} />
           <h2 className="text-3xl font-bold mb-10" style={{ color: colors.text }}>Гармония внутри вас</h2>
           <button className="px-12 py-4 bg-accent text-white rounded-xl font-bold shadow-lg" onClick={() => window.location.hash = 'catalog'}>Смотреть каталог</button>
        </div>
      )
    },
    {
      id: 17,
      name: "Grid Specs Footer",
      content: (
        <div className="w-full py-16 px-6 border-t" style={{ backgroundColor: colors.bg, borderColor: colors.accentLight }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center md:text-left">
            <div>
              <div className="font-black text-accent text-2xl mb-1">100%</div>
              <div className="text-[10px] uppercase opacity-40">Натурально</div>
            </div>
            <div>
              <div className="font-black text-accent text-2xl mb-1">24/7</div>
              <div className="text-[10px] uppercase opacity-40">Поддержка</div>
            </div>
            <div>
              <div className="font-black text-accent text-2xl mb-1">ISO</div>
              <div className="text-[10px] uppercase opacity-40">Качество</div>
            </div>
            <div>
              <div className="font-black text-accent text-2xl mb-1">PFOA</div>
              <div className="text-[10px] uppercase opacity-40">Free</div>
            </div>
          </div>
          <div className="text-center">
             <button className="px-12 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs" onClick={() => window.location.hash = 'catalog'}>Заказать сейчас</button>
          </div>
        </div>
      )
    },
    {
      id: 18,
      name: "Floating Bento",
      content: (
        <div className="w-full py-12 px-6" style={{ backgroundColor: colors.bg }}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 h-64">
            <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center justify-center">
              <h2 className="text-2xl font-bold">Готовы?</h2>
            </div>
            <div className="w-full md:w-1/3 bg-accent rounded-[2.5rem] flex items-center justify-center text-white cursor-pointer hover-elevate" onClick={() => window.location.hash = 'catalog'}>
              <button className="font-black text-xl">В МАГАЗИН</button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 19,
      name: "Serene Horizon",
      content: (
        <div className="w-full py-32 px-6 text-center border-t border-black/5" style={{ backgroundColor: colors.bgAlt }}>
           <h2 className="text-4xl font-light mb-12 italic" style={{ color: colors.text }}>Ваш путь к долголетию начинается с одного шага</h2>
           <button className="px-12 py-4 border-2 border-accent text-accent font-black rounded-none hover:bg-accent hover:text-white transition-all" onClick={() => window.location.hash = 'catalog'}>В КАТАЛОГ</button>
        </div>
      )
    },
    {
      id: 20,
      name: "Modern Sidebar Style",
      content: (
        <div className="w-full py-16 px-6 border-t bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col gap-6 max-w-sm">
              <h2 className="text-3xl font-bold leading-tight">Подпишитесь на здоровье</h2>
              <div className="flex border-b border-black pb-2">
                <input type="text" placeholder="Ваш email" className="bg-transparent outline-none flex-1 text-sm" />
                <ChevronRight className="w-5 h-5 opacity-40" />
              </div>
            </div>
            <div className="flex flex-col gap-8 items-center md:items-end">
               <button className="px-12 py-4 bg-accent text-white rounded-xl font-bold shadow-xl" onClick={() => window.location.hash = 'catalog'}>Магазин Wellness</button>
               <div className="text-[10px] uppercase opacity-40 flex gap-6">
                 <span>Instagram</span>
                 <span>Telegram</span>
               </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 21,
      name: "Industrial Footer",
      content: (
        <div className="w-full bg-[#1a2e1f] py-16 px-6 text-white border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Wellness Core</h2>
              <p className="opacity-40 text-xs">Разработано в 2026. Все права защищены.</p>
            </div>
            <button className="px-12 py-5 bg-white text-black font-black hover:bg-accent hover:text-white transition-all" onClick={() => window.location.hash = 'catalog'}>ПЕРЕЙТИ В КАТАЛОГ</button>
          </div>
        </div>
      )
    },
    {
      id: 22,
      name: "Organic Wave",
      content: (
        <div className="w-full py-24 px-6 text-center overflow-hidden" style={{ backgroundColor: "#f8faf8" }}>
           <h2 className="text-4xl font-serif italic mb-10" style={{ color: colors.text }}>Природа знает лучше</h2>
           <button className="px-16 py-4 bg-accent text-white rounded-full font-bold text-lg hover-elevate shadow-2xl" onClick={() => window.location.hash = 'catalog'}>В МАГАЗИН</button>
           <div className="mt-20 h-1 w-full bg-accent/5 rounded-full max-w-xs mx-auto"></div>
        </div>
      )
    },
    {
      id: 23,
      name: "Bento Social Focus",
      content: (
        <div className="w-full py-12 px-6" style={{ backgroundColor: colors.bgAlt }}>
           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white p-12 rounded-[3rem] border border-slate-100 text-center">
               <h2 className="text-xl font-bold mb-6">Мы в соцсетях</h2>
               <div className="flex justify-center gap-4">
                 {[1,2,3].map(i => <div key={i} className="w-12 h-12 bg-slate-50 rounded-2xl"></div>)}
               </div>
             </div>
             <div className="bg-black p-12 rounded-[3rem] text-white flex flex-col justify-center items-center text-center">
                <h2 className="text-xl font-bold mb-6">Готовы к покупкам?</h2>
                <button className="px-10 py-3 bg-white text-black rounded-full font-bold" onClick={() => window.location.hash = 'catalog'}>В КАТАЛОГ</button>
             </div>
           </div>
        </div>
      )
    },
    {
      id: 24,
      name: "Text Centric Minimal",
      content: (
        <div className="w-full py-20 px-6 text-center border-t border-black/5" style={{ backgroundColor: colors.bg }}>
          <div className="max-w-2xl mx-auto">
             <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>Остались сомнения?</h2>
             <p className="opacity-60 text-sm mb-10">Посмотрите наши видео-обзоры и отзывы реальных покупателей на главной странице.</p>
             <button className="px-12 py-3 border border-black font-bold rounded-lg hover:bg-black hover:text-white transition-all" onClick={() => window.location.hash = 'catalog'}>ПЕРЕЙТИ В МАГАЗИН</button>
          </div>
        </div>
      )
    },
    {
      id: 25,
      name: "The Ultimate Statement",
      content: (
        <div className="w-full py-32 px-6 text-center text-white relative overflow-hidden" style={{ backgroundColor: colors.accentDark }}>
           <div className="absolute inset-0 opacity-10 flex items-center justify-center select-none pointer-events-none">
              <span className="text-[20vw] font-black italic">WELLNESS</span>
           </div>
           <div className="relative z-10">
             <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase leading-none italic">Ваше тело — это ваш храм</h2>
             <button className="px-20 py-6 bg-white text-accentDark rounded-full font-black text-2xl hover:bg-black hover:text-white transition-all shadow-2xl" onClick={() => window.location.hash = 'catalog'}>В КАТАЛОГ</button>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Switcher UI in Dev Mode - Fixed at bottom */}
      <div className="fixed bottom-4 left-4 z-[100] bg-white/80 backdrop-blur-md p-2 rounded-lg shadow-xl border border-slate-200 flex gap-2">
        <select 
          className="text-xs p-1 rounded border border-slate-300 outline-none"
          value={ctaVariant}
          onChange={(e) => setCtaVariant(Number(e.target.value))}
        >
          {ctaVariants.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>
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

          <div className="rounded-3xl overflow-hidden shadow-sm border" style={{ backgroundColor: colors.cardBg, borderColor: colors.accentLight }}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
            {products.map((product) => (
              <motion.div 
                key={product.id} 
                className="flex flex-col md:flex-row rounded-xl overflow-hidden card-shadow scale-[0.9] origin-center mb-0 md:mb-0 relative" 
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

      {/* FAQ Section */}
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

      {/* Footer Section */}
      <footer className="w-full border-t border-slate-200/50">
        {ctaVariants.find(v => v.id === ctaVariant)?.content}
      </footer>
    </div>
  );
}
