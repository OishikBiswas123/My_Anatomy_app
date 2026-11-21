import { AnatomyStructure, AnatomicalSystemType, AnatomicalRegion } from '../types/anatomy';
import { BONES_DATA } from './bones';
import { MUSCLES_DATA } from './muscles';
import { LIGAMENTS_DATA } from './ligaments';
export { ANATOMY_QUIZZES } from './quizzes';

export const ALL_STRUCTURES: AnatomyStructure[] = [
  ...BONES_DATA,
  ...MUSCLES_DATA,
  ...LIGAMENTS_DATA,
];

export const STRUCTURES_BY_SYSTEM: Record<AnatomicalSystemType, AnatomyStructure[]> = {
  skeletal: BONES_DATA,
  muscular: MUSCLES_DATA,
  ligamentous: LIGAMENTS_DATA,
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
 * e.g., "Femur_L" -> "femur", "bone_femur" -> "femur", "frontal_bone" -> "frontal"
 */
function normalizeMeshName(name: string): string {
  return name
    .toLowerCase()
    .replace(/^bone_/, '')
    .replace(/^muscle_/, '')
    .replace(/^ligament_/, '')
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
  // 1. Direct match
  if (MESH_ID_MAP.has(rawLower)) {
    return MESH_ID_MAP.get(rawLower);
  }

  // 2. Normalized match
  const normalized = normalizeMeshName(rawLower);
  for (const s of ALL_STRUCTURES) {
    const sNorm = normalizeMeshName(s.meshId);
    if (sNorm === normalized || s.id.toLowerCase().includes(normalized)) {
      return s;
    }
    // Also check meshIds aliases
    if (s.meshIds) {
      for (const alias of s.meshIds) {
        if (normalizeMeshName(alias) === normalized) {
          return s;
        }
      }
    }
  }

  // 3. Substring / Token matching
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
    if (item.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
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
