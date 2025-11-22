import { Route, Switch, Link, Redirect } from "wouter";
import { useEffect } from "react";
import Landing6 from "./pages/Landing6";

function LandingRedirect() {
  useEffect(() => {
    window.location.href = "/landing/6";
  }, []);
  return null;
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={LandingRedirect} />
      <Route path="/landing/6" component={Landing6} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-gray-600 mb-4">Страница не найдена</p>
            <Link href="/">
              <span className="text-emerald-600 font-semibold hover:underline cursor-pointer">
                Вернуться на главную
              </span>
            </Link>
          </div>
        </div>
      </Route>
    </Switch>
  );
}
