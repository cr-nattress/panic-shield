import React from 'react';
import { useIntensityChartData } from '@/hooks/useChartData';
import { useChartTooltip, IntensityTooltip } from '@/components/charts/ChartTooltip';
import ChartDataPoints from '@/components/charts/ChartDataPoints';
import { IntensityAxes } from '@/components/charts/ChartAxes';
import { EmotionData } from '@/utils/storage/secureStorage';

export interface IntensityChartProps {
  logs: EmotionData[];
  showTooltips?: boolean;
  showOverallAverage?: boolean;
}

/**
 * IntensityChart component showing average intensity by emotion type
 */
export default function IntensityChart({
  logs,
  showTooltips = true,
  showOverallAverage = true
}: IntensityChartProps) {
  const { data, hasData, intensityData } = useIntensityChartData(logs);
  const { tooltip, showTooltip, hideTooltip } = useChartTooltip();

  if (!hasData || !data || !intensityData) {
    return (
      <div className="intensity-chart-empty">
        <p>No intensity data to display</p>
      </div>
    );
  }

  const items = intensityData.items;

  // Transform data for ChartDataPoints component
  const chartData = items.map((item) => ({
    id: `intensity-${item.id}`,
    value: item.avgIntensity,
    color: item.color,
    label: item.name
  }));

  const handlePointHover = (point: any, event?: React.MouseEvent) => {
    if (!showTooltips || !event) return;

    if (point) {
      const originalItem = items.find(item => `intensity-${item.id}` === point.id);
      if (originalItem) {
        showTooltip({
          title: originalItem.name,
          value: originalItem.avgIntensity,
          color: originalItem.color,
          additionalInfo: [
            {
              label: 'Overall Average',
              value: intensityData.overallAverage.toFixed(1)
            }
          ]
        }, event);
      }
    } else {
      hideTooltip();
    }
  };

  return (
    <div className="intensity-chart">
      <h4>Average Intensity by Emotion</h4>

      <div className="intensity-bars">
        <ChartDataPoints
          data={chartData}
          maxValue={5}
          type="horizontal-bars"
          showValues={true}
          onPointHover={handlePointHover}
        />
      </div>

      <IntensityAxes maxValue={5} />

      {showOverallAverage && (
        <div className="overall-average">
          <span className="average-label">Overall Average:</span>
          <span className="average-value">
            {intensityData.overallAverage.toFixed(1)}
          </span>
        </div>
      )}

      {showTooltips && (
        <IntensityTooltip
          data={tooltip.data}
          position={tooltip.position}
          visible={tooltip.visible}
        />
      )}

      <style jsx>{`
        .intensity-chart {
          width: 100%;
        }

        .intensity-chart h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          color: var(--foreground);
        }

        .intensity-bars {
          margin-bottom: 8px;
        }

        .overall-average {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          padding: 8px 12px;
          background: var(--muted);
          border-radius: 6px;
          font-size: 13px;
        }

        .average-label {
          color: var(--muted-foreground);
        }

        .average-value {
          font-weight: 600;
          color: var(--foreground);
        }

        .intensity-chart-empty {
          text-align: center;
          padding: 32px;
          color: var(--muted-foreground);
        }
      `}</style>
    </div>
  );
}