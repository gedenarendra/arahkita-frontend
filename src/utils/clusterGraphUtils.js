/**
 * Utilitas untuk mengelompokkan jurusan menjadi pohon hierarki:
 * Node Rumpun Bidang (Parent) -> Edges (Relasi) -> Node Jurusan (Child).
 */

// Kamus aturan pengelompokan jurusan ke rumpun bidang
export const CLUSTER_DEFINITIONS = [
  {
    id: "saintek",
    name: "Sains & Teknologi",
    color: "#0070E0",
    keywords: [
      "teknik",
      "informatika",
      "komputer",
      "sistem informasi",
      "math",
      "matematika",
      "fisika",
      "kimia",
      "biologi",
      "statistika",
      "arsitektur",
      "teknologi",
      "sipil",
      "mesin",
      "elektro",
      "industri",
      "data",
      "geologi",
      "pertanian",
      "robotika",
      "kecerdasan buatan",
      "software",
    ],
  },
  {
    id: "ekonomi_bisnis",
    name: "Ekonomi & Bisnis",
    color: "#D97706",
    keywords: [
      "manajemen",
      "management",
      "akuntansi",
      "bisnis",
      "ekonomi",
      "keuangan",
      "pemasaran",
      "perbankan",
      "aktuaris",
      "kewirausahaan",
      "logistik",
    ],
  },
  {
    id: "soshum",
    name: "Sosial & Humaniora",
    color: "#7C3AED",
    keywords: [
      "sosiologi",
      "hukum",
      "psikologi",
      "komunikasi",
      "hubungan internasional",
      "politik",
      "sastra",
      "sejarah",
      "antropologi",
      "filsafat",
      "bahasa",
      "kriminologi",
    ],
  },
  {
    id: "kesehatan",
    name: "Kesehatan & Medis",
    color: "#059669",
    keywords: [
      "kedokteran",
      "dokter",
      "farmasi",
      "keperawatan",
      "gizi",
      "kebidanan",
      "kesehatan",
      "fisioterapi",
      "kedokteran gigi",
      "radiologi",
    ],
  },
  {
    id: "seni_desain",
    name: "Seni & Desain",
    color: "#DB2777",
    keywords: [
      "desain",
      "dkv",
      "seni",
      "musik",
      "animasi",
      "film",
      "kriya",
      "teater",
      "fotografi",
      "interior",
    ],
  },
  {
    id: "olahraga",
    name: "Keolahragaan",
    color: "#DC2626",
    keywords: ["sport", "olahraga", "penjas", "rekreasi", "kepelatihan"],
  },
];

/**
 * Mendeteksi informasi rumpun bidang berdasarkan nama jurusan atau atribut rumpun
 */
export function detectClusterForMajor(major = {}) {
  const explicitCluster =
    major.rumpun || major.category || major.field_category || major.bidang;

  if (explicitCluster) {
    const matched = CLUSTER_DEFINITIONS.find(
      (c) =>
        c.name.toLowerCase() === String(explicitCluster).toLowerCase() ||
        c.id === String(explicitCluster).toLowerCase(),
    );
    if (matched) {
      return matched;
    }
    return {
      id: String(explicitCluster).toLowerCase().replace(/\s+/g, "_"),
      name: String(explicitCluster),
      color: major.circle_color || "#0070E0",
      keywords: [],
    };
  }

  const majorName = String(major.major_name || major.label || "").toLowerCase();

  for (const cluster of CLUSTER_DEFINITIONS) {
    const match = cluster.keywords.some((kw) => majorName.includes(kw));
    if (match) {
      return cluster;
    }
  }

  // Default cluster jika tidak ada yang cocok
  return {
    id: "bidang_terkait",
    name: "Eksplorasi Minat",
    color: major.circle_color || "#0070E0",
    keywords: [],
  };
}

/**
 * Membangun array Node Rumpun, Node Jurusan, dan Edges penghubung
 * dari data array rekomendasi jurusan yang bersumber dari repository/IndexedDB.
 *
 * @param {Array<object>} rawMajors - Array data rekomendasi jurusan dari Dexie / BE
 * @returns {{ nodes: Array<object>, edges: Array<object> }}
 */
