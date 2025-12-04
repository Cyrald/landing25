import { motion } from "framer-motion";
import { Leaf, Quote } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { getImageSources } from "../utils/imageLoader";

const softGreen = {
  50: "#f0f7f3",
  100: "#dff1e3",
  200: "#b7e0c2",
  300: "#8fcf9f",
  400: "#6bbc82",
  500: "#5fa97a",
  600: "#4d8e64",
  700: "#3d7250",
  800: "#2d5a3d",
  900: "#1d422a",
};

function ProductImage({ text = "Продукт", aspectRatio = "1/1", className = "", bgColor = softGreen[200] }: { text?: string; aspectRatio?: string; className?: string; bgColor?: string }) {
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

function Hero31HealingStory() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: softGreen[50] }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Quote className="w-10 h-10 mb-6" style={{ color: softGreen[400] }} />
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 leading-relaxed italic">
              "После многих лет боли я наконец нашла облегчение в простом натуральном средстве"
            </blockquote>
            <p className="text-gray-600 mb-8">
              — Мария, 54 года, Москва
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Тысячи историй <span style={{ color: softGreen[600] }}>исцеления</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Каждый день мы получаем благодарности от людей, которые вернули себе радость движения.
            </p>
            <button
              className="px-8 py-4 rounded-lg text-white font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: softGreen[600] }}
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
            <ProductImage text="Продукт" aspectRatio="4/5" className="shadow-xl rounded-2xl" bgColor={softGreen[200]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HeroVariants() {
  return (
    <div className="w-full">
      <Hero31HealingStory />
    </div>
  );
}
