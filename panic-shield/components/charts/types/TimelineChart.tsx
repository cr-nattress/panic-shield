import React from 'react';
import { useTimelineChartData } from '@/hooks/useChartData';
import { useChartTooltip, TimelineTooltip } from '@/components/charts/ChartTooltip';
import ChartDataPoints from '@/components/charts/ChartDataPoints';
import { TimelineAxes } from '@/components/charts/ChartAxes';
import { EmotionData } from '@/utils/storage/secureStorage';
import { chartUtils } from '@/utils/chartCalculations';

export interface TimelineChartProps {
  logs: EmotionData[];
  width?: number;
  height?: number;
  showTooltips?: boolean;
}

/**
 * TimelineChart component showing emotion intensity over time
 */
export default function TimelineChart({
  logs,
  width = 300,
  height = 150,
  showTooltips = true
}: TimelineChartProps) {
  const { data, hasData, timelineData } = useTimelineChartData(logs);
  const { tooltip, showTooltip, hideTooltip } = useChartTooltip();

  if (!hasData || !data || !timelineData) {
    return (
      <div className="timeline-chart-empty">
        <p>No timeline data to display</p>
      </div>
    );
  }

  const points = timelineData.points;
  const dates = points.map(p => p.label);

  // Transform data for ChartDataPoints component
  const chartData = points.map((point, i) => ({
    id: `timeline-${i}`,
    x: chartUtils.getXPosition(i, points.length, width),
    y: chartUtils.getYPosition(point.intensity, 5, height),
    value: point.intensity,
    color: point.color,
    label: point.label
  }));

  const handlePointHover = (point: any, event?: React.MouseEvent) => {
    if (!showTooltips || !event) return;

    if (point) {
      const originalPoint = points.find((_, i) => `timeline-${i}` === point.id);
      if (originalPoint) {
        showTooltip({
          title: originalPoint.label,
          value: originalPoint.intensity,
          color: originalPoint.color,
          additionalInfo: [
            {
              label: 'Date',
              value: originalPoint.date.toLocaleDateString()
            }
          ]
        }, event);
      }
    } else {
      hideTooltip();
    }
  };

  return (
    <div className="timeline-chart">
      <h4>Emotion Timeline</h4>
      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height + 20}`} className="chart-svg">
          <TimelineAxes
            width={width}
            height={height}
            maxValue={5}
            dates={dates}
            labelFormatter={(value) => value.toString()}
          />

          <ChartDataPoints
            data={chartData}
            width={width}
            height={height}
            maxValue={5}
            type={points.length > 1 ? 'line' : 'circles'}
            onPointHover={handlePointHover}
          />
        </svg>
      </div>

      {showTooltips && (
        <TimelineTooltip
          data={tooltip.data}
          position={tooltip.position}
          visible={tooltip.visible}
        />
      )}

      <style jsx>{`
        .timeline-chart {
          width: 100%;
        }

        .timeline-chart h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          color: var(--foreground);
        }

        .chart-container {
          width: 100%;
          height: ${height + 20}px;
        }

        .chart-svg {
          width: 100%;
          height: 100%;
        }

        .timeline-chart-empty {
          text-align: center;
          padding: 32px;
          color: var(--muted-foreground);
        }
      `}</style>
    </div>
  );
}