import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, ChevronDown, ChevronUp } from "lucide-react";
import { usePalette } from "../context/PaletteContext";
import { paletteCategories, getPalettesByCategory } from "../utils/palettes";

export default function PaletteSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { currentPalette, setPaletteById } = usePalette();

  const handleSelectPalette = (id: number) => {
    setPaletteById(id);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{ 
          backgroundColor: currentPalette.colors.accent,
          color: currentPalette.colors.buttonText 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-palette-switcher"
      >
        <Palette className="w-6 h-6" />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl overflow-hidden flex flex-col"
            style={{ backgroundColor: currentPalette.colors.card }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: currentPalette.colors.accentLight }}
            >
              <div>
                <h2 
                  className="text-xl font-bold"
                  style={{ color: currentPalette.colors.text }}
                >
                  Выбор палитры
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: currentPalette.colors.textSecondary }}
                >
                  Текущая: {currentPalette.name}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: currentPalette.colors.bgAlt,
                  color: currentPalette.colors.text 
                }}
                data-testid="button-close-palette"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-4">
              {paletteCategories.map((category) => {
                const categoryPalettes = getPalettesByCategory(category);
                const isExpanded = expandedCategory === category;
                
                return (
                  <div key={category} className="mb-3">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
                      style={{ 
                        backgroundColor: isExpanded ? currentPalette.colors.accentLight : currentPalette.colors.bgAlt,
                        color: currentPalette.colors.text 
                      }}
                      data-testid={`button-category-${category}`}
                    >
                      <span className="font-semibold">{category}</span>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-sm"
                          style={{ color: currentPalette.colors.textSecondary }}
                        >
                          {categoryPalettes.length} палитр
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    {/* Palettes Grid */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-2 pt-3">
                            {categoryPalettes.map((palette) => {
                              const isSelected = palette.id === currentPalette.id;
                              
                              return (
                                <button
                                  key={palette.id}
                                  onClick={() => handleSelectPalette(palette.id)}
                                  className={`p-3 rounded-lg text-left transition-all`}
                                  style={{ 
                                    backgroundColor: palette.colors.bg,
                                    outline: isSelected ? `2px solid ${palette.colors.accent}` : "none",
                                    outlineOffset: "2px"
                                  }}
                                  data-testid={`button-palette-${palette.id}`}
                                >
                                  {/* Color Preview */}
                                  <div className="flex gap-1 mb-2">
                                    <div 
                                      className="w-6 h-6 rounded-full border"
                                      style={{ 
                                        backgroundColor: palette.colors.bg,
                                        borderColor: palette.colors.accentLight 
                                      }}
                                      title="Фон"
                                    />
                                    <div 
                                      className="w-6 h-6 rounded-full border"
                                      style={{ 
                                        backgroundColor: palette.colors.card,
                                        borderColor: palette.colors.accentLight 
                                      }}
                                      title="Карточки"
                                    />
                                    <div 
                                      className="w-6 h-6 rounded-full"
                                      style={{ backgroundColor: palette.colors.accent }}
                                      title="Акцент"
                                    />
                                    <div 
                                      className="w-6 h-6 rounded-full"
                                      style={{ backgroundColor: palette.colors.button }}
                                      title="Кнопки"
                                    />
                                  </div>
                                  
                                  {/* Name */}
                                  <div 
                                    className="text-xs font-medium truncate"
                                    style={{ color: palette.colors.text }}
                                  >
                                    {palette.id}. {palette.name}
                                  </div>
                                  
                                  {/* Selected indicator */}
                                  {isSelected && (
                                    <div 
                                      className="text-xs mt-1 font-semibold"
                                      style={{ color: palette.colors.accent }}
                                    >
                                      Выбрано
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Footer with current palette info */}
            <div 
              className="p-4 border-t"
              style={{ 
                borderColor: currentPalette.colors.accentLight,
                backgroundColor: currentPalette.colors.bgAlt 
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: currentPalette.colors.bg }}
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: currentPalette.colors.accent }}
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: currentPalette.colors.button }}
                  />
                </div>
                <div>
                  <div 
                    className="font-semibold text-sm"
                    style={{ color: currentPalette.colors.text }}
                  >
                    {currentPalette.name}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: currentPalette.colors.textSecondary }}
                  >
                    {currentPalette.category}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
