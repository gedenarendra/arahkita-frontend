import {
  RecommendationNavIcon,
  HomeNavIcon,
  ProfileNavIcon,
} from "./NavigationIcons";

/**
 * Reusable Bottom Navigation Component
 * Dipanggil di level Pages (misal DashboardPages, GraphNodePages)
 *
 * Props:
 * - activeTab: 'recomendation' | 'home' | 'profile'
 * - onTabChange: (tabName) => void
 * - variant: 'static' (default, layout flow) | 'floating' (fixed bottom mobile)
 * - className: string (tambahan class styling jika diperlukan)
 */
function BottomNavigation({
  activeTab = "home",
  onTabChange = () => {},
  variant = "static",
  className = "",
}) {
  const containerStyle =
    variant === "floating"
      ? "fixed bottom-7 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-87 z-50 md:hidden"
      : "shrink-0 px-6 pb-6 pt-2";

  return (
    <div className={`${containerStyle} ${className}`}>
      <nav
        className="w-full h-16 bg-[#d9d9d9] rounded-[22px] flex items-center justify-around shadow-nav px-2"
        aria-label="Bottom Navigation"
      >
        {/* 1. Home (Ikon Rumah solid di tengah) */}
        <button
          type="button"
          onClick={() => onTabChange("home")}
          className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer text-[#1d154a] ${
            activeTab === "home"
              ? "scale-115 opacity-100"
              : "opacity-80 hover:opacity-100"
          }`}
          aria-label="Home"
        >
          <HomeNavIcon className="w-7 h-7" cutoutColor="#d9d9d9" />
        </button>

        {/* 2. Recomendation (Ikon Bola dengan lengkung pantulan) */}
        <button
          type="button"
          onClick={() => onTabChange("recomendation")}
          className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer text-[#1d154a] ${
            activeTab === "recomendation"
              ? "scale-115 opacity-100"
              : "opacity-80 hover:opacity-100"
          }`}
          aria-label="Recomendation"
        >
          <RecommendationNavIcon className="w-7 h-7" cutoutColor="#d9d9d9" />
        </button>

        {/* 3. Profile (Ikon Profil di kanan) */}
        <button
          type="button"
          onClick={() => onTabChange("profile")}
          className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer text-[#1d154a] ${
            activeTab === "profile"
              ? "scale-115 opacity-100"
              : "opacity-80 hover:opacity-100"
          }`}
          aria-label="Profile"
        >
          <ProfileNavIcon className="w-7 h-7" />
        </button>
      </nav>
    </div>
  );
}

export default BottomNavigation;
