import React from 'react';
import { 
  RotateCcw, 
  Crosshair, 
  Eye, 
  Search, 
  Filter, 
  Bone, 
  Activity, 
  Layers 
} from 'lucide-react';
import { CameraPreset } from '../../three/components/CameraControls';
import { AnatomicalSystemType } from '../../types/anatomy';

interface ViewerToolbarProps {
  system: AnatomicalSystemType;
  onSystemChange: (system: AnatomicalSystemType) => void;
  onCameraPreset: (preset: CameraPreset) => void;
  isolateMode: boolean;
  onToggleIsolate: () => void;
  hiddenCount: number;
  onResetHidden: () => void;
  onOpenSearch: () => void;
  onOpenRegions: () => void;
  hasSelection: boolean;
}

export const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  system,
  onSystemChange,
  onCameraPreset,
  isolateMode,
  onToggleIsolate,
  hiddenCount,
  onResetHidden,
  onOpenSearch,
  onOpenRegions,
  hasSelection,
}) => {
  return (
    <>
      {/* Top Header Floating Controls */}
      <div className="absolute top-3 inset-x-3 sm:inset-x-6 flex items-center justify-between pointer-events-none z-20">
        
        {/* System Switcher Pill */}
        <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/60 shadow-xl pointer-events-auto">
          <button
            onClick={() => onSystemChange('skeletal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              system === 'skeletal'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bone size={14} />
            <span>Bones</span>
          </button>

          <button
            onClick={() => onSystemChange('muscular')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              system === 'muscular'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity size={14} />
            <span>Muscles</span>
          </button>

          <button
            onClick={() => onSystemChange('connective')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              system === 'connective'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={14} />
            <span>Connective</span>
          </button>
        </div>

        {/* Search & Region Filter Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onOpenRegions}
            className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white shadow-xl"
            title="Filter by Anatomical Region"
          >
            <Filter size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">Regions</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white shadow-xl"
            title="Search Anatomy"
          >
            <Search size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Floating Left Camera Shortcuts */}
      <div className="absolute left-3 top-20 flex flex-col gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/60 shadow-xl z-20 pointer-events-auto">
        <button
          onClick={() => onCameraPreset('front')}
          className="px-2 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:bg-slate-800 hover:text-white text-center font-semibold"
          title="Anterior (Front) View"
        >
          ANT
        </button>
        <button
          onClick={() => onCameraPreset('back')}
          className="px-2 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:bg-slate-800 hover:text-white text-center font-semibold"
          title="Posterior (Back) View"
        >
          POST
        </button>
        <button
          onClick={() => onCameraPreset('left')}
          className="px-2 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:bg-slate-800 hover:text-white text-center font-semibold"
          title="Lateral Left View"
        >
          LAT L
        </button>
        <button
          onClick={() => onCameraPreset('right')}
          className="px-2 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 hover:bg-slate-800 hover:text-white text-center font-semibold"
          title="Lateral Right View"
        >
          LAT R
        </button>
        <div className="h-px bg-slate-800 my-0.5" />
        <button
          onClick={() => onCameraPreset('reset')}
          className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-cyan-400 flex items-center justify-center"
          title="Reset Camera View"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Floating Bottom Quick Actions (Isolation & Visibility) */}
      <div className="absolute bottom-6 left-4 flex items-center gap-2 z-20 pointer-events-auto">
        {hasSelection && (
          <button
            onClick={onToggleIsolate}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md shadow-xl transition-all ${
              isolateMode
                ? 'bg-amber-500/90 text-slate-950 shadow-amber-500/25 border border-amber-300'
                : 'bg-slate-900/90 text-slate-200 border border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <Crosshair size={14} />
            <span>{isolateMode ? 'Show All' : 'Isolate'}</span>
          </button>
        )}

        {hiddenCount > 0 && (
          <button
            onClick={onResetHidden}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 text-slate-200 border border-slate-700/60 hover:bg-slate-800 backdrop-blur-md shadow-xl"
          >
            <Eye size={14} className="text-cyan-400" />
            <span>Unhide ({hiddenCount})</span>
          </button>
        )}
      </div>
    </>
  );
};
