import React, { useState, useCallback } from 'react';
import { Home } from 'lucide-react';
import { AnatomyCanvas } from '../../three/components/AnatomyCanvas';
import { CameraPreset } from '../../three/components/CameraControls';
import { ViewerToolbar } from '../../components/viewer/ViewerToolbar';
import { RegionSelector } from '../../components/viewer/RegionSelector';
import { SearchModal } from '../../components/common/SearchModal';
import { AnatomyDetailsPanel } from '../../components/information/AnatomyDetailsPanel';
import { AnatomyStructure, AnatomicalSystemType } from '../../types/anatomy';
import { StorageService } from '../../services/storage';

interface AnatomyViewerScreenProps {
  initialSystem: AnatomicalSystemType;
  initialStructure?: AnatomyStructure | null;
  onBackToHome: () => void;
}

export const AnatomyViewerScreen: React.FC<AnatomyViewerScreenProps> = ({
  initialSystem,
  initialStructure = null,
  onBackToHome,
}) => {
  const [currentSystem, setCurrentSystem] = useState<AnatomicalSystemType>(initialSystem);
  const [selectedStructure, setSelectedStructure] = useState<AnatomyStructure | null>(initialStructure);
  const [presetView, setPresetView] = useState<CameraPreset | null>(null);
  const [isolateMode, setIsolateMode] = useState<boolean>(false);
  const [hiddenMeshIds, setHiddenMeshIds] = useState<Set<string>>(new Set());
  const [filterRegion, setFilterRegion] = useState<string | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] = useState(false);

  const [prefs] = useState(() => StorageService.getPreferences());

  // Handle system change (Bones, Muscles, Ligaments)
  const handleSystemChange = (system: AnatomicalSystemType) => {
    setCurrentSystem(system);
    setSelectedStructure(null);
    setIsolateMode(false);
    setFilterRegion(null);
    setHiddenMeshIds(new Set());
  };

  // Handle selecting an anatomical structure
  const handleSelectStructure = useCallback((structure: AnatomyStructure | null) => {
    setSelectedStructure(structure);
  }, []);

  // Isolate structure toggle
  const handleToggleIsolate = () => {
    if (selectedStructure) {
      setIsolateMode(!isolateMode);
    }
  };

  // Hide structure
  const handleHideStructure = (structure: AnatomyStructure) => {
    setHiddenMeshIds((prev) => {
      const next = new Set(prev);
      next.add(structure.meshId.toLowerCase());
      if (structure.meshIds) {
        structure.meshIds.forEach((id) => next.add(id.toLowerCase()));
      }
      return next;
    });
    setSelectedStructure(null);
  };

  // Unhide all structures
  const handleResetHidden = () => {
    setHiddenMeshIds(new Set());
  };

  // Search selection handler
  const handleSearchResult = (structure: AnatomyStructure) => {
    if (structure.system !== currentSystem) {
      setCurrentSystem(structure.system);
    }
    setSelectedStructure(structure);
    setIsolateMode(false);
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070b12] overflow-hidden select-none">
      
      {/* Top Left Navigation Back Button */}
      <div className="absolute top-3 left-3 z-30 pointer-events-auto">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700/60 backdrop-blur-md shadow-xl text-xs font-semibold"
          title="Back to Home"
        >
          <Home size={14} />
          <span className="hidden sm:inline">Home</span>
        </button>
      </div>

      {/* Main 3D Canvas */}
      <AnatomyCanvas
        system={currentSystem}
        selectedStructure={selectedStructure}
        onSelectStructure={handleSelectStructure}
        isolateMode={isolateMode}
        hiddenMeshIds={hiddenMeshIds}
        presetView={presetView}
        onPresetApplied={() => setPresetView(null)}
        filterRegion={filterRegion}
        highlightColor={prefs.highlightColor}
        renderQuality={prefs.renderQuality}
      />

      {/* Viewer Floating Controls Toolbar */}
      <ViewerToolbar
        system={currentSystem}
        onSystemChange={handleSystemChange}
        onCameraPreset={(preset) => setPresetView(preset)}
        isolateMode={isolateMode}
        onToggleIsolate={handleToggleIsolate}
        hiddenCount={hiddenMeshIds.size}
        onResetHidden={handleResetHidden}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenRegions={() => setIsRegionSelectorOpen(true)}
        hasSelection={!!selectedStructure}
      />

      {/* Anatomy Details Panel */}
      <AnatomyDetailsPanel
        structure={selectedStructure}
        onClose={() => setSelectedStructure(null)}
        onIsolate={handleToggleIsolate}
        isIsolated={isolateMode}
        onHide={handleHideStructure}
      />

      {/* Region Selector Modal */}
      {isRegionSelectorOpen && (
        <RegionSelector
          system={currentSystem}
          selectedRegion={filterRegion}
          onSelectRegion={(reg) => setFilterRegion(reg)}
          onClose={() => setIsRegionSelectorOpen(false)}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchResult}
        currentSystem={currentSystem}
      />

    </div>
  );
};
