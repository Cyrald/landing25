import { useState } from "react";
import { ChevronLeft, ChevronRight, Leaf, TreePine, Flower2, Mountain, Sun, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Вариант 1: Утренняя роса - свежий, лёгкий, мятные оттенки
const MorningDewTheme = {
  name: "Утренняя роса",
  description: "Свежесть раннего утра, капли росы на листьях",
  icon: Leaf,
  colors: {
    bg: "#f0fdf4",
    bgAlt: "#ffffff",
    accent: "#10b981",
    accentLight: "#d1fae5",
    accentDark: "#059669",
    text: "#064e3b",
    textSecondary: "#6b7280",
  }
};

// Вариант 2: Лесная тропа - тёплые земляные тона
const ForestPathTheme = {
  name: "Лесная тропа",
  description: "Тёплые древесные тона, запах хвои и мха",
  icon: TreePine,
  colors: {
    bg: "#fefce8",
    bgAlt: "#ffffff",
    accent: "#84cc16",
    accentLight: "#ecfccb",
    accentDark: "#65a30d",
    text: "#365314",
    textSecondary: "#78716c",
  }
};

// Вариант 3: Японский сад - минималистичный дзен
const ZenGardenTheme = {
  name: "Японский сад",
  description: "Гармония и баланс, спокойствие камней и воды",
  icon: Sparkles,
  colors: {
    bg: "#f5f5f4",
    bgAlt: "#ffffff",
    accent: "#78716c",
    accentLight: "#e7e5e4",
    accentDark: "#57534e",
    text: "#292524",
    textSecondary: "#a8a29e",
  }
};

// Вариант 4: Травяная аптека - винтаж, ботаника
const HerbalApothecaryTheme = {
  name: "Травяная аптека",
  description: "Мудрость природы, целебные травы",
  icon: Flower2,
  colors: {
    bg: "#fef7ed",
    bgAlt: "#fffbeb",
    accent: "#b45309",
    accentLight: "#fde68a",
    accentDark: "#92400e",
    text: "#451a03",
    textSecondary: "#a16207",
  }
};

// Вариант 5: Горный источник - чистота, прохлада
const MountainSpringTheme = {
  name: "Горный источник",
  description: "Кристальная чистота горных вод",
  icon: Mountain,
  colors: {
    bg: "#f0f9ff",
    bgAlt: "#ffffff",
    accent: "#0ea5e9",
    accentLight: "#e0f2fe",
    accentDark: "#0284c7",
    text: "#0c4a6e",
    textSecondary: "#64748b",
  }
};

// Вариант 6: Солнечный луг - тёплый, золотистый
const SunnyMeadowTheme = {
  name: "Солнечный луг",
  description: "Тепло летнего солнца, аромат полевых цветов",
  icon: Sun,
  colors: {
    bg: "#fffbeb",
    bgAlt: "#ffffff",
    accent: "#f59e0b",
    accentLight: "#fef3c7",
    accentDark: "#d97706",
    text: "#78350f",
    textSecondary: "#92400e",
  }
};

const themes = [
  MorningDewTheme,
  ForestPathTheme,
  ZenGardenTheme,
  HerbalApothecaryTheme,
  MountainSpringTheme,
  SunnyMeadowTheme,
];

const products = [
  { id: 1, name: "MediPatch Классик", price: "990 ₽", desc: "Универсальный пластырь для ежедневного применения" },
  { id: 2, name: "MediPatch Форте", price: "1 490 ₽", desc: "Усиленная формула для интенсивной терапии" },
  { id: 3, name: "MediPatch Спорт", price: "1 290 ₽", desc: "Специально для спортсменов и активных людей" },
];

const benefits = [
  { title: "100% натуральный состав", desc: "Только природные компоненты без химии" },
  { title: "Быстрое действие", desc: "Облегчение уже через 15 минут" },
  { title: "Длительный эффект", desc: "До 24 часов непрерывного действия" },
  { title: "Гипоаллергенно", desc: "Подходит для чувствительной кожи" },
];

interface ThemeProps {
  theme: typeof MorningDewTheme;
}

// ============ ВАРИАНТ 1: Утренняя роса ============
function MorningDewVariant({ theme }: ThemeProps) {
  const { colors } = theme;
  
  return (
    <div style={{ backgroundColor: colors.bg }} className="min-h-screen">
      {/* Hero */}
      <section className="py-20" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: colors.accentLight }}>
              <Leaf className="w-4 h-4" style={{ color: colors.accent }} />
              <span className="text-sm font-medium" style={{ color: colors.accentDark }}>Сила природы</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: colors.text }}>
              Исцеление от природы
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
              Каждое утро природа дарит нам свежесть и силу. MediPatch собирает эту энергию для вашего здоровья.
            </p>
          </div>
          
          {/* Баннер с "росой" */}
          <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "1820/500", backgroundColor: colors.accentLight }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center gap-4 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ 
                        backgroundColor: colors.accent,
                        animationDelay: `${i * 0.2}s`,
                        opacity: 0.6 + i * 0.1
                      }}
                    />
                  ))}
                </div>
                <span className="text-2xl font-light" style={{ color: colors.accentDark }}>1820 × 500</span>
              </div>
            </div>
            {/* Декоративные капли */}
            <div className="absolute top-10 left-10 w-8 h-8 rounded-full" style={{ backgroundColor: `${colors.accent}30` }} />
            <div className="absolute top-20 right-20 w-12 h-12 rounded-full" style={{ backgroundColor: `${colors.accent}20` }} />
            <div className="absolute bottom-16 left-1/4 w-6 h-6 rounded-full" style={{ backgroundColor: `${colors.accent}40` }} />
          </div>
        </div>
      </section>

      {/* Философия */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-light leading-relaxed" style={{ color: colors.text }}>
            "Мы верим, что природа — лучший целитель. Каждый пластырь MediPatch создан с любовью и заботой о вашем благополучии."
          </p>
        </div>
      </section>

      {/* Преимущества в виде листьев */}
      <section className="py-20" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: colors.text }}>
            Почему выбирают нас
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center group">
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <Leaf className="w-8 h-8" style={{ color: colors.accent }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: colors.text }}>{benefit.title}</h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Продукты */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: colors.text }}>
            Наша линейка
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="rounded-2xl p-8 text-center transition-all hover:shadow-lg"
                style={{ backgroundColor: colors.bgAlt, border: `1px solid ${colors.accentLight}` }}
              >
                <div 
                  className="w-full aspect-square rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <span className="text-6xl font-light" style={{ color: colors.accent }}>{product.id}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{product.name}</h3>
                <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>{product.desc}</p>
                <div className="text-2xl font-bold" style={{ color: colors.accent }}>{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Начните путь к здоровью</h2>
          <p className="text-lg mb-8 text-white/80">Почувствуйте силу природы уже сегодня</p>
          <button className="px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105" style={{ backgroundColor: colors.bgAlt, color: colors.accent }}>
            Заказать сейчас
          </button>
        </div>
      </section>
    </div>
  );
}

