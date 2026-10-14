import { useState } from "react";
import GraphNodeComponent from "./graphNodeComponent";
import TestPages from "../pages/testPages";
import logoArahkita from "../assets/Logo.svg";
import mathIllustration from "../assets/math_illustration.png";

// Definisi node latihan level 1-8 dengan posisi acak organik meliuk bebas tapi tetap rapi & terurut ke bawah
const allTestNodes = [
  // Level 1: Kiri (Syarat & Ketentuan)
  {
    id: "test-1",
    type: "platform",
    data: { label: "1", level: 1, hasStar: true },
    position: { x: 55, y: 20 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
  // Level 2: Tengah Kanan (Soal Pilihan Ganda)
  {
    id: "test-2",
    type: "platform",
    data: {
      label: "2",
      level: 2,
      questionData: {
        type: "multiple",
        title: "Math Question",
        question: "Manakah dari angka berikut yang merupakan bilangan prima?",
        subtext:
          "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
        options: [
          {
            id: 0,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 1,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 2,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 3,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
        ],
      },
    },
    position: { x: 195, y: 115 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
  // Level 3: Kanan Jauh (Soal Essay)
  {
    id: "test-3",
    type: "platform",
    data: {
      label: "3",
      level: 3,
      questionData: {
        type: "essay",
        title: "Math Question",
        question: "Manakah dari angka berikut yang merupakan bilangan prima?",
        subtext:
          "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
      },
    },
    position: { x: 250, y: 210 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
  // Level 4: Tepat di Tengah (Soal Pilihan Ganda)
  {
    id: "test-4",
    type: "platform",
    data: {
      label: "4",
      level: 4,
      questionData: {
        type: "multiple",
        title: "Math Question",
        question: "Manakah dari angka berikut yang merupakan bilangan prima?",
        subtext:
          "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
        options: [
          {
            id: 0,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 1,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 2,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 3,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
        ],
      },
    },
    position: { x: 145, y: 310 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
  // Level 5: Kiri Jauh (Soal Essay)
  {
    id: "test-5",
    type: "platform",
    data: {
      label: "5",
      level: 5,
      questionData: {
        type: "essay",
        title: "Math Question",
        question: "Manakah dari angka berikut yang merupakan bilangan prima?",
        subtext:
          "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
      },
    },
    position: { x: 40, y: 410 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
  // Level 6: Tengah Kiri (Soal Pilihan Ganda)
  {
    id: "test-6",
    type: "platform",
    data: {
      label: "6",
      level: 6,
      questionData: {
        type: "multiple",
        title: "Math Question",
        question: "Manakah dari angka berikut yang merupakan bilangan prima?",
        subtext:
          "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
        options: [
          {
            id: 0,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 1,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 2,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
          {
            id: 3,
            title: "Angka 2",
            description: "Satu-satunya bilangan prima yang bernilai genap.",
          },
        ],
      },
    },
    position: { x: 95, y: 510 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
  // Level 7: Kanan (Soal Essay)
  {
    id: "test-7",
    type: "platform",
    data: {
      label: "7",
      level: 7,
      questionData: {
        type: "essay",
        title: "Math Question",
        question: "Manakah dari angka berikut yang merupakan bilangan prima?",
        subtext:
          "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
      },
    },
    position: { x: 235, y: 610 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
  // Level 8: Tengah (Soal Essay)
  {
    id: "test-8",
    type: "platform",
    data: {
      label: "8",
      level: 8,
      questionData: {
        type: "essay",
        title: "Math Question",
        question: "Manakah dari angka berikut yang merupakan bilangan prima?",
        subtext:
          "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
      },
    },
    position: { x: 150, y: 710 },
    style: {
      width: 100,
      height: 68,
      background: "transparent",
      border: "none",
      padding: 0,
    },
  },
];

function MajorTestComponent({
  major = "Math",
  onBack,
  activeTab = "home",
  setActiveTab = () => {},
}) {
  // Awalnya yang tampil adalah No. 1 (Syarat & Ketentuan) dan No. 2 (Soal Pertama)
  const [unlockedLevel, setUnlockedLevel] = useState(2);
  const [completedLevels, setCompletedLevels] = useState([]);

  // State untuk merender TestPages: null | { mode: 'terms' | 'question', level: number, questionData: object }
  const [activeTestView, setActiveTestView] = useState(null);

  // Filter node yang sedang terbuka (unlocked)
  const visibleNodes = allTestNodes
    .filter((node) => node.data.level <= unlockedLevel)
    .map((node) => ({
      ...node,
      data: {
        ...node.data,
        hasStar: true,
        isCompleted: completedLevels.includes(node.data.level),
        isActive:
          node.data.level ===
          (completedLevels.length === 0 ? 1 : Math.max(...completedLevels) + 1),
      },
    }));

  // Handler klik node:
  // Node 1 -> TestPages dengan mode 'terms' (TermsPolicyComponent)
  // Selain Node 1 -> TestPages dengan mode 'question' (QuestionComponent) sesuai questionData di node
  const handleNodeClick = (_event, node) => {
    const lvl = node?.data?.level;
    if (!lvl) return;

    if (lvl === 1) {
      setActiveTestView({ mode: "terms", level: 1 });
    } else {
      setActiveTestView({
        mode: "question",
        level: lvl,
        questionData: {
          ...node?.data?.questionData,
          title: `${major} Question`,
        },
      });
    }
  };

  // Jika user sedang masuk ke halaman test/soal/terms, render TestPages
  if (activeTestView) {
    return (
      <TestPages
        mode={activeTestView.mode}
        level={activeTestView.level}
        questionData={activeTestView.questionData}
        major={major}
        onBack={() => setActiveTestView(null)}
        onAgreeTerms={() => {
          if (!completedLevels.includes(1)) {
            setCompletedLevels((prev) => [...prev, 1]);
          }
          setActiveTestView(null);
        }}
        onSubmitQuestion={() => {
          const currentLvl = activeTestView.level;
          if (!completedLevels.includes(currentLvl)) {
            setCompletedLevels((prev) => [...prev, currentLvl]);
          }
          // Jika menyelesaikan level terakhir yang terbuka, buka level berikutnya
          if (
            currentLvl >= 2 &&
            currentLvl === unlockedLevel &&
            unlockedLevel < allTestNodes.length
          ) {
            const nextLvl = unlockedLevel + 1;
            setUnlockedLevel(nextLvl);
          }
          setActiveTestView(null);
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <div className="w-full h-dvh flex flex-col bg-white font-sans overflow-hidden">
      {/* ── 1. Header (Tombol Back Bulat & Logo Arahkita) ── */}
      <header className="shrink-0 flex items-center justify-between px-5 pt-8 pb-3">
        {/* Tombol Back Bulat Abu-abu */}
        <button
          type="button"
          onClick={onBack}
          className="w-8.5 h-8.5 rounded-full bg-[#E2E8F0] hover:bg-[#CBD5E1] active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-xs text-gray-700"
          aria-label="Kembali"
        >
          <svg
            className="w-4.5 h-4.5 -ml-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Logo Arahkita di Kanan */}
        <div className="flex items-center">
          <img src={logoArahkita} alt="Arahkita" className="h-7 w-auto" />
          <span className="text-[22px] font-bold text-gray-950 tracking-tight">
            rahkita
          </span>
        </div>
      </header>

      {/* ── 2. Hero Card Jurusan ── */}
      <div className="shrink-0 mx-5 mb-1">
        <div className="w-full h-38 sm:h-40 rounded-[20px] bg-linear-to-r from-[#21436c] via-[#2f557d] to-[#456b92] shadow-hero flex items-center overflow-hidden relative px-3 py-2">
          {/* Ilustrasi Guru / Papan Tulis di Kiri */}
          <div className="w-36 sm:w-40 shrink-0 h-full flex items-center justify-center overflow-hidden">
            <img
              src={mathIllustration}
              alt={major}
              className="h-full w-full object-contain object-left drop-shadow-sm"
            />
          </div>

          {/* Teks Judul & Deskripsi Jurusan */}
          <div className="flex-1 min-w-0 pl-2.5 pr-2 z-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight capitalize">
              {major}
            </h2>
            <p className="text-[11px] sm:text-xs text-white/85 font-normal leading-relaxed mt-1.5">
              Soal soal ini dimana membantu sejauh mana kamu menemukan sebuah
              passion yang pas untuk jurusan kamu
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. Judul Section 'Latihan test' & Indikator Progress ── */}
      <div className="shrink-0 px-6 pt-3 pb-1 flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-gray-950 tracking-tight">
          Latihan test
        </h3>
        <span className="text-xs font-semibold text-gray-950 px-2.5 py-0.5 rounded-full">
          Level {unlockedLevel}/{allTestNodes.length} Terbuka
        </span>
      </div>

      {/* ── 4. Graph Area (Tampil bertahap: No 1 & 2 awal, No 3 muncul setelah No 2 selesai) ── */}
      <div className="flex-1 min-h-0 relative">
        <GraphNodeComponent
          nodes={visibleNodes}
          edges={[]}
          fitView={false}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          // Izinkan scroll vertikal dan drag
          panOnDrag={true}
          panOnScroll={true}
          panOnScrollMode="vertical"
          // Nonaktifkan zoom
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          elementsSelectable={false}
          onNodeClick={handleNodeClick}
          // Batasi scroll vertikal sesuai jumlah node yang telah terbuka
          translateExtent={[
            [-20, -10],
            [420, Math.max(450, unlockedLevel * 105)],
          ]}
          // Background dot grid abu-abu
          backgroundProps={{
            variant: "dots",
            color: "#c8c8c8",
            gap: 40,
            size: 3,
          }}
        />
      </div>

      {/* ── 5. Bottom Navigation (Identik dengan Halaman Utama) ── */}
      <div className="shrink-0 px-6 pb-6 pt-2">
        <nav className="w-full h-16 bg-[#d9d9d9] rounded-[22px] flex items-center justify-around shadow-nav px-2">
          {/* Beranda */}
          <button
            onClick={() => {
              setActiveTab("home");
              onBack(); // Klik beranda kembali ke graf utama
            }}
            className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer ${
              activeTab === "home" ? "text-black scale-110" : "text-gray-700"
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

          {/* Eksplorasi */}
          <button
            onClick={() => setActiveTab("explore")}
            className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer ${
              activeTab === "explore" ? "text-black scale-110" : "text-gray-700"
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

          {/* Profil */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer ${
              activeTab === "profile" ? "text-black scale-110" : "text-gray-700"
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

export default MajorTestComponent;
