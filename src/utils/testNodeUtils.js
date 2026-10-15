/**
 * 3 Template Posisi Node Latihan:
 * 1. "vertical": Lurus ke bawah di tengah (X konstan)
 * 2. "zigzag-left": Dari kiri atas ke kanan bawah lalu selang-seling (kiri -> kanan -> kiri -> kanan...)
 * 3. "zigzag-right": Dari kanan atas ke kiri bawah lalu selang-seling (kanan -> kiri -> kanan -> kiri...)
 */
export const POSITION_TEMPLATES = {
  VERTICAL: "vertical",
  ZIGZAG_LEFT: "zigzag-left",
  ZIGZAG_RIGHT: "zigzag-right",
};

/**
 * Menghitung koordinat {x, y} berdasarkan index dan template posisi
 */
export const calculateNodePosition = (
  index,
  template = POSITION_TEMPLATES.ZIGZAG_LEFT,
  options = {},
) => {
  const {
    startY = 20,
    stepY = 100,
    leftX = 55,
    rightX = 245,
    centerX = 150,
  } = options;

  const y = startY + index * stepY;

  switch (template) {
    case POSITION_TEMPLATES.VERTICAL:
      // Template 1: Lurus vertikal ke bawah
      return { x: centerX, y };

    case POSITION_TEMPLATES.ZIGZAG_RIGHT:
      // Template 3: Kanan atas ke kiri bawah lalu selang-seling (Kanan -> Kiri -> Kanan...)
      return { x: index % 2 === 0 ? rightX : leftX, y };

    case POSITION_TEMPLATES.ZIGZAG_LEFT:
    default:
      // Template 2: Kiri atas ke kanan bawah lalu selang-seling (Kiri -> Kanan -> Kiri...)
      return { x: index % 2 === 0 ? leftX : rightX, y };
  }
};

/**
 * Generator data dummy untuk node soal jika belum ada data dari BE
 */
export const generateMockNodeData = (level, major = "Math") => {
  if (level === 1) {
    return {
      label: "1",
      level: 1,
      hasStar: true,
    };
  }

  const isMultiple = level % 2 === 0;
  if (isMultiple) {
    return {
      label: String(level),
      level,
      hasStar: true,
      questionData: {
        type: "multiple",
        title: `${major} Question`,
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
            title: "Angka 3",
            description: "Bilangan prima ganjil pertama.",
          },
          {
            id: 2,
            title: "Angka 4",
            description: "Bukan bilangan prima (dapat dibagi 2).",
          },
          {
            id: 3,
            title: "Angka 5",
            description: "Bilangan prima ganjil.",
          },
        ],
      },
    };
  }

  return {
    label: String(level),
    level,
    hasStar: true,
    questionData: {
      type: "essay",
      title: `${major} Question`,
      question: "Manakah dari angka berikut yang merupakan bilangan prima?",
      subtext:
        "Silakan pilih semua opsi yang benar, Anda bisa mengubah jawaban ini nanti sebelum dikumpulkan.",
    },
  };
};

/**
 * Generator daftar nodes dinamis dengan format ReactFlow
 */
export const generateNodesList = ({
  nodesData = null,
  totalCount = 8,
  template = POSITION_TEMPLATES.ZIGZAG_LEFT,
  major = "Math",
}) => {
  const count =
    Array.isArray(nodesData) && nodesData.length > 0
      ? nodesData.length
      : Math.max(1, totalCount);

  return Array.from({ length: count }, (_, index) => {
    const level = index + 1;
    const customData =
      Array.isArray(nodesData) && nodesData[index] ? nodesData[index] : null;

    const data = customData
      ? {
          label: String(customData.label || level),
          level: customData.level || level,
          hasStar: customData.hasStar ?? true,
          questionData: customData.questionData,
          ...customData,
        }
      : generateMockNodeData(level, major);

    return {
      id: customData?.id || `test-${level}`,
      type: "platform",
      data,
      position: calculateNodePosition(index, template),
      style: {
        width: 100,
        height: 68,
        background: "transparent",
        border: "none",
        padding: 0,
      },
    };
  });
};
