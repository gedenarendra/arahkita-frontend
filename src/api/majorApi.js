import apiClient from '../lib/apiClient';
import majorRepository from '../repositories/majorRepository';
import { mapSubjectsToBackendPayload } from '../utils/subjectMapping';
import { buildClusterHierarchyGraph } from '../utils/clusterGraphUtils';

export const NODE_LAYOUT_SLOTS = [
  { x: 45, y: 30, w: 135, h: 75 },
  { x: 245, y: 20, w: 125, h: 70 },
  { x: 25, y: 175, w: 145, h: 78 },
  { x: 240, y: 205, w: 130, h: 72 },
  { x: 130, y: 350, w: 140, h: 75 },
  { x: 50, y: 485, w: 135, h: 75 },
];

/**
 * Mentransformasikan array MajorNode ke format visual node UI sederhana (Legacy mapping).
 */
export function mapMajorNodesToUi(nodes = []) {
  if (!Array.isArray(nodes)) return [];

  return nodes.map((node, index) => {
    const slot = NODE_LAYOUT_SLOTS[index] || {
      x: 100,
      y: 100 + index * 120,
      w: 130,
      h: 75,
    };

    return {
      id: node.id || `node-${index}`,
      type: 'platform',
      position: { x: slot.x, y: slot.y },
      data: {
        id: node.id,
        label: node.major_name,
        color: node.circle_color,
        childId: node.child_id,
        index,
        raw: node,
      },
      style: {
        width: slot.w,
        height: slot.h,
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
      },
    };
  });
}

/**
 * Melakukan fetch POST /api/v1/majors/recommend dengan strategi offline-first.
 * 1. Panggil backend API menggunakan apiClient.
 * 2. Jika sukses, simpan hasil ke IndexedDB (Dexie) melalui majorRepository.
 * 3. Jika API gagal / offline, otomatis fallback membaca data lokal dari IndexedDB.
 *
 * @param {object} params
 * @param {string} params.minat - Teks deskripsi/string minat siswa
 * @param {{ Matematika: number, IPA: number, Bahasa_Inggris: number }} params.nilai - Nilai mata pelajaran
 * @returns {Promise<{ success: boolean, data: Array, mappedNodes: Array, mappedEdges: Array, fromCache: boolean, error: string|null }>}
 */
export async function fetchRecommendedMajors({ minat, nilai }) {
  const sanitizedNilai = mapSubjectsToBackendPayload(nilai);
  const payload = { minat, nilai: sanitizedNilai };

  const response = await apiClient.post('/api/v1/majors/recommend', payload);

  if (response.success && Array.isArray(response.data)) {
    await majorRepository.saveMajors(response.data);
    const hierarchy = buildClusterHierarchyGraph(response.data);

    return {
      success: true,
      data: response.data,
      mappedNodes: hierarchy.nodes,
      mappedEdges: hierarchy.edges,
      nodes: hierarchy.nodes,
      edges: hierarchy.edges,
      fromCache: false,
      error: null,
    };
  }

  // Fallback offline-first: Cek data lokal dari IndexedDB
  const cached = await majorRepository.getAllMajors();
  if (cached && cached.length > 0) {
    const hierarchy = buildClusterHierarchyGraph(cached);
    return {
      success: true,
      data: cached,
      mappedNodes: hierarchy.nodes,
      mappedEdges: hierarchy.edges,
      nodes: hierarchy.nodes,
      edges: hierarchy.edges,
      fromCache: true,
      error: null,
    };
  }

  return {
    success: false,
    data: null,
    mappedNodes: [],
    mappedEdges: [],
    nodes: [],
    edges: [],
    fromCache: false,
    error: response.error || 'Gagal memuat rekomendasi jurusan',
  };
}

/**
 * Mengambil data rekomendasi jurusan yang tersimpan di IndexedDB dan memetakannya ke graf hierarki.
 */
export async function getCachedMajors() {
  const cached = await majorRepository.getAllMajors();
  const hierarchy = buildClusterHierarchyGraph(cached);

  return {
    data: cached,
    mappedNodes: hierarchy.nodes,
    mappedEdges: hierarchy.edges,
    nodes: hierarchy.nodes,
    edges: hierarchy.edges,
  };
}

export const majorApi = {
  fetchRecommendedMajors,
  getCachedMajors,
  mapMajorNodesToUi,
  buildClusterHierarchyGraph,
};

export default majorApi;
