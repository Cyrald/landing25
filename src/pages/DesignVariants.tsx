import { useState } from "react";
import { ChevronDown, ExternalLink, Leaf, Star, Sparkles, Shield, CircleDot, Droplets, Activity, Glasses, Ribbon } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Пластырь",
    shortName: "Пластырь",
    description: "Традиционный лечебный пластырь для наклеивания на проблемные зоны. Активные компоненты проникают через кожу и оказывают целебное воздействие на глубокие ткани.",
    benefits: ["Глубокое проникновение", "До 12 часов действия", "Удобное применение"],
    icon: CircleDot,
  },
  {
    id: 2,
    name: "Очиститель воды",
    shortName: "Вода",
    description: "Специальный состав для структурирования и очищения питьевой воды. Насыщает воду полезными минералами и улучшает её биодоступность для организма.",
    benefits: ["Природная минерализация", "Улучшение вкуса воды", "Польза для организма"],
    icon: Droplets,
  },
  {
    id: 3,
    name: "Очелье",
    shortName: "Очелье",
    description: "Лечебная повязка на голову с активными компонентами. Помогает при головных болях, снимает напряжение, улучшает кровообращение в области головы.",
    benefits: ["Снятие головной боли", "Расслабление", "Улучшение сна"],
    icon: Activity,
  },
  {
    id: 4,
    name: "Наочники",
    shortName: "Наочники", 
    description: "Накладки на глаза с целебными экстрактами. Снимают усталость глаз, уменьшают отёчность, освежают и тонизируют нежную кожу вокруг глаз.",
    benefits: ["Снятие усталости глаз", "Уменьшение отёков", "Освежающий эффект"],
    icon: Glasses,
  },
  {
    id: 5,
    name: "Кушак",
    shortName: "Кушак",
    description: "Широкий лечебный пояс для области живота и поясницы. Обеспечивает мягкое тепло, поддержку и оздоровительное воздействие на внутренние органы.",
    benefits: ["Поддержка поясницы", "Мягкое прогревание", "Комфорт в движении"],
    icon: Shield,
  },
  {
    id: 6,
    name: "Тесьма",
    shortName: "Тесьма",
    description: "Гибкая лечебная лента для обёртывания суставов и конечностей. Идеальна для локтей, запястий, коленей и других сложных зон тела.",
    benefits: ["Гибкое применение", "Для любых суставов", "Надёжная фиксация"],
    icon: Ribbon,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Мария К.",
    city: "Москва",
    text: "Пользуюсь пластырями уже три месяца. Забыла о болях в спине после долгого рабочего дня. Натуральный состав — это именно то, что я искала.",
    rating: 5,
  },
  {
    id: 2,
    name: "Андрей С.",
    city: "Санкт-Петербург", 
    text: "Очелье стало моим спасением от мигреней. Надеваю при первых признаках — и боль отступает. Рекомендую всем, кто страдает головными болями.",
    rating: 5,
  },
  {
    id: 3,
    name: "Елена В.",
    city: "Казань",
    text: "Наочники — находка для тех, кто много работает за компьютером. Глаза отдыхают, отёки уходят. Использую каждый вечер.",
    rating: 5,
  },
  {
    id: 4,
    name: "Дмитрий П.",
    city: "Новосибирск",
    text: "Кушак помог с хронической болью в пояснице. Ношу на работе под одеждой — никто не замечает, а эффект ощутимый.",
    rating: 5,
  },
];

const faqItems = [
  {
    q: "Из чего сделаны ваши продукты?",
    a: "Все наши изделия созданы на основе натуральных компонентов: целебных трав, минералов и природных экстрактов. Мы не используем синтетические добавки.",
  },
  {
    q: "Как быстро наступает эффект?",
    a: "Первые ощущения появляются уже через 15-20 минут применения. Для достижения стойкого результата рекомендуем курсовое использование.",
  },
  {
    q: "Можно ли использовать при чувствительной коже?",
    a: "Да, наши продукты гипоаллергенны и подходят для чувствительной кожи. При индивидуальной непереносимости рекомендуем проконсультироваться с врачом.",
  },
  {
    q: "Как долго длится эффект одного применения?",
    a: "В зависимости от продукта, эффект сохраняется от 6 до 12 часов. Подробные рекомендации указаны в инструкции к каждому изделию.",
  },
  {
    q: "Где можно приобрести вашу продукцию?",
    a: "Полный каталог с ценами и возможностью заказа доступен на нашем основном сайте. Там же вы найдёте актуальные акции и специальные предложения.",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Природные компоненты",
    desc: "Активные вещества из целебных растений и минералов начинают работать сразу при контакте с телом.",
  },
  {
    step: 2,
    title: "Постепенное высвобождение",
    desc: "Компоненты медленно проникают в ткани, обеспечивая длительное и равномерное воздействие.",
  },
  {
    step: 3,
    title: "Целебный эффект",
    desc: "Улучшение кровообращения, снятие напряжения и восстановление естественного баланса организма.",
  },
];

const colors = {
  bg: "#f8faf8",
  bgAlt: "#eef4ee",
  accent: "#3d6b4f",
  accentLight: "#d4e5d8",
  accentDark: "#2a4a36",
  text: "#1a2e1f",
  textSecondary: "#4a6b52",
  cardBg: "#ffffff",
  gradient: "linear-gradient(135deg, #3d6b4f 0%, #2a4a36 50%, #1a2e1f 100%)",
};


