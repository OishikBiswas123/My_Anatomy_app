import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { ModelRenderer } from './ModelRenderer';
import { CameraControls, CameraPreset } from './CameraControls';
import { AnatomyStructure, AnatomicalSystemType } from '../../types/anatomy';

interface AnatomyCanvasProps {
  system: AnatomicalSystemType;
  selectedStructure: AnatomyStructure | null;
  onSelectStructure: (structure: AnatomyStructure | null) => void;
  isolateMode: boolean;
  hiddenMeshIds: Set<string>;
  presetView: CameraPreset | null;
  onPresetApplied: () => void;
  filterRegion?: string | null;
  highlightColor?: string;
  renderQuality?: 'high' | 'medium' | 'low';
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Anatomy Canvas Context Notice:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-6 text-center z-30 select-none">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <span className="text-xl">⚡</span>
          </div>
          <h3 className="text-base font-bold text-white mb-1">3D Graphics Stream Reset</h3>
          <p className="text-xs text-slate-400 max-w-xs mb-4">
            The graphics driver refreshed to protect device memory. Tap below to resume the interactive 3D model.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-all"
          >
            Resume 3D Anatomy
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-20 pointer-events-none">
    <div className="relative w-16 h-16 mb-4">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
      <div className="absolute inset-2 rounded-full border-2 border-sky-400/20 border-b-sky-300 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
      </div>
    </div>
    <p className="text-sm font-medium text-slate-300 tracking-wider uppercase font-mono text-xs">
      Loading 3D Anatomy...
    </p>
  </div>
);

export const AnatomyCanvas: React.FC<AnatomyCanvasProps> = ({
  system,
  selectedStructure,
  onSelectStructure,
  isolateMode,
  hiddenMeshIds,
  presetView,
  onPresetApplied,
  filterRegion,
  highlightColor = '#06b6d4',
  renderQuality = 'medium',
}) => {
  // Model selection: muscles.glb houses all muscles, tendons, aponeuroses, costal cartilages and spinal discs
  const modelPath = (system === 'muscular' || system === 'connective')
    ? '/models/muscles/muscles.glb' 
    : '/models/bones/skeleton.glb';

  // Handle WebGL context loss safely without crashing the WebView
  const handleCreated = ({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvasEl = gl.domElement;
    
    canvasEl.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.warn('WebGL context lost - holding state for recovery');
    }, false);

    canvasEl.addEventListener('webglcontextrestored', () => {
      console.info('WebGL context restored');
      gl.renderLists.dispose();
    }, false);
  };

  const isHighQuality = renderQuality === 'high';
  const targetDpr = isHighQuality ? [1, 1.3] : [1, 1.0];

  return (
    <div className="relative w-full h-full bg-[#070b12] overflow-hidden select-none">
      <WebGLErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas
            camera={{ position: [0, 0.2, 2.3], fov: 45, near: 0.1, far: 50 }}
            dpr={targetDpr as [number, number]}
            gl={{
              antialias: isHighQuality,
              powerPreference: 'low-power',
              precision: 'mediump',
              depth: true,
              stencil: false,
              preserveDrawingBuffer: false,
            }}
            onCreated={handleCreated}
            className="w-full h-full"
          >
            {/* Lighting Rig - Studio Medical Lighting */}
            <ambientLight intensity={0.8} />

            <directionalLight
              position={[3, 4, 3]}
              intensity={1.2}
              castShadow={false}
            />

            <directionalLight
              position={[-3, 2, 2]}
              intensity={0.65}
              color="#93c5fd"
            />

            <directionalLight
              position={[0, 4, -4]}
              intensity={0.85}
              color="#38bdf8"
            />

            <directionalLight
              position={[0, -3, 1]}
              intensity={0.3}
              color="#64748b"
            />

            {/* Camera Orbit and View Controls */}
            <CameraControls
              presetView={presetView}
              onPresetApplied={onPresetApplied}
            />

            {/* Main 3D Model Renderer (Authentic segmented geometry) */}
            <ModelRenderer
              modelPath={modelPath}
              system={system as 'skeletal' | 'muscular' | 'connective'}
              selectedStructure={selectedStructure}
              onSelectStructure={onSelectStructure}
              isolateMode={isolateMode}
              hiddenMeshIds={hiddenMeshIds}
              highlightColor={highlightColor}
              filterRegion={filterRegion}
            />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
};
