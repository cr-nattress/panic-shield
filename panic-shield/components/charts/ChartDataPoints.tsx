import React from 'react';
import { chartUtils } from '@/utils/chartCalculations';

export interface DataPoint {
  x?: number;
  y?: number;
  value?: number;
  color?: string;
  label?: string;
  id?: string;
}

export interface ChartDataPointsProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  maxValue?: number;
  type?: 'circles' | 'bars' | 'line' | 'horizontal-bars';
  showValues?: boolean;
  onPointHover?: (point: DataPoint | null, event?: React.MouseEvent) => void;
  onPointClick?: (point: DataPoint) => void;
}

/**
 * ChartDataPoints component for rendering data points, bars, lines, and interactive elements
 * Supports multiple visualization types and interaction handlers
 */
export default function ChartDataPoints({
  data,
  width = 300,
  height = 150,
  maxValue = 5,
  type = 'circles',
  showValues = false,
  onPointHover,
  onPointClick
}: ChartDataPointsProps) {
  if (!data || data.length === 0) return null;

  switch (type) {
    case 'circles':
      return (
        <CircleDataPoints
          data={data}
          width={width}
          height={height}
          maxValue={maxValue}
          showValues={showValues}
          onPointHover={onPointHover}
          onPointClick={onPointClick}
        />
      );
    case 'bars':
      return (
        <BarDataPoints
          data={data}
          width={width}
          height={height}
          maxValue={maxValue}
          showValues={showValues}
          onPointHover={onPointHover}
          onPointClick={onPointClick}
        />
      );
    case 'line':
      return (
        <LineDataPoints
          data={data}
          width={width}
          height={height}
          maxValue={maxValue}
          onPointHover={onPointHover}
          onPointClick={onPointClick}
        />
      );
    case 'horizontal-bars':
      return (
        <HorizontalBarDataPoints
          data={data}
          maxValue={maxValue}
          showValues={showValues}
          onPointHover={onPointHover}
          onPointClick={onPointClick}
        />
      );
    default:
      return null;
  }
}

/**
 * Circle data points for scatter plots and timeline charts
 */
