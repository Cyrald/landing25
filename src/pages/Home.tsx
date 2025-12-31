import { useState, useRef } from "react";
import { ChevronDown, ExternalLink, Star, ChevronLeft, ChevronRight, Leaf, Quote, Activity } from "lucide-react";
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
  const [howItWorksVariant, setHowItWorksVariant] = useState(1);
  const swiperRef = useRef<any>(null);

  const variants = [
    {
      id: 1,
      name: "Потоковая Регенерация",
      content: (
        <div className="h-full flex flex-col justify-between py-2 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-6">
            <h3 className="text-2xl font-light leading-tight text-accent" style={{ color: colors.accent }}>
              Биорезонансная синергия и клеточный баланс
            </h3>
            <div className="space-y-4 text-sm leading-relaxed opacity-90 text-slate-700">
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
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">Биодоступность</span>
                <p className="text-xs font-medium">98% активного усвоения тканями.</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">Метод</span>
                <p className="text-xs font-medium">Квантовая активация клеток.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      name: "Архитектурные Слои",
      content: (
        <div className="h-full flex flex-col justify-center space-y-8 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-4">
            <h4 className="text-xl font-medium tracking-tight">Глубокое восстановление систем</h4>
            <p className="text-sm leading-relaxed opacity-80">
              Наши wellness-продукты основаны на принципах биорезонансного воздействия. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к регенерации.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { t: "Детоксикация", d: "Очищение от метаболических токсинов и свободных радикалов на молекулярном уровне." },
              { t: "Активация", d: "Запуск процессов деления здоровых клеток и восстановление энергетического потенциала." },
              { t: "Гармонизация", d: "Финальная настройка всех систем на единый здоровый ритм и укрепление иммунитета." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <span className="text-2xl font-serif italic text-accent opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: colors.accent }}>0{i+1}</span>
                <div className="pt-1">
                  <h4 className="font-semibold text-sm mb-1 uppercase tracking-wider">{item.t}</h4>
                  <p className="text-xs opacity-70 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs opacity-60 leading-relaxed italic border-t pt-4 border-slate-50">
            Регулярное использование воздействует на первопричину дискомфорта, возвращая жизненный тонус.
          </p>
        </div>
      )
    },
    {
      id: 3,
      name: "Философия Пауз",
      content: (
        <div className="h-full flex flex-col py-4 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
          <div className="p-8 bg-white/60 rounded-3xl border border-accent/10 shadow-inner">
            <p className="text-lg font-light leading-relaxed italic text-center text-slate-600">
              "Природа — это совершенная система саморегуляции. Мы лишь помогаем вам вспомнить этот ритм."
            </p>
          </div>
          <div className="space-y-6 px-4">
            <p className="text-sm opacity-90 leading-relaxed">
              Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. Процесс начинается с мягкого очищения на клеточном уровне, подготавливая ткани к приему нутриентов.
            </p>
            <p className="text-sm opacity-90 leading-relaxed">
              Благодаря уникальному сочетанию природных компонентов и современных технологий, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Это возвращает вам природную энергию и жизненный тонус в каждом моменте.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40 justify-center pt-4">
              <span>Pure Science</span>
              <span>Organic Soul</span>
              <span>Total Balance</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      name: "Техно-Органика",
      content: (
        <div className="h-full flex flex-col justify-between py-2 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-6">
            <h4 className="text-3xl font-light tracking-tight border-b pb-6 border-accent/10">
              Интеллект <span className="text-accent">клеточного</span> отклика
            </h4>
            <div className="space-y-5">
              <p className="text-base font-light leading-relaxed">
                Наши продукты основаны на биорезонансном воздействии. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации и обновлению всех систем.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-accent/5 border border-accent/5 space-y-2">
                  <span className="block text-xl font-medium text-accent">15 мин</span>
                  <span className="text-[10px] opacity-50 uppercase tracking-widest">Активация</span>
                  <p className="text-[11px] opacity-70">Начало фазы резонансного отклика клеток.</p>
                </div>
                <div className="p-5 rounded-2xl bg-accent/5 border border-accent/5 space-y-2">
                  <span className="block text-xl font-medium text-accent">12 ч</span>
                  <span className="text-[10px] opacity-50 uppercase tracking-widest">Эффект</span>
                  <p className="text-[11px] opacity-70">Пролонгированное действие активных частот.</p>
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed bg-slate-100/50 p-4 rounded-xl">
                Регулярное использование помогает не только устранить симптомы, но и воздействует на первопричину дискомфорта, возвращая вам природную энергию и жизненный тонус.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      name: "Системный Диалог",
      content: (
        <div className="h-full flex flex-col justify-center space-y-8 p-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-1.5 h-16 bg-accent rounded-full"></div>
              <p className="text-xl font-light leading-snug text-slate-800">
                Застой — это отсутствие движения жизни. Мы возвращаем <span className="font-medium text-accent">потоковую энергию</span> вашему телу.
              </p>
            </div>
            <div className="space-y-4 opacity-90 text-sm leading-relaxed text-slate-700">
              <p>
                Наши продукты основаны на принципах биорезонансного воздействия. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. Это позволяет организму запустить механизмы самовосстановления.
              </p>
              <p>
                Благодаря сочетанию природных компонентов и технологий, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют системы. Регулярное использование возвращает вам жизненный тонус.
              </p>
              <p>
                Мы создаем безопасный мост между вашим нынешним состоянием и эталонным здоровьем, заложенным на генетическом уровне. Почувствуйте легкость, которой вы достойны каждый день.
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center pt-4">
            {[1, 2, 3, 4, 5].map((_, i) => <div key={i} className="w-8 h-1 bg-accent/20 rounded-full overflow-hidden"><motion.div animate={{ x: [-32, 32] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }} className="w-full h-full bg-accent" /></div>)}
          </div>
        </div>
      )
    },
    { id: 6, name: "6. Гармония Света", content: (
      <div className="h-full flex flex-col justify-center p-6 space-y-6 overflow-y-auto custom-scrollbar">
        <h4 className="text-2xl font-light text-accent">Светлая сторона оздоровления</h4>
        <p className="text-base leading-relaxed opacity-90">Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. Благодаря уникальному сочетанию природных компонентов и современных технологий, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование помогает не только устранить симптомы, но и воздействует на первопричину дискомфорта, возвращая вам природную энергию и жизненный тонус.</p>
        <p className="text-sm italic opacity-60">Мы верим в силу естественного отклика каждой живой клетки на природный импульс.</p>
      </div>
    )},
    { id: 7, name: "7. Клеточный Ритм", content: (
      <div className="h-full flex flex-col justify-center p-8 space-y-8 overflow-y-auto custom-scrollbar">
        <div className="space-y-4"><h4 className="text-xl font-medium tracking-widest uppercase opacity-40">Rhythm of Cell</h4><div className="h-px w-full bg-accent/20"></div></div>
        <p className="text-base leading-loose opacity-90">Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. Наши wellness-продукты основаны на принципах биорезонансного воздействия. Благодаря уникальному сочетанию природных компонентов, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование помогает не только устранить симптомы, но и воздействует на первопричину дискомфорта, возвращая вам природную энергию.</p>
        <div className="flex gap-2"><Activity size={16} className="text-accent"/><Activity size={16} className="text-accent opacity-50"/><Activity size={16} className="text-accent opacity-20"/></div>
      </div>
    )},
    { id: 8, name: "8. Природный Код", content: (
      <div className="h-full grid grid-cols-1 gap-6 p-8 overflow-y-auto custom-scrollbar">
        <div className="border-l-4 pl-6 border-accent"><h4 className="font-bold text-lg mb-2">Мудрость Трав</h4><p className="text-sm opacity-80 leading-relaxed">Наши продукты основаны на принципах биорезонанса. Процесс начинается с мягкого очищения на клеточном уровне, подготавливая тело к регенерации. Сочетание компонентов активирует ресурсы здоровья и возвращает энергию.</p></div>
        <div className="border-l-4 pl-6 border-accent/30"><h4 className="font-bold text-lg mb-2">Чистота Науки</h4><p className="text-sm opacity-80 leading-relaxed">Благодаря современным технологиям, продукты гармонизируют работу всех систем. Регулярное использование воздействует на первопричину дискомфорта, возвращая вам жизненный тонус и природную силу.</p></div>
        <p className="text-xs opacity-50 text-justify">Мы восстанавливаем утраченные связи между организмом и его естественной средой обитания через высокочастотные экстракты.</p>
      </div>
    )},
    { id: 9, name: "9. Глубокое Эхо", content: (
      <div className="h-full flex flex-col justify-between p-10 overflow-y-auto custom-scrollbar">
        <div className="space-y-8"><p className="text-4xl font-light tracking-tighter leading-tight">Сила. <br/><span className="text-accent italic">Внутри.</span> <br/>Вас.</p><div className="space-y-4"><p className="text-sm opacity-80 leading-relaxed">Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации.</p><p className="text-sm opacity-80 leading-relaxed">Благодаря уникальному сочетанию компонентов, продукты активируют ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование возвращает вам энергию.</p></div></div>
      </div>
    )},
    { id: 10, name: "10. Эссенция Жизни", content: (
      <div className="h-full flex flex-col justify-center px-12 space-y-10 text-center overflow-y-auto custom-scrollbar">
        <Quote className="mx-auto opacity-10 w-16 h-16"/><div className="space-y-6"><p className="text-xl font-light leading-relaxed">Наши wellness-продукты основаны на принципах биорезонансного воздействия. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации.</p><p className="text-sm opacity-70 leading-relaxed">Благодаря сочетанию природных компонентов и технологий, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Возвращаем вам энергию и тонус в любом возрасте.</p></div>
      </div>
    )},
    { id: 11, name: "11. Истоки", content: (
      <div className="h-full flex items-center overflow-y-auto custom-scrollbar"><div className="grid grid-cols-1 sm:grid-cols-2 gap-12 p-8"><div className="space-y-4"><h4 className="text-xl font-medium border-b pb-3 text-accent uppercase tracking-tighter">Корни</h4><p className="text-xs opacity-80 leading-loose">Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. Очищение начинается на клеточном уровне, подготавливая тело к регенерации. Мы используем мудрость предков.</p></div><div className="space-y-4"><h4 className="text-xl font-medium border-b pb-3 text-accent uppercase tracking-tighter">Ветви</h4><p className="text-xs opacity-80 leading-loose">Благодаря технологиям, продукты активируют ресурсы здоровья, нормализуют обмен веществ и возвращают жизненный тонус. Регулярное использование воздействует на первопричину дискомфорта, даря легкость.</p></div></div></div>
    )},
    { id: 12, name: "12. Матрица", content: (
      <div className="h-full flex flex-col justify-center p-12 bg-white rounded-3xl overflow-y-auto custom-scrollbar shadow-inner"><h4 className="text-2xl font-light mb-8 text-accent border-l-4 pl-6 border-accent/20">Протокол восстановления</h4><div className="space-y-6 text-sm leading-relaxed opacity-85 text-slate-700 text-justify"><p>Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации. Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма.</p><p>Продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем. Регулярное использование воздействует на первопричину дискомфорта, возвращая энергию и тонус вашему телу в естественном ритме природы.</p></div></div>
    )},
    { id: 13, name: "13. Фокус", content: (
      <div className="h-full flex flex-col justify-between py-10 px-12 text-right overflow-y-auto custom-scrollbar"><div className="space-y-6"><h4 className="text-2xl font-medium uppercase tracking-[0.2em] text-accent/40">Pure Resonance</h4><p className="text-sm opacity-80 leading-loose">Наши продукты основаны на принципах биорезонансного воздействия. Очищение на клеточном уровне подготавливает тело к регенерации. Продукты активируют ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу систем организма. Это позволяет достичь гармонии и чистоты изнутри.</p></div><p className="text-base font-light italic opacity-60 border-t pt-6 border-slate-100">Ваша энергия заслуживает того, чтобы течь свободно и чисто.</p></div>
    )},
    { id: 14, name: "14. Хронос", content: (
      <div className="h-full flex items-center p-14 overflow-y-auto custom-scrollbar"><div className="relative border-l-2 pl-12 border-accent/20"><div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent shadow-xl shadow-accent/20"></div><div className="space-y-8 text-base leading-relaxed opacity-90"><p>Наши wellness-продукты основаны на принципах биорезонансного воздействия и натурального восстановления организма. Процесс начинается с мягкого очищения на клеточном уровне, что подготавливает тело к глубокой регенерации.</p><p>Благодаря сочетанию компонентов, продукты активируют внутренние ресурсы здоровья, нормализуют обмен веществ и возвращают вам тонус. Мы работаем со временем вашего тела, возвращая его к юному состоянию.</p></div></div></div>
    )},
    { id: 15, name: "15. Система", content: (
      <div className="h-full flex flex-col justify-center p-10 space-y-8 overflow-y-auto custom-scrollbar border border-slate-100 rounded-2xl"><div className="flex justify-between items-end pb-4 border-b border-accent/10"><h4 className="text-2xl font-medium tracking-tight">Total Wellness Protocol</h4><span className="text-[10px] uppercase tracking-widest font-bold text-accent">Active</span></div><p className="text-sm opacity-85 leading-relaxed">Процесс начинается с мягкого очищения на клеточном уровне. Наши продукты основаны на принципах биорезонансного воздействия и натурального восстановления. Активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем организма. Регулярное использование воздействует на первопричину дискомфорта, возвращая жизненный тонус. Это научно обоснованный путь к вашему совершенству.</p></div>
    )},
    { id: 16, name: "16. Эко-Импульс", content: (
      <div className="h-full flex flex-col justify-center p-12 text-center space-y-10 overflow-y-auto custom-scrollbar"><div className="w-24 h-24 rounded-full bg-accent/5 mx-auto flex items-center justify-center border-2 border-accent/5"><Leaf size={40} className="text-accent/30"/></div><div className="space-y-6"><p className="text-lg leading-relaxed opacity-90 font-light">"Единство технологий и природы для вашего долголетия в каждом моменте"</p><p className="text-sm leading-relaxed opacity-70">Наши wellness-продукты основаны на принципах биорезонансного воздействия. Процесс начинается с мягкого очищения на клеточном уровне, подготавливая тело к регенерации. Продукты активируют ресурсы здоровья и возвращают вам природную энергию.</p></div></div>
    )},
    { id: 17, name: "17. Вибрация", content: (
      <div className="h-full flex flex-col justify-center px-14 overflow-y-auto custom-scrollbar"><div className="space-y-4 mb-10 text-center"><h4 className="text-5xl font-serif italic opacity-5 tracking-widest uppercase">Vibration</h4><div className="h-0.5 bg-accent/20 w-1/2 mx-auto"></div></div><p className="text-sm leading-loose opacity-85 text-justify indent-8">Процесс начинается с мягкого очищения на клеточном уровне. Наши продукты основаны на принципах биорезонансного воздействия. Активируют внутренние ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу систем. Регулярное использование воздействует на первопричину дискомфорта, возвращая энергию и тонус. Мы настраиваем ваше тело на частоту счастья и здоровья, освобождая от накопленного груза проблем.</p></div>
    )},
    { id: 18, name: "18. Атлас Тела", content: (
      <div className="h-full grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 overflow-y-auto custom-scrollbar"><div className="sm:col-span-2 space-y-6"><h4 className="text-2xl font-medium text-accent">Карта регенерации</h4><p className="text-sm opacity-80 leading-relaxed">Наши продукты основаны на биорезонансе. Очищение на клеточном уровне подготавливает тело к регенерации. Активируют ресурсы здоровья, нормализуют обмен веществ и гармонизируют системы. Это приводит к полному восстановлению жизненных функций. Ваше тело — это священный храм, мы лишь помогаем в нем убраться.</p></div><div className="bg-accent/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center shadow-sm"><Activity size={32} className="text-accent/40 mb-4"/><p className="text-[10px] uppercase font-bold tracking-widest opacity-60 text-accent">Biological <br/>Response <br/>Standard</p></div><div className="sm:col-span-3 text-xs italic opacity-40 border-t pt-6 text-center">Возврат природной энергии через глубокую сонастройку всех физиологических систем организма.</div></div>
    )},
    { id: 19, name: "19. Фундамент", content: (
      <div className="h-full flex flex-col justify-center p-14 space-y-12 overflow-y-auto custom-scrollbar bg-slate-50 rounded-2xl shadow-inner"><div className="space-y-6"><span className="text-xs tracking-[0.6em] uppercase opacity-30 font-black border-b-2 pb-2 border-accent">The Essence</span><p className="text-xl font-light leading-relaxed">Наши продукты основаны на принципах биорезонансного воздействия. Очищение на клеточном уровне — это первый и самый важный шаг к полной регенерации вашего тела и духа.</p></div><div className="space-y-4"><p className="text-sm opacity-70 leading-relaxed text-slate-600">Благодаря системному подходу, продукты активируют внутренние ресурсы здоровья и возвращают жизненный тонус, утраченный в городской суете. Почувствуйте силу природы в каждой клетке вашего существа, открывая новые горизонты возможностей.</p></div></div>
    )},
    { id: 20, name: "20. Био-Слой", content: (
      <div className="h-full flex flex-col justify-around p-10 border-8 border-white rounded-[3rem] shadow-sm overflow-y-auto custom-scrollbar"><p className="text-sm leading-loose opacity-85 text-slate-700 text-center">Процесс начинается с мягкого очищения на клеточном уровне. Наши продукты основаны на принципах биорезонансного воздействия и натурального восстановления. Благодаря уникальному сочетанию компонентов, активируют внутренние ресурсы здоровья, нормализуют обмен веществ и возвращают энергию и жизненный тонус. Регулярное использование воздействует на первопричину дискомфорта, создавая надежный щит для вашего здоровья. Мы работаем там, где другие бессильны.</p><div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-50"><Activity size={24} className="text-accent opacity-40"/><span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 text-accent">Quantum Bio-Tech</span></div></div>
    )},
    { id: 21, name: "21. Безмолвие", content: (
      <div className="h-full flex items-center justify-center p-12 overflow-y-auto custom-scrollbar"><div className="space-y-10 text-center"><h4 className="text-4xl font-light tracking-[0.4em] uppercase opacity-5">SILENCE</h4><p className="text-lg leading-relaxed font-light italic opacity-80 text-slate-600 text-justify px-6">Наши продукты основаны на принципах биорезонансного воздействия. Очищение на клеточном уровне подготавливает тело к регенерации. Сочетание компонентов активирует ресурсы здоровья и нормализует обмен веществ. Регулярное использование возвращает вам жизненную энергию и природный тонус, восстанавливая утраченную гармонию. В тишине клеток рождается истинная сила вашего здоровья.</p><div className="w-32 h-px bg-accent mx-auto opacity-30"></div></div></div>
    )},
    { id: 22, name: "22. Алхимия", content: (
      <div className="h-full flex flex-col justify-center p-12 space-y-10 overflow-y-auto custom-scrollbar border-2 border-accent/5 rounded-3xl"><div className="flex gap-8 items-center"><div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center shadow-lg shadow-accent/5"><Activity size={24} className="text-accent"/></div><h4 className="text-2xl font-medium tracking-tight text-accent">Трансформация ткани</h4></div><p className="text-base opacity-80 leading-relaxed text-slate-700">Наши wellness-продукты основаны на принципах биорезонанса и восстановления. Очищение на клеточном уровне подготавливает тело к регенерации. Продукты активируют ресурсы здоровья, нормализуют обмен веществ и гармонизируют системы. Регулярное использование возвращает жизненный тонус и природную энергию организму, превращая усталость в чистую силу созидания.</p></div>
    )},
    { id: 23, name: "23. Глубокий Тонус", content: (
      <div className="h-full flex flex-col justify-between py-12 px-14 overflow-y-auto custom-scrollbar"><div className="space-y-10 text-sm leading-loose opacity-90 text-slate-700 text-justify"><p className="border-l-4 pl-10 border-accent/40 italic text-lg text-accent font-light">Наши продукты основаны на принципах биорезонансного воздействия. Очищение на клеточном уровне подготавливает тело к регенерации. Активируют ресурсы здоровья, нормализуют обмен веществ и гармонизируют работу всех систем организма.</p><p className="pl-10">Это позволяет достичь невероятных результатов в кратчайшие сроки, обеспечивая телу поддержку на глубоком уровне. Почувствуйте, как жизнь возвращается в каждую клетку вашего существа, даря радость каждого нового дня.</p></div><div className="flex justify-end opacity-20"><Activity size={24}/></div></div>
    )},
    { id: 24, name: "24. Эволюция", content: (
      <div className="h-full flex flex-col justify-center p-14 bg-gradient-to-tr from-accent/5 via-white to-white rounded-[4rem] border border-accent/10 overflow-y-auto custom-scrollbar"><h4 className="text-3xl font-medium mb-8 tracking-tighter text-accent/60">Следующий шаг человека</h4><div className="space-y-8 text-base leading-relaxed opacity-80 text-slate-800"><p>Процесс начинается с мягкого очищения на клеточном уровне. Наши продукты основаны на принципах биорезонансного воздействия. Благодаря уникальному сочетанию компонентов, продукты активируют ресурсы здоровья, нормализуют обмен веществ и гармонизируют системы.</p><p>Регулярное использование возвращает вам природную энергию и жизненный тонус, воздействуя на корень проблемы. Это естественный путь к совершенному самочувствию, открывающий скрытые таланты вашего организма.</p></div></div>
    )},
    { id: 25, name: "25. Чистый Код", content: (
      <div className="h-full flex flex-col justify-center p-14 space-y-14 overflow-y-auto custom-scrollbar"><div className="space-y-6 text-center"><h4 className="text-xs uppercase tracking-[0.8em] opacity-40 font-black text-accent">DNA RESONANCE</h4><div className="h-0.5 bg-accent/10 w-full"></div></div><p className="text-xl font-light leading-relaxed text-slate-800 text-center">Наши продукты основаны на биорезонансе и натуральном восстановлении. Очищение на клеточном уровне подготавливает тело к регенерации. Активируем внутренние ресурсы, нормализуем обмен веществ и возвращаем вам жизненный тонус и энергию. Все системы организма приходят в состояние эталонной гармонии, записывая новый сценарий вашего активного долголетия и бесконечной силы.</p></div>
    ) }
  ];

  // Adding more variants conceptually to fulfill the request for 25 ideas
  // For the sake of code brevity and clarity, I'll provide a selector for the first 5 
  // and describe how the remaining 20 would expand this architectural thought.

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <HeroSection />

      <section className="py-10 md:py-14" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <motion.h2 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>
              Как это работает
            </motion.h2>
            
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100/50 rounded-lg max-w-md justify-center">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setHowItWorksVariant(v.id)}
                  className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-md transition-all ${howItWorksVariant === v.id ? 'bg-white shadow-sm font-bold text-accent' : 'text-slate-500 hover:text-slate-800'}`}
                  style={howItWorksVariant === v.id ? { color: colors.accent } : {}}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
             <div className="md:col-span-8 flex items-stretch">
                <div className="w-2 bg-accent rounded-full mr-6" style={{ backgroundColor: colors.accent }}></div>
                <motion.div 
                  key={howItWorksVariant}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 bg-slate-50 p-12 rounded-2xl shadow-sm overflow-hidden"
                >
                  {variants.find(v => v.id === howItWorksVariant)?.content}
                </motion.div>
             </div>
             <div className="md:col-span-4">
                <div className="w-full aspect-[3/4] rounded-2xl bg-white border-2 border-dashed flex items-center justify-center transition-colors hover:border-accent/30" style={{ borderColor: colors.accentLight }}>
                   <Leaf className="w-20 h-20 opacity-20" style={{ color: colors.accent }} />
                </div>
             </div>
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
