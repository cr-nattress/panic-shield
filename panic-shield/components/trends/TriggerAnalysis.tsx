import React from 'react';
import { Target } from 'lucide-react';
import { TrendsStats } from '@/utils/trendCalculations';

interface TriggerAnalysisProps {
  stats: TrendsStats;
}

export default function TriggerAnalysis({ stats }: TriggerAnalysisProps) {
  if (stats.topTriggers.length === 0) {
    return null;
  }

  return (
    <div className="trigger-analysis">
      <h3>
        <Target size={16} />
        Top triggers
      </h3>
      <div className="trigger-list">
        {stats.topTriggers.map(([trigger, count]) => (
          <div key={trigger} className="trigger-item">
            <span className="trigger-name">{trigger}</span>
            <span className="trigger-count">{count} times</span>
            <div className="trigger-bar">
              <div
                className="trigger-fill"
                style={{
                  width: `${(count / stats.total) * 100}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trigger-analysis {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .trigger-analysis h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .trigger-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trigger-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .trigger-name {
          font-size: 14px;
          text-transform: capitalize;
        }

        .trigger-count {
          font-size: 12px;
          color: var(--muted);
        }

        .trigger-bar {
          grid-column: 1 / -1;
          height: 4px;
          background: var(--secondary);
          border-radius: 2px;
          overflow: hidden;
        }

        .trigger-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
}