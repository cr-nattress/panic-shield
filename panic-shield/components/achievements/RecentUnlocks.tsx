import React, { useState, useEffect } from 'react';
import { Clock, Award, Sparkles } from 'lucide-react';
import { Achievement } from '@/utils/achievementLogic';

interface RecentUnlocksProps {
  unlockedAchievements: Achievement[];
  maxRecent?: number;
  className?: string;
}

interface RecentUnlock extends Achievement {
  timeAgo: string;
  isNew: boolean;
}

export default function RecentUnlocks({
  unlockedAchievements,
  maxRecent = 5,
  className = ''
}: RecentUnlocksProps) {
  const [recentUnlocks, setRecentUnlocks] = useState<RecentUnlock[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Sort achievements by unlock date (most recent first)
    const sortedAchievements = [...unlockedAchievements]
      .filter(achievement => achievement.unlockedAt)
      .sort((a, b) => {
        const dateA = new Date(a.unlockedAt!).getTime();
        const dateB = new Date(b.unlockedAt!).getTime();
        return dateB - dateA;
      })
      .slice(0, maxRecent);

    // Calculate time ago and mark new achievements
    const now = new Date();
    const enrichedUnlocks: RecentUnlock[] = sortedAchievements.map(achievement => {
      const unlockDate = new Date(achievement.unlockedAt!);
      const timeDiff = now.getTime() - unlockDate.getTime();
      const isNew = timeDiff < 24 * 60 * 60 * 1000; // Less than 24 hours

      let timeAgo: string;
      if (timeDiff < 60 * 1000) {
        timeAgo = 'Just now';
      } else if (timeDiff < 60 * 60 * 1000) {
        const minutes = Math.floor(timeDiff / (60 * 1000));
        timeAgo = `${minutes}m ago`;
      } else if (timeDiff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(timeDiff / (60 * 60 * 1000));
        timeAgo = `${hours}h ago`;
      } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
        timeAgo = `${days}d ago`;
      } else {
        timeAgo = unlockDate.toLocaleDateString();
      }

      return {
        ...achievement,
        timeAgo,
        isNew
      };
    });

    setRecentUnlocks(enrichedUnlocks);

    // Trigger animation for new unlocks
    if (enrichedUnlocks.some(unlock => unlock.isNew)) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [unlockedAchievements, maxRecent]);

  if (recentUnlocks.length === 0) {
    return (
      <>
        <div className={`recent-unlocks empty ${className}`}>
          <div className="empty-state">
            <Award size={48} className="empty-icon" />
            <h3>No Achievements Yet</h3>
            <p>Start your journey to unlock your first achievement!</p>
          </div>
        </div>

        <style jsx>{`
          .recent-unlocks.empty {
            padding: 24px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            text-align: center;
          }

          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .empty-icon {
            color: var(--muted);
            opacity: 0.5;
          }

          .empty-state h3 {
            margin: 0;
            font-size: 16px;
            color: var(--muted);
          }

          .empty-state p {
            margin: 0;
            font-size: 14px;
            color: var(--muted);
            opacity: 0.8;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className={`recent-unlocks ${className}`}>
        <div className="recent-header">
          <div className="header-content">
            <Clock size={20} />
            <h3>Recent Unlocks</h3>
            {showAnimation && (
              <Sparkles size={16} className="sparkle-icon" />
            )}
          </div>
        </div>

        <div className="unlocks-list">
          {recentUnlocks.map((unlock, index) => (
            <div
              key={unlock.id}
              className={`unlock-item ${unlock.isNew ? 'new' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="unlock-icon">
                <span className="achievement-emoji">{unlock.icon}</span>
                {unlock.isNew && (
                  <div className="new-badge">
                    <Sparkles size={12} />
                  </div>
                )}
              </div>

              <div className="unlock-content">
                <div className="unlock-title">
                  <h4>{unlock.name}</h4>
                  {unlock.isNew && <span className="new-label">NEW!</span>}
                </div>
                <p className="unlock-description">{unlock.description}</p>
                <span className="unlock-time">{unlock.timeAgo}</span>
              </div>

              <div className="unlock-category">
                <span className="category-badge">
                  {unlock.category === 'logging' && '📝'}
                  {unlock.category === 'wellness' && '💚'}
                  {unlock.category === 'progress' && '📈'}
                  {unlock.category === 'special' && '⭐'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {unlockedAchievements.length > maxRecent && (
          <div className="show-more">
            <button className="show-more-btn">
              View All {unlockedAchievements.length} Achievements
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .recent-unlocks {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 24px;
          overflow: hidden;
          animation: slideIn 0.5s ease-out;
        }

        .recent-header {
          padding: 16px;
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .recent-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: ${showAnimation ? 'headerShimmer 1s ease-out' : 'none'};
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .header-content h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .sparkle-icon {
          animation: sparkle 1s ease-in-out infinite;
        }

        .unlocks-list {
          padding: 8px;
        }

        .unlock-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease-out;
          position: relative;
        }

        .unlock-item:hover {
          background: var(--secondary);
          transform: translateX(4px);
        }

        .unlock-item.new {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
          border: 1px solid rgba(255, 215, 0, 0.3);
          margin: 4px;
          animation: newUnlockGlow 2s ease-in-out infinite;
        }

        .unlock-icon {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--secondary);
          border-radius: 50%;
          font-size: 20px;
        }

        .unlock-item.new .unlock-icon {
          background: linear-gradient(135deg, #ffd700, #ffed4a);
          animation: iconGlow 2s ease-in-out infinite;
        }

        .achievement-emoji {
          animation: float 3s ease-in-out infinite;
        }

        .new-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          background: #ff6b6b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          animation: pulse 1s ease-in-out infinite;
        }

        .unlock-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .unlock-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .unlock-title h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: var(--foreground);
        }

        .new-label {
          background: #ff6b6b;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: bold;
          animation: bounce 1s ease-in-out infinite;
        }

        .unlock-description {
          margin: 0;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.3;
        }

        .unlock-time {
          font-size: 11px;
          color: var(--muted);
          font-weight: 500;
        }

        .unlock-category {
          display: flex;
          align-items: center;
        }

        .category-badge {
          font-size: 16px;
          padding: 4px;
          background: var(--secondary);
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .show-more {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .show-more-btn {
          background: none;
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .show-more-btn:hover {
          background: var(--primary);
          color: white;
        }

        /* Animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes headerShimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
        }

        @keyframes newUnlockGlow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(255, 215, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          }
        }

        @keyframes iconGlow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(255, 215, 0, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        /* Responsive design */
        @media (max-width: 480px) {
          .unlock-item {
            gap: 10px;
            padding: 10px;
          }

          .unlock-icon {
            width: 36px;
            height: 36px;
            font-size: 18px;
          }

          .unlock-title h4 {
            font-size: 13px;
          }

          .unlock-description {
            font-size: 11px;
          }

          .category-badge {
            width: 24px;
            height: 24px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}