'use client';

import { useState } from 'react';
import HomePage from '@/components/HomePage';
import LogPage from '@/components/LogPage';
import PanicPage from '@/components/PanicPageRefactored';
import TrendsPage from '@/components/TrendsPageRefactored';
import AchievementsPage from '@/components/AchievementsPageRefactored';
import BottomNav from '@/components/BottomNav';
import AppHeader from '@/components/header/AppHeader';
import MenuDrawer from '@/components/header/MenuDrawer';

export default function EmotionWheelApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="app">
      <AppHeader
        subtitle={getPageSubtitle(currentPage)}
        variant={currentPage === 'panic' ? 'panic' : 'default'}
        onMenuClick={() => setMenuOpen(true)}
      />

      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPage={currentPage}
      />

      <main className="app-content">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'log' && <LogPage onNavigate={setCurrentPage} />}
        {currentPage === 'panic' && <PanicPage onNavigate={setCurrentPage} />}
        {currentPage === 'trends' && <TrendsPage onNavigate={setCurrentPage} />}
        {currentPage === 'achievements' && <AchievementsPage onNavigate={setCurrentPage} />}
      </main>

      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}