export default function DesignVariants() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: colors.bg }}>
      {/* Hero Section - Redesigned */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
            style={{ background: colors.gradient }}
          />
          <div 
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10"
            style={{ background: colors.gradient }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{ backgroundColor: colors.accentLight, color: colors.accent }}
                >
                  <Sparkles className="w-4 h-4" />
                  Сила природы для вашего здоровья
                </div>
                
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{ color: colors.text }}
                >
                  Древние традиции
                  <br />
                  <span style={{ color: colors.accent }}>исцеления</span>
                </h1>
                
                <p 
                  className="text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  Вековые рецепты народной медицины, бережно сохранённые и усовершенствованные для современного человека. Шесть уникальных продуктов для вашего здоровья и благополучия.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    className="px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all hover:scale-105"
                    style={{ background: colors.gradient }}
                    data-testid="button-hero-catalog"
                  >
                    Смотреть каталог
                  </button>
                  <button
                    className="px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: "transparent", 
                      color: colors.accent,
                      border: `2px solid ${colors.accent}`
                    }}
                    data-testid="button-hero-learn"
                  >
                    Узнать больше
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right - Banner/Image placeholder */}
            <motion.div 
              className="flex-1 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <div 
                  className="absolute inset-0"
                  style={{ background: colors.gradient }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <Leaf className="w-16 h-16 mb-4 opacity-80" />
                  <span className="text-xl font-medium opacity-90">Главное изображение</span>
                  <span className="text-sm opacity-70 mt-2">800 x 1000</span>
                </div>
                {/* Decorative corner */}
                <div 
                  className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-20"
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote/Philosophy Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div 
            className="relative rounded-2xl p-8 md:p-12 text-center"
            style={{ backgroundColor: colors.bgAlt }}
          >
            <div 
              className="absolute top-4 left-4 w-12 h-12 rounded-full opacity-30"
              style={{ backgroundColor: colors.accent }}
            />
            <div 
              className="absolute bottom-4 right-4 w-8 h-8 rounded-full opacity-20"
              style={{ backgroundColor: colors.accent }}
            />
            <div className="relative">
              <Leaf className="w-10 h-10 mx-auto mb-6" style={{ color: colors.accent }} />
              <p 
                className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed"
                style={{ color: colors.text, fontStyle: "italic" }}
              >
                "Природа — лучший целитель. Мы лишь помогаем ей достучаться до вас."
              </p>
              <div 
                className="w-16 h-1 mx-auto mt-6 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.bgAlt }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Как это работает
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              {howItWorks.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-xl font-bold"
                    style={{ backgroundColor: colors.accent, color: "#fff" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: colors.text }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div 
              className="w-full md:w-72 aspect-[3/4] rounded-xl flex items-center justify-center"
              style={{ backgroundColor: colors.cardBg }}
            >
              <span style={{ color: colors.accent }}>Иллюстрация 3:4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог продуктов - Zigzag layout */}
      <section className="py-16 md:py-24" data-testid="section-products">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>
              Каталог продуктов
            </h2>
            <div className="w-24 h-0.5 mx-auto" style={{ backgroundColor: colors.accent }}></div>
          </div>
          
          <div className="space-y-8">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center rounded-xl overflow-hidden`}
                style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}
                data-testid={`card-product-${product.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div 
                  className="w-full md:w-2/5 aspect-[3/4] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.bgAlt }}
                  data-testid={`img-product-${product.id}`}
                >
                  <div className="text-center">
                    <product.icon className="w-14 h-14 mx-auto mb-2" style={{ color: colors.accent }} />
                    <span style={{ color: colors.accent }}>Фото {product.name}</span>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: colors.accent }}
                    >
                      {product.id}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold" style={{ color: colors.text }}>{product.name}</h3>
                  </div>
                  <p className="mb-4 leading-relaxed" style={{ color: colors.textSecondary }}>
                    {product.description}
                  </p>
                  <div className="pt-4" style={{ borderTop: `1px dashed ${colors.accentLight}` }}>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, benefitIdx) => (
                        <li key={benefitIdx} className="flex items-center gap-2" style={{ color: colors.text }}>
                          <span style={{ color: colors.accent }}>—</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="mt-4 px-5 py-2 text-sm font-medium rounded-lg transition-all hover:scale-105"
                    style={{ backgroundColor: colors.accentLight, color: colors.accent }}
                    data-testid={`button-learn-more-${product.id}`}
                  >
                    Подробнее о продукте
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.cardBg }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Истории наших клиентов
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div 
                key={t.id}
                className="rounded-2xl p-6"
                style={{ backgroundColor: colors.bg, border: `1px solid ${colors.accentLight}` }}
              >
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" style={{ color: colors.accent }} />
                  ))}
                </div>
                <p className="mb-4 leading-relaxed" style={{ color: colors.text }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: colors.accent }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: colors.text }}>{t.name}</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12" style={{ color: colors.text }}>
            Вопросы и ответы
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.accentLight}` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  data-testid={`button-faq-${idx}`}
                >
                  <span className="font-semibold pr-4" style={{ color: colors.text }}>{item.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    style={{ color: colors.accent }}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5" style={{ borderTop: `1px dashed ${colors.accentLight}` }}>
                    <p className="pt-4" style={{ color: colors.textSecondary }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24" style={{ background: colors.gradient }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Добро пожаловать в мир здоровья
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Откройте для себя полный ассортимент продукции на нашем сайте.
          </p>
          <button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: "#fff", color: colors.accent }}
            data-testid="button-go-to-site"
          >
            Перейти в каталог
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
