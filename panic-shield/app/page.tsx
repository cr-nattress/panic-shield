'use client';

import { useState, useEffect } from 'react';
import HomePage from '@/components/HomePage';
import LogPage from '@/components/LogPage';
import PanicPage from '@/components/PanicPageRefactored';
import TrendsPage from '@/components/TrendsPageRefactored';
import AchievementsPage from '@/components/AchievementsPageRefactored';
import BottomNav from '@/components/BottomNav';
import AppHeader from '@/components/header/AppHeader';
import MenuDrawer from '@/components/header/MenuDrawer';
import SettingsModal from '@/components/SettingsModal';

export default function EmotionWheelApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // US-HDR-008: Handle full-screen mode for exercises
  useEffect(() => {
    // Check if we're in a breathing or grounding exercise
    const isExerciseActive = document.querySelector('.breathing-container, .groundingContainer');
    setIsFullScreen(!!isExerciseActive);
  }, [currentPage]);

  // Get subtitle based on current page
  const getPageSubtitle = (page: string) => {
    const subtitles: Record<string, string> = {
      home: 'Check In',
      log: 'Track Emotion',
      trends: 'Your Insights',
      achievements: 'Progress',
      panic: 'Crisis Support'
    };
    return subtitles[page] || '';
  };

  // US-HDR-008: Determine if header should be shown
  const shouldShowHeader = !isFullScreen || currentPage !== 'panic';

  // US-HDR-011: Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt+M for menu
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        setMenuOpen(prev => !prev);
      }
      // Alt+S for settings
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        setSettingsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="app">
      {/* US-HDR-011: Skip navigation link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {shouldShowHeader && (
        <AppHeader
          subtitle={getPageSubtitle(currentPage)}
          variant={currentPage === 'panic' ? 'panic' : 'default'}
          onMenuClick={() => setMenuOpen(true)}
          onSettingsClick={() => setSettingsOpen(true)}
        />
      )}

      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPage={currentPage}
      />

      <main className="app-content" id="main-content" role="main">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'log' && <LogPage onNavigate={setCurrentPage} />}
        {currentPage === 'panic' && <PanicPage onNavigate={setCurrentPage} />}
        {currentPage === 'trends' && <TrendsPage onNavigate={setCurrentPage} />}
        {currentPage === 'achievements' && <AchievementsPage onNavigate={setCurrentPage} />}
      </main>

      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* US-HDR-005: Settings modal accessible from header */}
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}