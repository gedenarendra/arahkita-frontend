import logoArahkita from "../../assets/Logo.png";
import mathIllustration from "../../assets/math_illustration.png";

// Helper untuk mengekstrak angka numerik persentase dari berbagai format (string "98%", number 98, dll)
const parseScoreToNumber = (val) => {
  if (val === undefined || val === null) return 0;
  if (typeof val === "number") return val;
  const num = parseFloat(String(val).replace(/[^0-9.-]/g, ""));
  return isNaN(num) ? 0 : num;
};

// Mencari jurusan dengan persentase terbesar dari data rekomendasi
const getHighestScoreMajor = (list) => {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list.reduce((highest, current) => {
    const currentScore = parseScoreToNumber(
      current?.score ?? current?.matchPercentage ?? current?.percentage,
    );
    const highestScore = parseScoreToNumber(
      highest?.score ?? highest?.matchPercentage ?? highest?.percentage,
    );
    return currentScore > highestScore ? current : highest;
  }, list[0]);
};

// Data Rekomendasi Default jika props belum disediakan dari Parent/BE
const DEFAULT_RECOMMENDATION_ITEMS = [
  {
    id: "math",
    major: "Math",
    titleIndo: "Matematika (Mathematics)",
    score: "98%", // Persentase kecocokan terbesar (tampil di lingkaran besar)
    cardScore: "98%", // Nilai pada pill kartu sesuai mockup Gambar 1
    testProgress: 100, // 100% = Selesai semua -> Hijau penuh
    statusLabel: "logis",
    statusVariant: "success", // green
    tags: ["Matematika", "Pendidikan"],
    illustration: mathIllustration,
  },
  {
    id: "teknologi",
    major: "Teknologi",
    titleIndo: "Teknologi Informasi (Information Technology)",
    score: "87%",
    cardScore: "87%",
    testProgress: 55, // 55% = Belum selesai -> Orange tidak penuh
    statusLabel: "gak cocok",
    statusVariant: "danger", // red
    tags: ["Teknologi", "Informatika"],
    illustration: mathIllustration,
  },
];

/**
 * Komponen Donut Progress Penyelesaian Jurusan:
 * - 100% (Selesai semua): Warna hijau & bundaran penuh
 * - >0% dan <100% (Belum selesai): Warna orange & bundaran gak penuh
 * - 0% (Masih kosong): Abu-abu & tidak ada arc progress
 */
