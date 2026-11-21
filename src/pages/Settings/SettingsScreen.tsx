import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Database, 
  Scale, 
  Trash2, 
  Check 
} from 'lucide-react';
import { StorageService, UserPreferences } from '../../services/storage';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [prefs, setPrefs] = useState<UserPreferences>(() => StorageService.getPreferences());
  const [isResetDone, setIsResetDone] = useState(false);

  const updatePreference = <K extends keyof UserPreferences>(key: K, val: UserPreferences[K]) => {
    const updated = StorageService.setPreferences({ [key]: val });
    setPrefs(updated);
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all saved bookmarks and quiz history?')) {
      localStorage.clear();
      setIsResetDone(true);
      setTimeout(() => setIsResetDone(false), 2000);
    }
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
            <h1 className="text-base font-bold text-white">Application Settings</h1>
            <span className="text-[11px] font-mono text-cyan-400">My Anatomy v1.0</span>
          </div>
        </header>

        {/* 3D Rendering Preferences */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Smartphone size={16} className="text-cyan-400" />
            3D Graphics & Rendering
          </h2>

          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <p className="text-sm font-medium text-white">Render Quality</p>
              <p className="text-xs text-slate-400">Balance visual fidelity and mobile battery performance</p>
            </div>
            <select
              value={prefs.renderQuality}
              onChange={(e) => updatePreference('renderQuality', e.target.value as 'high' | 'medium' | 'low')}
              className="bg-slate-800 text-xs text-cyan-300 font-semibold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none"
            >
              <option value="high">High (Full MSAA)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="low">Low (Battery Saver)</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <p className="text-sm font-medium text-white">Haptic Touch Feedback</p>
              <p className="text-xs text-slate-400">Vibration pulse when picking anatomical structures</p>
            </div>
            <button
              onClick={() => updatePreference('hapticsEnabled', !prefs.hapticsEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                prefs.hapticsEnabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                prefs.hapticsEnabled ? 'right-0.5' : 'left-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-white">Highlight Accent Color</p>
              <p className="text-xs text-slate-400">Glow color for selected bones and muscles</p>
            </div>
            <div className="flex items-center gap-2">
              {['#06b6d4', '#38bdf8', '#10b981', '#f59e0b', '#ec4899'].map((col) => (
                <button
                  key={col}
                  onClick={() => updatePreference('highlightColor', col)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    prefs.highlightColor === col ? 'scale-125 border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Offline Storage & Cache */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Database size={16} className="text-cyan-400" />
            Offline Data & Storage
          </h2>

          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <p className="text-sm font-medium text-white">Offline Mode</p>
              <p className="text-xs text-slate-400">All 3D models and anatomy data are stored locally</p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active · 100% Offline
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-white">Reset Study History & Bookmarks</p>
              <p className="text-xs text-slate-400">Erase local quiz accuracy and saved bookmarks</p>
            </div>
            <button
              onClick={handleResetProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold"
            >
              {isResetDone ? <Check size={14} /> : <Trash2 size={14} />}
              <span>{isResetDone ? 'Reset Complete' : 'Reset'}</span>
            </button>
          </div>
        </section>

        {/* Legal & Medical Attribution */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Scale size={16} className="text-cyan-400" />
            Attribution & Licenses
          </h2>

          <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <p>
              <strong className="text-white">Z-Anatomy 3D Human Models:</strong> Anatomical 3D geometry derived from the open-source Z-Anatomy project, based on BodyParts3D (The Database Center for Life Science, Japan).
            </p>
            <p>
              <strong className="text-white">License:</strong> Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).
            </p>
            <p>
              <strong className="text-white">Medical Disclaimer:</strong> This application is intended for educational purposes and anatomical study. It should not be used as a sole substitute for certified professional medical diagnosis or clinical care.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