function CircleDataPoints({
  data,
  width,
  height,
  maxValue,
  showValues,
  onPointHover,
  onPointClick
}: ChartDataPointsProps) {
  return (
    <g className="circle-data-points">
      {data.map((point, i) => {
        const x = point.x !== undefined ? point.x : chartUtils.getXPosition(i, data.length, width);
        const y = point.y !== undefined ? point.y : chartUtils.getYPosition(point.value || 0, maxValue!, height);

        return (
          <g key={point.id || i}>
            <circle
              cx={x}
              cy={y}
              r="4"
              fill={point.color || 'var(--primary)'}
              stroke="white"
              strokeWidth="2"
              style={{ cursor: onPointClick ? 'pointer' : 'default' }}
              onMouseEnter={(e) => onPointHover?.(point, e)}
              onMouseLeave={(e) => onPointHover?.(null, e)}
              onClick={() => onPointClick?.(point)}
            />
            {showValues && (
              <text
                x={x}
                y={y - 8}
                fontSize="10"
                fill="var(--foreground)"
                textAnchor="middle"
              >
                {point.value?.toFixed(1)}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

/**
 * Bar data points for distribution charts
 */
function BarDataPoints({
  data,
  width,
  height,
  maxValue,
  showValues,
  onPointHover,
  onPointClick
}: ChartDataPointsProps) {
  const barWidth = (width! / data.length) * 0.8;
  const barSpacing = width! / data.length;

  return (
    <g className="bar-data-points">
      {data.map((point, i) => {
        const x = i * barSpacing + (barSpacing - barWidth) / 2;
        const barHeight = chartUtils.getBarHeight(point.value || 0, maxValue!, height);
        const y = height! - barHeight;

        return (
          <g key={point.id || i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={point.color || 'var(--primary)'}
              rx="2"
              style={{ cursor: onPointClick ? 'pointer' : 'default' }}
              onMouseEnter={(e) => onPointHover?.(point, e)}
              onMouseLeave={(e) => onPointHover?.(null, e)}
              onClick={() => onPointClick?.(point)}
            />
            {showValues && barHeight > 20 && (
              <text
                x={x + barWidth / 2}
                y={y + 12}
                fontSize="10"
                fill="white"
                textAnchor="middle"
                fontWeight="bold"
              >
                {point.value}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

/**
 * Line data points for timeline charts with polyline
 */
function LineDataPoints({
  data,
  width,
  height,
  maxValue,
  onPointHover,
  onPointClick
}: ChartDataPointsProps) {
  if (data.length < 2) {
    // Fall back to circles for single points
    return (
      <CircleDataPoints
        data={data}
        width={width}
        height={height}
        maxValue={maxValue}
        onPointHover={onPointHover}
        onPointClick={onPointClick}
      />
    );
  }

  const points = data.map((point, i) => {
    const x = point.x !== undefined ? point.x : chartUtils.getXPosition(i, data.length, width);
    const y = point.y !== undefined ? point.y : chartUtils.getYPosition(point.value || 0, maxValue!, height);
    return { ...point, x, y };
  });

  const pathData = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <g className="line-data-points">
      {/* Line connecting points */}
      <polyline
        points={pathData}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Individual points */}
      {points.map((point, i) => (
        <circle
          key={point.id || i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill={point.color || 'var(--primary)'}
          stroke="white"
          strokeWidth="2"
          style={{ cursor: onPointClick ? 'pointer' : 'default' }}
          onMouseEnter={(e) => onPointHover?.(point, e)}
          onMouseLeave={(e) => onPointHover?.(null, e)}
          onClick={() => onPointClick?.(point)}
        />
      ))}
    </g>
  );
}

/**
 * Horizontal bar data points for intensity charts
 */
function HorizontalBarDataPoints({
  data,
  maxValue,
  showValues,
  onPointHover,
  onPointClick
}: Omit<ChartDataPointsProps, 'width' | 'height'>) {
  return (
    <div className="horizontal-bar-data-points">
      {data.map((point, i) => (
        <div key={point.id || i} className="intensity-row">
          <span
            className="emotion-name"
            style={{ color: point.color }}
          >
            {point.label || 'Unknown'}
          </span>
          <div
            className="intensity-bar-bg"
            onMouseEnter={(e) => onPointHover?.(point, e as any)}
            onMouseLeave={(e) => onPointHover?.(null, e as any)}
            onClick={() => onPointClick?.(point)}
            style={{ cursor: onPointClick ? 'pointer' : 'default' }}
          >
            <div
              className="intensity-bar-fill"
              style={{
                width: `${chartUtils.getPercentageWidth(point.value || 0, maxValue!)}%`,
                backgroundColor: point.color || 'var(--primary)'
              }}
            />
          </div>
          {showValues && (
            <span className="intensity-value">
              {(point.value || 0).toFixed(1)}
            </span>
          )}
        </div>
      ))}

      <style jsx>{`
        .horizontal-bar-data-points {
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
          transition: all 0.2s;
        }

        .intensity-bar-bg:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .intensity-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .intensity-value {
          font-size: 12px;
          font-weight: bold;
          color: var(--foreground);
        }
      `}</style>
    </div>
  );
}

/**
 * Weekly chart data points with stacked emotion blocks
 */
export function WeeklyDataPoints({
  data,
  width = 300,
  height = 80,
  onPointHover,
  onPointClick
}: ChartDataPointsProps & {
  data: Array<{
    dayOfWeek: number;
    count: number;
    emotions: Array<{ name: string; color: string; count: number }>;
  }>;
}) {
  const dayWidth = width / 7;

  return (
    <div className="weekly-data-points">
      {data.map((day, i) => (
        <div key={i} className="day-column">
          <div className="day-bars" style={{ width: dayWidth, height }}>
            {day.emotions.map((emotion, j) => (
              <div
                key={j}
                className="emotion-block"
                style={{
                  backgroundColor: emotion.color,
                  height: `${(1 / day.emotions.length) * 100}%`
                }}
                title={`${emotion.name} (${emotion.count})`}
                onMouseEnter={(e) => onPointHover?.({
                  id: `${i}-${j}`,
                  label: emotion.name,
                  value: emotion.count,
                  color: emotion.color
                }, e as any)}
                onMouseLeave={(e) => onPointHover?.(null, e as any)}
                onClick={() => onPointClick?.({
                  id: `${i}-${j}`,
                  label: emotion.name,
                  value: emotion.count,
                  color: emotion.color
                })}
              />
            ))}
          </div>
          <span className="day-count">{day.count}</span>
        </div>
      ))}

      <style jsx>{`
        .weekly-data-points {
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
          background: var(--secondary);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .emotion-block {
          width: 100%;
          transition: all 0.2s;
          cursor: pointer;
        }

        .emotion-block:hover {
          opacity: 0.8;
          transform: scale(1.02);
        }

        .day-count {
          font-size: 10px;
          color: var(--muted-foreground);
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}