function ProgressDonut({ progress = 0 }) {
  const normalized = Math.min(100, Math.max(0, Number(progress) || 0));
  const isComplete = normalized >= 100;
  const isStarted = normalized > 0;

  // Radius 14 pada viewBox 36x36 -> keliling = 2 * PI * 14 ≈ 87.96
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalized / 100) * circumference;

  let strokeColor = "#9ca3af"; // Default abu-abu
  if (isComplete) {
    strokeColor = "#48bb78"; // Hijau jika selesai semua
  } else if (isStarted) {
    strokeColor = "#f59e0b"; // Orange jika belum selesai
  }

  return (
    <div
      className="relative w-9 h-9 shrink-0 flex items-center justify-center"
      title={`Progress: ${normalized}%`}
    >
      <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
        {/* Lingkaran dasar abu-abu (selalu ada) */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="#d5d5d5"
          stroke="#b5b5b5"
          strokeWidth="3.8"
        />

        {/* Arc Progress Berwarna:
            - Hijau penuh jika 100%
            - Orange parsial jika >0% dan <100%
            - Tidak dirender jika 0% (sehingga tetap abu-abu) */}
        {isStarted && (
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="3.8"
            strokeDasharray={circumference}
            strokeDashoffset={isComplete ? 0 : strokeDashoffset}
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}

/**
 * Komponen 1: Halaman Ringkasan Hasil Rekomendasi (Sesuai Gambar 1)
 *
 * Props:
 * - recommendations: Array data rekomendasi jurusan dari parent (props)
 * - topRecommendation: Override rekomendasi utama jika ingin ditentukan manual
 * - onSelectMajor: Callback ketika user memilih salah satu kartu jurusan
 */
function RecommendationSummaryComponent({
  recommendations = DEFAULT_RECOMMENDATION_ITEMS,
  topRecommendation,
  onSelectMajor = () => {},
}) {
  const items =
    Array.isArray(recommendations) && recommendations.length > 0
      ? recommendations
      : DEFAULT_RECOMMENDATION_ITEMS;

  // Persentase lingkaran yang besar merupakan persentase terbesar dari jurusan yang ada
  const highestMajor = getHighestScoreMajor(items);
  const top = topRecommendation ||
    highestMajor ||
    items[0] || { score: "98%", major: "Math" };

  const topNumeric = parseScoreToNumber(
    top?.score ?? top?.matchPercentage ?? top?.percentage ?? 98,
  );

  // SVG Gauge besar lingkaran keliling
  const topRadius = 48;
  const topCircumference = 2 * Math.PI * topRadius; // ≈ 301.59
  const topDashoffset =
    topCircumference -
    (Math.min(100, Math.max(0, topNumeric)) / 100) * topCircumference;

  const topFormattedScore = top.score
    ? String(top.score).includes("%")
      ? top.score
      : `${top.score}%`
    : `${Math.round(topNumeric)}%`;

  return (
    <div className="w-full h-full flex flex-col bg-white font-sans overflow-hidden select-none">
      {/* ── 1. Top Header (Judul 'Hasil Rekomendasi' & Logo Arahkita) ── */}
      <header className="shrink-0 flex items-center justify-between px-6 pt-7 pb-2 max-w-md mx-auto w-full">
        <h1 className="text-[22px] font-extrabold text-gray-950 tracking-tight">
          Hasil Rekomendasi
        </h1>

        <div className="flex items-center">
          <img src={logoArahkita} alt="Arahkita" className="h-7 w-auto" />
          <span className="text-[22px] font-bold text-gray-950 tracking-tight">
            rahkita
          </span>
        </div>
      </header>

      {/* ── 2. Konten Scrollable ── */}
      <div className="flex-1 min-h-0 px-6 pt-2 pb-3 overflow-y-auto max-w-md mx-auto w-full flex flex-col items-center">
        {/* Lingkaran Gauge Besar: Persentase Terbesar dari Jurusan yang Ada */}
        <div className="my-5 relative flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
            {/* Lingkaran dasar abu-abu tipis */}
            <circle
              cx="60"
              cy="60"
              r={topRadius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="9"
            />
            {/* Lingkaran Luar Biru Berdasarkan Persentase Terbesar */}
            <circle
              cx="60"
              cy="60"
              r={topRadius}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="9"
              strokeDasharray={topCircumference}
              strokeDashoffset={topDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Teks di Tengah Lingkaran */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <span className="text-4xl font-extrabold text-gray-950 tracking-tight leading-none">
              {topFormattedScore}
            </span>
            <span className="text-sm font-semibold text-gray-800 mt-1">
              {top.major || "Math"}
            </span>
          </div>
        </div>

        {/* ── 3. Daftar Card Jurusan Berdasarkan Props ── */}
        <div className="w-full space-y-4 pb-2">
          {items.map((item, index) => {
            const currentProgress =
              item.testProgress !== undefined
                ? item.testProgress
                : item.progress !== undefined
                  ? item.progress
                  : 0;

            const cardIllustration = item.illustration || mathIllustration;
            const displayedScore =
              item.cardScore || item.score || `${Math.round(currentProgress)}%`;

            return (
              <div
                key={item.id || item.major || index}
                onClick={() => onSelectMajor(item)}
                className="w-full bg-[#d9d9d9] rounded-3xl p-3 shadow-md flex items-center overflow-hidden hover:shadow-lg active:scale-98 transition-all cursor-pointer"
              >
                {/* Gambar Ilustrasi Guru & Papan Tulis di Kiri */}
                <div className="w-34 sm:w-36 shrink-0 h-28 flex items-center justify-center overflow-hidden">
                  <img
                    src={cardIllustration}
                    alt={item.major}
                    className="h-full w-full object-contain object-left drop-shadow-xs"
                  />
                </div>

                {/* Konten Kanan */}
                <div className="flex-1 min-w-0 pl-2">
                  <h2 className="text-[19px] font-extrabold text-gray-950 tracking-tight leading-tight">
                    {item.major}
                  </h2>

                  {/* Donut Gauge Progress Penyelesaian Jurusan + Skor */}
                  <div className="flex items-center gap-2 mt-1 mb-1.5">
                    <ProgressDonut progress={currentProgress} />

                    <div className="bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                      <span className="text-xs font-extrabold text-gray-950">
                        {displayedScore}
                      </span>
                    </div>
                  </div>

                  {/* Badge Status (Logis / Gak Cocok / dll) */}
                  <div className="mb-2">
                    <div
                      className={`w-full py-0.5 rounded-full text-center text-xs font-bold text-white shadow-xs ${
                        item.statusVariant === "danger"
                          ? "bg-[#ff0000]"
                          : item.statusVariant === "neutral"
                            ? "bg-[#6b7280]"
                            : "bg-[#48bb78]"
                      }`}
                    >
                      {item.statusLabel ||
                        (currentProgress >= 100 ? "selesai" : "proses")}
                    </div>
                  </div>

                  {/* Tag Pills (Misal: Matematika, Pendidikan) */}
                  {item.tags &&
                    item.tags.length > 0 &&
                    item.statusVariant !== "danger" && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-[#1d3d63] text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RecommendationSummaryComponent;
