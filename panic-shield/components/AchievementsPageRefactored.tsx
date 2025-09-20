'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import useAchievements from '@/hooks/useAchievements';
import StreakDisplay from '@/components/achievements/StreakDisplay';
import ProgressMetrics from '@/components/achievements/ProgressMetrics';
import AchievementCard from '@/components/achievements/AchievementCard';
import RecentUnlocks from '@/components/achievements/RecentUnlocks';

interface AchievementsPageRefactoredProps {
  onNavigate: (page: string) => void;
}

export default function AchievementsPageRefactored({ onNavigate }: AchievementsPageRefactoredProps) {
  const {
    stats,
    streak,
    level,
    achievementsByCategory,
    unlockedAchievements,
    totalAchievements,
    unlockedCount,
    completionPercentage,
    getProgress,
    getStreakMessage,
    getFireIcon
  } = useAchievements();

  const streakMessage = getStreakMessage();
  const fireIcon = getFireIcon();

  // Category display names
  const categoryNames = {
    logging: '📝 Logging',
    wellness: '💚 Wellness',
    progress: '📈 Progress',
    special: '⭐ Special'
  };

  return (
    <div className="page achievements-page">
      <div className="header">
        <button onClick={() => onNavigate('home')} className="back-btn">
          <ChevronLeft size={24} />
        </button>
        <h2>Achievements</h2>
      </div>

      <div className="achievements-content">
        {/* Streak Display */}
        <StreakDisplay
          streak={streak}
          streakMessage={streakMessage}
          fireIcon={fireIcon}
        />

        {/* Progress Metrics */}
        <ProgressMetrics
          level={level}
          unlockedCount={unlockedCount}
          totalAchievements={totalAchievements}
          completionPercentage={completionPercentage}
        />

        {/* Recent Unlocks */}
        <RecentUnlocks
          unlockedAchievements={unlockedAchievements}
          maxRecent={3}
        />

        {/* Achievement Categories */}
        {Object.entries(achievementsByCategory).map(([category, achievements]) => (
          <div key={category} className="achievement-category">
            <h3 className="category-title">
              {categoryNames[category as keyof typeof categoryNames]}
            </h3>

            <div className="achievement-grid">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  progress={getProgress(achievement.id)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Journey Stats Summary */}
        <div className="journey-summary">
          <h3>Your Journey</h3>
          <div className="journey-stats">
            <div className="journey-item">
              <span className="journey-label">Total Logs</span>
              <span className="journey-value">{stats.totalLogs}</span>
            </div>
            <div className="journey-item">
              <span className="journey-label">Longest Streak</span>
              <span className="journey-value">{stats.longestStreak} days</span>
            </div>
            <div className="journey-item">
              <span className="journey-label">Emotions Explored</span>
              <span className="journey-value">{stats.emotionalRange}</span>
            </div>
            <div className="journey-item">
              <span className="journey-label">Patterns Found</span>
              <span className="journey-value">{stats.triggersIdentified.size}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .achievements-content {
          padding: 16px;
          padding-bottom: 80px;
        }

        .achievement-category {
          margin-bottom: 24px;
          animation: fadeInUp 0.5s ease-out;
        }

        .category-title {
          font-size: 18px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: var(--foreground);
        }

        .achievement-grid {
          display: grid;
          gap: 12px;
          animation: staggerIn 0.6s ease-out;
        }

        .journey-summary {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-top: 24px;
          animation: slideInUp 0.6s ease-out;
        }

        .journey-summary h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--foreground);
        }

        .journey-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .journey-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: var(--secondary);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .journey-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .journey-label {
          font-size: 12px;
          color: var(--muted);
          font-weight: 500;
        }

        .journey-value {
          font-size: 20px;
          font-weight: bold;
          color: var(--foreground);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes staggerIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive design */
        @media (min-width: 768px) {
          .achievement-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .journey-stats {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .achievements-content {
            padding: 24px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .achievement-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Add staggered animation to achievement cards */
        .achievement-grid > :global(.achievement-card) {
          animation-delay: calc(var(--index, 0) * 0.1s);
        }
      `}</style>
    </div>
  );
}