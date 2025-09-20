import { EmotionData } from '@/utils/storage/secureStorage';
import { getSubEmotionById, getEmotionCore, EMOTION_CORES } from '@/utils/emotionDataEnhanced';

export interface TimelineDataPoint {
  intensity: number;
  color: string;
  label: string;
  date: Date;
}

export interface DistributionDataPoint {
  id: string;
  name: string;
  color: string;
  count: number;
}

export interface IntensityDataPoint {
  id: string;
  name: string;
  color: string;
  avgIntensity: number;
}

export interface WeeklyDataPoint {
  dayOfWeek: number;
  count: number;
  emotions: Array<{
    name: string;
    color: string;
    count: number;
  }>;
}

/**
 * Generate timeline data from emotion logs
 * Shows last 7 data points with intensity over time
 */
export function generateTimelineData(logs: EmotionData[]): TimelineDataPoint[] {
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
      intensity: isNaN(log.intensity) ? 0 : log.intensity, // Fix NaN issue
      color: subEmotion?.color || coreEmotion?.color || '#999',
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      date
    };
  });
}

/**
 * Generate distribution data showing count of each core emotion
 */
export function generateDistributionData(logs: EmotionData[]): DistributionDataPoint[] {
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

/**
 * Generate intensity data showing average intensity per emotion
 */
export function generateIntensityData(logs: EmotionData[]): IntensityDataPoint[] {
  const intensityByCore: Record<string, number[]> = {};

  logs.forEach(log => {
    const subEmotion = getSubEmotionById(log.emotionId);
    const coreId = subEmotion ? subEmotion.coreId : log.emotionId;

    if (!intensityByCore[coreId]) {
      intensityByCore[coreId] = [];
    }

    // Fix NaN issue by ensuring valid intensity value
    const intensity = isNaN(log.intensity) ? 0 : log.intensity;
    intensityByCore[coreId].push(intensity);
  });

  return EMOTION_CORES.filter(core => intensityByCore[core.id])
    .map(core => {
      const intensities = intensityByCore[core.id];
      const avgIntensity = intensities.reduce((sum, i) => sum + i, 0) / intensities.length;

      return {
        id: core.id,
        name: core.name,
        color: core.color,
        avgIntensity: isNaN(avgIntensity) ? 0 : avgIntensity // Fix NaN issue
      };
    });
}

/**
 * Generate weekly data showing emotions by day of week
 */
export function generateWeeklyData(logs: EmotionData[]): WeeklyDataPoint[] {
  const weekData: WeeklyDataPoint[] = Array(7).fill(null).map((_, i) => ({
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

/**
 * Chart scaling and positioning utilities
 */
export const chartUtils = {
  /**
   * Calculate X position for timeline points, handling single point case
   */
  getXPosition: (index: number, totalPoints: number, chartWidth: number = 300): number => {
    if (totalPoints === 1) return chartWidth / 2; // Center if only one point
    return (index * chartWidth) / (totalPoints - 1);
  },

  /**
   * Calculate Y position based on value and scale
   */
  getYPosition: (value: number, maxValue: number, chartHeight: number = 150): number => {
    return chartHeight - (value / maxValue) * chartHeight;
  },

  /**
   * Generate grid line positions
   */
  getGridLines: (maxValue: number, steps: number = 6): number[] => {
    return Array.from({ length: steps }, (_, i) => (i * maxValue) / (steps - 1));
  },

  /**
   * Format date for display
   */
  formatDate: (date: Date): string => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },

  /**
   * Calculate bar height for distribution charts
   */
  getBarHeight: (value: number, maxValue: number, maxHeight: number = 120): number => {
    return (value / maxValue) * maxHeight;
  },

  /**
   * Calculate percentage width for intensity bars
   */
  getPercentageWidth: (value: number, maxValue: number): number => {
    return (value / maxValue) * 100;
  }
};

/**
 * Data transformation helpers
 */
export const dataTransformers = {
  /**
   * Sort logs by timestamp
   */
  sortLogsByTime: (logs: EmotionData[]): EmotionData[] => {
    return [...logs].sort((a, b) =>
      new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime()
    );
  },

  /**
   * Get last N entries from logs
   */
  getLastEntries: (logs: EmotionData[], count: number): EmotionData[] => {
    return dataTransformers.sortLogsByTime(logs).slice(-count);
  },

  /**
   * Group logs by core emotion
   */
  groupByCore: (logs: EmotionData[]): Record<string, EmotionData[]> => {
    const grouped: Record<string, EmotionData[]> = {};

    logs.forEach(log => {
      const subEmotion = getSubEmotionById(log.emotionId);
      const coreId = subEmotion ? subEmotion.coreId : log.emotionId;

      if (!grouped[coreId]) {
        grouped[coreId] = [];
      }
      grouped[coreId].push(log);
    });

    return grouped;
  },

  /**
   * Calculate average intensity for a group of logs
   */
  calculateAverageIntensity: (logs: EmotionData[]): number => {
    if (logs.length === 0) return 0;

    const validIntensities = logs
      .map(log => log.intensity)
      .filter(intensity => !isNaN(intensity));

    if (validIntensities.length === 0) return 0;

    const sum = validIntensities.reduce((acc, intensity) => acc + intensity, 0);
    return sum / validIntensities.length;
  }
};