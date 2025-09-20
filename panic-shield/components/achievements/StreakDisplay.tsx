import React from 'react';
import { Flame } from 'lucide-react';
import { StreakData } from '@/utils/achievementLogic';

interface StreakDisplayProps {
  streak: StreakData;
  streakMessage: string;
  fireIcon: string;
  className?: string;
}

export default function StreakDisplay({
  streak,
  streakMessage,
  fireIcon,
  className = ''
}: StreakDisplayProps) {
  return (
    <>
      <div className={`stat-card primary streak-display ${className}`}>
        <div className="stat-icon">
          <Flame size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Current Streak</span>
          <span className="stat-value">
            {streak.current} {streak.current === 1 ? 'day' : 'days'}
          </span>
          <span className="stat-fire animate-pulse">{fireIcon}</span>
        </div>
      </div>

      {/* Streak Message */}
      <div className="streak-message">
        <p className="streak-text">{streakMessage}</p>
        {streak.isPaused && (
          <small className="streak-paused animate-bounce">
            ⏸️ Streak paused - log today to continue!
          </small>
        )}
      </div>

      <style jsx>{`
        .stat-card {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          gap: 16px;
          align-items: center;
          transition: all 0.3s ease;
        }

        .stat-card.primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 3s ease-in-out infinite;
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
          animation: slideInUp 0.5s ease-out;
        }

        .stat-fire {
          font-size: 20px;
          margin-top: 4px;
          animation: fire-dance 2s ease-in-out infinite;
        }

        .streak-message {
          text-align: center;
          padding: 16px;
          background: var(--card);
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .streak-message:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .streak-text {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          animation: fadeInScale 0.6s ease-out;
        }

        .streak-paused {
          display: block;
          margin-top: 8px;
          color: var(--warning);
          font-weight: 500;
        }

        /* Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes fire-dance {
          0%, 100% {
            transform: rotate(-2deg) scale(1);
          }
          33% {
            transform: rotate(2deg) scale(1.05);
          }
          66% {
            transform: rotate(-1deg) scale(0.98);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .stat-value {
            font-size: 20px;
          }

          .stat-fire {
            font-size: 18px;
          }

          .streak-text {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}