import React from 'react';
import { useDistributionChartData } from '@/hooks/useChartData';
import { useChartTooltip, DistributionTooltip } from '@/components/charts/ChartTooltip';
import ChartDataPoints from '@/components/charts/ChartDataPoints';
import { DistributionAxes } from '@/components/charts/ChartAxes';
import { EmotionData } from '@/utils/storage/secureStorage';

export interface DistributionChartProps {
  logs: EmotionData[];
  width?: number;
  height?: number;
  showTooltips?: boolean;
  showPercentages?: boolean;
}

/**
 * DistributionChart component showing count of each emotion type
 */
export default function DistributionChart({
  logs,
  width = 300,
  height = 150,
  showTooltips = true,
  showPercentages = false
}: DistributionChartProps) {
  const { data, hasData, maxValue, distributionData } = useDistributionChartData(logs);
  const { tooltip, showTooltip, hideTooltip } = useChartTooltip();

  if (!hasData || !data || !distributionData) {
    return (
      <div className="distribution-chart-empty">
        <p>No distribution data to display</p>
      </div>
    );
  }

  const items = distributionData.items;
  const labels = items.map(item => item.name);

  // Transform data for ChartDataPoints component
  const chartData = items.map((item, i) => ({
    id: `distribution-${item.id}`,
    value: item.count,
    color: item.color,
    label: item.name
  }));

  const handlePointHover = (point: any, event?: React.MouseEvent) => {
    if (!showTooltips || !event) return;

    if (point) {
      const originalItem = items.find(item => `distribution-${item.id}` === point.id);
      if (originalItem) {
        const percentage = distributionData.total > 0
          ? (originalItem.count / distributionData.total) * 100
          : 0;

        showTooltip({
          title: originalItem.name,
          value: originalItem.count,
          color: originalItem.color,
          additionalInfo: [
            {
              label: 'Percentage',
              value: `${percentage.toFixed(1)}%`
            },
            {
              label: 'Total',
              value: distributionData.total
            }
          ]
        }, event);
      }
    } else {
      hideTooltip();
    }
  };

  return (
    <div className="distribution-chart">
      <h4>Emotion Distribution</h4>
      <div className="chart-container">
        <svg viewBox={`0 0 ${width} ${height + 20}`} className="chart-svg">
          <DistributionAxes
            width={width}
            height={height}
            maxValue={maxValue}
            labels={labels}
            labelFormatter={(value) => value.toString()}
          />

          <ChartDataPoints
            data={chartData}
            width={width}
            height={height}
            maxValue={maxValue}
            type="bars"
            showValues={true}
            onPointHover={handlePointHover}
          />
        </svg>
      </div>

      {showPercentages && (
        <div className="distribution-summary">
          <div className="percentage-list">
            {distributionData.percentages.map((item) => (
              <div key={item.id} className="percentage-item">
                <div
                  className="color-indicator"
                  style={{ backgroundColor: item.color }}
                />
                <span className="emotion-name">{item.name}</span>
                <span className="percentage">{item.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showTooltips && (
        <DistributionTooltip
          data={tooltip.data}
          position={tooltip.position}
          visible={tooltip.visible}
        />
      )}

      <style jsx>{`
        .distribution-chart {
          width: 100%;
        }

        .distribution-chart h4 {
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

        .distribution-summary {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .percentage-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .percentage-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .color-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .emotion-name {
          flex: 1;
          color: var(--foreground);
        }

        .percentage {
          font-weight: 600;
          color: var(--muted-foreground);
        }

        .distribution-chart-empty {
          text-align: center;
          padding: 32px;
          color: var(--muted-foreground);
        }
      `}</style>
    </div>
  );
}