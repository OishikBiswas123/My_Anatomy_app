import React, { useState, useEffect } from 'react';
import { 
  Bone, 
  Activity, 
  Layers, 
  Search, 
  Bookmark, 
  GraduationCap, 
  Settings, 
  Clock, 
  ChevronRight, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { AnatomicalSystemType, AnatomyStructure, HistoryItem, BookmarkItem } from '../../types/anatomy';
import { StorageService } from '../../services/storage';
import { getStructureById } from '../../data';

interface HomeScreenProps {
  onSelectSystem: (system: AnatomicalSystemType) => void;
  onOpenStructure: (structure: AnatomyStructure) => void;
  onOpenSearch: () => void;
  onOpenStudy: () => void;
  onOpenBookmarks: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectSystem,
  onOpenStructure,
  onOpenSearch,
  onOpenStudy,
  onOpenBookmarks,
  onOpenSettings,
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [progress, setProgress] = useState(() => StorageService.getProgress());

  useEffect(() => {
    setHistory(StorageService.getHistory().slice(0, 6));
    setBookmarks(StorageService.getBookmarks().slice(0, 4));
    setProgress(StorageService.getProgress());
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0e17] text-slate-100 overflow-y-auto pb-20 pt-safe px-4 sm:px-8">
      <div className="max-w-4xl mx-auto py-6 space-y-7">
        
        {/* Top Header Bar */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-sm font-black text-cyan-300 font-mono">3D</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">My Anatomy</h1>
              <p className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
                <ShieldCheck size={12} /> Medical Education · Offline
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenBookmarks}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
              title="Bookmarks"
            >
              <Bookmark size={18} />
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
              title="Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Search Bar Banner */}
        <div 
          onClick={onOpenSearch}
          className="cursor-pointer bg-slate-900/90 border border-slate-700/60 hover:border-cyan-500/50 rounded-2xl p-3.5 flex items-center space-x-3 shadow-xl transition-all group"
        >
          <Search size={18} className="text-cyan-400 group-hover:scale-110 transition-transform ml-1" />
          <span className="text-sm text-slate-400 flex-1">Search bones, muscles, ligaments...</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Offline Index
          </span>
        </div>

        {/* Primary Anatomical Systems Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Anatomical Systems
            </h2>
            <span className="text-xs text-slate-500">Select system to explore in 3D</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Skeletal Card */}
            <div
              onClick={() => onSelectSystem('skeletal')}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 p-5 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Bone size={24} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Skeletal System
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                206 bones, axial & appendicular skeleton, joint articulations and landmarks.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-amber-400 font-medium">
                <span>Open 3D Skeleton</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Muscular Card */}
            <div
              onClick={() => onSelectSystem('muscular')}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-rose-500/50 p-5 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-105 transition-transform">
                <Activity size={24} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                Muscular System
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Full-body muscles, origins, insertions, actions, and motor innervation.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-rose-400 font-medium">
                <span>Open 3D Muscles</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Connective Tissue Card */}
            <div
              onClick={() => onSelectSystem('connective')}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-sky-500/50 p-5 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-105 transition-transform">
                <Layers size={24} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                Connective Tissue
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Tendons, aponeuroses, deep fascia, costal cartilages, and spinal discs.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-sky-400 font-medium">
                <span>Explore Connective 3D</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </section>

        {/* Study Mode Callout Banner */}
        <section 
          onClick={onOpenStudy}
          className="cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 p-5 shadow-xl flex items-center justify-between hover:border-cyan-400/60 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Anatomy Study & Quiz Mode</h3>
                {progress.quizzesCompleted > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <Award size={10} /> {progress.quizAccuracy}% Accuracy
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Practice high-yield clinical questions and identify 3D anatomical structures.
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-cyan-400 flex-shrink-0" />
        </section>

        {/* Recently Viewed Structures */}
        {history.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock size={14} className="text-cyan-400" /> Recently Viewed
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {history.map((item, idx) => {
                const struct = getStructureById(item.structureId);
                return (
                  <button
                    key={idx}
                    onClick={() => struct && onOpenStructure(struct)}
                    className="text-left p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:bg-slate-800/80 transition-all"
                  >
                    <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                    <span className="text-[10px] text-cyan-400 uppercase font-mono">{item.system}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Bookmarked Structures Quick Row */}
        {bookmarks.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Bookmark size={14} className="text-cyan-400" /> Saved Bookmarks
              </h2>
              <button 
                onClick={onOpenBookmarks}
                className="text-xs text-cyan-400 hover:underline"
              >
                View all ({bookmarks.length})
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {bookmarks.map((b) => {
                const struct = getStructureById(b.structureId);
                return (
                  <button
                    key={b.id}
                    onClick={() => struct && onOpenStructure(struct)}
                    className="text-left p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:bg-slate-800/80 transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{b.name}</p>
                      <span className="text-[10px] text-slate-400 capitalize">{b.system}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
