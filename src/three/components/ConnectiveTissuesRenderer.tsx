import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AnatomyStructure } from '../../types/anatomy';
import { getConnectiveStructureByMeshId } from '../../data/connective';

interface ConnectiveTissuesRendererProps {
  selectedStructure: AnatomyStructure | null;
  onSelectStructure: (structure: AnatomyStructure | null) => void;
  isolateMode: boolean;
  hiddenMeshIds: Set<string>;
  highlightColor?: string;
  filterRegion?: string | null;
}

interface LigamentDef {
  meshId: string;
  region: string;
  points: [number, number, number][];
  radius: number;
  isCartilage?: boolean;
}

export const ConnectiveTissuesRenderer: React.FC<ConnectiveTissuesRendererProps> = ({
  selectedStructure,
  onSelectStructure,
  isolateMode,
  hiddenMeshIds,
  highlightColor = '#00f5ff',
  filterRegion,
}) => {
  // Shared materials
  const { collagenMaterial, cartilageMaterial, highlightMaterial, dimmedMaterial } = useMemo(() => {
    // Ivory pearlescent collagen fiber
    const collagen = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8fafc'),
      roughness: 0.35,
      metalness: 0.08,
    });

    // Pastel translucent ice-cyan cartilage / meniscus
    const cartilage = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.15,
    });

    // Bright electric cyan highlight
    const highlight = new THREE.MeshStandardMaterial({
      color: new THREE.Color(highlightColor),
      emissive: new THREE.Color(highlightColor),
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.1,
    });

    // Dimmed non-selected in isolate/focus
    const dimmed = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#334155'),
      roughness: 0.8,
      transparent: true,
      opacity: 0.18,
    });

    return {
      collagenMaterial: collagen,
      cartilageMaterial: cartilage,
      highlightMaterial: highlight,
      dimmedMaterial: dimmed,
    };
  }, [highlightColor]);

  // Define complete anatomical ligament paths anchored to skeleton coordinates
  const ligamentDefs: LigamentDef[] = useMemo(() => {
    const list: LigamentDef[] = [];

    // Sides: left (sign = 1), right (sign = -1)
    const sides: Array<{ suffix: string; s: number }> = [
      { suffix: '_l', s: 1 },
      { suffix: '_r', s: -1 },
    ];

    sides.forEach(({ suffix, s }) => {
      // ----------------------------------------------------
      // 1. HAND AND WRIST CONNECTIVE TISSUES
      // ----------------------------------------------------
      // Flexor Retinaculum / Transverse Carpal Ligament (Carpal Tunnel roof)
      list.push({
        meshId: `lig_flexor_retinaculum${suffix}`,
        region: 'hand_wrist',
        points: [
          [s * 0.282, 0.846, 0.027],
          [s * 0.264, 0.844, 0.033],
          [s * 0.244, 0.846, 0.032],
        ],
        radius: 0.0055,
      });

      // Extensor Retinaculum (Dorsal carpal band)
      list.push({
        meshId: `lig_extensor_retinaculum${suffix}`,
        region: 'hand_wrist',
        points: [
          [s * 0.258, 0.862, -0.008],
          [s * 0.242, 0.858, 0.002],
          [s * 0.228, 0.855, 0.012],
        ],
        radius: 0.0045,
      });

      // Palmar Aponeurosis (Central dense palmar fascial sheet)
      list.push({
        meshId: `lig_palmar_aponeurosis${suffix}`,
        region: 'hand_wrist',
        points: [
          [s * 0.262, 0.840, 0.033],
          [s * 0.268, 0.805, 0.038],
          [s * 0.274, 0.770, 0.042],
        ],
        radius: 0.0075,
      });

      // Digital Flexor Pulleys (A2 & A4 Annular Pulleys along finger rays)
      list.push({
        meshId: `lig_digital_pulleys${suffix}`,
        region: 'hand_wrist',
        points: [
          [s * 0.277, 0.752, 0.050],
          [s * 0.276, 0.730, 0.052],
          [s * 0.275, 0.708, 0.053],
        ],
        radius: 0.0035,
      });

      // Palmar Radiocarpal Ligament
      list.push({
        meshId: `lig_radiocarpal_palmar${suffix}`,
        region: 'hand_wrist',
        points: [
          [s * 0.258, 0.875, 0.010],
          [s * 0.264, 0.855, 0.018],
          [s * 0.265, 0.844, 0.018],
        ],
        radius: 0.0038,
      });

      // MCP Joint Collateral Ligaments
      list.push({
        meshId: `lig_mcp_collaterals${suffix}`,
        region: 'hand_wrist',
        points: [
          [s * 0.288, 0.795, 0.038],
          [s * 0.282, 0.775, 0.042],
          [s * 0.276, 0.760, 0.046],
        ],
        radius: 0.0032,
      });

      // ----------------------------------------------------
      // 2. KNEE CONNECTIVE TISSUES
      // ----------------------------------------------------
      // Patellar Ligament (Ligamentum Patellae)
      list.push({
        meshId: `lig_patellar${suffix}`,
        region: 'knee',
        points: [
          [s * 0.0844, 0.435, 0.008],
          [s * 0.0844, 0.408, 0.009],
          [s * 0.0844, 0.380, 0.006],
        ],
        radius: 0.0068,
      });

      // Medial Collateral Ligament (MCL / Tibial Collateral)
      list.push({
        meshId: `lig_mcl${suffix}`,
        region: 'knee',
        points: [
          [s * 0.065, 0.455, -0.008],
          [s * 0.066, 0.422, -0.010],
          [s * 0.068, 0.365, -0.012],
        ],
        radius: 0.0048,
      });

      // Lateral Collateral Ligament (LCL / Fibular Collateral)
      list.push({
        meshId: `lig_lcl${suffix}`,
        region: 'knee',
        points: [
          [s * 0.106, 0.455, -0.008],
          [s * 0.107, 0.430, -0.014],
          [s * 0.108, 0.405, -0.020],
        ],
        radius: 0.0042,
      });

      // Anterior Cruciate Ligament (ACL)
      list.push({
        meshId: `lig_acl${suffix}`,
        region: 'knee',
        points: [
          [s * 0.092, 0.445, -0.016],
          [s * 0.087, 0.433, -0.008],
          [s * 0.082, 0.424, 0.002],
        ],
        radius: 0.0042,
      });

      // Posterior Cruciate Ligament (PCL)
      list.push({
        meshId: `lig_pcl${suffix}`,
        region: 'knee',
        points: [
          [s * 0.076, 0.446, -0.008],
          [s * 0.080, 0.432, -0.016],
          [s * 0.084, 0.420, -0.024],
        ],
        radius: 0.0045,
      });

      // Medial Meniscus (Cushion pad)
      list.push({
        meshId: `lig_meniscus_medial${suffix}`,
        region: 'knee',
        isCartilage: true,
        points: [
          [s * 0.074, 0.422, 0.002],
          [s * 0.068, 0.422, -0.012],
          [s * 0.078, 0.422, -0.022],
        ],
        radius: 0.0042,
      });

      // Lateral Meniscus
      list.push({
        meshId: `lig_meniscus_lateral${suffix}`,
        region: 'knee',
        isCartilage: true,
        points: [
          [s * 0.094, 0.422, 0.002],
          [s * 0.102, 0.422, -0.012],
          [s * 0.092, 0.422, -0.022],
        ],
        radius: 0.0042,
      });

      // ----------------------------------------------------
      // 3. SHOULDER AND ELBOW CONNECTIVE TISSUES
      // ----------------------------------------------------
      // Glenohumeral Joint Capsule
      list.push({
        meshId: `lig_glenohumeral_capsule${suffix}`,
        region: 'shoulder_arm',
        points: [
          [s * 0.155, 1.340, -0.032],
          [s * 0.168, 1.330, -0.028],
          [s * 0.182, 1.320, -0.025],
        ],
        radius: 0.0075,
      });

      // Coracoacromial Ligament
      list.push({
        meshId: `lig_coracoacromial${suffix}`,
        region: 'shoulder_arm',
        points: [
          [s * 0.138, 1.352, -0.012],
          [s * 0.152, 1.360, -0.022],
          [s * 0.168, 1.366, -0.032],
        ],
        radius: 0.0045,
      });

      // Coracoclavicular Ligaments (Conoid & Trapezoid)
      list.push({
        meshId: `lig_coracoclavicular${suffix}`,
        region: 'shoulder_arm',
        points: [
          [s * 0.138, 1.355, -0.014],
          [s * 0.144, 1.378, -0.016],
          [s * 0.150, 1.395, -0.015],
        ],
        radius: 0.0048,
      });

      // Ulnar Collateral Ligament of Elbow (Tommy John)
      list.push({
        meshId: `lig_ucl_elbow${suffix}`,
        region: 'shoulder_arm',
        points: [
          [s * 0.198, 1.075, -0.022],
          [s * 0.204, 1.055, -0.024],
          [s * 0.212, 1.035, -0.025],
        ],
        radius: 0.0042,
      });

      // Annular Ligament of Radius
      list.push({
        meshId: `lig_annular_radius${suffix}`,
        region: 'shoulder_arm',
        points: [
          [s * 0.228, 1.052, -0.022],
          [s * 0.240, 1.050, -0.014],
          [s * 0.232, 1.048, -0.008],
        ],
        radius: 0.0042,
      });

      // ----------------------------------------------------
      // 4. PELVIS AND HIP CONNECTIVE TISSUES
      // ----------------------------------------------------
      // Iliofemoral Ligament (Y-ligament of Bigelow)
      list.push({
        meshId: `lig_iliofemoral${suffix}`,
        region: 'pelvis_hip',
        points: [
          [s * 0.088, 0.895, 0.015],
          [s * 0.098, 0.855, 0.010],
          [s * 0.114, 0.815, -0.005],
        ],
        radius: 0.0075,
      });

      // Inguinal Ligament (Poupart Ligament)
      list.push({
        meshId: `lig_inguinal${suffix}`,
        region: 'pelvis_hip',
        points: [
          [s * 0.118, 0.945, 0.035],
          [s * 0.070, 0.890, 0.040],
          [s * 0.025, 0.840, 0.045],
        ],
        radius: 0.0055,
      });

      // Sacrotuberous Ligament
      list.push({
        meshId: `lig_sacrotuberous${suffix}`,
        region: 'pelvis_hip',
        points: [
          [s * 0.018, 0.910, -0.052],
          [s * 0.038, 0.850, -0.055],
          [s * 0.060, 0.795, -0.050],
        ],
        radius: 0.0058,
      });

      // ----------------------------------------------------
      // 5. ANKLE AND FOOT CONNECTIVE TISSUES
      // ----------------------------------------------------
      // Calcaneal (Achilles) Tendon
      list.push({
        meshId: `lig_calcaneal_tendon${suffix}`,
        region: 'ankle_foot',
        points: [
          [s * 0.080, 0.180, -0.058],
          [s * 0.078, 0.100, -0.062],
          [s * 0.078, 0.040, -0.065],
        ],
        radius: 0.0072,
      });

      // Anterior Talofibular Ligament (ATFL)
      list.push({
        meshId: `lig_atfl${suffix}`,
        region: 'ankle_foot',
        points: [
          [s * 0.098, 0.078, -0.035],
          [s * 0.088, 0.070, -0.025],
          [s * 0.078, 0.065, -0.018],
        ],
        radius: 0.0038,
      });

      // Calcaneofibular Ligament (CFL)
      list.push({
        meshId: `lig_cfl${suffix}`,
        region: 'ankle_foot',
        points: [
          [s * 0.098, 0.075, -0.038],
          [s * 0.092, 0.055, -0.048],
          [s * 0.085, 0.038, -0.055],
        ],
        radius: 0.0036,
      });

      // Deltoid Ligament Complex
      list.push({
        meshId: `lig_deltoid${suffix}`,
        region: 'ankle_foot',
        points: [
          [s * 0.065, 0.080, -0.035],
          [s * 0.066, 0.065, -0.030],
          [s * 0.070, 0.050, -0.025],
        ],
        radius: 0.0058,
      });

      // Plantar Aponeurosis (Plantar Fascia)
      list.push({
        meshId: `lig_plantar_aponeurosis${suffix}`,
        region: 'ankle_foot',
        points: [
          [s * 0.078, 0.030, -0.050],
          [s * 0.075, 0.026, -0.010],
          [s * 0.072, 0.022, 0.030],
        ],
        radius: 0.0065,
      });

      // TMJ Capsule & Lateral Ligament
      list.push({
        meshId: `lig_tmj_capsule${suffix}`,
        region: 'head_neck',
        points: [
          [s * 0.055, 1.625, 0.028],
          [s * 0.056, 1.615, 0.024],
          [s * 0.054, 1.600, 0.018],
        ],
        radius: 0.0042,
      });
    });

    // ----------------------------------------------------
    // 6. MIDLINE SPINAL & CRANIAL CONNECTIVE TISSUES
    // ----------------------------------------------------
    // Anterior Longitudinal Ligament (ALL)
    list.push({
      meshId: 'lig_all_spine',
      region: 'spine_trunk',
      points: [
        [0.0, 1.480, -0.005],
        [0.0, 1.300, 0.018],
        [0.0, 1.140, 0.002],
        [0.0, 0.980, 0.012],
        [0.0, 0.930, -0.025],
      ],
      radius: 0.0078,
    });

    // Supraspinous Ligament and Ligamentum Nuchae
    list.push({
      meshId: 'lig_supraspinous_spine',
      region: 'spine_trunk',
      points: [
        [0.0, 1.620, -0.075],
        [0.0, 1.460, -0.065],
        [0.0, 1.250, -0.072],
        [0.0, 1.050, -0.062],
        [0.0, 0.920, -0.068],
      ],
      radius: 0.0062,
    });

    // Galea Aponeurotica
    list.push({
      meshId: 'lig_galea_aponeurotica',
      region: 'head_neck',
      points: [
        [0.0, 1.705, 0.035],
        [0.0, 1.735, -0.015],
        [0.0, 1.685, -0.065],
      ],
      radius: 0.0095,
    });

    // Pubic Symphysis Disc
    list.push({
      meshId: 'lig_pubic_symphysis',
      region: 'pelvis_hip',
      isCartilage: true,
      points: [
        [-0.010, 0.838, 0.045],
        [0.000, 0.835, 0.045],
        [0.010, 0.838, 0.045],
      ],
      radius: 0.0085,
    });

    return list;
  }, []);

  // Pre-generate tube geometries once for all ligaments
  const renderedMeshes = useMemo(() => {
    return ligamentDefs.map((def) => {
      const vPoints = def.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(vPoints);
      const geometry = new THREE.TubeGeometry(curve, 14, def.radius, 8, false);

      return {
        ...def,
        geometry,
      };
    });
  }, [ligamentDefs]);

  // Clean up tube geometries on unmount
  React.useEffect(() => {
    return () => {
      collagenMaterial.dispose();
      cartilageMaterial.dispose();
      highlightMaterial.dispose();
      dimmedMaterial.dispose();
      renderedMeshes.forEach((m) => m.geometry.dispose());
    };
  }, [collagenMaterial, cartilageMaterial, highlightMaterial, dimmedMaterial, renderedMeshes]);

  return (
    <group name="connective_tissues_group">
      {renderedMeshes.map((item) => {
        const structure = getConnectiveStructureByMeshId(item.meshId);
        const isSelected = selectedStructure && structure?.id === selectedStructure.id;

        // Visibility handling
        const isManuallyHidden =
          hiddenMeshIds.has(item.meshId.toLowerCase()) ||
          (structure && hiddenMeshIds.has(structure.id));

        let isVisible = true;
        if (isManuallyHidden) {
          isVisible = false;
        } else if (isolateMode && selectedStructure) {
          isVisible = isSelected || false;
        } else if (filterRegion && structure) {
          isVisible = structure.region === filterRegion;
        }

        if (!isVisible) return null;

        // Material assignment
        let activeMaterial = item.isCartilage ? cartilageMaterial : collagenMaterial;
        if (isSelected) {
          activeMaterial = highlightMaterial;
        } else if (selectedStructure && !isolateMode) {
          activeMaterial = dimmedMaterial;
        }

        return (
          <mesh
            key={item.meshId}
            name={item.meshId}
            geometry={item.geometry}
            material={activeMaterial}
            onPointerDown={(e) => {
              e.stopPropagation();
              const struct = getConnectiveStructureByMeshId(item.meshId);
              if (struct) {
                onSelectStructure(struct);
              }
            }}
          />
        );
      })}
    </group>
  );
};
