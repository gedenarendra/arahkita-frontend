import { useState } from "react";
import GraphNodeComponent from "./graphNodeComponent";
import TestPages from "../pages/testPages";
import logoArahkita from "../assets/Logo.png";
import mathIllustration from "../assets/math_illustration.png";
import {
  POSITION_TEMPLATES,
  generateNodesList,
} from "../utils/testNodeUtils";

function MajorTestComponent({
  major = "Math",
  onBack,
  // Props Dinamis untuk kebutuhan BE:
  nodesData = null, // Data array nodes dari BE
  totalNodes = 8, // Jumlah nodes yang akan ditampilkan (jika nodesData null)
  positionTemplate = POSITION_TEMPLATES.ZIGZAG_LEFT, // 'vertical' | 'zigzag-left' | 'zigzag-right'
  hiddens = null, // Props hiddens: array of id/level yg disembunyikan, angka limit, atau boolean
}) {
  // Awalnya yang tampil adalah No. 1 (Syarat & Ketentuan) dan No. 2 (Soal Pertama)
  const [unlockedLevel, setUnlockedLevel] = useState(2);
  const [completedLevels, setCompletedLevels] = useState([]);

  // State untuk merender TestPages: null | { mode: 'terms' | 'question', level: number, questionData: object }
  const [activeTestView, setActiveTestView] = useState(null);

  // Buat seluruh node dinamis berdasarkan template posisi & jumlah/data
  const allGeneratedNodes = generateNodesList({
    nodesData,
    totalCount: totalNodes,
    template: positionTemplate,
    major,
  });

  // Logika penyembunyian node menggunakan props `hiddens`:
  // - Jika hiddens berupa Array: sembunyikan node yang ID atau level-nya ada di array
  // - Jika hiddens berupa Number: tampilkan hanya sebanyak `hiddens` node (sembunyikan index >= hiddens)
  // - Jika hiddens berupa Boolean: jika true maka sembunyikan semua yang belum unlocked
  // - Jika hiddens null / undefined: default menyembunyikan yang belum unlocked (level > unlockedLevel)
  const isNodeHidden = (node, index) => {
    if (hiddens === null || hiddens === undefined) {
      return node.data.level > unlockedLevel;
    }
    if (Array.isArray(hiddens)) {
      return (
        hiddens.includes(node.id) ||
        hiddens.includes(node.data?.level) ||
        hiddens.includes(String(node.data?.level))
      );
    }
    if (typeof hiddens === "number") {
      return index >= hiddens;
    }
    if (typeof hiddens === "boolean") {
      return hiddens ? node.data.level > unlockedLevel : false;
    }
    if (typeof hiddens === "function") {
      return hiddens(node, index);
    }
    return false;
  };

  // Filter node yang tampil (tidak di-hidden) dan tambahkan status interaktif
  const visibleNodes = allGeneratedNodes
    .filter((node, index) => !isNodeHidden(node, index))
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
        currentQuestion={
          activeTestView.level > 1 ? activeTestView.level - 1 : 1
        }
        totalQuestions={Math.max(1, allGeneratedNodes.length - 1)}
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
            unlockedLevel < allGeneratedNodes.length
          ) {
            const nextLvl = unlockedLevel + 1;
            setUnlockedLevel(nextLvl);
          }
          setActiveTestView(null);
        }}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white font-sans overflow-hidden">
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
          Level {unlockedLevel}/{allGeneratedNodes.length} Terbuka
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
          // Batasi scroll vertikal sesuai jumlah node yang tampil
          translateExtent={[
            [-20, -10],
            [420, Math.max(450, visibleNodes.length * 110)],
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
    </div>
  );
}

export default MajorTestComponent;
