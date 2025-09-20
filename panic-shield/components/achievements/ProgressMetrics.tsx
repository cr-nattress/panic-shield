import React from 'react';
import { Star, Trophy, TrendingUp } from 'lucide-react';
import { LevelData } from '@/utils/achievementLogic';

interface ProgressMetricsProps {
  level: LevelData;
  unlockedCount: number;
  totalAchievements: number;
  completionPercentage: number;
  className?: string;
}

export default function ProgressMetrics({
  level,
  unlockedCount,
  totalAchievements,
  completionPercentage,
  className = ''
}: ProgressMetricsProps) {
  const xpProgressPercentage = level.nextLevel > 0 ? (level.progress / level.nextLevel) * 100 : 100;

  return (
    <>
      <div className={`progress-metrics ${className}`}>
        {/* Level Progress Card */}
        <div className="stat-card level-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Level</span>
            <span className="stat-value">{level.level}</span>
            <div className="xp-bar">
              <div
                className="xp-fill"
                style={{ width: `${xpProgressPercentage}%` }}
              />
              <div className="xp-sparkle" style={{ left: `${Math.min(xpProgressPercentage, 95)}%` }} />
            </div>
            <span className="xp-text">
              {level.progress}/{level.nextLevel} XP
            </span>
          </div>
        </div>

        {/* Achievements Progress Card */}
        <div className="stat-card achievement-progress-card">
          <div className="stat-icon">
            <Trophy size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Achievements</span>
            <span className="stat-value">{unlockedCount}/{totalAchievements}</span>
            <div className="achievement-progress-bar">
              <div
                className="achievement-progress-fill"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="completion-text">{completionPercentage}% Complete</span>
          </div>
        </div>

        {/* Total XP Card */}
        <div className="stat-card xp-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total XP</span>
            <span className="stat-value xp-value">{level.totalXP.toLocaleString()}</span>
            <span className="xp-subtitle">Experience Points</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .progress-metrics {
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
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .stat-card:hover::before {
          left: 100%;
        }

        .level-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .achievement-progress-card {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(240, 147, 251, 0.3);
        }

        .xp-card {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .stat-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          z-index: 1;
        }

        .stat-label {
          font-size: 12px;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          animation: countUp 0.8s ease-out;
        }

        .xp-value {
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .xp-bar, .achievement-progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 4px;
          position: relative;
        }

        .xp-fill, .achievement-progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.8s ease;
          position: relative;
          overflow: hidden;
        }

        .xp-fill {
          background: linear-gradient(90deg, #fff, #f0f0f0);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        .achievement-progress-fill {
          background: linear-gradient(90deg, #fff, #ffd700);
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
        }

        .xp-fill::after, .achievement-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shimmer 2s ease-in-out infinite;
        }

        .xp-sparkle {
          position: absolute;
          top: -2px;
          width: 4px;
          height: 10px;
          background: #fff;
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
          animation: sparkle 2s ease-in-out infinite;
          transition: left 0.8s ease;
        }

        .xp-text, .completion-text {
          font-size: 11px;
          opacity: 0.9;
          font-weight: 500;
          margin-top: 2px;
        }

        .xp-subtitle {
          font-size: 10px;
          opacity: 0.8;
          font-style: italic;
        }

        /* Animations */
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        /* Grid layout for larger screens */
        @media (min-width: 768px) {
          .progress-metrics {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .xp-card {
            grid-column: 1 / -1;
          }
        }

        @media (min-width: 1024px) {
          .progress-metrics {
            grid-template-columns: 1fr 1fr 1fr;
          }

          .xp-card {
            grid-column: auto;
          }
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .stat-card {
            padding: 14px;
            gap: 12px;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
          }

          .stat-value {
            font-size: 20px;
          }

          .xp-bar, .achievement-progress-bar {
            height: 5px;
          }
        }
      `}</style>
    </>
  );
}