import { useState } from "react";
import GraphNodeComponent from "../components/graphNodeComponent";
import MajorTestComponent from "../components/MajorTestComponent";
import logoArahkita from "../assets/Logo.svg";
import heroIllustration from "../assets/rafiki.svg";

// Helper node platform 3D silinder isometrik dengan index animasi berurutan
const platformNode = (w, h, label, index = 0) => ({
  id: label || Math.random().toString(),
  type: "platform",
  data: { label, index },
  style: {
    width: w,
    height: h,
    background: "transparent",
    border: "none",
    boxShadow: "none",
    padding: 0,
  },
});

const initialNodes = [
  // Row 1 — SOSIOLOGI & SPORT
  {
    ...platformNode(125, 75, "SOSIOLOGI", 0),
    id: "n1",
    position: { x: 45, y: 30 },
  },
  {
    ...platformNode(115, 70, "SPORT", 1),
    id: "n2",
    position: { x: 250, y: 18 },
  },
  // Row 2 — MANAGEMENT & MATH
  {
    ...platformNode(152, 78, "MANAGEMENT", 2),
    id: "n3",
    position: { x: 18, y: 178 },
  },
  {
    ...platformNode(118, 72, "MATH", 3),
    id: "n4",
    position: { x: 245, y: 210 },
  },
  // Row 3 — TEKNOLOGI
  {
    ...platformNode(140, 75, "TEKNOLOGI", 4),
    id: "n5",
    position: { x: 130, y: 355 },
  },
];

const initialEdges = [];

function GraphNodePages() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleNodeClick = (_event, node) => {
    const rawLabel = node?.data?.label?.trim();
    let majorName = "Math";
    if (rawLabel) {
      majorName =
        rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();
    }
    setSelectedMajor(majorName);
  };

  // Jika user mengklik node jurusan, render komponen test soal jurusan tersebut
  if (selectedMajor) {
    return (
      <MajorTestComponent
        major={selectedMajor}
        onBack={() => setSelectedMajor(null)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <div className="w-full h-dvh flex flex-col bg-white font-sans overflow-hidden">
      {/* ── Header ── */}
      <header className="shrink-0 flex items-center justify-end px-5 pt-8 pb-8">
        <div className="flex items-center">
          <img src={logoArahkita} alt="Arahkita" className="h-7 w-auto" />
          <span className="text-[22px] font-bold text-gray-950 tracking-tight">
            rahkita
          </span>
        </div>
      </header>

      {/* ── Hero Greeting Card ── */}
      <div className="shrink-0 mx-5 mb-1">
        <div className="w-full h-36 rounded-[18px] bg-linear-to-r from-[#2b4f7a] via-[#3d6892] to-[#5a7ea8] shadow-hero flex items-center overflow-hidden relative">
          {/* Ilustrasi — full height, contain, tengah */}
          <div className="absolute left-0 top-0 bottom-0 w-40 flex items-center justify-center overflow-hidden">
            <img
              src={heroIllustration}
              alt="ilustrasi"
              className="h-full w-full object-contain object-center"
            />
          </div>
          {/* Teks Greeting */}
          <div className="ml-40 pl-4 z-10">
            <p className="text-sm text-blue-200 font-semibold leading-tight">
              Hai, Goodmorning
            </p>
            <p className="text-[19px] font-extrabold text-white tracking-tight leading-snug">
              welcome to arahkita
            </p>
          </div>
        </div>
      </div>

      {/* ── Graph Area ── */}
      <div className="flex-1 min-h-0">
        <GraphNodeComponent
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          preventScrolling={false}
          onNodeClick={handleNodeClick}
          // Override background ke dots
          backgroundProps={{
            variant: "dots",
            color: "#c8c8c8",
            gap: 40,
            size: 3,
          }}
        />
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="shrink-0 px-6 pb-6 pt-2">
        <nav className="w-full h-16 bg-[#d9d9d9] rounded-[22px] flex items-center justify-around shadow-nav px-2">
          {/* Beranda */}
          <button
            onClick={() => setActiveTab("home")}
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

export default GraphNodePages;
