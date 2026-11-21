import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#060a12] via-[#0b1120] to-[#040810] text-white p-8 select-none">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm text-center">
        
        {/* Animated 3D Anatomical Emblem */}
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          {/* Concentric glowing rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping [animation-duration:3s]" />
          <div className="absolute inset-2 rounded-full border border-sky-400/30 animate-spin [animation-duration:12s]" />
          <div className="absolute inset-5 rounded-full border border-teal-400/40 animate-spin [animation-direction:reverse] [animation-duration:8s]" />
          
          {/* Inner medical helix orb */}
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-teal-400 p-0.5 shadow-[0_0_35px_rgba(6,182,212,0.5)] flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-black tracking-wider text-cyan-300 font-mono">
                3D
              </span>
            </div>
          </div>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          MY ANATOMY
        </h1>
        <p className="text-xs uppercase tracking-widest text-cyan-400/90 font-mono font-medium mb-1">
          Interactive Medical Reference
        </p>
        <p className="text-xs text-slate-400 max-w-xs mt-1">
          Offline 3D Skeletal, Muscular and Ligamentous Learning
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="w-full max-w-xs space-y-2 mb-6">
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>INITIALIZING LOCAL DATABASE</span>
          <span className="text-cyan-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-center text-slate-500 font-mono">
          Ready for offline use · No network required
        </p>
      </div>
    </div>
  );
};