export function buildClusterHierarchyGraph(rawMajors = []) {
  if (!Array.isArray(rawMajors) || rawMajors.length === 0) {
    return getInitialClusterGraph();
  }

  // 1. Kelompokkan jurusan berdasarkan cluster/rumpun
  const clusterGroups = new Map();

  rawMajors.forEach((major, index) => {
    const cluster = detectClusterForMajor(major);
    if (!clusterGroups.has(cluster.id)) {
      clusterGroups.set(cluster.id, {
        clusterInfo: cluster,
        majors: [],
      });
    }
    clusterGroups.get(cluster.id).majors.push({
      ...major,
      originalIndex: index,
    });
  });

  const nodes = [];
  const edges = [];

  let currentY = 30;
  const RUMPUN_X = 25; // Sisi Kiri
  const MAJOR_X = 210; // Sisi Kanan (Kolom 1)
  const MAJOR_COL2_X = 350; // Sisi Kanan (Kolom 2 jika jurusan > 3)
  const MAJOR_ROW_STEP = 90; // Jarak vertikal antar jurusan
  const CLUSTER_MARGIN_BOTTOM = 45; // Jarak pemisah antar rumpun vertikal

  let nodeCounter = 0;

  clusterGroups.forEach((group, clusterId) => {
    const { clusterInfo, majors } = group;
    const majorsCount = majors.length;

    // Tentukan jumlah baris jurusan
    const rowsCount =
      majorsCount > 3 ? Math.ceil(majorsCount / 2) : majorsCount;
    const totalMajorsHeight = Math.max(80, (rowsCount - 1) * MAJOR_ROW_STEP);

    // Node Rumpun diletakkan di sisi KIRI, di tengah vertikal terhadap jurusan-jurusannya
    const parentX = RUMPUN_X;
    const parentY = currentY + Math.round(totalMajorsHeight / 2);

    const parentNodeId = `cluster-${clusterId}`;

    // A. Buat Node Rumpun Bidang (Parent Node di Kiri - Non-Clickable)
    nodes.push({
      id: parentNodeId,
      type: "platform",
      position: { x: parentX, y: parentY },
      selectable: false,
      focusable: false,
      draggable: false,
      data: {
        id: parentNodeId,
        label: clusterInfo.name,
        color: clusterInfo.color,
        isCluster: true,
        index: nodeCounter++,
        majorsCount,
      },
      style: {
        width: 140,
        height: 71,
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: 0,
      },
    });

    // B. Buat Node Jurusan Terkait di sisi KANAN
    majors.forEach((major, mIdx) => {
      let childX;
      let childY;

      if (majorsCount <= 3) {
        // 1 kolom berbaris vertikal di kanan
        childX = MAJOR_X;
        childY = currentY + mIdx * MAJOR_ROW_STEP;
      } else {
        // 2 kolom berbaris di kanan jika lebih dari 3 jurusan
        const col = mIdx % 2;
        const row = Math.floor(mIdx / 2);
        childX = col === 0 ? MAJOR_X : MAJOR_COL2_X;
        childY = currentY + row * MAJOR_ROW_STEP;
      }

      const majorNodeId = String(major.id || `major-${clusterId}-${mIdx}`);

      nodes.push({
        id: majorNodeId,
        type: "platform",
        position: { x: childX, y: childY },
        data: {
          id: major.id,
          label: major.major_name,
          color: major.circle_color || clusterInfo.color,
          childId: major.child_id,
          index: nodeCounter++,
          isCluster: false,
          clusterName: clusterInfo.name,
          raw: major,
        },
        style: {
          width: 125,
          height: 68,
          background: "transparent",
          border: "none",
          boxShadow: "none",
          padding: 0,
        },
      });

      // C. Garis Relasi (Edge) lurus solid dari Kanan Rumpun ke Kiri Jurusan (sesuai referensi desain)
      edges.push({
        id: `edge-${parentNodeId}-${majorNodeId}`,
        source: parentNodeId,
        sourceHandle: "source-right",
        target: majorNodeId,
        targetHandle: "target-left",
        type: "straight",
        style: {
          stroke: clusterInfo.color || "#0052CC",
          strokeWidth: 3,
        },
      });
    });

    // Geser Y ke bawah untuk kelompok rumpun berikutnya
    currentY +=
      Math.max(90, rowsCount * MAJOR_ROW_STEP) + CLUSTER_MARGIN_BOTTOM;
  });

  return { nodes, edges };
}

/**
 * Data awal / fallback graf hierarki jika belum ada data di repository
 */
export function getInitialClusterGraph() {
  const dummyMajors = [
    {
      id: "m-sosiologi",
      major_name: "SOSIOLOGI",
      rumpun: "Sosial & Humaniora",
      circle_color: "#7C3AED",
    },
    {
      id: "m-sport",
      major_name: "SPORT",
      rumpun: "Keolahragaan",
      circle_color: "#DC2626",
    },
    {
      id: "m-management",
      major_name: "MANAGEMENT",
      rumpun: "Ekonomi & Bisnis",
      circle_color: "#D97706",
    },
    {
      id: "m-math",
      major_name: "MATH",
      rumpun: "Sains & Teknologi",
      circle_color: "#0070E0",
    },
    {
      id: "m-teknologi",
      major_name: "TEKNIK INFORMATIKA",
      rumpun: "Sains & Teknologi",
      circle_color: "#0070E0",
    },
  ];

  return buildClusterHierarchyGraph(dummyMajors);
}
