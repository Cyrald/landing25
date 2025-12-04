import { useState, useEffect } from "react";
import { ChevronDown, ExternalLink, Star, Shield, CircleDot, Droplets, Activity, Glasses, Ribbon } from "lucide-react";
import { motion } from "framer-motion";
import HeroVariants from "../components/HeroVariants";

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

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
  catalogBg: "#f4f9f5",
  gradient: "linear-gradient(135deg, #3d6b4f 0%, #2a4a36 50%, #1a2e1f 100%)",
};

const STABLE_PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: ((i * 17) % 100),
  y: ((i * 23) % 100),
  size: ((i * 7) % 4) + 2,
  duration: ((i * 11) % 20) + 15,
  delay: ((i * 5) % 10),
}));

function AnimatedMeshGradient({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(61, 107, 79, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 20%, rgba(42, 74, 54, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 40% 80%, rgba(212, 229, 216, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 70% 40% at 90% 70%, rgba(61, 107, 79, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, #f8faf8 0%, #eef4ee 100%)
          `,
        }}
      />
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse 80% 50% at 20% 40%, rgba(61, 107, 79, 0.15) 0%, transparent 50%),
               radial-gradient(ellipse 60% 80% at 80% 20%, rgba(42, 74, 54, 0.12) 0%, transparent 50%)`,
              `radial-gradient(ellipse 80% 50% at 30% 50%, rgba(61, 107, 79, 0.18) 0%, transparent 50%),
               radial-gradient(ellipse 60% 80% at 70% 30%, rgba(42, 74, 54, 0.15) 0%, transparent 50%)`,
              `radial-gradient(ellipse 80% 50% at 25% 35%, rgba(61, 107, 79, 0.12) 0%, transparent 50%),
               radial-gradient(ellipse 60% 80% at 75% 25%, rgba(42, 74, 54, 0.1) 0%, transparent 50%)`,
              `radial-gradient(ellipse 80% 50% at 20% 40%, rgba(61, 107, 79, 0.15) 0%, transparent 50%),
               radial-gradient(ellipse 60% 80% at 80% 20%, rgba(42, 74, 54, 0.12) 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}

function BreathingBlobs({ reducedMotion }: { reducedMotion: boolean }) {
  const staticStyle = { scale: 1 };
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      <motion.div
        className="absolute"
        style={{
          width: "600px",
          height: "600px",
          top: "-100px",
          right: "-150px",
          background: `radial-gradient(circle, rgba(61, 107, 79, 0.08) 0%, transparent 70%)`,
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          filter: "blur(40px)",
        }}
        animate={reducedMotion ? staticStyle : {
          scale: [1, 1.1, 1.05, 1],
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "50% 50% 60% 40% / 50% 60% 40% 60%",
            "45% 55% 65% 35% / 45% 55% 55% 45%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
        }}
        transition={reducedMotion ? undefined : {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute"
        style={{
          width: "500px",
          height: "500px",
          bottom: "10%",
          left: "-100px",
          background: `radial-gradient(circle, rgba(42, 74, 54, 0.06) 0%, transparent 70%)`,
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          filter: "blur(50px)",
        }}
        animate={reducedMotion ? staticStyle : {
          scale: [1, 1.15, 1.08, 1],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "50% 50% 40% 60% / 50% 40% 60% 50%",
            "55% 45% 35% 65% / 55% 35% 65% 45%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={reducedMotion ? undefined : {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute"
        style={{
          width: "400px",
          height: "400px",
          top: "40%",
          right: "20%",
          background: `radial-gradient(circle, rgba(212, 229, 216, 0.15) 0%, transparent 70%)`,
          borderRadius: "30% 70% 40% 60% / 50% 60% 40% 50%",
          filter: "blur(60px)",
        }}
        animate={reducedMotion ? staticStyle : {
          scale: [1, 1.2, 1.1, 1],
          borderRadius: [
            "30% 70% 40% 60% / 50% 60% 40% 50%",
            "40% 60% 50% 50% / 60% 50% 50% 40%",
            "35% 65% 45% 55% / 55% 55% 45% 45%",
            "30% 70% 40% 60% / 50% 60% 40% 50%",
          ],
        }}
        transition={reducedMotion ? undefined : {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}

function FloatingParticles({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {STABLE_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: colors.accent,
              opacity: 0.12,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {STABLE_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: colors.accent,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, -15, 0],
            x: [0, 10, -5, 0],
            opacity: [0.1, 0.2, 0.15, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function WaveDivider({ flip = false, color = colors.bgAlt, reducedMotion = false }: { flip?: boolean; color?: string; reducedMotion?: boolean }) {
  const staticPath = "M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z";
  
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''}`} style={{ marginTop: flip ? 0 : '-1px', marginBottom: flip ? '-1px' : 0 }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
        style={{ display: 'block' }}
      >
        {reducedMotion ? (
          <path d={staticPath} fill={color} />
        ) : (
          <motion.path
            d={staticPath}
            fill={color}
            animate={{
              d: [
                "M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z",
                "M0,60 C150,30 350,90 600,60 C850,30 1050,90 1200,60 L1200,120 L0,120 Z",
                "M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    </div>
  );
}

function OrganicWaveDivider({ color = colors.cardBg, reducedMotion = false }: { color?: string; reducedMotion?: boolean }) {
  const staticPath = "M0,40 Q200,80 400,40 T800,40 T1200,40 L1200,120 L0,120 Z";
  
  return (
    <div className="w-full overflow-hidden" style={{ marginTop: '-1px' }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-20 md:h-28"
        style={{ display: 'block' }}
      >
        {reducedMotion ? (
          <path d={staticPath} fill={color} />
        ) : (
          <motion.path
            d={staticPath}
            fill={color}
            animate={{
              d: [
                "M0,40 Q200,80 400,40 T800,40 T1200,40 L1200,120 L0,120 Z",
                "M0,50 Q200,20 400,50 T800,50 T1200,50 L1200,120 L0,120 Z",
                "M0,40 Q200,80 400,40 T800,40 T1200,40 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    </div>
  );
}

function SubtleTexture() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-[0.015]"
      style={{
        zIndex: 3,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "150px 150px",
      }}
    />
  );
}

export default function DesignVariants() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.bg }}>
      <AnimatedMeshGradient reducedMotion={reducedMotion} />
      <BreathingBlobs reducedMotion={reducedMotion} />
      <FloatingParticles reducedMotion={reducedMotion} />
      <SubtleTexture />
      
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <HeroVariants />

        <WaveDivider color={colors.bg} reducedMotion={reducedMotion} />

        {/* How It Works */}
        <section className="py-16 md:py-24" style={{ backgroundColor: colors.bg }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-center mb-12"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Как это работает
            </motion.h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-6">
                {howItWorks.map((item, idx) => (
                  <motion.div 
                    key={item.step} 
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
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
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="w-full md:w-80 aspect-[3/4] rounded-xl flex items-center justify-center backdrop-blur-sm"
                style={{ backgroundColor: `${colors.cardBg}ee` }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <span style={{ color: colors.accent }}>Иллюстрация 3:4</span>
              </motion.div>
            </div>
          </div>
        </section>

        <WaveDivider color={colors.catalogBg} reducedMotion={reducedMotion} />

        {/* Products Section */}
        <section className="py-16 md:py-24" style={{ backgroundColor: colors.catalogBg }} data-testid="section-products">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <motion.h2 
                className="text-2xl md:text-4xl font-bold mb-2"
                style={{ color: colors.text }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Каталог продуктов
              </motion.h2>
              <div className="w-24 h-0.5 mx-auto" style={{ backgroundColor: colors.accent }}></div>
            </div>
            
            <div className="space-y-8">
              {products.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center rounded-xl overflow-hidden`}
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.accentLight}` }}
                  data-testid={`card-product-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <div 
                    className="w-2/3 mx-auto md:mx-0 md:w-[28%] aspect-[3/4] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.bgAlt }}
                    data-testid={`img-product-${product.id}`}
                  >
                    <div className="text-center">
                      <product.icon className="w-14 h-14 mx-auto mb-2" style={{ color: colors.accent }} />
                      <span style={{ color: colors.accent }}>Фото {product.name}</span>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 p-6">
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

        <WaveDivider flip color={colors.bg} reducedMotion={reducedMotion} />

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-center mb-12"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Истории наших клиентов
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, idx) => (
                <motion.div 
                  key={t.id}
                  className="rounded-2xl p-6 backdrop-blur-sm"
                  style={{ backgroundColor: `${colors.cardBg}ee`, border: `1px solid ${colors.accentLight}` }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <OrganicWaveDivider color={colors.bgAlt} reducedMotion={reducedMotion} />

        {/* FAQ */}
        <section className="py-16 md:py-24" style={{ backgroundColor: colors.bgAlt }}>
          <div className="max-w-3xl mx-auto px-6">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-center mb-12"
              style={{ color: colors.text }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Вопросы и ответы
            </motion.h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="rounded-xl overflow-hidden backdrop-blur-sm"
                  style={{ backgroundColor: `${colors.cardBg}ee`, border: `1px solid ${colors.accentLight}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
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
                    <motion.div 
                      className="px-5 pb-5"
                      style={{ borderTop: `1px dashed ${colors.accentLight}` }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <p className="pt-4" style={{ color: colors.textSecondary }}>{item.a}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: colors.gradient }}>
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="max-w-3xl mx-auto px-6 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
