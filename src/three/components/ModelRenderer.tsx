import React, { useMemo, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomyStructure } from '../../types/anatomy';
import { getStructureByMeshId } from '../../data';

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
  highlightColor = '#06b6d4',
  filterRegion,
}) => {
  const gltf = useGLTF(modelPath);
  const modelGroupRef = useRef<THREE.Group>(null);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Clone scene so modifications (materials/visibility) are isolated
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // Center and scale model once during clone initialization
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const targetHeight = 1.8;
      const scale = targetHeight / maxDim;
      clone.scale.setScalar(scale);
    }

    return clone;
  }, [gltf.scene]);

  // Shared materials for this model instance
  const { 
    baseMaterial, 
    highlightMaterial, 
    dimmedMaterial,
    connectiveTissueMaterial,
    connectiveGhostMaterial 
  } = useMemo(() => {
    // Standard Bone Ivory
    const baseBone = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#dcd4c7'),
      roughness: 0.65,
      metalness: 0.05,
    });

    // Standard Muscle Ruby
    const baseMuscle = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9e3a3a'),
      roughness: 0.7,
      metalness: 0.02,
    });

    // Connective Tissue: Pearlescent Collagen White-Cyan
    const connectiveTissue = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#bae6fd'), // Sky / pearl white-cyan
      roughness: 0.35,
      metalness: 0.12,
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.15,
    });

    // Soft Ghost Blueprint Context for surrounding frame in Connective View
    const connectiveGhost = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1e293b'),
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.15,
    });

    // Highlight Shader
    const highlight = new THREE.MeshStandardMaterial({
      color: new THREE.Color(highlightColor),
      emissive: new THREE.Color(highlightColor),
      emissiveIntensity: 0.65,
      roughness: 0.3,
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
      connectiveTissueMaterial: connectiveTissue,
      connectiveGhostMaterial: connectiveGhost
    };
  }, [system, highlightColor]);

  // Clean up materials and detached cloned nodes on unmount to prevent GPU memory leaks
  useEffect(() => {
    return () => {
      baseMaterial.dispose();
      highlightMaterial.dispose();
      dimmedMaterial.dispose();
      connectiveTissueMaterial.dispose();
      connectiveGhostMaterial.dispose();

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
    connectiveTissueMaterial, 
    connectiveGhostMaterial
  ]);

  // Update mesh materials and visibility when selection, isolation, or filters change
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = mesh.name.toLowerCase();

        // Check if this mesh matches the selected structure
        const structure = getStructureByMeshId(mesh.name);
        const isSelected = selectedStructure && structure?.id === selectedStructure.id;

        // Check if this is a connective tissue element
        const isConnectiveMesh = 
          meshName.startsWith('t_') || 
          meshName.includes('_cc') || 
          meshName.startsWith('b_cc') || 
          meshName.includes('disc') ||
          structure?.system === 'connective';

        // Visibility handling
        const isManuallyHidden = hiddenMeshIds.has(meshName) || (structure && hiddenMeshIds.has(structure.id));
        
        let shouldBeVisible = true;
        if (isManuallyHidden) {
          shouldBeVisible = false;
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
          if (isConnectiveMesh) {
            mesh.material = selectedStructure ? dimmedMaterial : connectiveTissueMaterial;
          } else {
            // Surrounding anatomical frame in ghost context
            mesh.material = connectiveGhostMaterial;
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
    connectiveTissueMaterial,
    connectiveGhostMaterial,
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
            region: 'spine_trunk',
            meshId: meshName,
            tissueType: 'Tendon',
            composition: 'Dense collagenous connective tissue',
            attachmentPoints: ['Regional anatomical attachment'],
            biomechanicalFunction: ['Force transmission and joint stabilization'],
            jointOrStructureAssociation: 'Human musculoskeletal system',
            description: `Connective tissue structure identified as ${fallbackName}.`,
            location: 'Musculoskeletal framework',
            commonPathologies: ['Tensile strain or overuse tendinopathy'],
            clinicalNotes: ['Refer to clinical biomechanics and orthopedics references for specific details.'],
            tags: [meshName, 'connective tissue'],
          });
        }
      }
    }
  };

  const handlePointerMissed = () => {
    onSelectStructure(null);
  };

  return (
    <group
      ref={modelGroupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMissed={handlePointerMissed}
    >
      <primitive object={clonedScene} />
    </group>
  );
};
