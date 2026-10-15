/**
 * Komponen 3: Bottom Sheet Modal Detail Karir Path (Sesuai Gambar 3)
 * Menampilkan rincian profesi, deskripsi, dan pilihan lingkungan kerja
 */
function CareerDetailModal({ career, onClose }) {
  if (!career) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-[1px] transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Bottom Sheet Box */}
      <div
        className="w-full max-w-md mx-auto bg-white rounded-t-4xl sm:rounded-t-[36px] px-6 sm:px-8 pt-6 pb-10 shadow-2xl transition-transform animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar kecil di atas (opsional untuk feel mobile) */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* Judul Profesi */}
        <h2 className="text-2xl sm:text-[26px] font-extrabold text-gray-950 tracking-tight mb-2">
          {career.title}
        </h2>

        {/* Garis Divider Abu-abu Tebal */}
        <div className="w-full h-1 bg-gray-200 rounded-full mb-5" />

        {/* Deskripsi Profesi */}
        <p className="text-xs sm:text-[13px] text-gray-800 leading-relaxed font-normal mb-8">
          {career.description}
        </p>

        {/* Section Pilihan Lingkungan Kerja */}
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-bold text-gray-950">
            Pilihan Lingkungan Kerja
          </h3>
          <ul className="text-xs sm:text-[12.5px] text-gray-800 space-y-1.5 font-normal pl-3">
            {career.workEnvironments?.map((env, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-gray-900">•</span>
                <span>
                  <strong className="font-semibold text-gray-950">
                    {env.label}:
                  </strong>{" "}
                  {env.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CareerDetailModal;