// ============ ВАРИАНТ 2: Лесная тропа ============
function ForestPathVariant({ theme }: ThemeProps) {
  const { colors } = theme;
  
  return (
    <div style={{ backgroundColor: colors.bg }} className="min-h-screen">
      {/* Hero с древесными элементами */}
      <section className="py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-24" style={{ backgroundColor: colors.accent }} />
            <TreePine className="w-8 h-8" style={{ color: colors.accent }} />
            <div className="h-px flex-1 max-w-24" style={{ backgroundColor: colors.accent }} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-6" style={{ color: colors.text }}>
            Мудрость древнего леса
          </h1>
          <p className="text-center text-lg max-w-2xl mx-auto mb-12" style={{ color: colors.textSecondary }}>
            Веками люди обращались к лесу за исцелением. MediPatch продолжает эту традицию.
          </p>

          {/* Баннер с "корой" */}
          <div 
            className="rounded-2xl overflow-hidden relative"
            style={{ 
              aspectRatio: "1820/500", 
              backgroundColor: colors.accentLight,
              border: `3px solid ${colors.accent}`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <TreePine className="w-16 h-16 mx-auto mb-4" style={{ color: colors.accentDark }} />
                <span className="text-xl font-serif" style={{ color: colors.accentDark }}>1820 × 500</span>
              </div>
            </div>
            {/* Декоративные кольца как годовые кольца дерева */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 opacity-20" style={{ borderColor: colors.accent }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 opacity-30" style={{ borderColor: colors.accent }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 opacity-40" style={{ borderColor: colors.accent }} />
          </div>
        </div>
      </section>

      {/* Цитата */}
      <section className="py-16" style={{ backgroundColor: colors.accentLight }}>
        <div className="max-w-3xl mx-auto px-6">
          <blockquote className="text-center">
            <p className="text-2xl font-serif italic mb-4" style={{ color: colors.text }}>
              "Лес — это не просто деревья. Это целая вселенная исцеления."
            </p>
            <cite className="text-sm" style={{ color: colors.textSecondary }}>— Философия MediPatch</cite>
          </blockquote>
        </div>
      </section>

      {/* Путь к здоровью */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center mb-16" style={{ color: colors.text }}>
            Ваш путь к здоровью
          </h2>
          
          <div className="relative">
            {/* Линия пути */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block" style={{ backgroundColor: colors.accentLight }} />
            
            <div className="space-y-12">
              {["Выберите продукт", "Нанесите на кожу", "Почувствуйте облегчение", "Наслаждайтесь жизнью"].map((step, idx) => (
                <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 text-center md:text-right">
                    <div 
                      className="inline-block px-6 py-4 rounded-xl"
                      style={{ backgroundColor: colors.bgAlt, border: `1px solid ${colors.accentLight}` }}
                    >
                      <span className="text-sm font-medium" style={{ color: colors.accent }}>Шаг {idx + 1}</span>
                      <h3 className="text-lg font-semibold mt-1" style={{ color: colors.text }}>{step}</h3>
                    </div>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <span className="text-white font-bold">{idx + 1}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Продукты как пеньки */}
      <section className="py-20" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center mb-16" style={{ color: colors.text }}>
            Дары леса
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="text-center">
                <div 
                  className="w-40 h-40 mx-auto rounded-full mb-6 flex items-center justify-center"
                  style={{ 
                    backgroundColor: colors.accentLight,
                    border: `4px solid ${colors.accent}`
                  }}
                >
                  <span className="text-5xl font-serif" style={{ color: colors.accentDark }}>{product.id}</span>
                </div>
                <h3 className="text-xl font-serif mb-2" style={{ color: colors.text }}>{product.name}</h3>
                <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>{product.desc}</p>
                <div className="text-xl font-bold" style={{ color: colors.accent }}>{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <TreePine className="w-12 h-12 mx-auto mb-6 text-white/80" />
          <h2 className="text-2xl font-serif mb-4 text-white">Ступите на тропу здоровья</h2>
          <button 
            className="px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
            style={{ backgroundColor: colors.bgAlt, color: colors.accent }}
          >
            Начать путешествие
          </button>
        </div>
      </section>
    </div>
  );
}

// ============ ВАРИАНТ 3: Японский сад ============
function ZenGardenVariant({ theme }: ThemeProps) {
  const { colors } = theme;
  
  return (
    <div style={{ backgroundColor: colors.bg }} className="min-h-screen">
      {/* Минималистичный Hero */}
      <section className="py-24" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-8 mb-12">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-6" style={{ color: colors.text }}>
              調和
            </h1>
            <p className="text-sm tracking-widest uppercase mb-2" style={{ color: colors.textSecondary }}>
              Гармония
            </p>
            <p className="text-lg max-w-lg mx-auto" style={{ color: colors.textSecondary }}>
              В тишине сада рождается понимание. В простоте — совершенство.
            </p>
          </div>

          {/* Баннер в стиле дзен */}
          <div 
            className="relative overflow-hidden"
            style={{ aspectRatio: "1820/500", backgroundColor: colors.accentLight }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-0.5 mx-auto mb-6" style={{ backgroundColor: colors.accent }} />
                <span className="text-lg tracking-widest" style={{ color: colors.accent }}>1820 × 500</span>
                <div className="w-24 h-0.5 mx-auto mt-6" style={{ backgroundColor: colors.accent }} />
              </div>
            </div>
            {/* Волны дзен-сада */}
            <svg className="absolute bottom-0 left-0 right-0 h-20 opacity-20" viewBox="0 0 1820 80" preserveAspectRatio="none">
              <path d="M0,40 Q455,0 910,40 T1820,40 V80 H0 Z" fill={colors.accent} />
            </svg>
          </div>
        </div>
      </section>

      {/* Принципы */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            {[
              { jp: "自然", ru: "Природа", desc: "Натуральные ингредиенты" },
              { jp: "均衡", ru: "Баланс", desc: "Гармония тела и духа" },
              { jp: "治療", ru: "Исцеление", desc: "Мягкое восстановление" },
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-4xl mb-2" style={{ color: colors.text }}>{item.jp}</p>
                <p className="text-sm tracking-widest uppercase mb-4" style={{ color: colors.accent }}>{item.ru}</p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Продукты */}
      <section className="py-24" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-light" style={{ color: colors.text }}>Коллекция</h2>
          </div>
          
          <div className="space-y-8">
            {products.map((product, idx) => (
              <div 
                key={product.id}
                className="flex items-center gap-8 p-6"
                style={{ borderBottom: idx < products.length - 1 ? `1px solid ${colors.accentLight}` : 'none' }}
              >
                <div 
                  className="w-20 h-20 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <span className="text-2xl font-light" style={{ color: colors.accent }}>{product.id}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1" style={{ color: colors.text }}>{product.name}</h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{product.desc}</p>
                </div>
                <div className="text-lg" style={{ color: colors.text }}>{product.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Цитата */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xl font-light leading-relaxed mb-8" style={{ color: colors.text }}>
            "Путь к здоровью начинается с одного шага. Сделайте его осознанно."
          </p>
          <button 
            className="px-12 py-4 text-sm tracking-widest uppercase transition-all hover:shadow-sm"
            style={{ backgroundColor: colors.accent, color: colors.bg }}
          >
            Начать
          </button>
        </div>
      </section>
    </div>
  );
}

// ============ ВАРИАНТ 4: Травяная аптека ============
function HerbalApothecaryVariant({ theme }: ThemeProps) {
  const { colors } = theme;
  
  return (
    <div style={{ backgroundColor: colors.bg }} className="min-h-screen">
      {/* Винтажный Hero */}
      <section className="py-12" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Декоративная рамка */}
          <div 
            className="p-8 md:p-12"
            style={{ border: `2px solid ${colors.accent}`, borderRadius: '4px' }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="h-px w-16" style={{ backgroundColor: colors.accent }} />
                <Flower2 className="w-8 h-8" style={{ color: colors.accent }} />
                <div className="h-px w-16" style={{ backgroundColor: colors.accent }} />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: colors.text }}>
                Природная Аптека
              </h1>
              <p className="text-sm italic max-w-lg mx-auto" style={{ color: colors.textSecondary }}>
                Рецепты, проверенные временем. Травы, собранные с любовью.
              </p>
            </div>

            {/* Баннер с ботаническим стилем */}
            <div 
              className="relative overflow-hidden"
              style={{ 
                aspectRatio: "1820/500", 
                backgroundColor: colors.accentLight,
                border: `1px solid ${colors.accent}`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center gap-6 mb-4">
                    <Flower2 className="w-8 h-8" style={{ color: colors.accent }} />
                    <Leaf className="w-8 h-8" style={{ color: colors.accent }} />
                    <Flower2 className="w-8 h-8" style={{ color: colors.accent }} />
                  </div>
                  <span className="font-serif italic" style={{ color: colors.accentDark }}>1820 × 500</span>
                </div>
              </div>
              {/* Уголки */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: colors.accent }} />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: colors.accent }} />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: colors.accent }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: colors.accent }} />
            </div>
          </div>
        </div>
      </section>

      {/* История */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center">
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: colors.accent }}>
              Наша философия
            </span>
            <p className="text-xl font-serif leading-relaxed" style={{ color: colors.text }}>
              Испокон веков травники хранили секреты природы. Каждый рецепт MediPatch — 
              это плод многолетних исследований и глубокого уважения к традициям народной медицины.
            </p>
          </div>
        </div>
      </section>

      {/* Ингредиенты */}
      <section className="py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-serif text-center mb-12" style={{ color: colors.text }}>
            Наши ингредиенты
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {["Арника", "Ромашка", "Календула", "Мята"].map((herb, idx) => (
              <div 
                key={idx}
                className="p-6 text-center"
                style={{ border: `1px solid ${colors.accent}` }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <Leaf className="w-6 h-6" style={{ color: colors.accent }} />
                </div>
                <h3 className="font-serif" style={{ color: colors.text }}>{herb}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-serif text-center mb-12" style={{ color: colors.text }}>
            Каталог снадобий
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="p-6"
                style={{ border: `1px solid ${colors.accent}`, backgroundColor: colors.bgAlt }}
              >
                <div 
                  className="aspect-[3/4] mb-6 flex items-center justify-center"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <span className="text-4xl font-serif" style={{ color: colors.accent }}>{product.id}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-lg mb-2" style={{ color: colors.text }}>{product.name}</h3>
                  <p className="text-xs mb-4 italic" style={{ color: colors.textSecondary }}>{product.desc}</p>
                  <div className="font-serif text-xl" style={{ color: colors.accent }}>{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-12"
        style={{ backgroundColor: colors.accent }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Flower2 className="w-10 h-10 mx-auto mb-4" style={{ color: colors.bgAlt }} />
          <h2 className="text-2xl font-serif mb-4" style={{ color: colors.bgAlt }}>
            Откройте силу природы
          </h2>
          <button 
            className="px-8 py-3 font-serif transition-all hover:shadow-lg"
            style={{ backgroundColor: colors.bgAlt, color: colors.accent, border: `1px solid ${colors.bgAlt}` }}
          >
            В магазин
          </button>
        </div>
      </section>
    </div>
  );
}

// ============ ВАРИАНТ 5: Горный источник ============
function MountainSpringVariant({ theme }: ThemeProps) {
  const { colors } = theme;
  
  return (
    <div style={{ backgroundColor: colors.bg }} className="min-h-screen">
      {/* Hero с горами */}
      <section className="py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Mountain className="w-12 h-12 mx-auto mb-6" style={{ color: colors.accent }} />
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.text }}>
              Чистота горных вершин
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: colors.textSecondary }}>
              Там, где воздух кристально чист, рождается сила для вашего здоровья
            </p>
          </div>

          {/* Баннер с горным пейзажем */}
          <div 
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "1820/500", background: `linear-gradient(180deg, ${colors.accentLight} 0%, ${colors.accent}40 100%)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-end justify-center gap-2 mb-4">
                  <div className="w-16 h-24 rounded-t-full" style={{ backgroundColor: `${colors.accent}60` }} />
                  <div className="w-20 h-32 rounded-t-full" style={{ backgroundColor: `${colors.accent}80` }} />
                  <div className="w-24 h-40 rounded-t-full" style={{ backgroundColor: colors.accent }} />
                  <div className="w-20 h-28 rounded-t-full" style={{ backgroundColor: `${colors.accent}70` }} />
                  <div className="w-14 h-20 rounded-t-full" style={{ backgroundColor: `${colors.accent}50` }} />
                </div>
                <span className="text-lg font-medium" style={{ color: colors.accentDark }}>1820 × 500</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Чистота */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💧", title: "Чистота", desc: "Только натуральные компоненты высшего качества" },
              { icon: "🏔️", title: "Сила", desc: "Энергия горных трав и минералов" },
              { icon: "❄️", title: "Свежесть", desc: "Освежающий и тонизирующий эффект" },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="text-center p-8 rounded-xl"
                style={{ backgroundColor: colors.bgAlt }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <Mountain className="w-6 h-6" style={{ color: colors.accent }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>{item.title}</h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как работает */}
      <section className="py-20" style={{ backgroundColor: colors.accentLight }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: colors.text }}>
            Как действует MediPatch
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Нанесите", "Расслабьтесь", "Исцелитесь"].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>
                <span className="font-medium" style={{ color: colors.text }}>{step}</span>
                {idx < 2 && <ChevronRight className="w-5 h-5" style={{ color: colors.textSecondary }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Продукты */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Линейка продуктов
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundColor: colors.bgAlt }}
              >
                <div 
                  className="aspect-[4/3] flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${colors.accentLight} 0%, ${colors.accent}30 100%)` }}
                >
                  <span className="text-6xl font-bold" style={{ color: colors.accent }}>{product.id}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{product.name}</h3>
                  <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: colors.accent }}>{product.price}</span>
                    <button 
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                      style={{ backgroundColor: colors.accent }}
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-16"
        style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)` }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Почувствуйте горную свежесть</h2>
          <p className="text-lg mb-8 opacity-90">Закажите сегодня — доставка по всей России</p>
          <button 
            className="px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105"
            style={{ backgroundColor: colors.bgAlt, color: colors.accent }}
          >
            Попробовать MediPatch
          </button>
        </div>
      </section>
    </div>
  );
}

// ============ ВАРИАНТ 6: Солнечный луг ============
function SunnyMeadowVariant({ theme }: ThemeProps) {
  const { colors } = theme;
  
  return (
    <div style={{ backgroundColor: colors.bg }} className="min-h-screen">
      {/* Тёплый Hero */}
      <section className="py-16" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
              style={{ backgroundColor: colors.accentLight }}
            >
              <Sun className="w-5 h-5" style={{ color: colors.accent }} />
              <span className="text-sm font-medium" style={{ color: colors.accentDark }}>Тепло и забота</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: colors.text }}>
              Согретый солнцем
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.textSecondary }}>
              Как тёплые лучи летнего солнца, MediPatch окутывает вас заботой и дарит комфорт
            </p>
          </div>

          {/* Баннер с солнечными лучами */}
          <div 
            className="relative rounded-3xl overflow-hidden"
            style={{ 
              aspectRatio: "1820/500", 
              background: `radial-gradient(circle at 50% 0%, ${colors.accent}40 0%, ${colors.accentLight} 70%)` 
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Sun className="w-20 h-20 mx-auto mb-4 animate-pulse" style={{ color: colors.accent }} />
                <span className="text-xl font-medium" style={{ color: colors.accentDark }}>1820 × 500</span>
              </div>
            </div>
            {/* Декоративные лучи */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute top-0 left-1/2 w-0.5 h-32 origin-bottom"
                style={{ 
                  backgroundColor: `${colors.accent}30`,
                  transform: `rotate(${i * 45}deg) translateX(-50%)`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Тёплое послание */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl leading-relaxed" style={{ color: colors.text }}>
            На солнечном лугу каждый цветок получает свою порцию тепла и любви. 
            Так и мы создаём каждый пластырь — с вниманием к вашему здоровью и комфорту.
          </p>
        </div>
      </section>

      {/* Преимущества в виде солнечных карточек */}
      <section className="py-20" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Почему MediPatch?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: colors.bg }}
              >
                <div 
                  className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.accentLight }}
                >
                  <Sun className="w-6 h-6" style={{ color: colors.accent }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.text }}>{benefit.title}</h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Продукты с тёплым оформлением */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: colors.text }}>
            Наши продукты
          </h2>
          <p className="text-center mb-12" style={{ color: colors.textSecondary }}>
            Каждый создан с теплотой и заботой
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="rounded-3xl overflow-hidden transition-all hover:shadow-xl"
                style={{ backgroundColor: colors.bgAlt, border: `2px solid ${colors.accentLight}` }}
              >
                <div 
                  className="aspect-square flex items-center justify-center"
                  style={{ background: `linear-gradient(180deg, ${colors.accentLight} 0%, ${colors.accent}20 100%)` }}
                >
                  <span className="text-7xl font-bold" style={{ color: colors.accent }}>{product.id}</span>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>{product.name}</h3>
                  <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>{product.desc}</p>
                  <div className="text-3xl font-bold mb-6" style={{ color: colors.accent }}>{product.price}</div>
                  <button 
                    className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
                    style={{ backgroundColor: colors.accent }}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тёплый CTA */}
      <section 
        className="py-20"
        style={{ background: `linear-gradient(180deg, ${colors.accent} 0%, ${colors.accentDark} 100%)` }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <Sun className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Добавьте тепла в свою жизнь</h2>
          <p className="text-lg mb-8 opacity-90">Бесплатная доставка при заказе от 2000 ₽</p>
          <button 
            className="px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: colors.bgAlt, color: colors.accent }}
          >
            Заказать сейчас
          </button>
        </div>
      </section>
    </div>
  );
}

// Главный компонент с переключателем
export default function DesignVariants() {
  const [currentVariant, setCurrentVariant] = useState(0);
  
  const goToPrev = () => setCurrentVariant((prev) => (prev === 0 ? themes.length - 1 : prev - 1));
  const goToNext = () => setCurrentVariant((prev) => (prev === themes.length - 1 ? 0 : prev + 1));
  
  const theme = themes[currentVariant];
  const IconComponent = theme.icon;
  
  const variants = [
    MorningDewVariant,
    ForestPathVariant,
    ZenGardenVariant,
    HerbalApothecaryVariant,
    MountainSpringVariant,
    SunnyMeadowVariant,
  ];
  
  const CurrentVariant = variants[currentVariant];

  return (
    <div className="relative">
      {/* Переключатель вариантов - фиксированная панель */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              data-testid="button-prev-variant"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-3 mb-1">
                <IconComponent className="w-5 h-5" style={{ color: theme.colors.accent }} />
                <span className="font-bold text-gray-900">
                  Вариант {currentVariant + 1}: {theme.name}
                </span>
              </div>
              <p className="text-xs text-gray-500">{theme.description}</p>
            </div>
            
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              data-testid="button-next-variant"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Индикаторы */}
          <div className="flex justify-center gap-2 mt-2">
            {themes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentVariant(idx)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ 
                  backgroundColor: idx === currentVariant ? theme.colors.accent : '#e5e7eb',
                  transform: idx === currentVariant ? 'scale(1.5)' : 'scale(1)'
                }}
                data-testid={`indicator-variant-${idx}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Отступ для фиксированной панели */}
      <div className="h-24" />
      
      {/* Контент варианта */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVariant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentVariant theme={theme} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
