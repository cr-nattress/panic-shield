import React from 'react';
import { getSubEmotionById, getEmotionCore } from '@/utils/emotionDataEnhanced';
import { TrendsStats } from '@/utils/trendCalculations';

interface RecentLogsProps {
  stats: TrendsStats;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(date));
}

function getEmotionColor(emotionId: string) {
  const subEmotion = getSubEmotionById(emotionId);
  if (subEmotion) return subEmotion.color;

  const coreEmotion = getEmotionCore(emotionId);
  return coreEmotion?.color || '#999';
}

function getEmotionName(emotionId: string) {
  const subEmotion = getSubEmotionById(emotionId);
  if (subEmotion) return subEmotion.name;

  const coreEmotion = getEmotionCore(emotionId);
  return coreEmotion?.name || 'Unknown';
}

export default function RecentLogs({ stats }: RecentLogsProps) {
  return (
    <div className="recent-logs">
      <h3>Recent logs</h3>
      {stats.recentLogs.map(log => {
        const color = getEmotionColor(log.emotionId);
        const name = getEmotionName(log.emotionId);

        return (
          <div key={log.id} className="log-item">
            <div className="log-emotion">
              <div className="log-dot" style={{ backgroundColor: color }} />
              <div>
                <strong>{name}</strong>
                <small>{formatDate(log.timestamp)}</small>
              </div>
            </div>
            <div className="log-details">
              <span className="log-intensity">{'•'.repeat(log.intensity)}</span>
              {log.triggers && log.triggers.length > 0 && (
                <small className="log-triggers">{log.triggers.join(', ')}</small>
              )}
              {log.notes && (
                <small className="log-notes" title={log.notes}>
                  📝 {log.notes.substring(0, 30)}...
                </small>
              )}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .log-intensity {
          font-size: 16px;
        }

        .log-triggers {
          display: block;
          color: var(--muted);
          font-size: 12px;
          margin-top: 2px;
          text-transform: capitalize;
        }

        .log-notes {
          display: block;
          color: var(--muted);
          font-size: 12px;
          margin-top: 2px;
          font-style: italic;
        }

        .log-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
      `}</style>
    </div>
  );
}