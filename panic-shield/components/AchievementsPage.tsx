'use client';

import React, { useMemo } from 'react';
import { ChevronLeft, Trophy, Target, Zap, Flame, Star, Lock, TrendingUp } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import {
  ACHIEVEMENTS,
  calculateUserStats,
  getAchievementProgress,
  calculateStreak,
  calculateXP,
  calculateLevel,
  getStreakMessage
} from '@/utils/gamification';

interface AchievementsPageProps {
  onNavigate: (page: string) => void;
}

export default function AchievementsPage({ onNavigate }: AchievementsPageProps) {
  const { logs, achievements: unlockedAchievements = [] } = useStore();

  const stats = useMemo(() => {
    const userStats = calculateUserStats(logs);
    const streak = calculateStreak(logs);

    // Calculate total XP (simplified for now)
    const totalXP = logs.length * 10 + unlockedAchievements.length * 25;
    const level = calculateLevel(totalXP);

    return {
      ...userStats,
      streak,
      level,
      totalXP,
      unlockedCount: unlockedAchievements.length,
      totalAchievements: ACHIEVEMENTS.length
    };
  }, [logs, unlockedAchievements]);

  const achievementsByCategory = useMemo(() => {
    const categories: Record<string, typeof ACHIEVEMENTS> = {
      logging: [],
      wellness: [],
      progress: [],
      special: []
    };

    ACHIEVEMENTS.forEach(achievement => {
      const isUnlocked = unlockedAchievements.includes(achievement.id);
      const progress = getAchievementProgress(achievement, stats);

      categories[achievement.category].push({
        ...achievement,
        unlockedAt: isUnlocked ? new Date().toISOString() : undefined,
        progress
      });
    });

    return categories;
  }, [stats, unlockedAchievements]);

  const getFireIcon = (level: string) => {
    switch (level) {
      case 'large': return '🔥🔥🔥';
      case 'medium': return '🔥🔥';
      case 'small': return '🔥';
      default: return '✨';
    }
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
        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Flame size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Current Streak</span>
              <span className="stat-value">
                {stats.streak.current} {stats.streak.current === 1 ? 'day' : 'days'}
              </span>
              <span className="stat-fire">{getFireIcon(stats.streak.fireLevel)}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Star size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Level</span>
              <span className="stat-value">{stats.level.level}</span>
              <div className="xp-bar">
                <div
                  className="xp-fill"
                  style={{ width: `${(stats.level.progress / stats.level.nextLevel) * 100}%` }}
                />
              </div>
              <span className="xp-text">{stats.level.progress}/{stats.level.nextLevel} XP</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Trophy size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Achievements</span>
              <span className="stat-value">{stats.unlockedCount}/{stats.totalAchievements}</span>
            </div>
          </div>
        </div>

        {/* Streak Message */}
        <div className="streak-message">
          <p>{getStreakMessage(stats.streak.current)}</p>
          {stats.streak.isPaused && (
            <small className="streak-paused">⏸️ Streak paused - log today to continue!</small>
          )}
        </div>

        {/* Achievement Categories */}
        {Object.entries(achievementsByCategory).map(([category, achievements]) => (
          <div key={category} className="achievement-category">
            <h3 className="category-title">
              {category === 'logging' && '📝 Logging'}
              {category === 'wellness' && '💚 Wellness'}
              {category === 'progress' && '📈 Progress'}
              {category === 'special' && '⭐ Special'}
            </h3>

            <div className="achievement-grid">
              {achievements.map((achievement: any) => (
                <div
                  key={achievement.id}
                  className={`achievement-card ${achievement.isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">
                    {achievement.isUnlocked ? achievement.icon : <Lock size={20} />}
                  </div>
                  <div className="achievement-info">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    {!achievement.isUnlocked && achievement.maxProgress && (
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    )}
                    {!achievement.isUnlocked && achievement.maxProgress && (
                      <span className="progress-text">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Stats */}
        <div className="quick-stats">
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

        .stats-overview {
          display: grid;
          gap: 12px;
          margin-bottom: 20px;
        }

        .stat-card {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .stat-card.primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 12px;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
        }

        .stat-fire {
          font-size: 20px;
          margin-top: 4px;
        }

        .xp-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 4px;
        }

        .xp-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .xp-text {
          font-size: 11px;
          opacity: 0.7;
        }

        .streak-message {
          text-align: center;
          padding: 16px;
          background: var(--card);
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .streak-message p {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }

        .streak-paused {
          display: block;
          margin-top: 8px;
          color: var(--warning);
        }

        .achievement-category {
          margin-bottom: 24px;
        }

        .category-title {
          font-size: 18px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .achievement-grid {
          display: grid;
          gap: 12px;
        }

        .achievement-card {
          padding: 12px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          gap: 12px;
          transition: all 0.2s;
        }

        .achievement-card.unlocked {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, transparent 100%);
          border-color: rgba(76, 175, 80, 0.3);
        }

        .achievement-card.locked {
          opacity: 0.6;
        }

        .achievement-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--secondary);
          border-radius: 8px;
        }

        .achievement-card.unlocked .achievement-icon {
          background: rgba(76, 175, 80, 0.1);
        }

        .achievement-info {
          flex: 1;
        }

        .achievement-info h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
        }

        .achievement-info p {
          margin: 0;
          font-size: 12px;
          color: var(--muted);
        }

        .progress-bar {
          height: 4px;
          background: var(--secondary);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 8px;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 11px;
          color: var(--muted);
          display: block;
          margin-top: 4px;
        }

        .quick-stats {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-top: 24px;
        }

        .quick-stats h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
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
        }

        .journey-label {
          font-size: 12px;
          color: var(--muted);
        }

        .journey-value {
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}