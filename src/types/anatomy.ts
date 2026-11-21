/**
 * Anatomical System and Structure Type Definitions
 * Designed for My Anatomy 3D Interactive Platform
 */

export type AnatomicalSystemType = 'skeletal' | 'muscular' | 'connective' | 'nervous' | 'cardiovascular' | 'organ';

export type SkeletalRegion = 
  | 'skull'
  | 'vertebral_column'
  | 'thoracic_cage'
  | 'shoulder_girdle'
  | 'upper_limb'
  | 'pelvis'
  | 'lower_limb';

export type MuscularRegion =
  | 'head_neck'
  | 'chest'
  | 'back'
  | 'abdomen'
  | 'shoulder'
  | 'upper_arm'
  | 'forearm'
  | 'hip_gluteal'
  | 'thigh'
  | 'leg'
  | 'foot';

export type ConnectiveRegion =
  | 'head_neck'
  | 'thoracic_cage'
  | 'spine_trunk'
  | 'pelvis_hip'
  | 'upper_limb'
  | 'lower_limb';

export type AnatomicalRegion = SkeletalRegion | MuscularRegion | ConnectiveRegion;

export interface BaseAnatomyStructure {
  id: string;
  name: string;
  latinName?: string;
  commonName?: string;
  system: AnatomicalSystemType;
  region: AnatomicalRegion;
  meshId: string; // Corresponding ID in 3D GLTF mesh hierarchy
  meshIds?: string[]; // Paired or multi-part structures (e.g. bilateral or multipart)
  description: string;
  location: string;
  clinicalNotes: string[];
  tags: string[];
}

export interface BoneStructure extends BaseAnatomyStructure {
  system: 'skeletal';
  region: SkeletalRegion;
  classification: 'Long bone' | 'Short bone' | 'Flat bone' | 'Irregular bone' | 'Sesamoid bone';
  anatomicalLandmarks: string[];
  articulations: string[];
  functions: string[];
  bloodSupply?: string;
  ossification?: string;
}

export interface MuscleStructure extends BaseAnatomyStructure {
  system: 'muscular';
  region: MuscularRegion;
  origin: string[];
  insertion: string[];
  action: string[];
  innervation: string;
  bloodSupply: string;
  antagonists?: string[];
  synergists?: string[];
  fiberType?: string;
}

export interface ConnectiveStructure extends BaseAnatomyStructure {
  system: 'connective';
  region: ConnectiveRegion;
  tissueType: 'Tendon' | 'Aponeurosis' | 'Cartilage' | 'Ligament' | 'Deep Fascia';
  composition: string;
  attachmentPoints: string[];
  biomechanicalFunction: string[];
  jointOrStructureAssociation: string;
  vascularity?: string;
  commonPathologies: string[];
}

export type AnatomyStructure = BoneStructure | MuscleStructure | ConnectiveStructure;

export interface BookmarkItem {
  id: string;
  structureId: string;
  system: AnatomicalSystemType;
  name: string;
  timestamp: number;
  note?: string;
}

export interface HistoryItem {
  structureId: string;
  system: AnatomicalSystemType;
  name: string;
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'identify_structure';
  question: string;
  system: AnatomicalSystemType;
  targetStructureId: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation: string;
  hint?: string;
}

export interface StudyProgress {
  totalStructuresViewed: number;
  quizzesCompleted: number;
  quizAccuracy: number;
  bookmarksCount: number;
  systemMastery: Record<AnatomicalSystemType, number>;
}
