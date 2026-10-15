import { useState } from "react";
import AnimationPages from "./pages/AnimationPages";
import SplashPages from "./pages/splashPages";
import GraphNodePages from "./pages/graphNodePages";
import RecomendationPages from "./pages/recomendationPages";
import PwaInstallPrompt from "./components/PwaInstallPrompt";

function App() {
  // Splash animation muncul saat pertama kali aplikasi dibuka
  const [showSplash, setShowSplash] = useState(true);
  // Alur Onboarding / SplashPages (3 item + Generating)
  const [showOnboarding, setShowOnboarding] = useState(true);
  // Active Tab Navigasi: 'home' | 'recomendation' | 'profile'
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="relative w-full h-dvh overflow-hidden">
      {/* Halaman Utama Aplikasi: SplashPages (Onboarding) kemudian Halaman Aktif sesuai Tab */}
      {showOnboarding ? (
        <SplashPages onComplete={() => setShowOnboarding(false)} />
      ) : activeTab === "recomendation" ? (
        <RecomendationPages
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      ) : (
        <GraphNodePages
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Animation Splash Screen (Muncul pertama kali saat membuka PWA) */}
      {showSplash && <AnimationPages onFinish={() => setShowSplash(false)} />}

      {/* Prompt / Banner Pasang Aplikasi PWA */}
      <PwaInstallPrompt />
    </div>
  );
}

export default App;
