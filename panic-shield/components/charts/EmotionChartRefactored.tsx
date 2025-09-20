'use client';

import React from 'react';
import { EmotionData } from '@/utils/storage/secureStorage';
import TimelineChart from './types/TimelineChart';
import DistributionChart from './types/DistributionChart';
import IntensityChart from './types/IntensityChart';
import WeeklyChart from './types/WeeklyChart';

export interface EmotionChartRefactoredProps {
  logs: EmotionData[];
  type?: 'timeline' | 'distribution' | 'intensity' | 'weekly';
  showTooltips?: boolean;
  showSummary?: boolean;
  className?: string;
}

/**
 * Refactored EmotionChart component following US-NEXT-005 requirements
 *
 * This component is now under 250 LOC and delegates responsibility to:
 * - utils/chartCalculations.ts for data processing
 * - hooks/useChartData.ts for state management and caching
 * - Individual chart type components for rendering
 * - Shared components for axes, data points, and tooltips
 *
 * Maintains all existing functionality including the NaN fix
 */
export default function EmotionChartRefactored({
  logs,
  type = 'timeline',
  showTooltips = true,
  showSummary = true,
  className = ''
}: EmotionChartRefactoredProps) {
  // Early return for empty data
  if (!logs || logs.length === 0) {
    return (
      <div className={`emotion-chart-refactored empty ${className}`}>
        <div className="chart-empty">
          <p>No data to display</p>
        </div>

        <style jsx>{`
          .emotion-chart-refactored {
            width: 100%;
            padding: 16px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
          }

          .chart-empty {
            text-align: center;
            padding: 32px;
            color: var(--muted-foreground);
          }

          .chart-empty p {
            margin: 0;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  // Render appropriate chart type
  const renderChart = () => {
    switch (type) {
      case 'timeline':
        return (
          <TimelineChart
            logs={logs}
            showTooltips={showTooltips}
          />
        );

      case 'distribution':
        return (
          <DistributionChart
            logs={logs}
            showTooltips={showTooltips}
            showPercentages={showSummary}
          />
        );

      case 'intensity':
        return (
          <IntensityChart
            logs={logs}
            showTooltips={showTooltips}
            showOverallAverage={showSummary}
          />
        );

      case 'weekly':
        return (
          <WeeklyChart
            logs={logs}
            showTooltips={showTooltips}
            showSummary={showSummary}
          />
        );

      default:
        return (
          <div className="chart-error">
            <p>Unknown chart type: {type}</p>
          </div>
        );
    }
  };

  return (
    <div className={`emotion-chart-refactored ${type} ${className}`}>
      {renderChart()}

      <style jsx>{`
        .emotion-chart-refactored {
          width: 100%;
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }

        .emotion-chart-refactored:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .chart-error {
          text-align: center;
          padding: 32px;
          color: var(--destructive);
        }

        .chart-error p {
          margin: 0;
          font-size: 14px;
        }

        /* Chart type specific styles */
        .emotion-chart-refactored.timeline {
          min-height: 200px;
        }

        .emotion-chart-refactored.distribution {
          min-height: 220px;
        }

        .emotion-chart-refactored.intensity {
          min-height: 180px;
        }

        .emotion-chart-refactored.weekly {
          min-height: 250px;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .emotion-chart-refactored {
            padding: 12px;
            border-radius: 8px;
          }
        }

        @media (max-width: 480px) {
          .emotion-chart-refactored {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Export individual chart types for direct usage
 */
export {
  TimelineChart,
  DistributionChart,
  IntensityChart,
  WeeklyChart
};

/**
 * Export hook for accessing chart data
 */
export { useChartData } from '@/hooks/useChartData';

/**
 * Export utilities for custom chart implementations
 */
export { chartUtils } from '@/utils/chartCalculations';