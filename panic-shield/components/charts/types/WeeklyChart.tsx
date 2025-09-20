import React from 'react';
import { useWeeklyChartData } from '@/hooks/useChartData';
import { useChartTooltip, WeeklyTooltip } from '@/components/charts/ChartTooltip';
import { WeeklyDataPoints } from '@/components/charts/ChartDataPoints';
import { WeeklyAxes } from '@/components/charts/ChartAxes';
import { EmotionData } from '@/utils/storage/secureStorage';

export interface WeeklyChartProps {
  logs: EmotionData[];
  width?: number;
  height?: number;
  showTooltips?: boolean;
  showSummary?: boolean;
}

/**
 * WeeklyChart component showing emotions by day of the week
 */
export default function WeeklyChart({
  logs,
  width = 300,
  height = 80,
  showTooltips = true,
  showSummary = true
}: WeeklyChartProps) {
  const { data, hasData, weeklyData } = useWeeklyChartData(logs);
  const { tooltip, showTooltip, hideTooltip } = useChartTooltip();

  if (!hasData || !data || !weeklyData) {
    return (
      <div className="weekly-chart-empty">
        <p>No weekly data to display</p>
      </div>
    );
  }

  const days = weeklyData.days;
  const mostActiveDayName = days[weeklyData.mostActiveDay]?.name || 'None';

  const handlePointHover = (point: any, event?: React.MouseEvent) => {
    if (!showTooltips || !event) return;

    if (point) {
      const dayIndex = parseInt(point.id.split('-')[0]);
      const emotionIndex = parseInt(point.id.split('-')[1]);
      const day = days[dayIndex];

      if (day && day.emotions[emotionIndex]) {
        const emotion = day.emotions[emotionIndex];
        showTooltip({
          title: emotion.name,
          value: emotion.count,
          color: emotion.color,
          additionalInfo: [
            {
              label: 'Day',
              value: day.name
            },
            {
              label: 'Total for day',
              value: day.count
            }
          ]
        }, event);
      }
    } else {
      hideTooltip();
    }
  };

  return (
    <div className="weekly-chart">
      <h4>Weekly Activity</h4>

      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height + 30}`} className="chart-svg">
          <WeeklyAxes
            width={width}
            height={height}
          />
        </svg>

        <div className="weekly-bars-container">
          <WeeklyDataPoints
            data={days}
            width={width}
            height={height}
            onPointHover={handlePointHover}
          />
        </div>
      </div>

      {showSummary && (
        <div className="weekly-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total Logs:</span>
              <span className="stat-value">{weeklyData.totalLogs}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Most Active Day:</span>
              <span className="stat-value">{mostActiveDayName}</span>
            </div>
          </div>

          <div className="day-breakdown">
            {days.filter(day => day.hasData).map((day, i) => (
              <div key={i} className="day-summary">
                <div className="day-header">
                  <span className="day-name">{day.name}</span>
                  <span className="day-total">{day.count}</span>
                </div>
                {day.emotions.length > 0 && (
                  <div className="emotion-pills">
                    {day.emotions.map((emotion, j) => (
                      <div
                        key={j}
                        className="emotion-pill"
                        style={{ backgroundColor: emotion.color }}
                      >
                        {emotion.name} ({emotion.count})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showTooltips && (
        <WeeklyTooltip
          data={tooltip.data}
          position={tooltip.position}
          visible={tooltip.visible}
        />
      )}

      <style jsx>{`
        .weekly-chart {
          width: 100%;
        }

        .weekly-chart h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          color: var(--foreground);
        }

        .chart-container {
          position: relative;
          width: 100%;
          height: ${height + 30}px;
          margin-bottom: 16px;
        }

        .chart-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .weekly-bars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }

        .weekly-summary {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .summary-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: var(--muted);
          border-radius: 6px;
          font-size: 12px;
        }

        .stat-label {
          color: var(--muted-foreground);
        }

        .stat-value {
          font-weight: 600;
          color: var(--foreground);
        }

        .day-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .day-summary {
          padding: 8px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 6px;
        }

        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .day-name {
          font-weight: 500;
          font-size: 13px;
          color: var(--foreground);
        }

        .day-total {
          font-size: 12px;
          color: var(--muted-foreground);
          background: var(--muted);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .emotion-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .emotion-pill {
          font-size: 10px;
          color: white;
          padding: 2px 6px;
          border-radius: 12px;
          white-space: nowrap;
        }

        .weekly-chart-empty {
          text-align: center;
          padding: 32px;
          color: var(--muted-foreground);
        }
      `}</style>
    </div>
  );
}