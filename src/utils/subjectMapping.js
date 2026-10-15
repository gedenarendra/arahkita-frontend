/**
 * Mapping constant dan utility untuk normalisasi payload nilai mata pelajaran ke backend.
 */

export const BACKEND_SUBJECT_KEYS = Object.freeze({
  MATEMATIKA: "Matematika",
  BAHASA_INGGRIS: "Bahasa_Inggris",
  IPA: "IPA",
});

/**
 * Pemetaan resmi mata pelajaran antara backend key dan label UI frontend.
 */
export const SUBJECT_MAPPING = Object.freeze({
  Matematika: "Matematika",
  Bahasa_Inggris: "Bahasa Inggris",
  IPA: "IPA",
});

export const DEFAULT_GRADE = 80;

/**
 * Mencocokkan string nama mata pelajaran dari input user ke backend key resmi.
 *
 * @param {string} rawName
 * @returns {"Matematika" | "Bahasa_Inggris" | "IPA" | null}
 */
export function matchSubjectToBackendKey(rawName = "") {
  if (typeof rawName !== "string") return null;

  const normalized = rawName.trim().toLowerCase();

  // Pencocokan Bahasa Inggris (contoh: "Bahasa Inggris", "bahasa inggris", "inggris", "Bahasa_Inggris")
  if (
    normalized.includes("inggris") ||
    normalized === "bahasa inggris" ||
    normalized === "bahasa_inggris"
  ) {
    return BACKEND_SUBJECT_KEYS.BAHASA_INGGRIS;
  }

  // Pencocokan Matematika (contoh: "Matematika", "matematika", "math")
  if (normalized.includes("matematika") || normalized === "math") {
    return BACKEND_SUBJECT_KEYS.MATEMATIKA;
  }

  // Pencocokan IPA (contoh: "IPA", "ipa", "ilmu pengetahuan alam", "sains")
  if (
    normalized === "ipa" ||
    normalized.startsWith("ipa ") ||
    normalized === "ilmu pengetahuan alam" ||
    normalized === "sains"
  ) {
    return BACKEND_SUBJECT_KEYS.IPA;
  }

  return null;
}

/**
 * Menghasilkan objek nilai yang selalu valid sesuai skema backend:
 * {
 *   "Matematika": number,
 *   "IPA": number,
 *   "Bahasa_Inggris": number
 * }
 *
 * Jika ada mata pelajaran yang tidak diisi user, otomatis diisi nilai default (80).
 *
 * @param {Array<{ name: string, grade: number|string }> | Record<string, number|string>} input
 * @param {number} defaultGrade - Nilai default jika mata pelajaran belum diisi (default: 80)
 * @returns {{ Matematika: number, IPA: number, Bahasa_Inggris: number }}
 */
export function mapSubjectsToBackendPayload(
  input,
  defaultGrade = DEFAULT_GRADE
) {
  // Nilai awal seluruh kunci yang wajib ada
  const payload = {
    [BACKEND_SUBJECT_KEYS.MATEMATIKA]: defaultGrade,
    [BACKEND_SUBJECT_KEYS.IPA]: defaultGrade,
    [BACKEND_SUBJECT_KEYS.BAHASA_INGGRIS]: defaultGrade,
  };

  const parseGrade = (val) => {
    if (val === "" || val === undefined || val === null) return defaultGrade;
    const num = Number(val);
    return isNaN(num) ? defaultGrade : num;
  };

  // Jika input berupa Array (dari state UI selectedSubjects)
  if (Array.isArray(input)) {
    input.forEach((item) => {
      if (!item?.name) return;
      const matchedKey = matchSubjectToBackendKey(item.name);
      if (matchedKey) {
        payload[matchedKey] = parseGrade(item.grade);
      }
    });
    return payload;
  }

  // Jika input berupa Objek key-value (misal payload yang sudah dibentuk sebelumnya)
  if (input && typeof input === "object") {
    Object.entries(input).forEach(([key, val]) => {
      const matchedKey = matchSubjectToBackendKey(key);
      if (matchedKey) {
        payload[matchedKey] = parseGrade(val);
      }
    });
  }

  return payload;
}

export default {
  BACKEND_SUBJECT_KEYS,
  SUBJECT_MAPPING,
  DEFAULT_GRADE,
  matchSubjectToBackendKey,
  mapSubjectsToBackendPayload,
};
