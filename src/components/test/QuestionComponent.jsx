import { useState } from "react";
import logoArahkita from "../../assets/Logo.svg";

const DEFAULT_OPTIONS = [
  { id: 0, text: "Mengurangi aliran darah ke otot" },
  { id: 1, text: "Mengurangi aliran darah ke otot" },
  { id: 2, text: "Mengurangi aliran darah ke otot" },
  { id: 3, text: "Mengurangi aliran darah ke otot" },
];

function QuestionComponent({
  major = "Math",
  level = 2,
  questionData,
  onBack,
  onSubmit,
  activeTab = "home",
  setActiveTab = () => {},
}) {
  // Tipe soal ditentukan langsung dari data objek yang diterima ('multiple' atau 'essay')
  const type =
    questionData?.type ||
    (questionData?.options && questionData.options.length > 0
      ? "multiple"
      : "multiple");

  // Title dinamis mengikuti state jurusan yang dipilih (misal: Sosiologi Question, Sport Question, Math Question)
  const title = major ? `${major} Question` : questionData?.title || "Question";
  const questionText =
    questionData?.question ||
    "Manakah dari angka berikut yang merupakan bilangan prima?";
  const subtext =
    questionData?.subtext ||
    "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.";
  const options = questionData?.options || DEFAULT_OPTIONS;

  // State pilihan ganda (default terpilih opsi terakhir seperti di mockup)
  const [selectedOption, setSelectedOption] = useState(
    questionData?.defaultSelected !== undefined
      ? questionData.defaultSelected
      : 3,
  );

  // State essay
  const [essayAnswer, setEssayAnswer] = useState(
    questionData?.initialAnswer || "",
  );

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        level,
        type,
        answer: type === "multiple" ? selectedOption : essayAnswer,
      });
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col bg-white font-sans overflow-hidden select-none">
      {/* ── 1. Header (Tombol Back Bulat Abu-abu & Logo Arahkita) ── */}
      <header className="shrink-0 flex items-center justify-between px-5 pt-8 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="w-8.5 h-8.5 rounded-full bg-[#E0E0E0] hover:bg-[#D4D4D4] active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-xs text-white"
          aria-label="Kembali"
        >
          <svg
            className="w-4.5 h-4.5 -ml-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center">
          <img src={logoArahkita} alt="Arahkita" className="h-7 w-auto" />
          <span className="text-[22px] font-bold text-gray-950 tracking-tight">
            rahkita
          </span>
        </div>
      </header>

      {/* ── 2. Konten Pertanyaan ── */}
      <div className="flex-1 min-h-0 px-5 pt-1 overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Judul Pertanyaan Jurusan */}
          <div className="mb-2.5 text-left">
            <h1
              className="text-xl sm:text-2xl font-bold text-[#2C2C2C] tracking-tight"
              style={{ color: "#2C2C2C" }}
            >
              {title}
            </h1>
          </div>

          {/* Progress Bar (Garis Biru & Abu-abu Sesuai Gambar) */}
          <div className="w-full h-2.5 bg-[#D9D9D9] rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-[#1879DF] rounded-full transition-all duration-300"
              style={{ width: "42%" }}
            />
          </div>

          {/* Teks Soal & Petunjuk */}
          <div className="mb-6 text-left">
            <h2
              className="text-sm sm:text-base font-bold text-[#2C2C2C] leading-snug"
              style={{ color: "#2C2C2C" }}
            >
              {questionText}
            </h2>
            <p className="text-xs text-gray-500 font-normal mt-1 leading-relaxed">
              {subtext}
            </p>
          </div>

          {/* ── Render Pilihan Ganda Jika Tipe 'multiple' (Persis Gambar 2) ── */}
          {type === "multiple" && (
            <div className="space-y-3.5">
              {options.map((opt, idx) => {
                const optId = opt.id !== undefined ? opt.id : idx;
                const isSelected = selectedOption === optId;
                const displayText =
                  opt.text ||
                  opt.title ||
                  (typeof opt === "string" ? opt : `Opsi ${idx + 1}`);

                return (
                  <button
                    key={optId}
                    type="button"
                    onClick={() => setSelectedOption(optId)}
                    className={`w-full min-h-14 py-3.5 px-4 rounded-xl flex items-center justify-center text-center transition-all cursor-pointer shadow-md select-none active:scale-[0.99] ${
                      isSelected
                        ? "bg-[#407BFF] text-white"
                        : "bg-[#D9D9D9] text-[#1E1E1E] hover:bg-[#D0D0D4]"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium leading-snug">
                      {displayText}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Render Essay Jika Tipe 'essay' (Persis Gambar 1) ── */}
          {type === "essay" && (
            <div className="w-full text-left">
              {/* Garis Pembatas Biru Tua Membentang Penuh Sesuai Gambar */}
              <div className="-mx-5 h-0.5 bg-[#0C3C6F] mt-7 mb-4" />

              <h3
                className="font-bold text-[#2C2C2C] text-base mb-3"
                style={{ color: "#2C2C2C" }}
              >
                Your Answer
              </h3>

              {/* Area Kotak Teks Abu-abu Solid Besar */}
              <textarea
                value={essayAnswer}
                onChange={(e) => setEssayAnswer(e.target.value)}
                placeholder=""
                rows={7}
                className="w-full bg-[#D9D9D9] rounded-xs p-4 h-48 sm:h-52 text-xs sm:text-sm text-gray-900 outline-none resize-none font-medium"
              />
            </div>
          )}
        </div>

        {/* ── 3. Tombol Aksi (Back & Submit Sesuai Gambar) ── */}
        <div className="pt-4 pb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-23 h-9 bg-[#E0E0E0] hover:bg-[#D4D4D4] active:scale-95 text-gray-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-23 h-9 bg-[#0970DD] hover:bg-[#0765C8] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center"
          >
            Submit
          </button>
        </div>
      </div>

      {/* ── 4. Bottom Navigation Bar ── */}
      <div className="shrink-0 px-5 pb-5 pt-1">
        <nav className="w-full h-15 bg-[#D9D9D9] rounded-2xl flex items-center justify-around px-2 shadow-xs">
          <button
            onClick={() => {
              setActiveTab("home");
              onBack();
            }}
            className={`p-2 transition-transform duration-150 rounded-xl cursor-pointer ${
              activeTab === "home" ? "text-gray-900 scale-110" : "text-gray-700"
            }`}
            aria-label="Beranda"
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
              <path d="M9.5 21v-7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7" />
            </svg>
          </button>

          <button
            onClick={() => setActiveTab("explore")}
            className={`p-2 transition-transform duration-150 rounded-xl cursor-pointer ${
              activeTab === "explore"
                ? "text-gray-900 scale-110"
                : "text-gray-700"
            }`}
            aria-label="Eksplorasi"
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
              <path d="M9.5 21v-7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7" />
            </svg>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`p-2 transition-transform duration-150 rounded-xl cursor-pointer ${
              activeTab === "profile"
                ? "text-gray-900 scale-110"
                : "text-gray-700"
            }`}
            aria-label="Profil"
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default QuestionComponent;
