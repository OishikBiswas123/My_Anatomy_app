import React, { useMemo, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomyStructure } from '../../types/anatomy';
import { getStructureByMeshId } from '../../data';
import { ConnectiveTissuesRenderer } from './ConnectiveTissuesRenderer';

interface ModelRendererProps {
  modelPath: string;
  system: 'skeletal' | 'muscular' | 'connective';
  selectedStructure: AnatomyStructure | null;
  onSelectStructure: (structure: AnatomyStructure | null) => void;
  isolateMode: boolean;
  hiddenMeshIds: Set<string>;
  highlightColor?: string;
  filterRegion?: string | null;
}

export const ModelRenderer: React.FC<ModelRendererProps> = ({
  modelPath,
  system,
  selectedStructure,
  onSelectStructure,
  isolateMode,
  hiddenMeshIds,
  highlightColor = '#00f5ff',
  filterRegion,
}) => {
  const gltf = useGLTF(modelPath);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Clone scene so modifications are cleanly encapsulated
  const clonedScene = useMemo(() => {
    return gltf.scene.clone(true);
  }, [gltf.scene]);

  // Compute unified centering and scale offset so skeleton and connective tissues align identically
  const { offset, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetHeight = 1.8;
    const s = maxDim > 0 ? targetHeight / maxDim : 1;

    return {
      offset: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
      scale: s,
    };
  }, [clonedScene]);

  // Shared materials for this model instance
  const {
    baseMaterial,
    highlightMaterial,
    dimmedMaterial,
    transparentBoneMaterial,
    cartilageMaterial,
  } = useMemo(() => {
    // Standard Bone Ivory (Skeletal view)
    const baseBone = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#dcd4c7'),
      roughness: 0.65,
      metalness: 0.05,
    });

    // Standard Muscle Ruby (Muscular view)
    const baseMuscle = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9e3a3a'),
      roughness: 0.7,
      metalness: 0.02,
    });

    // Transparent Smoked-Glass Bone (Connective view context foundation)
    const transparentBone = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#334155'),
      roughness: 0.35,
      metalness: 0.05,
      transparent: true,
      opacity: 0.28,
      depthWrite: true,
    });

    // Translucent Ice-Cyan Cartilage / Discs
    const cartilage = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.18,
    });

    // Electric Cyan Highlight Shader
    const highlight = new THREE.MeshStandardMaterial({
      color: new THREE.Color(highlightColor),
      emissive: new THREE.Color(highlightColor),
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.1,
    });

    // Dimmed Non-Selected
    const dimmed = new THREE.MeshStandardMaterial({
      color: system === 'skeletal' ? new THREE.Color('#2d3748') : new THREE.Color('#382222'),
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.22,
    });

    return {
      baseMaterial: system === 'skeletal' ? baseBone : baseMuscle,
      highlightMaterial: highlight,
      dimmedMaterial: dimmed,
      transparentBoneMaterial: transparentBone,
      cartilageMaterial: cartilage,
    };
  }, [system, highlightColor]);

  // Clean up materials on unmount
  useEffect(() => {
    return () => {
      baseMaterial.dispose();
      highlightMaterial.dispose();
      dimmedMaterial.dispose();
      transparentBoneMaterial.dispose();
      cartilageMaterial.dispose();

      if (clonedScene) {
        clonedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });
        clonedScene.clear();
      }
    };
  }, [
    clonedScene,
    baseMaterial,
    highlightMaterial,
    dimmedMaterial,
    transparentBoneMaterial,
    cartilageMaterial,
  ]);

  // Update mesh materials and visibility when state changes
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = mesh.name.toLowerCase();

        // Check if this mesh matches the selected structure
        const structure = getStructureByMeshId(mesh.name);
        const isSelected = selectedStructure && structure?.id === selectedStructure.id;

        // Check if this is a costal cartilage or intervertebral disc in skeleton.glb
        const isCartilageOrDisc =
          meshName.startsWith('cc') ||
          meshName.includes('_cc') ||
          meshName.startsWith('b_cc') ||
          meshName.includes('disc') ||
          (system === 'connective' && structure?.system === 'connective');

        // Visibility handling
        const isManuallyHidden =
          hiddenMeshIds.has(meshName) || (structure && hiddenMeshIds.has(structure.id));

        let shouldBeVisible = true;
        if (isManuallyHidden) {
          shouldBeVisible = false;
        } else if (system === 'connective') {
          if (isolateMode && selectedStructure) {
            shouldBeVisible = isSelected || false;
          } else if (filterRegion && structure && structure.system === 'connective') {
            shouldBeVisible = structure.region === filterRegion;
          } else {
            // In connective view, transparent bones provide anatomical foundation unless manually hidden
            shouldBeVisible = true;
          }
        } else if (isolateMode && selectedStructure) {
          shouldBeVisible = isSelected || false;
        } else if (filterRegion && structure) {
          shouldBeVisible = structure.region === filterRegion;
        }

        mesh.visible = shouldBeVisible;

        // Material assignment based on system
        if (isSelected) {
          mesh.material = highlightMaterial;
        } else if (system === 'connective') {
          if (isCartilageOrDisc) {
            mesh.material = selectedStructure ? dimmedMaterial : cartilageMaterial;
          } else {
            // Bones rendered as transparent smoked glass foundation
            mesh.material = transparentBoneMaterial;
          }
        } else if (selectedStructure && !isolateMode) {
          mesh.material = dimmedMaterial;
        } else {
          mesh.material = baseMaterial;
        }
      }
    });
  }, [
    clonedScene,
    system,
    selectedStructure,
    isolateMode,
    hiddenMeshIds,
    filterRegion,
    baseMaterial,
    highlightMaterial,
    dimmedMaterial,
    transparentBoneMaterial,
    cartilageMaterial,
  ]);

  // Touch/pointer down to track drag start
  const handlePointerDown = (e: { clientX: number; clientY: number }) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  // Touch/pointer up to distinguish tap from drag
  const handlePointerUp = (e: {
    clientX: number;
    clientY: number;
    stopPropagation: () => void;
    object?: THREE.Object3D;
  }) => {
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    const dragDistance = Math.sqrt(dx * dx + dy * dy);

    // If movement is greater than 6px, treat as camera pan/rotate, NOT selection
    if (dragDistance > 6) {
      return;
    }

    e.stopPropagation();

    if (e.object && (e.object as THREE.Mesh).isMesh) {
      const meshName = e.object.name;
      const foundStructure = getStructureByMeshId(meshName);

      if (foundStructure) {
        onSelectStructure(foundStructure);
      } else {
        const fallbackName = meshName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        if (system === 'skeletal') {
          onSelectStructure({
            id: `bone_${meshName}`,
            name: fallbackName,
            system: 'skeletal',
            region: 'skull',
            meshId: meshName,
            classification: 'Long bone',
            anatomicalLandmarks: [],
            articulations: [],
            functions: ['Structural framework'],
            description: `Anatomical bone structure identified as ${fallbackName}.`,
            location: 'Human Skeleton',
            clinicalNotes: ['Review standard anatomical reference for specialized clinical relevance.'],
            tags: [meshName],
          });
        } else if (system === 'muscular') {
          onSelectStructure({
            id: `muscle_${meshName}`,
            name: fallbackName,
            system: 'muscular',
            region: 'head_neck',
            meshId: meshName,
            origin: ['Origin sites defined in anatomical reference'],
            insertion: ['Insertion sites defined in anatomical reference'],
            action: ['Contractile force generation'],
            innervation: 'Somatic motor innervation',
            bloodSupply: 'Regional arterial branches',
            description: `Anatomical muscle structure identified as ${fallbackName}.`,
            location: 'Muscular system',
            clinicalNotes: ['Review standard anatomical reference for specialized clinical relevance.'],
            tags: [meshName],
          });
        } else {
          onSelectStructure({
            id: `connective_${meshName}`,
            name: fallbackName,
            system: 'connective',
            region: 'thoracic_cage',
            meshId: meshName,
            tissueType: 'Cartilage',
            composition: 'Hyaline cartilage matrix',
            attachmentPoints: ['Rib and sternocostal junction'],
            biomechanicalFunction: ['Thoracic cage compliance and respiratory elasticity'],
            jointOrStructureAssociation: 'Thoracic cage',
            commonPathologies: ['Costochondritis', 'Chondral calcification'],
            description: `Connective tissue structure identified as ${fallbackName}.`,
            location: 'Thorax',
            tags: [meshName],
          });
        }
      }
    }
  };

  return (
    <group position={offset} scale={scale}>
      {/* 3D Foundation Model (Skeleton or Muscles) */}
      <primitive
        object={clonedScene}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />

      {/* Complete Interactive Connective Tissues & Ligaments for Connective view */}
      {system === 'connective' && (
        <ConnectiveTissuesRenderer
          selectedStructure={selectedStructure}
          onSelectStructure={onSelectStructure}
          isolateMode={isolateMode}
          hiddenMeshIds={hiddenMeshIds}
          highlightColor={highlightColor}
          filterRegion={filterRegion}
        />
      )}
    </group>
  );
};
