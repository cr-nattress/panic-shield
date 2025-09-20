import React from 'react';
import { Lock } from 'lucide-react';
import { Achievement, AchievementProgress } from '@/utils/achievementLogic';

interface AchievementCardProps {
  achievement: Achievement;
  progress: AchievementProgress;
  className?: string;
}

export default function AchievementCard({
  achievement,
  progress,
  className = ''
}: AchievementCardProps) {
  const isUnlocked = progress.isUnlocked || achievement.isUnlocked;

  return (
    <>
      <div className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'} ${className}`}>
        <div className="achievement-icon">
          {isUnlocked ? (
            <span className="achievement-emoji">{achievement.icon}</span>
          ) : (
            <Lock size={20} className="lock-icon" />
          )}
        </div>

        <div className="achievement-info">
          <h4 className="achievement-name">{achievement.name}</h4>
          <p className="achievement-description">{achievement.description}</p>

          {!isUnlocked && achievement.maxProgress && achievement.maxProgress > 1 && (
            <>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <span className="progress-text">
                {progress.current}/{progress.max}
              </span>
            </>
          )}

          {isUnlocked && achievement.unlockedAt && (
            <span className="unlock-timestamp">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {isUnlocked && (
          <div className="unlock-badge">
            <span className="unlock-checkmark">✓</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .achievement-card {
          padding: 12px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          gap: 12px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .achievement-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .achievement-card.unlocked {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, transparent 100%);
          border-color: rgba(76, 175, 80, 0.3);
          animation: unlockGlow 0.5s ease-out;
        }

        .achievement-card.unlocked:hover {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, transparent 100%);
          border-color: rgba(76, 175, 80, 0.4);
        }

        .achievement-card.locked {
          opacity: 0.6;
          background: var(--card);
        }

        .achievement-card.locked:hover {
          opacity: 0.8;
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
          position: relative;
          transition: all 0.3s ease;
        }

        .achievement-card.unlocked .achievement-icon {
          background: rgba(76, 175, 80, 0.2);
          animation: iconBounce 0.6s ease-out;
        }

        .achievement-emoji {
          animation: float 3s ease-in-out infinite;
        }

        .lock-icon {
          color: var(--muted);
          animation: shake 2s ease-in-out infinite;
        }

        .achievement-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .achievement-name {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .achievement-card.unlocked .achievement-name {
          color: var(--success);
        }

        .achievement-description {
          margin: 0;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.4;
        }

        .progress-bar {
          height: 4px;
          background: var(--secondary);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 8px;
          animation: slideIn 0.5s ease-out;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          border-radius: 2px;
          transition: width 0.5s ease;
          animation: progressGlow 2s ease-in-out infinite;
        }

        .progress-text {
          font-size: 11px;
          color: var(--muted);
          display: block;
          margin-top: 4px;
          font-weight: 500;
        }

        .unlock-timestamp {
          font-size: 10px;
          color: var(--success);
          font-weight: 500;
          margin-top: 4px;
        }

        .unlock-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          background: var(--success);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: badgeSlideIn 0.5s ease-out;
        }

        .unlock-checkmark {
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        /* Animations */
        @keyframes unlockGlow {
          0% {
            box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(76, 175, 80, 0.4);
          }
          100% {
            box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
          }
        }

        @keyframes iconBounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-1px);
          }
          75% {
            transform: translateX(1px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes progressGlow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(var(--primary-rgb), 0.3);
          }
          50% {
            box-shadow: 0 0 8px rgba(var(--primary-rgb), 0.3);
          }
        }

        @keyframes badgeSlideIn {
          from {
            opacity: 0;
            transform: scale(0) rotate(180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .achievement-card {
            padding: 10px;
            gap: 10px;
          }

          .achievement-icon {
            width: 36px;
            height: 36px;
            font-size: 20px;
          }

          .achievement-name {
            font-size: 13px;
          }

          .achievement-description {
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}