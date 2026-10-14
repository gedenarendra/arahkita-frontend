import { useState } from "react";
import logoArahkita from "../assets/Logo.svg";

function DashboardPages() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-dvh w-full bg-white flex flex-col items-center overflow-x-hidden font-sans">
      {/* 
        Container utama:
        - Layar HP: max-w-107.5 (430px), persis proporsi gambar mockup (pt-12, px-5, pb-28).
        - Layar Laptop: melebar menyesuaikan layar (max-w-4xl / max-w-6xl, px-8 lg:px-12, pt-7).
      */}
      <div className="w-full max-w-107.5 md:max-w-4xl lg:max-w-6xl px-5 md:px-8 lg:px-12 pt-12 md:pt-7 pb-28 md:pb-12 flex flex-col flex-1 transition-all duration-300">
        {/* Header */}
        <header className="w-full flex items-center justify-between pb-0 md:pb-5 md:border-b md:border-gray-100">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src={logoArahkita}
              alt="Arahkita Logo"
              className="h-9.5 md:h-10 w-auto object-contain"
            />
            <span className="text-[22px] md:text-2xl font-bold text-gray-950 tracking-tight">
              Arahkita
            </span>
          </div>

          {/* Desktop Navigation (Muncul khusus di Laptop/Tablet agar layout lebih optimal) */}
          <nav className="hidden md:flex items-center gap-2 bg-[#eaeaea] p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "home"
                  ? "bg-white text-black shadow-xs"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
                <path d="M9.5 21v-7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7" />
              </svg>
              <span>Beranda</span>
            </button>

            <button
              onClick={() => setActiveTab("explore")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "explore"
                  ? "bg-white text-black shadow-xs"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
                <path d="M9.5 21v-7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7" />
              </svg>
              <span>Eksplorasi</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-white text-black shadow-xs"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
              <span>Profil</span>
            </button>
          </nav>
        </header>

        {/* Greeting Section */}
        <section className="mt-9 md:mt-8 flex flex-col">
          <p className="text-[13px] md:text-sm lg:text-base font-semibold text-[#8f96a3] tracking-wide">
            Hai, Goodmorning
          </p>
          <p className="text-xl md:text-sm lg:text-3xl font-extrabold text-black tracking-tight leading-tight">
            welcome to arahkita
          </p>
        </section>

        {/* 
          Dashboard Content Grid:
          - Mobile (< md): Vertikal persis gambar (Hero Card di atas, 3 kartu kecil di bawah).
          - Laptop (lg): 2 Kolom side-by-side (Hero Card 2/3 lebar di kiri, 3 kartu aksi di kanan vertikal).
          - Tablet (md): Hero Card di atas, 3 kartu memanjang di bawah.
        */}
        <div className="mt-4 md:mt-6 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-stretch">
          {/* Big Hero Card */}
          <section
            className="w-full h-36 md:h-56 lg:h-72 lg:col-span-8 rounded-[18px] md:rounded-2xl lg:rounded-3xl bg-linear-to-b from-[#305781] via-[#466c93] to-[#5d7c9f] shadow-hero transition-all duration-300"
            aria-label="Hero Card"
          ></section>

          {/* 3 Secondary Cards */}
          <section className="mt-3 md:mt-4 lg:mt-0 grid grid-cols-3 lg:flex lg:flex-col lg:justify-between gap-2.5 md:gap-4 lg:gap-3.5 w-full lg:col-span-4">
            <div className="h-14 md:h-20 lg:h-20.5 bg-[#d9d9d9] rounded-lg md:rounded-xl shadow-subcard hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"></div>
            <div className="h-14 md:h-20 lg:h-20.5 bg-[#d9d9d9] rounded-lg md:rounded-xl shadow-subcard hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"></div>
            <div className="h-14 md:h-20 lg:h-20.5 bg-[#d9d9d9] rounded-lg md:rounded-xl shadow-subcard hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"></div>
          </section>
        </div>
      </div>

      {/* 
        Floating Bottom Navigation:
        - Khusus di layar HP (< md): Muncul persis sesuai gambar (floating bar abu-abu di bawah).
        - Di layar Laptop (md:): Disembunyikan (md:hidden) karena navigasi sudah berpindah ke Top Navbar secara ergonomis.
      */}
      <nav
        className="fixed bottom-7 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-87 h-16.5 bg-[#d9d9d9] rounded-[22px] flex items-center justify-around shadow-nav z-50 px-2 md:hidden"
        aria-label="Bottom Navigation"
      >
        <button
          onClick={() => setActiveTab("home")}
          className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer ${
            activeTab === "home"
              ? "text-black scale-110"
              : "text-gray-800 hover:text-black"
          }`}
          aria-label="Home"
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
          className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer ${
            activeTab === "explore"
              ? "text-black scale-110"
              : "text-gray-800 hover:text-black"
          }`}
          aria-label="Explore"
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
          className={`p-2.5 transition-transform duration-150 rounded-xl cursor-pointer ${
            activeTab === "profile"
              ? "text-black scale-110"
              : "text-gray-800 hover:text-black"
          }`}
          aria-label="Profile"
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
  );
}

export default DashboardPages;
