import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  EyeOff, 
  Info, 
  Activity, 
  ShieldAlert, 
  Sparkles, 
  Crosshair,
  ChevronDown,
  ChevronUp,
  Link,
  Layers
} from 'lucide-react';
import { AnatomyStructure, BoneStructure, MuscleStructure, ConnectiveStructure } from '../../types/anatomy';
import { StorageService } from '../../services/storage';

interface AnatomyDetailsPanelProps {
  structure: AnatomyStructure | null;
  onClose: () => void;
  onIsolate: (structure: AnatomyStructure) => void;
  isIsolated: boolean;
  onHide: (structure: AnatomyStructure) => void;
}

export const AnatomyDetailsPanel: React.FC<AnatomyDetailsPanelProps> = ({
  structure,
  onClose,
  onIsolate,
  isIsolated,
  onHide,
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    return structure ? StorageService.isBookmarked(structure.id) : false;
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Sync bookmark state when structure changes
  React.useEffect(() => {
    if (structure) {
      setIsBookmarked(StorageService.isBookmarked(structure.id));
      StorageService.addToHistory({
        structureId: structure.id,
        system: structure.system,
        name: structure.name,
      });
    }
  }, [structure]);

  if (!structure) return null;

  const toggleBookmark = () => {
    if (isBookmarked) {
      StorageService.removeBookmark(structure.id);
      setIsBookmarked(false);
    } else {
      StorageService.addBookmark({
        structureId: structure.id,
        system: structure.system,
        name: structure.name,
      });
      setIsBookmarked(true);
    }
  };

  const isBone = structure.system === 'skeletal';
  const isMuscle = structure.system === 'muscular';
  const isConnective = structure.system === 'connective';

  const bone = isBone ? (structure as BoneStructure) : null;
  const muscle = isMuscle ? (structure as MuscleStructure) : null;
  const connective = isConnective ? (structure as ConnectiveStructure) : null;

  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 transition-all duration-300 ease-out sm:right-4 sm:left-auto sm:top-20 sm:bottom-6 sm:w-96 ${
      isExpanded ? 'h-[80vh] sm:h-auto' : 'h-[50vh] sm:h-auto'
    }`}>
      <div className="h-full flex flex-col bg-slate-900/95 backdrop-blur-xl border-t sm:border border-slate-700/60 sm:rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-slate-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
              isBone ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
              isMuscle ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
              'bg-sky-500/20 text-sky-300 border border-sky-500/30'
            }`}>
              {structure.system === 'connective' ? 'Connective Tissue' : structure.system}
            </span>
            <span className="text-xs text-slate-400 capitalize">
              {structure.region.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {/* Expand / Collapse toggle for mobile */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 sm:hidden"
              title="Expand panel"
            >
              {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Bookmark structure"
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Isolate button */}
            <button
              onClick={() => onIsolate(structure)}
              className={`p-1.5 rounded-lg transition-colors ${
                isIsolated 
                  ? 'text-amber-400 bg-amber-950/50 border border-amber-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isIsolated ? 'Show all' : 'Isolate structure'}
            >
              <Crosshair size={18} />
            </button>

            {/* Hide structure button */}
            <button
              onClick={() => onHide(structure)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Hide structure"
            >
              <EyeOff size={18} />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Close panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-800/60 bg-gradient-to-b from-slate-900 to-slate-950">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            {structure.name}
          </h2>
          {structure.latinName && (
            <p className="text-xs italic text-cyan-400/90 font-serif mt-0.5">
              {structure.latinName}
            </p>
          )}
          {structure.commonName && (
            <p className="text-xs text-slate-400 mt-0.5">
              Common name: <span className="text-slate-300 font-medium">{structure.commonName}</span>
            </p>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4 text-sm divide-y divide-slate-800/50">
          
          {/* General Overview */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
              <Info size={14} className="text-cyan-400" /> Overview & Location
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed mb-2">
              {structure.description}
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] bg-slate-800/70 px-2 py-1 rounded text-slate-300 border border-slate-700/50">
              <span className="text-slate-400">Location:</span> {structure.location}
            </div>
          </div>

          {/* BONE SPECIFIC DETAILS */}
          {bone && (
            <div className="pt-3 space-y-3">
              {bone.classification && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-1">Classification</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-medium">
                    {bone.classification}
                  </span>
                </div>
              )}

              {bone.anatomicalLandmarks && bone.anatomicalLandmarks.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                    <Sparkles size={13} className="text-amber-400" /> Anatomical Landmarks
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {bone.anatomicalLandmarks.map((lm, idx) => (
                      <span key={idx} className="text-xs bg-slate-800/90 border border-slate-700/60 px-2 py-0.5 rounded-md text-slate-300">
                        {lm}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {bone.articulations && bone.articulations.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-1">Articulations</h4>
                  <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                    {bone.articulations.map((art, idx) => (
                      <li key={idx}>{art}</li>
                    ))}
                  </ul>
                </div>
              )}

              {bone.bloodSupply && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 mb-0.5">Vascular Supply</h4>
                  <p className="text-xs text-slate-300">{bone.bloodSupply}</p>
                </div>
              )}
            </div>
          )}

          {/* MUSCLE SPECIFIC DETAILS */}
          {muscle && (
            <div className="pt-3 space-y-3">
              {/* Origin & Insertion */}
              <div className="grid grid-cols-1 gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wide">Origin:</span>
                  <ul className="text-xs text-slate-300 list-disc list-inside mt-0.5">
                    {muscle.origin.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">Insertion:</span>
                  <ul className="text-xs text-slate-300 list-disc list-inside mt-0.5">
                    {muscle.insertion.map((ins, idx) => (
                      <li key={idx}>{ins}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                  <Activity size={14} className="text-rose-400" /> Primary Actions
                </h4>
                <ul className="text-xs space-y-1 text-slate-200 list-disc list-inside">
                  {muscle.action.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>

              {/* Innervation & Blood Supply */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
                  <span className="text-amber-400 font-semibold block mb-0.5">Innervation:</span>
                  <span className="text-slate-300">{muscle.innervation}</span>
                </div>
                <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
                  <span className="text-rose-400 font-semibold block mb-0.5">Vascular Supply:</span>
                  <span className="text-slate-300">{muscle.bloodSupply}</span>
                </div>
              </div>
            </div>
          )}

          {/* CONNECTIVE TISSUE SPECIFIC DETAILS */}
          {connective && (
            <div className="pt-3 space-y-3">
              {/* Tissue Classification & Histology */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold">
                  {connective.tissueType}
                </span>
                <span className="text-xs text-slate-400">
                  {connective.composition}
                </span>
              </div>

              {/* Attachment Points */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                  <Link size={13} className="text-sky-400" /> Anatomical Attachments
                </h4>
                <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                  {connective.attachmentPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Biomechanical Function */}
              <div>
                <h4 className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                  <Layers size={13} /> Biomechanical Function & Kinetics
                </h4>
                <p className="text-xs text-slate-400 mb-1.5">
                  <strong className="text-slate-300">Associated Structure:</strong> {connective.jointOrStructureAssociation}
                </p>
                <ul className="text-xs space-y-1 text-slate-200 list-disc list-inside">
                  {connective.biomechanicalFunction.map((fn, idx) => (
                    <li key={idx}>{fn}</li>
                  ))}
                </ul>
              </div>

              {/* Vascularity */}
              {connective.vascularity && (
                <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 text-xs">
                  <span className="text-amber-400 font-semibold block mb-0.5">Vascularity & Perfusion:</span>
                  <span className="text-slate-300">{connective.vascularity}</span>
                </div>
              )}

              {/* Common Pathologies */}
              {connective.commonPathologies && connective.commonPathologies.length > 0 && (
                <div className="bg-rose-950/30 border border-rose-900/40 p-2.5 rounded-lg">
                  <h4 className="text-xs font-semibold text-rose-300 mb-1">Common Pathologies & Clinical Injuries</h4>
                  <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                    {connective.commonPathologies.map((inj, idx) => (
                      <li key={idx}>{inj}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Clinical Anatomy / High Yield Clinical Notes */}
          {structure.clinicalNotes && structure.clinicalNotes.length > 0 && (
            <div className="pt-3 pb-2">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-amber-400" /> High-Yield Clinical Anatomy
              </h4>
              <div className="space-y-1.5">
                {structure.clinicalNotes.map((note, idx) => (
                  <div key={idx} className="bg-amber-950/25 border-l-2 border-amber-500/80 p-2 text-xs text-amber-200/90 leading-relaxed rounded-r">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
