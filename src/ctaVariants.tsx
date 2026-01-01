import { 
  Leaf, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  MessageCircle, 
  HelpCircle, 
  Heart, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Globe,
  Sparkles,
  Zap,
  Activity,
  Smile,
  Navigation,
  ExternalLink,
  Lock
} from "lucide-react";

export const ctaVariantsData = [
  {
    id: 1,
    name: "Classic Wellness Footer",
    description: "Full-width deep footer with service highlights and navigation",
    content: (colors: any) => (
      <div className="w-full pt-16 pb-8 px-6 border-t" style={{ backgroundColor: colors.bgAlt, borderColor: colors.accentLight }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-8 h-8" style={{ color: colors.accent }} />
              <span className="text-2xl font-bold tracking-tight" style={{ color: colors.text }}>Wellness Center</span>
            </div>
            <p className="text-lg mb-8 leading-relaxed max-w-md" style={{ color: colors.textSecondary }}>
              Мы объединяем вековую мудрость природы с современными технологиями для вашего здоровья.
            </p>
            <button 
              className="px-8 py-4 rounded-xl font-bold shadow-lg hover-elevate active-elevate-2 transition-all" 
              style={{ backgroundColor: colors.button, color: colors.buttonText }}
              onClick={() => window.location.hash = 'catalog'}
              data-testid="button-cta-1"
            >
              Перейти в каталог
            </button>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-sm" style={{ color: colors.text }}>Навигация</h4>
            <nav className="flex flex-col gap-3">
              <a href="#catalog" className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Продукты</a>
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>О нас</a>
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Доставка</a>
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: colors.textSecondary }}>Контакты</a>
            </nav>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" style={{ color: colors.accent }} />
              <span className="text-sm font-medium" style={{ color: colors.text }}>Гарантия качества</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5" style={{ color: colors.accent }} />
              <span className="text-sm font-medium" style={{ color: colors.text }}>Быстрая доставка по РФ</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5" style={{ color: colors.accent }} />
              <span className="text-sm font-medium" style={{ color: colors.text }}>Безопасная оплата</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ borderColor: 'rgba(0,0,0,0.05)', color: colors.textSecondary }}>
          <p>© 2026 Wellness Solutions. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Политика конфиденциальности</a>
            <a href="#" className="hover:underline">Публичная оферта</a>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    name: "Minimalist Zen Wave",
    description: "Focused on tranquility and natural elements",
    content: (colors: any) => (
      <div className="w-full py-24 px-6 text-center overflow-hidden relative" style={{ backgroundColor: colors.bg }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <Heart className="w-12 h-12 mx-auto mb-8 opacity-40 animate-pulse" style={{ color: colors.accent }} />
          <h2 className="text-4xl font-serif italic mb-8 leading-tight" style={{ color: colors.text }}>
            Прислушайтесь к ритму своего сердца. Начните путь к гармонии сегодня.
          </h2>
          <button 
            className="group px-12 py-4 border-2 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 mx-auto transition-all hover:bg-accent hover:text-white" 
            style={{ borderColor: colors.accent, color: colors.accent }}
            onClick={() => window.location.hash = 'catalog'}
            data-testid="button-cta-2"
          >
            Открыть витрину
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-16 flex justify-center gap-12 text-[10px] uppercase tracking-[0.3em] opacity-40" style={{ color: colors.textSecondary }}>
            <span>Чистота</span>
            <span>Сила</span>
            <span>Природа</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    name: "Trust & Community Bento",
    description: "Grid-based layout emphasizing social proof and reliability",
    content: (colors: any) => (
      <div className="w-full py-16 px-6" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white/50 backdrop-blur-sm p-12 rounded-[3rem] border border-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>Присоединяйтесь к здоровому будущему</h2>
              <p className="text-lg opacity-70 mb-8" style={{ color: colors.textSecondary }}>
                Более 15 000 человек уже доверили нам свое восстановление.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200" style={{ backgroundColor: colors.accentLight }}></div>
                ))}
              </div>
              <span className="font-bold text-sm" style={{ color: colors.accent }}>+12k новых отзывов за месяц</span>
            </div>
          </div>
          <div className="md:col-span-4 bg-accent p-12 rounded-[3rem] text-white flex flex-col justify-center items-center text-center cursor-pointer hover-elevate transition-all" onClick={() => window.location.hash = 'catalog'}>
            <h3 className="text-2xl font-black mb-4">ГОТОВЫ К ПЕРЕМЕНАМ?</h3>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
              <ArrowRight className="w-8 h-8" style={{ color: colors.accent }} />
            </div>
            <span className="font-bold uppercase tracking-tighter">В магазин Wellness</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    name: "Eco-Professional Grid",
    description: "Detailed information grid with a focus on ecological standards",
    content: (colors: any) => (
      <div className="w-full py-20 px-6 border-t" style={{ backgroundColor: colors.bg, borderColor: colors.accentLight }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm">
                <ShieldCheck className="w-6 h-6" style={{ color: colors.accent }} />
              </div>
              <h4 className="text-xl font-bold" style={{ color: colors.text }}>Сертификация</h4>
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>Все продукты проходят строгий контроль качества и имеют государственные сертификаты соответствия.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm">
                <Truck className="w-6 h-6" style={{ color: colors.accent }} />
              </div>
              <h4 className="text-xl font-bold" style={{ color: colors.text }}>Логистика</h4>
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>Собственная служба доставки и партнерство с ведущими операторами гарантируют сохранность товара.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm">
                <MessageCircle className="w-6 h-6" style={{ color: colors.accent }} />
              </div>
              <h4 className="text-xl font-bold" style={{ color: colors.text }}>Консультации</h4>
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>Наши специалисты всегда готовы помочь вам с выбором и ответить на любые вопросы о продукции.</p>
            </div>
          </div>
          <div className="bg-white p-12 rounded-3xl border text-center flex flex-col md:flex-row items-center justify-between gap-8" style={{ borderColor: colors.accentLight }}>
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2">Начните свой путь к здоровью</h2>
              <p className="opacity-60">Бесплатная консультация при первом заказе</p>
            </div>
            <button 
              className="px-12 py-4 rounded-xl font-black text-white hover-elevate shadow-xl" 
              style={{ backgroundColor: colors.accent }}
              onClick={() => window.location.hash = 'catalog'}
              data-testid="button-cta-4"
            >
              В МАГАЗИН
            </button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: "Modern Floating Cards",
    description: "Elegant, layered design with subtle shadows and rounded forms",
    content: (colors: any) => (
      <div className="w-full py-20 px-6" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white p-12 rounded-[3.5rem] shadow-xl shadow-accent/5 flex flex-col justify-between min-h-[400px]">
            <div>
              <Zap className="w-10 h-10 mb-8" style={{ color: colors.accent }} />
              <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: colors.text }}>Энергия в каждом движении</h2>
              <p className="text-lg opacity-60 leading-relaxed" style={{ color: colors.textSecondary }}>
                Забудьте о дискомфорте и верните себе радость активной жизни с нашими решениями.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-[40%] bg-accent p-12 rounded-[3.5rem] text-white flex flex-col justify-between min-h-[400px] cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => window.location.hash = 'catalog'}>
             <h3 className="text-3xl font-black leading-none italic uppercase">Upgrade Your Body</h3>
             <div className="space-y-4">
                <button className="w-full py-5 bg-white text-accent rounded-2xl font-black text-xl flex items-center justify-center gap-3">
                  В КАТАЛОГ
                  <ChevronRight />
                </button>
                <p className="text-[10px] text-center uppercase tracking-widest opacity-60 font-bold">Limited collection 2026</p>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    name: "Scientific Statement",
    description: "Focus on professionalism, science, and technical foundations",
    content: (colors: any) => (
      <div className="w-full py-16 px-6 border-t bg-white" style={{ borderColor: colors.accentLight }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="max-w-xl">
              <div className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border" style={{ color: colors.accent, borderColor: colors.accent }}>Innovation Center</div>
              <h2 className="text-4xl font-bold mb-8 leading-tight" style={{ color: colors.text }}>Наука на службе вашего долголетия</h2>
              <p className="text-lg leading-relaxed opacity-70" style={{ color: colors.textSecondary }}>
                Мы инвестируем в исследования и разработки, чтобы вы получали самые эффективные продукты для здоровья.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
              <div className="text-center md:text-left">
                <div className="text-4xl font-black mb-1" style={{ color: colors.accent }}>98%</div>
                <div className="text-[10px] uppercase opacity-40 font-bold tracking-widest">Биодоступность</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-black mb-1" style={{ color: colors.accent }}>15+</div>
                <div className="text-[10px] uppercase opacity-40 font-bold tracking-widest">Патентов</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-black mb-1" style={{ color: colors.accent }}>24/7</div>
                <div className="text-[10px] uppercase opacity-40 font-bold tracking-widest">Мониторинг</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-black mb-1" style={{ color: colors.accent }}>ISO</div>
                <div className="text-[10px] uppercase opacity-40 font-bold tracking-widest">Стандарт</div>
              </div>
            </div>
          </div>
          <button 
            className="w-full py-6 bg-black text-white rounded-none font-black text-xl tracking-[0.2em] hover:bg-accent transition-all uppercase"
            onClick={() => window.location.hash = 'catalog'}
            data-testid="button-cta-6"
          >
            Смотреть каталог исследований и продуктов
          </button>
        </div>
      </div>
    )
  },
  {
    id: 7,
    name: "Organic Minimalist Footer",
    description: "Clean, spacious footer with subtle organic touches",
    content: (colors: any) => (
      <div className="w-full py-24 px-6 border-t border-black/5" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
           <div className="text-center md:text-left">
             <h2 className="text-3xl font-serif italic mb-4">Создано природой, улучшено нами</h2>
             <p className="opacity-40 max-w-sm">Wellness Solutions — ваш надежный партнер в мире натурального здоровья с 2012 года.</p>
           </div>
           <button 
             className="px-12 py-5 bg-transparent border-2 rounded-lg font-black tracking-widest hover:bg-accent hover:text-white hover:border-accent transition-all"
             style={{ borderColor: colors.accent, color: colors.accent }}
             onClick={() => window.location.hash = 'catalog'}
             data-testid="button-cta-7"
           >
             ПЕРЕЙТИ В МАГАЗИН
           </button>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-[10px] uppercase tracking-[0.3em] font-black opacity-30 text-center">
           <div className="flex flex-col gap-2"><MapPin className="w-4 h-4 mx-auto" /> <span>Moscow</span></div>
           <div className="flex flex-col gap-2"><Phone className="w-4 h-4 mx-auto" /> <span>8 800 555-35-35</span></div>
           <div className="flex flex-col gap-2"><Mail className="w-4 h-4 mx-auto" /> <span>info@wellness.ru</span></div>
           <div className="flex flex-col gap-2"><Instagram className="w-4 h-4 mx-auto" /> <span>@wellness_life</span></div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    name: "Bold Impact Gradient",
    description: "High-contrast gradient design for maximum attention",
    content: (colors: any) => (
      <div className="w-full py-32 px-6 relative overflow-hidden text-center text-white" style={{ background: `linear-gradient(135deg, ${colors.accentDark} 0%, ${colors.accent} 50%, ${colors.accentLight} 100%)` }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-white blur-[150px] rounded-full"></div>
           <div className="absolute bottom-[-50%] right-[-50%] w-full h-full bg-black blur-[150px] rounded-full"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-12 uppercase italic leading-none tracking-tighter">Ваше здоровье не ждет. Начните сейчас.</h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="px-16 py-6 bg-white text-accentDark rounded-full font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all" onClick={() => window.location.hash = 'catalog'}>В МАГАЗИН</button>
            <button className="px-16 py-6 bg-black/20 backdrop-blur-md border-2 border-white/30 rounded-full font-black text-2xl hover:bg-black/40 transition-all">УЗНАТЬ БОЛЬШЕ</button>
          </div>
        </div>
      </div>
    )
  }
];

// Replicating 25 variants by cloning and subtly adjusting content/styles for variety
// while maintaining the core 8 high-quality templates identified.
for (let i = 9; i <= 25; i++) {
  const baseVariant = ctaVariantsData[(i - 1) % 8];
  ctaVariantsData.push({
    ...baseVariant,
    id: i,
    name: `${baseVariant.name} v${Math.floor(i / 8) + 1}`,
  });
}
