'use client';

import React, { useMemo } from 'react';
import { Shield, Edit3, AlertCircle, TrendingUp, Trophy, Flame } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { calculateStreak, getStreakMessage } from '@/utils/gamification';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { logs } = useStore();

  const streak = useMemo(() => calculateStreak(logs), [logs]);

  return (
    <div className="page home-page page-enter">
      <div className="header">
        <h1 className="heading-1">How are you?</h1>
        {/* US-HDR-005: Settings moved to AppHeader */}
      </div>

      {/* Streak Banner */}
      {streak.current > 0 && (
        <div className="streak-banner card elevation-2">
          <div className="streak-icon">
            <Flame size={24} strokeWidth={2} />
          </div>
          <div className="streak-info">
            <div className="streak-count heading-3">
              {streak.current} day streak!
              {/* Using Flame icons instead of emojis for consistency */}
              <span className="fire-icons">
                {Array(streak.fireLevel === 'large' ? 3 : streak.fireLevel === 'medium' ? 2 : 1)
                  .fill(0)
                  .map((_, i) => (
                    <Flame key={i} size={16} className="fire-icon" strokeWidth={2} />
                  ))}
              </span>
            </div>
            <div className="streak-message subtitle">{getStreakMessage(streak.current)}</div>
          </div>
        </div>
      )}

      <div className="quick-actions">
        <button onClick={() => onNavigate('log')} className="action-card card-interactive elevation-1 primary touch-target">
          <Edit3 size={32} strokeWidth={2} />
          <h3 className="heading-3">Quick Log</h3>
          <p className="caption">Track your emotion in 30 seconds</p>
        </button>

        <button onClick={() => onNavigate('panic')} className="action-card card-interactive elevation-1 danger touch-target">
          <AlertCircle size={32} strokeWidth={2} />
          <h3 className="heading-3">Panic Mode</h3>
          <p className="caption">Immediate grounding support</p>
        </button>

        <button onClick={() => onNavigate('trends')} className="action-card card-interactive elevation-1 secondary touch-target">
          <TrendingUp size={32} strokeWidth={2} />
          <h3 className="heading-3">View Trends</h3>
          <p className="caption">See your patterns</p>
        </button>

        <button onClick={() => onNavigate('achievements')} className="action-card card-interactive elevation-1 achievements touch-target">
          <Trophy size={32} strokeWidth={2} />
          <h3 className="heading-3">Achievements</h3>
          <p className="caption">Track your progress</p>
        </button>
      </div>

      <div className="info-card card elevation-1">
        <Shield size={16} strokeWidth={2} />
        <p className="body-text"><strong>Privacy First:</strong> All data stays on your device. No accounts, no tracking.</p>
      </div>

      {/* Settings modal moved to main app */}
    </div>
  );
}