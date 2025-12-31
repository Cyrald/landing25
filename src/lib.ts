export interface Palette {
  id: number;
  name: string;
  colors: {
    bg: string;
    bgAlt: string;
    card: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    text: string;
    textSecondary: string;
    button: string;
    buttonText: string;
  };
}

export const palettes: Palette[] = [
  {
    id: 1,
    name: "Весенняя поляна",
    colors: {
      bg: "#E0F0DC",
      bgAlt: "#D4E8D0",
      card: "#EDF7E8",
      accent: "#6BAA7C",
      accentLight: "#A4D4B4",
      accentDark: "#4E8E64",
      text: "#2A4A35",
      textSecondary: "#3F6A4A",
      button: "#5FA978",
      buttonText: "#FFFFFF",
    },
  },
];

export function getPaletteById(id: number): Palette | undefined {
  return palettes.find((p) => p.id === id);
}

// Функция для получения пути к изображению с поддержкой разных форматов
export function getImagePath(basePath: string, number: number, extension: 'webp' | 'png' | 'jpg' = 'webp'): string {
  return `/images/${basePath}/${number}.${extension}`;
}

// Функция для получения массива путей к изображениям с автоматическим fallback
export function getImageSources(basePath: string, number: number): string[] {
  return [
    getImagePath(basePath, number, 'webp'),
    getImagePath(basePath, number, 'png'),
    getImagePath(basePath, number, 'jpg'),
  ];
}

// Функция для получения массива путей к изображениям
export function getImages(basePath: string, count: number): Array<{ id: number; sources: string[] }> {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    sources: getImageSources(basePath, i + 1),
  }));
}
