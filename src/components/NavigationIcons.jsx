/**
 * Ikon Navigasi Aplikasi Sesuai Mockup Desain:
 * 1. RecommendationNavIcon: Bola solid dengan lengkungan pantulan cahaya (arc highlight)
 * 2. HomeNavIcon: Rumah solid dengan cerobong asap dan pintu cut-out
 * 3. ProfileNavIcon: Siluet avatar solid (kepala lingkaran + bahu melengkung)
 */

export function RecommendationNavIcon({
  className = "w-7 h-7",
  cutoutColor = "#d9d9d9",
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9.6" />
      <path
        d="M6.2 10.5A6.2 6.2 0 0 1 10.5 6.2"
        fill="none"
        stroke={cutoutColor}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HomeNavIcon({
  className = "w-7 h-7",
  cutoutColor = "#d9d9d9",
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cerobong asap */}
      <rect x="15.8" y="4.2" width="2.4" height="5.5" rx="0.3" />
      {/* Atap & Bodi Rumah */}
      <path d="M2.5 11.2L12 3.4L21.5 11.2L19.8 12.2V19.8C19.8 20.6 19.1 21.3 18.3 21.3H5.7C4.9 21.3 4.2 20.6 4.2 19.8V12.2L2.5 11.2Z" />
      {/* Pintu cut-out */}
      <rect
        x="14.2"
        y="12.8"
        width="3.5"
        height="7.2"
        rx="0.5"
        fill={cutoutColor}
      />
    </svg>
  );
}

export function ProfileNavIcon({ className = "w-7 h-7" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kepala */}
      <circle cx="12" cy="7.6" r="4.1" />
      {/* Bahu */}
      <path d="M4.2 20.5C4.2 15.6 7.8 13.5 12 13.5C16.2 13.5 19.8 15.6 19.8 20.5C19.8 21.1 19.1 21.6 18.3 21.6H5.7C4.9 21.6 4.2 21.1 4.2 20.5Z" />
    </svg>
  );
}

