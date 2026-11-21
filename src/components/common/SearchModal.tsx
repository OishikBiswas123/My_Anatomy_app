import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, X, ArrowRight, Bone, Activity, Layers } from 'lucide-react';
import { searchAnatomy } from '../../data';
import { AnatomyStructure, AnatomicalSystemType } from '../../types/anatomy';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (structure: AnatomyStructure) => void;
  currentSystem?: AnatomicalSystemType;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const [systemFilter, setSystemFilter] = useState<AnatomicalSystemType | 'all'>('all');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchAnatomy(
      query,
      systemFilter === 'all' ? undefined : systemFilter
    );
  }, [query, systemFilter]);

  if (!isOpen) return null;

  const handleSelect = (item: AnatomyStructure) => {
    onSelectResult(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-start justify-center p-4 pt-12 sm:pt-20">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950/80">
          <SearchIcon size={20} className="text-cyan-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bones, muscles, ligaments, landmarks..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-1"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/60 bg-slate-950/40 text-xs overflow-x-auto">
          <span className="text-slate-500 font-medium mr-1">Filter:</span>
          
          <button
            onClick={() => setSystemFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              systemFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Systems
          </button>

          <button
            onClick={() => setSystemFilter('skeletal')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
              systemFilter === 'skeletal'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bone size={12} />
            <span>Bones</span>
          </button>

          <button
            onClick={() => setSystemFilter('muscular')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
              systemFilter === 'muscular'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity size={12} />
            <span>Muscles</span>
          </button>

          <button
            onClick={() => setSystemFilter('ligamentous')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
              systemFilter === 'ligamentous'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={12} />
            <span>Ligaments</span>
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-800/40">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-500">
              <SearchIcon size={32} className="mx-auto mb-2 opacity-30 text-cyan-400" />
              <p className="text-sm">Type an anatomical name to search</p>
              <p className="text-xs text-slate-600 mt-1">Try "femur", "acl", "deltoid", "patella", or "radius"</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm">No anatomical structures found for "{query}"</p>
              <p className="text-xs text-slate-600 mt-1">Check spelling or choose "All Systems"</p>
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full text-left p-3 rounded-xl hover:bg-slate-800/60 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      item.system === 'skeletal' ? 'bg-amber-500/20 text-amber-300' :
                      item.system === 'muscular' ? 'bg-rose-500/20 text-rose-300' :
                      'bg-cyan-500/20 text-cyan-300'
                    }`}>
                      {item.system}
                    </span>
                  </div>
                  {item.commonName && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.commonName}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                    {item.description}
                  </p>
                </div>
                <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors ml-3 flex-shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-500 flex justify-between items-center">
          <span>{results.length} structure{results.length !== 1 ? 's' : ''} found</span>
          <span>100% Offline Database</span>
        </div>
      </div>
    </div>
  );
};
