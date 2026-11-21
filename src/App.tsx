import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/common/SplashScreen';
import { HomeScreen } from './pages/Home/HomeScreen';
import { AnatomyViewerScreen } from './pages/Viewer/AnatomyViewerScreen';
import { StudyScreen } from './pages/Study/StudyScreen';
import { BookmarksScreen } from './pages/Bookmarks/BookmarksScreen';
import { SettingsScreen } from './pages/Settings/SettingsScreen';
import { SearchModal } from './components/common/SearchModal';
import { AnatomicalSystemType, AnatomyStructure } from './types/anatomy';
import { App as CapApp } from '@capacitor/app';

type ScreenState = 'splash' | 'home' | 'viewer' | 'study' | 'bookmarks' | 'settings';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('splash');
  const [activeSystem, setActiveSystem] = useState<AnatomicalSystemType>('skeletal');
  const [targetedStructure, setTargetedStructure] = useState<AnatomyStructure | null>(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // Android hardware back-button listener via Capacitor
  useEffect(() => {
    let backListener: { remove: () => void } | null = null;

    const setupBackHandler = async () => {
      try {
        backListener = await CapApp.addListener('backButton', () => {
          if (isGlobalSearchOpen) {
            setIsGlobalSearchOpen(false);
          } else if (currentScreen !== 'home' && currentScreen !== 'splash') {
            setCurrentScreen('home');
          } else {
            CapApp.exitApp();
          }
        });
      } catch {
        // Fallback for browser environment
      }
    };

    setupBackHandler();

    return () => {
      if (backListener) {
        backListener.remove();
      }
    };
  }, [currentScreen, isGlobalSearchOpen]);

  // Handle system selection from Home
  const handleSelectSystem = (system: AnatomicalSystemType) => {
    setActiveSystem(system);
    setTargetedStructure(null);
    setCurrentScreen('viewer');
  };

  // Handle opening a specific structure (e.g. from Search or Bookmarks)
  const handleOpenStructure = (structure: AnatomyStructure) => {
    setActiveSystem(structure.system);
    setTargetedStructure(structure);
    setCurrentScreen('viewer');
  };

  return (
    <div className="w-full h-full min-h-screen bg-background text-slate-100 overflow-hidden font-sans select-none">
      {/* Screen Router */}
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onSelectSystem={handleSelectSystem}
          onOpenStructure={handleOpenStructure}
          onOpenSearch={() => setIsGlobalSearchOpen(true)}
          onOpenStudy={() => setCurrentScreen('study')}
          onOpenBookmarks={() => setCurrentScreen('bookmarks')}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )}

      {currentScreen === 'viewer' && (
        <AnatomyViewerScreen
          initialSystem={activeSystem}
          initialStructure={targetedStructure}
          onBackToHome={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'study' && (
        <StudyScreen
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'bookmarks' && (
        <BookmarksScreen
          onBack={() => setCurrentScreen('home')}
          onSelectStructure={handleOpenStructure}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onSelectResult={handleOpenStructure}
        currentSystem={activeSystem}
      />
    </div>
  );
};

export default App;
