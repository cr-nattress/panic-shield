'use client';

import React, { useMemo } from 'react';
import { EmotionData } from '@/utils/storage/secureStorage';
import { getSubEmotionById, getEmotionCore, EMOTION_CORES } from '@/utils/emotionDataEnhanced';

interface EmotionChartProps {
  logs: EmotionData[];
  type?: 'timeline' | 'distribution' | 'intensity' | 'weekly';
}

export default function EmotionChart({ logs, type = 'timeline' }: EmotionChartProps) {
  const chartData = useMemo(() => {
    if (logs.length === 0) return null;

    switch (type) {
      case 'timeline':
        return generateTimelineData(logs);
      case 'distribution':
        return generateDistributionData(logs);
      case 'intensity':
        return generateIntensityData(logs);
      case 'weekly':
        return generateWeeklyData(logs);
      default:
        return null;
    }
  }, [logs, type]);

  if (!chartData) {
    return (
      <div className="chart-empty">
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div className="emotion-chart">
      {type === 'timeline' && <TimelineChart data={chartData} />}
      {type === 'distribution' && <DistributionChart data={chartData} />}
      {type === 'intensity' && <IntensityChart data={chartData} />}
      {type === 'weekly' && <WeeklyChart data={chartData} />}

      <style jsx>{`
        .emotion-chart {
          width: 100%;
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
        }

        .chart-empty {
          text-align: center;
          padding: 32px;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}

// Timeline Chart Component
function TimelineChart({ data }: any) {
  const maxIntensity = 5;
  const points = data.slice(-7); // Show last 7 days

  // Calculate x position for points, handling single point case
  const getXPosition = (index: number) => {
    if (points.length === 1) return 150; // Center if only one point
    return (index * 300) / (points.length - 1);
  };

  return (
    <div className="timeline-chart">
      <h4>Emotion Timeline</h4>
      <div className="chart-area">
        <svg viewBox="0 0 300 150" className="chart-svg">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line
              key={i}
              x1="0"
              y1={150 - (i * 30)}
              x2="300"
              y2={150 - (i * 30)}
              stroke="var(--border)"
              strokeOpacity="0.3"
            />
          ))}

          {/* Data points and line */}
          {points.length > 1 && (
            <polyline
              points={points.map((p: any, i: number) =>
                `${getXPosition(i)},${150 - (p.intensity * 30)}`
              ).join(' ')}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
            />
          )}

          {/* Data points */}
          {points.map((point: any, i: number) => (
            <g key={i}>
              <circle
                cx={getXPosition(i)}
                cy={150 - (point.intensity * 30)}
                r="4"
                fill={point.color}
              />
              <text
                x={getXPosition(i)}
                y="145"
                fontSize="10"
                fill="var(--muted)"
                textAnchor="middle"
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <style jsx>{`
        .timeline-chart h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
        }

        .chart-area {
          width: 100%;
          height: 150px;
        }

        .chart-svg {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

// Distribution Chart Component
function DistributionChart({ data }: any) {
  const maxCount = Math.max(...data.map((d: any) => d.count));

  return (
    <div className="distribution-chart">
      <h4>Emotion Distribution</h4>
      <div className="bars">
        {data.map((item: any) => (
          <div key={item.id} className="bar-container">
            <div
              className="bar"
              style={{
                height: `${(item.count / maxCount) * 120}px`,
                backgroundColor: item.color
              }}
            >
              <span className="bar-count">{item.count}</span>
            </div>
            <span className="bar-label">{item.name}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .distribution-chart h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
        }

        .bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          height: 150px;
          gap: 8px;
        }

        .bar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          max-width: 60px;
        }

        .bar {
          width: 100%;
          border-radius: 4px 4px 0 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 4px;
          transition: all 0.3s;
        }

        .bar-count {
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .bar-label {
          font-size: 10px;
          margin-top: 4px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// Intensity Chart Component
function IntensityChart({ data }: any) {
  return (
    <div className="intensity-chart">
      <h4>Average Intensity by Emotion</h4>
      <div className="intensity-bars">
        {data.map((item: any) => (
          <div key={item.id} className="intensity-row">
            <span className="emotion-name" style={{ color: item.color }}>
              {item.name}
            </span>
            <div className="intensity-bar-bg">
              <div
                className="intensity-bar-fill"
                style={{
                  width: `${(item.avgIntensity / 5) * 100}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
            <span className="intensity-value">{item.avgIntensity.toFixed(1)}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .intensity-chart h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
        }

        .intensity-bars {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .intensity-row {
          display: grid;
          grid-template-columns: 80px 1fr 30px;
          align-items: center;
          gap: 12px;
        }

        .emotion-name {
          font-size: 12px;
          font-weight: 500;
        }

        .intensity-bar-bg {
          height: 8px;
          background: var(--secondary);
          border-radius: 4px;
          overflow: hidden;
        }

        .intensity-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .intensity-value {
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

// Weekly Chart Component
function WeeklyChart({ data }: any) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const maxLogs = Math.max(...data.map((d: any) => d.count));

  return (
    <div className="weekly-chart">
      <h4>Weekly Activity</h4>
      <div className="week-grid">
        {data.map((day: any, i: number) => (
          <div key={i} className="day-column">
            <div className="day-bars">
              {day.emotions.map((emotion: any, j: number) => (
                <div
                  key={j}
                  className="emotion-block"
                  style={{
                    backgroundColor: emotion.color,
                    height: `${(1 / day.emotions.length) * 100}%`
                  }}
                  title={`${emotion.name} (${emotion.count})`}
                />
              ))}
            </div>
            <span className="day-label">{days[day.dayOfWeek]}</span>
            <span className="day-count">{day.count}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .weekly-chart h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
        }

        .week-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .day-column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .day-bars {
          width: 100%;
          height: 80px;
          background: var(--secondary);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .emotion-block {
          width: 100%;
          transition: all 0.2s;
        }

        .emotion-block:hover {
          opacity: 0.8;
        }

        .day-label {
          font-size: 11px;
          margin-top: 4px;
          color: var(--muted);
        }

        .day-count {
          font-size: 10px;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}

// Data generation functions
function generateTimelineData(logs: EmotionData[]) {
  const sortedLogs = [...logs].sort((a, b) =>
    new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime()
  );

  return sortedLogs.slice(-7).map(log => {
    const subEmotion = getSubEmotionById(log.emotionId);
    const coreEmotion = subEmotion ?
      getEmotionCore(subEmotion.coreId) :
      getEmotionCore(log.emotionId);

    const date = new Date(log.timestamp || 0);

    return {
      intensity: log.intensity,
      color: subEmotion?.color || coreEmotion?.color || '#999',
      label: `${date.getMonth() + 1}/${date.getDate()}`
    };
  });
}

function generateDistributionData(logs: EmotionData[]) {
  const coreCounts: Record<string, number> = {};

  logs.forEach(log => {
    const subEmotion = getSubEmotionById(log.emotionId);
    const coreId = subEmotion ? subEmotion.coreId : log.emotionId;
    coreCounts[coreId] = (coreCounts[coreId] || 0) + 1;
  });

  return EMOTION_CORES.filter(core => coreCounts[core.id] > 0)
    .map(core => ({
      id: core.id,
      name: core.name,
      color: core.color,
      count: coreCounts[core.id] || 0
    }));
}

function generateIntensityData(logs: EmotionData[]) {
  const intensityByCore: Record<string, number[]> = {};

  logs.forEach(log => {
    const subEmotion = getSubEmotionById(log.emotionId);
    const coreId = subEmotion ? subEmotion.coreId : log.emotionId;

    if (!intensityByCore[coreId]) {
      intensityByCore[coreId] = [];
    }
    intensityByCore[coreId].push(log.intensity);
  });

  return EMOTION_CORES.filter(core => intensityByCore[core.id])
    .map(core => ({
      id: core.id,
      name: core.name,
      color: core.color,
      avgIntensity: intensityByCore[core.id].reduce((sum, i) => sum + i, 0) /
                   intensityByCore[core.id].length
    }));
}

function generateWeeklyData(logs: EmotionData[]) {
  const weekData: any[] = Array(7).fill(null).map((_, i) => ({
    dayOfWeek: i,
    count: 0,
    emotions: []
  }));

  const emotionsByDay: Record<number, Record<string, any>> = {};

  logs.forEach(log => {
    const date = new Date(log.timestamp || 0);
    const dayOfWeek = date.getDay();

    if (!emotionsByDay[dayOfWeek]) {
      emotionsByDay[dayOfWeek] = {};
    }

    const subEmotion = getSubEmotionById(log.emotionId);
    const coreId = subEmotion ? subEmotion.coreId : log.emotionId;
    const coreEmotion = getEmotionCore(coreId);

    if (!emotionsByDay[dayOfWeek][coreId]) {
      emotionsByDay[dayOfWeek][coreId] = {
        name: coreEmotion?.name || 'Unknown',
        color: coreEmotion?.color || '#999',
        count: 0
      };
    }

    emotionsByDay[dayOfWeek][coreId].count++;
    weekData[dayOfWeek].count++;
  });

  weekData.forEach((day, i) => {
    if (emotionsByDay[i]) {
      day.emotions = Object.values(emotionsByDay[i]);
    }
  });

  return weekData;
}