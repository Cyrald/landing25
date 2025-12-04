import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { palettes, type Palette } from "../utils/palettes";

interface PaletteContextType {
  currentPalette: Palette;
  setPaletteById: (id: number) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

const STORAGE_KEY = "selected-palette-id";

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [currentPalette, setCurrentPalette] = useState<Palette>(() => {
    if (typeof window !== "undefined") {
      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const id = parseInt(savedId, 10);
        const found = palettes.find((p) => p.id === id);
        if (found) return found;
      }
    }
    return palettes[0];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentPalette.id.toString());
  }, [currentPalette]);

  const setPaletteById = (id: number) => {
    const found = palettes.find((p) => p.id === id);
    if (found) {
      setCurrentPalette(found);
    }
  };

  return (
    <PaletteContext.Provider value={{ currentPalette, setPaletteById }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
}
