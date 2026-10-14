import logoArahkita from "../../assets/Logo.svg";
import termsHeroImg from "../../assets/terms_hero.png";

function TermsPolicyComponent({
  onBack,
  onAgree,
  onDisagree,
  activeTab = "home",
  setActiveTab = () => {},
}) {
  return (
    <div className="w-full h-dvh flex flex-col bg-white font-sans overflow-hidden select-none">
      {/* ── 1. Header (Tombol Back Bulat & Logo Arahkita) ── */}
      <header className="shrink-0 flex items-center justify-between px-5 sm:px-8 pt-7 pb-2.5 max-w-sm mx-auto w-full">
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

        <div className="flex items-center">
          <img src={logoArahkita} alt="Arahkita" className="h-7 w-auto" />
          <span className="text-[22px] font-bold text-gray-950 tracking-tight">
            rahkita
          </span>
        </div>
      </header>

      {/* ── 2. Hero Banner 'Hello Everyone' ── */}
      <div className="shrink-0 max-w-sm mx-auto w-full px-5 sm:px-8 mb-3">
        <div className="w-full rounded-[20px] overflow-hidden shadow-hero">
          <img
            src={termsHeroImg}
            alt="Hello Everyone"
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>

      {/* ── 3. Content Card Syarat dan Ketentuan (Warna #D9D9D9 Persegi Sesuai Mockup) ── */}
      <div className="flex-1 min-h-0 max-w-sm mx-auto w-full px-5 sm:px-8 overflow-hidden flex flex-col">
        <div className="w-full h-full bg-[#D9D9D9] p-4.5 sm:p-5 overflow-y-auto text-left shadow-xs">
          <h2 className="text-[17px] font-bold text-black mb-3 tracking-tight">
            Syarat dan Ketentuan
          </h2>

          <div className="space-y-3 text-[10.5px] sm:text-[11px] text-black leading-relaxed font-normal">
            <div>
              <p className="font-bold text-black mb-0.5">
                1. Penerimaan Syarat
              </p>
              <p>
                Dengan menggunakan situs web atau layanan ini, Anda setuju untuk
                mematuhi dan terikat oleh syarat dan ketentuan ini. Jika Anda
                tidak setuju dengan syarat ini, mohon jangan gunakan situs web
                atau layanan ini.
              </p>
            </div>

            <div>
              <p className="font-bold text-black mb-0.5">
                2. Penggunaan Layanan
              </p>
              <p>
                Anda setuju untuk menggunakan situs web atau layanan ini hanya
                untuk tujuan yang sah dan dengan cara yang tidak melanggar hak
                orang lain atau membatasi maupun menghalangi penggunaan orang
                lain terhadap situs web atau layanan ini.
              </p>
            </div>

            <div>
              <p className="font-bold text-black mb-0.5">3. Akun Pengguna</p>
              <p>
                Anda setuju untuk menggunakan situs web atau layanan ini hanya
                untuk tujuan yang sah dan dengan cara yang tidak melanggar hak
                orang lain atau membatasi maupun menghalangi penggunaan orang
                lain terhadap situs web atau layanan ini.
              </p>
            </div>

            <div>
              <p className="font-bold text-black mb-0.5">
                4. Kebijakan Privasi
              </p>
              <p>
                Penggunaan Anda atas situs web atau layanan ini juga diatur oleh
                Kebijakan Privasi kami. Harap tinjau Kebijakan Privasi kami
                untuk memahami bagaimana kami mengumpulkan.
              </p>
            </div>

            <div>
              <p className="font-bold text-black mb-0.5">
                5. Perubahan Syarat dan Ketentuan
              </p>
              <p>
                Kami berhak untuk mengubah, memodifikasi, atau memperbarui
                syarat dan ketentuan ini kapan saja tanpa pemberitahuan
                sebelumnya. Penggunaan Anda yang berkelanjutan atas layanan ini
                setelah adanya perubahan akan dianggap sebagai persetujuan Anda
                terhadap syarat yang baru.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Tombol Aksi (Disagree & Agree Sesuai Warna & Ukuran Mockup) ── */}
      <div className="shrink-0 max-w-sm mx-auto w-full px-5 sm:px-8 pt-3 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onDisagree}
          className="w-25 sm:w-27 h-8 sm:h-8.5 bg-[#E0E0E0] hover:bg-[#D5D5D5] active:scale-95 text-black font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center"
        >
          Disagree
        </button>
        <button
          type="button"
          onClick={onAgree}
          className="w-21.5 sm:w-23.5 h-8 sm:h-8.5 bg-[#8D8A9F] hover:bg-[#7D7A8F] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center"
        >
          Agree
        </button>
      </div>

      {/* ── 5. Bottom Navigation Bar ── */}
      <div className="shrink-0 max-w-sm mx-auto w-full px-5 sm:px-8 pb-5 pt-1">
        <nav className="w-full h-16 bg-[#d9d9d9] rounded-[22px] flex items-center justify-around shadow-nav px-2">
          <button
            onClick={() => {
              setActiveTab("home");
              onBack();
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

export default TermsPolicyComponent;
