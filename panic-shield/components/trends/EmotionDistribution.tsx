import React from 'react';
import { EMOTION_CORES } from '@/utils/emotionDataEnhanced';
import { TrendsStats } from '@/utils/trendCalculations';

interface EmotionDistributionProps {
  stats: TrendsStats;
}

export default function EmotionDistribution({ stats }: EmotionDistributionProps) {
  return (
    <div className="emotion-distribution">
      <h3>Emotion distribution</h3>
      {Object.entries(stats.coreCounts).map(([core, count]) => {
        const percentage = (count / stats.total) * 100;
        const coreEmotion = EMOTION_CORES.find(e => e.id === core);
        const avgIntensity = stats.avgIntensityByCore[core];

        return (
          <div key={core} className="distribution-row">
            <span className="distribution-label">{coreEmotion?.name || core}</span>
            <div className="distribution-bar">
              <div
                className="distribution-fill"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: coreEmotion?.color,
                  opacity: 0.4 + (avgIntensity * 0.2)
                }}
              />
            </div>
            <span className="distribution-count">{count}</span>
            <span className="distribution-intensity" title="Average intensity">
              {'•'.repeat(Math.round(avgIntensity))}
            </span>
          </div>
        );
      })}

      <style jsx>{`
        .distribution-row {
          display: grid;
          grid-template-columns: 80px 1fr 40px 30px;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .distribution-intensity {
          font-size: 14px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}