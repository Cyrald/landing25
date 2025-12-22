import { Route, Switch, Link } from "wouter";
import { PaletteProvider, usePalette } from "./context/PaletteContext";
import Home from "./pages/Home";

function NotFoundPage() {
  const { currentPalette } = usePalette();
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: currentPalette.colors.bg }}
    >
      <div className="text-center">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: currentPalette.colors.text }}
        >
          404
        </h1>
        <p 
          className="mb-4"
          style={{ color: currentPalette.colors.textSecondary }}
        >
          Страница не найдена
        </p>
        <Link href="/">
          <span 
            className="font-semibold hover:underline cursor-pointer"
            style={{ color: currentPalette.colors.accent }}
          >
            Вернуться на главную
          </span>
        </Link>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default function App() {
  return (
    <PaletteProvider>
      <AppContent />
    </PaletteProvider>
  );
}
