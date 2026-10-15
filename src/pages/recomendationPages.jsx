import { useState } from "react";
import RecommendationSummaryComponent from "../components/recommendation/RecommendationSummaryComponent";
import MajorPreviewComponent from "../components/recommendation/MajorPreviewComponent";
import CareerDetailModal from "../components/recommendation/CareerDetailModal";
import BottomNavigation from "../components/BottomNavigation";

/**
 * Halaman Utama Rekomendasi (RecomendationPages)
 * Mengkoordinasikan 3 komponen sesuai desain:
 * 1. RecommendationSummaryComponent: Ringkasan hasil rekomendasi (Lingkaran 98% & list kartu)
 * 2. MajorPreviewComponent: Detail/Priview jurusan terpilih (Kartu biru & karir path)
 * 3. CareerDetailModal: Bottom sheet informasi profesi & lingkungan kerja
 */
function RecomendationPages({
  recommendations,
  topRecommendation,
  activeTab = "recomendation",
  onTabChange = () => {},
}) {
  // State untuk jurusan yang sedang di-preview (null = tampilkan ringkasan hasil rekomendasi)
  const [selectedMajor, setSelectedMajor] = useState(null);

  // State untuk modal detail karir yang sedang dibuka (null = modal tertutup)
  const [selectedCareer, setSelectedCareer] = useState(null);

  const handleSelectMajor = (majorItem) => {
    setSelectedMajor(majorItem);
  };

  const handleBackToSummary = () => {
    setSelectedMajor(null);
  };

  const handleTabClick = (tab) => {
    if (tab === "home") {
      setSelectedMajor(null);
      setSelectedCareer(null);
    }
    onTabChange(tab);
  };

  return (
    <div className="w-full h-dvh flex flex-col bg-white font-sans overflow-hidden relative">
      {/* ── Area Konten (Komponen 1 atau Komponen 2) ── */}
      <div className="flex-1 min-h-0">
        {selectedMajor ? (
          <MajorPreviewComponent
            majorData={selectedMajor}
            onBack={handleBackToSummary}
            onSelectCareer={(career) => setSelectedCareer(career)}
          />
        ) : (
          <RecommendationSummaryComponent
            recommendations={recommendations}
            topRecommendation={topRecommendation}
            onSelectMajor={handleSelectMajor}
          />
        )}
      </div>

      {/* ── Komponen 3: Bottom Sheet Modal Detail Karir Path ── */}
      <CareerDetailModal
        career={selectedCareer}
        onClose={() => setSelectedCareer(null)}
      />

      {/* ── Bottom Navigation Bar (Terpusat di Level Page) ── */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabClick} />
    </div>
  );
}

export default RecomendationPages;

