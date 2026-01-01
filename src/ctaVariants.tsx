import { 
  ShoppingBag, 
  ArrowRight, 
  Package, 
  ShieldCheck, 
  CreditCard, 
  Truck,
  Heart,
  Star,
  Zap
} from "lucide-react";

export const ctaVariantsData = [
  {
    id: 1,
    name: "Minimal Order 1",
    content: (colors: any) => (
      <div className="w-full py-12 px-6 border-t" style={{ backgroundColor: colors.bg, borderColor: colors.accentLight }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>Готовы начать?</h2>
          <p className="text-lg mb-8 opacity-70" style={{ color: colors.textSecondary }}>Закажите оригинальный продукт прямо сейчас с доставкой.</p>
          <button className="px-10 py-4 rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all shadow-sm flex items-center gap-2 mx-auto" 
                  style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                  onClick={() => window.location.hash = 'catalog'}>
            <ShoppingBag className="w-5 h-5" />
            Заказать сейчас
          </button>
        </div>
      </div>
    )
  },
  {
    id: 2,
    name: "Minimal Order 2",
    content: (colors: any) => (
      <div className="w-full py-12 px-6 border-t" style={{ backgroundColor: colors.bgAlt, borderColor: colors.accentLight }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Ваш путь к здоровью начинается здесь</h2>
            <p className="opacity-70" style={{ color: colors.textSecondary }}>Оформите заказ и почувствуйте разницу.</p>
          </div>
          <button className="px-10 py-4 rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all shadow-sm" 
                  style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                  onClick={() => window.location.hash = 'catalog'}>
            Купить сейчас
          </button>
        </div>
      </div>
    )
  },
  {
    id: 3,
    name: "Minimal Order 3",
    content: (colors: any) => (
      <div className="w-full py-16 px-6 text-center" style={{ backgroundColor: colors.bg }}>
        <div className="max-w-2xl mx-auto border-2 p-10 rounded-lg" style={{ borderColor: colors.accentLight }}>
          <Zap className="w-10 h-10 mx-auto mb-6" style={{ color: colors.accent }} />
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.text }}>Закажите сейчас — получите результат</h2>
          <button className="w-full py-4 rounded-lg font-bold text-xl hover-elevate active-elevate-2 transition-all" 
                  style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                  onClick={() => window.location.hash = 'catalog'}>
            Оформить заказ
          </button>
        </div>
      </div>
    )
  },
  {
    id: 4,
    name: "Minimal Order 4",
    content: (colors: any) => (
      <div className="w-full py-12 px-6" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <h2 className="text-3xl font-bold">Официальный магазин</h2>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 opacity-80">
              <Truck className="w-5 h-5" />
              <span className="text-sm">Быстрая доставка</span>
            </div>
            <button className="px-12 py-4 bg-white rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all" 
                    style={{ color: colors.accent }}
                    onClick={() => window.location.hash = 'catalog'}>
              Заказать
            </button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: "Minimal Order 5",
    content: (colors: any) => (
      <div className="w-full py-14 px-6 border-t bg-slate-50" style={{ borderColor: colors.accentLight }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6" style={{ backgroundColor: colors.accentLight, color: colors.accent }}>
            <Star className="w-3 h-3 fill-current" />
            Выбор экспертов
          </div>
          <h2 className="text-3xl font-bold mb-8" style={{ color: colors.text }}>Верните легкость движений</h2>
          <button className="px-12 py-4 rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all shadow-md" 
                  style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                  onClick={() => window.location.hash = 'catalog'}>
            Заказать сейчас
          </button>
        </div>
      </div>
    )
  },
  {
    id: 6,
    name: "Minimal Order 6",
    content: (colors: any) => (
      <div className="w-full py-12 px-6 border-y bg-white" style={{ borderColor: colors.accentLight }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
             <h2 className="text-3xl font-bold leading-tight" style={{ color: colors.text }}>Начните новую главу вашего здоровья</h2>
             <p className="text-lg opacity-60" style={{ color: colors.textSecondary }}>Гарантия качества и оригинальности продукта от производителя.</p>
          </div>
          <div className="flex justify-end">
            <button className="w-full md:w-auto px-16 py-5 rounded-lg font-bold text-xl hover-elevate active-elevate-2 transition-all shadow-lg" 
                    style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                    onClick={() => window.location.hash = 'catalog'}>
              Купить
            </button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    name: "Minimal Order 7",
    content: (colors: any) => (
      <div className="w-full py-16 px-6 text-center" style={{ backgroundColor: colors.bgAlt }}>
        <h2 className="text-2xl font-bold mb-8 opacity-80" style={{ color: colors.text }}>Более 10,000 довольных клиентов</h2>
        <button className="px-12 py-4 rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all flex items-center gap-3 mx-auto" 
                style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                onClick={() => window.location.hash = 'catalog'}>
          Присоединиться и заказать
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    )
  },
  {
    id: 8,
    name: "Minimal Order 8",
    content: (colors: any) => (
      <div className="w-full py-12 px-6 border-t" style={{ backgroundColor: colors.bg, borderColor: colors.accentLight }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="flex gap-4 mb-2">
            <ShieldCheck className="w-6 h-6 opacity-40" style={{ color: colors.accent }} />
            <Package className="w-6 h-6 opacity-40" style={{ color: colors.accent }} />
            <CreditCard className="w-6 h-6 opacity-40" style={{ color: colors.accent }} />
          </div>
          <h2 className="text-3xl font-bold text-center" style={{ color: colors.text }}>Безопасный заказ напрямую</h2>
          <button className="px-14 py-4 rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all" 
                  style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                  onClick={() => window.location.hash = 'catalog'}>
            Заказать сейчас
          </button>
        </div>
      </div>
    )
  },
  {
    id: 9,
    name: "Minimal Order 9",
    content: (colors: any) => (
      <div className="w-full py-16 px-6" style={{ backgroundColor: colors.accentDark }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ваше здоровье — наш приоритет</h2>
          <p className="text-xl opacity-80 mb-10">Простой шаг к качественной жизни.</p>
          <button className="px-12 py-4 bg-white rounded-lg font-bold text-xl hover-elevate active-elevate-2 transition-all" 
                  style={{ color: colors.accentDark }}
                  onClick={() => window.location.hash = 'catalog'}>
            Оформить доставку
          </button>
        </div>
      </div>
    )
  },
  {
    id: 10,
    name: "Minimal Order 10",
    content: (colors: any) => (
      <div className="w-full py-14 px-6 border-t bg-white" style={{ borderColor: colors.accentLight }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-slate-50 border" style={{ borderColor: colors.accentLight }}>
              <Heart className="w-8 h-8" style={{ color: colors.accent }} />
            </div>
            <h2 className="text-2xl font-bold max-w-xs" style={{ color: colors.text }}>Сделайте подарок своему организму</h2>
          </div>
          <button className="px-12 py-4 rounded-lg font-bold text-lg hover-elevate active-elevate-2 transition-all shadow-md" 
                  style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                  onClick={() => window.location.hash = 'catalog'}>
            Заказать сейчас
          </button>
        </div>
      </div>
    )
  }
];
