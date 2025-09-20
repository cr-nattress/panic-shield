import React from 'react';

export interface ChartAxesProps {
  width?: number;
  height?: number;
  maxValue?: number;
  steps?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  axisColor?: string;
  gridColor?: string;
  labelColor?: string;
  labelFormatter?: (value: number) => string;
}

/**
 * ChartAxes component for rendering grid lines, axis labels, and scale indicators
 * Provides a reusable foundation for different chart types
 */
export default function ChartAxes({
  width = 300,
  height = 150,
  maxValue = 5,
  steps = 6,
  showGrid = true,
  showLabels = true,
  axisColor = 'var(--border)',
  gridColor = 'var(--border)',
  labelColor = 'var(--muted-foreground)',
  labelFormatter = (value: number) => value.toString()
}: ChartAxesProps) {
  // Generate grid line positions
  const gridLines = Array.from({ length: steps }, (_, i) => ({
    value: (i * maxValue) / (steps - 1),
    y: height - (i * height) / (steps - 1)
  }));

  return (
    <g className="chart-axes">
      {/* Horizontal grid lines */}
      {showGrid && gridLines.map((line, i) => (
        <line
          key={`grid-h-${i}`}
          x1="0"
          y1={line.y}
          x2={width}
          y2={line.y}
          stroke={gridColor}
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      ))}

      {/* Y-axis labels */}
      {showLabels && gridLines.map((line, i) => (
        <text
          key={`label-y-${i}`}
          x="-8"
          y={line.y + 3}
          fontSize="10"
          fill={labelColor}
          textAnchor="end"
          dominantBaseline="middle"
        >
          {labelFormatter(line.value)}
        </text>
      ))}

      {/* Main axes */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={height}
        stroke={axisColor}
        strokeWidth="1"
      />
      <line
        x1="0"
        y1={height}
        x2={width}
        y2={height}
        stroke={axisColor}
        strokeWidth="1"
      />
    </g>
  );
}

/**
 * Specialized axes component for timeline charts
 */
export function TimelineAxes({
  width = 300,
  height = 150,
  dates = [],
  ...props
}: ChartAxesProps & { dates?: string[] }) {
  return (
    <g className="timeline-axes">
      <ChartAxes
        width={width}
        height={height}
        {...props}
      />

      {/* X-axis date labels */}
      {dates.map((date, i) => {
        const x = dates.length === 1 ? width / 2 : (i * width) / (dates.length - 1);
        return (
          <text
            key={`date-${i}`}
            x={x}
            y={height + 15}
            fontSize="10"
            fill="var(--muted-foreground)"
            textAnchor="middle"
          >
            {date}
          </text>
        );
      })}
    </g>
  );
}

/**
 * Specialized axes component for distribution charts
 */
export function DistributionAxes({
  width = 300,
  height = 150,
  labels = [],
  ...props
}: ChartAxesProps & { labels?: string[] }) {
  const barWidth = width / Math.max(labels.length, 1);

  return (
    <g className="distribution-axes">
      <ChartAxes
        width={width}
        height={height}
        showGrid={true}
        {...props}
      />

      {/* X-axis emotion labels */}
      {labels.map((label, i) => {
        const x = (i + 0.5) * barWidth;
        return (
          <text
            key={`emotion-${i}`}
            x={x}
            y={height + 15}
            fontSize="10"
            fill="var(--muted-foreground)"
            textAnchor="middle"
          >
            {label}
          </text>
        );
      })}
    </g>
  );
}

/**
 * Specialized axes component for weekly charts
 */
export function WeeklyAxes({
  width = 300,
  height = 150,
  ...props
}: ChartAxesProps) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayWidth = width / 7;

  return (
    <g className="weekly-axes">
      <ChartAxes
        width={width}
        height={height}
        showGrid={false}
        showLabels={false}
        {...props}
      />

      {/* Day labels */}
      {days.map((day, i) => {
        const x = (i + 0.5) * dayWidth;
        return (
          <text
            key={`day-${i}`}
            x={x}
            y={height + 15}
            fontSize="10"
            fill="var(--muted-foreground)"
            textAnchor="middle"
          >
            {day}
          </text>
        );
      })}
    </g>
  );
}

/**
 * Minimal axes component for intensity charts (horizontal bar style)
 */
export function IntensityAxes({
  maxValue = 5,
  labelFormatter = (value: number) => value.toFixed(1)
}: Pick<ChartAxesProps, 'maxValue' | 'labelFormatter'>) {
  return (
    <div className="intensity-scale">
      <span className="scale-label">0</span>
      <span className="scale-label">{labelFormatter(maxValue)}</span>

      <style jsx>{`
        .intensity-scale {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          padding: 0 12px;
        }

        .scale-label {
          font-size: 10px;
          color: var(--muted-foreground);
        }
      `}</style>
    </div>
  );
}