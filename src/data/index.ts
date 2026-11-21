import { AnatomyStructure, AnatomicalSystemType, AnatomicalRegion } from '../types/anatomy';
import { BONES_DATA } from './bones';
import { MUSCLES_DATA } from './muscles';
import { CONNECTIVE_DATA } from './connective';
export { ANATOMY_QUIZZES } from './quizzes';

export const ALL_STRUCTURES: AnatomyStructure[] = [
  ...BONES_DATA,
  ...MUSCLES_DATA,
  ...CONNECTIVE_DATA,
];

export const STRUCTURES_BY_SYSTEM: Record<AnatomicalSystemType, AnatomyStructure[]> = {
  skeletal: BONES_DATA,
  muscular: MUSCLES_DATA,
  connective: CONNECTIVE_DATA,
  nervous: [],
  cardiovascular: [],
  organ: [],
};

// Map structureId to AnatomyStructure
export const STRUCTURE_ID_MAP = new Map<string, AnatomyStructure>();
ALL_STRUCTURES.forEach((structure) => {
  STRUCTURE_ID_MAP.set(structure.id, structure);
});

// Primary meshId map
export const MESH_ID_MAP = new Map<string, AnatomyStructure>();
ALL_STRUCTURES.forEach((structure) => {
  MESH_ID_MAP.set(structure.meshId.toLowerCase(), structure);
  if (structure.meshIds) {
    structure.meshIds.forEach((id) => MESH_ID_MAP.set(id.toLowerCase(), structure));
  }
});

/**
 * Normalizes mesh names for robust matching:
 * e.g., "t_calcaneal_tendon_l" -> "calcaneal_tendon", "b_cc3_l" -> "cc3", "bone_femur" -> "femur"
 */
function normalizeMeshName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^t_/, '')
    .replace(/^b_/, '')
    .replace(/^bone_/, '')
    .replace(/^muscle_/, '')
    .replace(/^connective_/, '')
    .replace(/_[lr]$/, '')
    .replace(/_left$/, '')
    .replace(/_right$/, '')
    .replace(/\s+/g, '_')
    .trim();
}

/**
 * Find structure by 3D mesh identifier
 */
export function getStructureByMeshId(meshId: string): AnatomyStructure | undefined {
  if (!meshId) return undefined;
  
  const rawLower = meshId.toLowerCase();
  
  // 1. Direct match in dictionary
  if (MESH_ID_MAP.has(rawLower)) {
    return MESH_ID_MAP.get(rawLower);
  }

  // 2. Costal Cartilage matching: e.g. b_cc1_l, b_cc5_r -> Costal Cartilages
  if (rawLower.includes('_cc') || rawLower.startsWith('b_cc') || rawLower.includes('costal_cartilage')) {
    const cc = STRUCTURE_ID_MAP.get('connective_costal_cartilage');
    if (cc) return cc;
  }

  // 3. Intervertebral Disc matching: e.g. b_disc_l4_l5, disc_c2_c3 -> Intervertebral Discs
  if (rawLower.includes('disc') || rawLower.includes('discus')) {
    if (rawLower.includes('interpubic') || rawLower.includes('pubic')) {
      const pubic = STRUCTURE_ID_MAP.get('connective_pubic_symphysis');
      if (pubic) return pubic;
    }
    const discs = STRUCTURE_ID_MAP.get('connective_intervertebral_discs');
    if (discs) return discs;
  }

  // 4. Normalized match
  const normalized = normalizeMeshName(rawLower);
  for (const s of ALL_STRUCTURES) {
    const sNorm = normalizeMeshName(s.meshId);
    if (sNorm === normalized || s.id.toLowerCase().includes(normalized)) {
      return s;
    }
    if (s.meshIds) {
      for (const alias of s.meshIds) {
        if (normalizeMeshName(alias) === normalized) {
          return s;
        }
      }
    }
  }

  // 5. Substring / Token matching
  for (const s of ALL_STRUCTURES) {
    const sNameNorm = s.name.toLowerCase().replace(/\s+/g, '_');
    if (rawLower.includes(sNameNorm) || sNameNorm.includes(normalized)) {
      return s;
    }
  }

  return undefined;
}

/**
 * High-performance offline search across anatomical structures
 */
export function searchAnatomy(query: string, systemFilter?: AnatomicalSystemType): AnatomyStructure[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const dataset = systemFilter ? STRUCTURES_BY_SYSTEM[systemFilter] : ALL_STRUCTURES;

  return dataset.filter((item) => {
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.commonName && item.commonName.toLowerCase().includes(q)) return true;
    if (item.latinName && item.latinName.toLowerCase().includes(q)) return true;
    if (item.region.toLowerCase().replace(/_/g, ' ').includes(q)) return true;
    if (item.tags?.some((tag) => tag.toLowerCase().includes(q))) return true;
    if (item.description.toLowerCase().includes(q)) return true;
    return false;
  });
}

export function getStructuresByRegion(region: AnatomicalRegion, system: AnatomicalSystemType): AnatomyStructure[] {
  return STRUCTURES_BY_SYSTEM[system].filter((s) => s.region === region);
}

export function getStructureById(id: string): AnatomyStructure | undefined {
  return STRUCTURE_ID_MAP.get(id);
}
