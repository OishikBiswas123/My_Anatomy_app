import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { BookmarkItem, AnatomyStructure } from '../../types/anatomy';
import { StorageService } from '../../services/storage';
import { getStructureById } from '../../data';

interface BookmarksScreenProps {
  onBack: () => void;
  onSelectStructure: (structure: AnatomyStructure) => void;
}

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  onBack,
  onSelectStructure,
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    setBookmarks(StorageService.getBookmarks());
  }, []);

  const handleRemove = (structureId: string) => {
    StorageService.removeBookmark(structureId);
    setBookmarks(StorageService.getBookmarks());
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0e17] text-slate-100 overflow-y-auto pb-20 pt-safe px-4 sm:px-8 select-none">
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="text-right">
            <h1 className="text-base font-bold text-white">Saved Bookmarks</h1>
            <span className="text-[11px] font-mono text-cyan-400">Offline Revision List</span>
          </div>
        </header>

        {bookmarks.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <Bookmark size={40} className="mx-auto mb-3 opacity-25 text-cyan-400" />
            <p className="text-sm">No bookmarked anatomical structures yet</p>
            <p className="text-xs text-slate-600 mt-1">Tap the bookmark icon on any structure to save it here</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {bookmarks.map((b) => {
              const struct = getStructureById(b.structureId);
              return (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div 
                    onClick={() => struct && onSelectStructure(struct)}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                        {b.name}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                        b.system === 'skeletal' ? 'bg-amber-500/20 text-amber-300' :
                        b.system === 'muscular' ? 'bg-rose-500/20 text-rose-300' :
                        'bg-sky-500/20 text-sky-300'
                      }`}>
                        {b.system === 'connective' ? 'Connective' : b.system}
                      </span>
                    </div>
                    {struct?.location && (
                      <p className="text-xs text-slate-400 mt-0.5">{struct.location}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleRemove(b.structureId)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                      title="Remove bookmark"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => struct && onSelectStructure(struct)}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                      title="View in 3D"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
