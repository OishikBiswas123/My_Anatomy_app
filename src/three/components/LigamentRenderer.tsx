import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { AnatomyStructure } from '../../types/anatomy';
import { LIGAMENTS_DATA } from '../../data/ligaments';

interface LigamentRendererProps {
  selectedStructure: AnatomyStructure | null;
  onSelectStructure: (structure: AnatomyStructure | null) => void;
  isolateMode: boolean;
  highlightColor?: string;
}

interface LigamentMeshSpec {
  id: string;
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  type: 'cylinder' | 'box';
}

export const LigamentRenderer: React.FC<LigamentRendererProps> = ({
  selectedStructure,
  onSelectStructure,
  isolateMode,
  highlightColor = '#06b6d4',
}) => {
  // Shared static geometries to avoid allocating new buffers on every render
  const { boxGeometry, cylinderGeometry } = useMemo(() => {
    return {
      boxGeometry: new THREE.BoxGeometry(1, 1, 1),
      cylinderGeometry: new THREE.CylinderGeometry(1, 1, 1, 12),
    };
  }, []);

  // Shared materials
  const normalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      roughness: 0.45,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
  }, []);

  const selectedMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(highlightColor),
      emissive: new THREE.Color(highlightColor),
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.1,
    });
  }, [highlightColor]);

  // Clean up geometries and materials on unmount
  useEffect(() => {
    return () => {
      boxGeometry.dispose();
      cylinderGeometry.dispose();
      normalMaterial.dispose();
      selectedMaterial.dispose();
    };
  }, [boxGeometry, cylinderGeometry, normalMaterial, selectedMaterial]);

  // Anatomical specifications for primary ligaments
  const ligamentSpecs: LigamentMeshSpec[] = useMemo(() => [
    // Right Knee
    { id: 'ligament_acl', name: 'ACL', position: [0.12, -0.42, 0.01], rotation: [0.4, -0.3, 0.5], scale: [0.012, 0.045, 0.012], type: 'cylinder' },
    { id: 'ligament_pcl', name: 'PCL', position: [0.118, -0.43, -0.015], rotation: [-0.4, 0.3, -0.4], scale: [0.014, 0.048, 0.014], type: 'cylinder' },
    { id: 'ligament_mcl', name: 'MCL', position: [0.075, -0.44, 0.0], rotation: [0, 0, 0.05], scale: [0.008, 0.08, 0.02], type: 'box' },
    { id: 'ligament_lcl', name: 'LCL', position: [0.165, -0.44, -0.005], rotation: [0, 0, -0.05], scale: [0.009, 0.07, 0.009], type: 'cylinder' },
    { id: 'ligament_patellar', name: 'Patellar Ligament', position: [0.12, -0.43, 0.038], rotation: [0.15, 0, 0], scale: [0.024, 0.065, 0.008], type: 'box' },

    // Left Knee (Mirrored)
    { id: 'ligament_acl', name: 'ACL', position: [-0.12, -0.42, 0.01], rotation: [0.4, 0.3, -0.5], scale: [0.012, 0.045, 0.012], type: 'cylinder' },
    { id: 'ligament_pcl', name: 'PCL', position: [-0.118, -0.43, -0.015], rotation: [-0.4, -0.3, 0.4], scale: [0.014, 0.048, 0.014], type: 'cylinder' },
    { id: 'ligament_mcl', name: 'MCL', position: [-0.075, -0.44, 0.0], rotation: [0, 0, -0.05], scale: [0.008, 0.08, 0.02], type: 'box' },
    { id: 'ligament_lcl', name: 'LCL', position: [-0.165, -0.44, -0.005], rotation: [0, 0, 0.05], scale: [0.009, 0.07, 0.009], type: 'cylinder' },
    { id: 'ligament_patellar', name: 'Patellar Ligament', position: [-0.12, -0.43, 0.038], rotation: [0.15, 0, 0], scale: [0.024, 0.065, 0.008], type: 'box' },

    // Shoulders
    { id: 'ligament_glenohumeral', name: 'Glenohumeral', position: [0.21, 0.41, 0.02], rotation: [0.2, -0.2, 0.4], scale: [0.025, 0.045, 0.018], type: 'box' },
    { id: 'ligament_glenohumeral', name: 'Glenohumeral', position: [-0.21, 0.41, 0.02], rotation: [0.2, 0.2, -0.4], scale: [0.025, 0.045, 0.018], type: 'box' },

    // Ankles
    { id: 'ligament_atfl', name: 'ATFL', position: [0.145, -0.915, 0.03], rotation: [0.4, 0.2, -0.3], scale: [0.008, 0.032, 0.014], type: 'box' },
    { id: 'ligament_deltoid', name: 'Deltoid', position: [0.09, -0.92, 0.01], rotation: [0.1, 0, 0.3], scale: [0.008, 0.04, 0.028], type: 'box' },
  ], []);

  const handleLigamentClick = (e: { stopPropagation: () => void }, specId: string) => {
    e.stopPropagation();
    const structure = LIGAMENTS_DATA.find((l) => l.id === specId);
    if (structure) {
      onSelectStructure(structure);
    }
  };

  return (
    <group name="ligaments-group">
      {ligamentSpecs.map((spec, index) => {
        const isSelected = selectedStructure?.id === spec.id;
        if (isolateMode && selectedStructure && !isSelected) {
          return null;
        }

        const material = isSelected ? selectedMaterial : normalMaterial;
        const geometry = spec.type === 'cylinder' ? cylinderGeometry : boxGeometry;

        return (
          <mesh
            key={`ligament_${spec.id}_${index}`}
            geometry={geometry}
            material={material}
            position={spec.position}
            rotation={spec.rotation}
            scale={spec.scale}
            onClick={(e) => handleLigamentClick(e, spec.id)}
          />
        );
      })}
    </group>
  );
};
