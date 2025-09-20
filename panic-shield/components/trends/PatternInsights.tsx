import React from 'react';
import { Brain, AlertTriangle } from 'lucide-react';
import { EMOTION_CORES } from '@/utils/emotionDataEnhanced';
import { TrendsStats } from '@/utils/trendCalculations';

interface PatternInsightsProps {
  stats: TrendsStats;
}

export default function PatternInsights({ stats }: PatternInsightsProps) {
  if (stats.patterns.length === 0) {
    return null;
  }

  return (
    <div className="pattern-insights">
      <h3>
        <Brain size={16} />
        Patterns detected
      </h3>
      {stats.patterns.map((pattern, index) => {
        const coreEmotion = EMOTION_CORES.find(e => e.id === pattern.emotion);
        return (
          <div key={index} className="pattern-card" style={{ borderColor: coreEmotion?.color }}>
            <AlertTriangle size={14} style={{ color: coreEmotion?.color }} />
            <p>
              You often feel <strong style={{ color: coreEmotion?.color }}>{coreEmotion?.name.toLowerCase()}</strong> when
              dealing with <strong>{pattern.trigger}</strong> ({pattern.count} times)
            </p>
          </div>
        );
      })}

      <style jsx>{`
        .pattern-insights {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .pattern-insights h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .pattern-card {
          padding: 12px;
          background: var(--secondary);
          border-left: 3px solid;
          border-radius: 4px;
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .pattern-card p {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  );
}