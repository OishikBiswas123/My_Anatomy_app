import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

export type CameraPreset = 'front' | 'back' | 'left' | 'right' | 'top' | 'reset';

interface CameraControlsProps {
  presetView?: CameraPreset | null;
  onPresetApplied?: () => void;
  targetPosition?: [number, number, number] | null;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  presetView,
  onPresetApplied,
  targetPosition,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Reset to default
  const defaultTarget = new THREE.Vector3(0, 0, 0);
  const defaultCameraPos = new THREE.Vector3(0, 0.2, 2.4);

  // Handle preset view transitions
  useEffect(() => {
    if (!presetView || !controlsRef.current) return;

    const controls = controlsRef.current;
    const distance = 2.2;
    const target = controls.target.clone();

    switch (presetView) {
      case 'front':
        camera.position.set(target.x, target.y + 0.1, target.z + distance);
        break;
      case 'back':
        camera.position.set(target.x, target.y + 0.1, target.z - distance);
        break;
      case 'left':
        camera.position.set(target.x - distance, target.y + 0.1, target.z);
        break;
      case 'right':
        camera.position.set(target.x + distance, target.y + 0.1, target.z);
        break;
      case 'top':
        camera.position.set(target.x, target.y + distance, target.z + 0.01);
        break;
      case 'reset':
      default:
        camera.position.copy(defaultCameraPos);
        controls.target.copy(defaultTarget);
        break;
    }

    camera.lookAt(controls.target);
    controls.update();

    if (onPresetApplied) {
      onPresetApplied();
    }
  }, [presetView, camera, onPresetApplied]);

  // Handle focus on specific anatomical structure
  useEffect(() => {
    if (!targetPosition || !controlsRef.current) return;
    const controls = controlsRef.current;
    
    // Smoothly update target to focused position
    controls.target.set(targetPosition[0], targetPosition[1], targetPosition[2]);
    controls.update();
  }, [targetPosition]);

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.8}
      zoomSpeed={1.0}
      panSpeed={0.8}
      minDistance={0.3}
      maxDistance={6.0}
      maxPolarAngle={Math.PI - 0.05}
      minPolarAngle={0.05}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
};
