import { useState } from "react";
import AnimationPages from "./pages/AnimationPages";
import SplashPages from "./pages/splashPages";
import GraphNodePages from "./pages/graphNodePages";

function App() {
  // Splash animation muncul saat pertama kali aplikasi dibuka
  const [showSplash, setShowSplash] = useState(true);
  // Alur Onboarding / SplashPages (3 item + Generating)
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="relative w-full h-dvh overflow-hidden">
      {/* Halaman Utama Aplikasi: SplashPages (Onboarding) kemudian GraphNodePages */}
      {showOnboarding ? (
        <SplashPages onComplete={() => setShowOnboarding(false)} />
      ) : (
        <GraphNodePages />
      )}

      {/* Animation Splash Screen (Muncul pertama kali saat membuka PWA) */}
      {showSplash && <AnimationPages onFinish={() => setShowSplash(false)} />}
    </div>
  );
}

export default App;
