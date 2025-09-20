import { useMemo } from 'react';
import { EmotionData } from '@/utils/storage/secureStorage';
import {
  generateTimelineData,
  generateDistributionData,
  generateIntensityData,
  generateWeeklyData,
  TimelineDataPoint,
  DistributionDataPoint,
  IntensityDataPoint,
  WeeklyDataPoint
} from '@/utils/chartCalculations';

export type ChartType = 'timeline' | 'distribution' | 'intensity' | 'weekly';

export interface ChartDataResult {
  data: TimelineDataPoint[] | DistributionDataPoint[] | IntensityDataPoint[] | WeeklyDataPoint[] | null;
  isLoading: boolean;
  hasData: boolean;
  maxValue: number;
}

/**
 * Custom hook for processing raw emotion log data based on chart type
 * Provides caching with useMemo and formatted data for rendering
 */
export function useChartData(logs: EmotionData[], type: ChartType): ChartDataResult {
  const chartData = useMemo(() => {
    if (!logs || logs.length === 0) return null;

    try {
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
    } catch (error) {
      console.error(`Error generating ${type} chart data:`, error);
      return null;
    }
  }, [logs, type]);

  // Calculate max value for scaling
  const maxValue = useMemo(() => {
    if (!chartData) return 0;

    switch (type) {
      case 'timeline':
        return 5; // Fixed max intensity
      case 'distribution':
        return Math.max(...(chartData as DistributionDataPoint[]).map(d => d.count));
      case 'intensity':
        return 5; // Fixed max intensity
      case 'weekly':
        return Math.max(...(chartData as WeeklyDataPoint[]).map(d => d.count));
      default:
        return 0;
    }
  }, [chartData, type]);

  return {
    data: chartData,
    isLoading: false, // Since we're processing synchronously
    hasData: chartData !== null && Array.isArray(chartData) && chartData.length > 0,
    maxValue
  };
}

/**
 * Hook specifically for timeline chart data with additional timeline-specific utilities
 */
export function useTimelineChartData(logs: EmotionData[]) {
  const result = useChartData(logs, 'timeline') as ChartDataResult & {
    data: TimelineDataPoint[] | null;
  };

  const timelineData = useMemo(() => {
    if (!result.data) return null;

    const data = result.data as TimelineDataPoint[];

    return {
      points: data.slice(-7), // Show last 7 days
      dateRange: data.length > 0 ? {
        start: data[0].date,
        end: data[data.length - 1].date
      } : null
    };
  }, [result.data]);

  return {
    ...result,
    timelineData
  };
}

/**
 * Hook specifically for distribution chart data with additional distribution-specific utilities
 */
export function useDistributionChartData(logs: EmotionData[]) {
  const result = useChartData(logs, 'distribution') as ChartDataResult & {
    data: DistributionDataPoint[] | null;
  };

  const distributionData = useMemo(() => {
    if (!result.data) return null;

    const data = result.data as DistributionDataPoint[];
    const total = data.reduce((sum, item) => sum + item.count, 0);

    return {
      items: data.sort((a, b) => b.count - a.count), // Sort by count descending
      total,
      percentages: data.map(item => ({
        ...item,
        percentage: total > 0 ? (item.count / total) * 100 : 0
      }))
    };
  }, [result.data]);

  return {
    ...result,
    distributionData
  };
}

/**
 * Hook specifically for intensity chart data with additional intensity-specific utilities
 */
export function useIntensityChartData(logs: EmotionData[]) {
  const result = useChartData(logs, 'intensity') as ChartDataResult & {
    data: IntensityDataPoint[] | null;
  };

  const intensityData = useMemo(() => {
    if (!result.data) return null;

    const data = result.data as IntensityDataPoint[];

    return {
      items: data.sort((a, b) => b.avgIntensity - a.avgIntensity), // Sort by intensity descending
      overallAverage: data.length > 0
        ? data.reduce((sum, item) => sum + item.avgIntensity, 0) / data.length
        : 0
    };
  }, [result.data]);

  return {
    ...result,
    intensityData
  };
}

/**
 * Hook specifically for weekly chart data with additional weekly-specific utilities
 */
export function useWeeklyChartData(logs: EmotionData[]) {
  const result = useChartData(logs, 'weekly') as ChartDataResult & {
    data: WeeklyDataPoint[] | null;
  };

  const weeklyData = useMemo(() => {
    if (!result.data) return null;

    const data = result.data as WeeklyDataPoint[];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return {
      days: data.map((day, index) => ({
        ...day,
        name: dayNames[index],
        hasData: day.count > 0
      })),
      totalLogs: data.reduce((sum, day) => sum + day.count, 0),
      mostActiveDay: data.reduce((max, day, index) =>
        day.count > data[max].count ? index : max, 0)
    };
  }, [result.data]);

  return {
    ...result,
    weeklyData
  };
}