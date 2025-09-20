'use client';

import { useState } from 'react';
import HomePage from '@/components/HomePage';
import LogPage from '@/components/LogPage';
import PanicPage from '@/components/PanicPageRefactored';
import TrendsPage from '@/components/TrendsPageRefactored';
import AchievementsPage from '@/components/AchievementsPageRefactored';
import BottomNav from '@/components/BottomNav';

export default function EmotionWheelApp() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app">
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'log' && <LogPage onNavigate={setCurrentPage} />}
      {currentPage === 'panic' && <PanicPage onNavigate={setCurrentPage} />}
      {currentPage === 'trends' && <TrendsPage onNavigate={setCurrentPage} />}
      {currentPage === 'achievements' && <AchievementsPage onNavigate={setCurrentPage} />}

      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}