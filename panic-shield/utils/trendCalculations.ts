import { getSubEmotionById, getEmotionCore, EMOTION_CORES } from '@/utils/emotionDataEnhanced';

export interface Log {
  id: string;
  emotionId: string;
  intensity: number;
  triggers?: string[];
  suggestion?: string;
  notes?: string;
  timestamp: string;
}

export interface TriggerData {
  trigger: string;
  count: number;
}

export interface PatternData {
  emotion: string;
  trigger: string;
  count: number;
}

export interface CoreCountData {
  coreId: string;
  count: number;
  avgIntensity: number;
}

export interface TrendsStats {
  total: number;
  avgIntensity: string;
  coreCounts: Record<string, number>;
  topTriggers: [string, number][];
  patterns: PatternData[];
  avgIntensityByCore: Record<string, number>;
  recentLogs: Log[];
}

/**
 * Calculate core emotion counts from logs
 */
export function calculateCoreCounts(logs: Log[]): Record<string, number> {
  const coreCounts: Record<string, number> = {};

  logs.forEach(log => {
    const subEmotion = getSubEmotionById(log.emotionId);
    const coreId = subEmotion ? subEmotion.coreId : log.emotionId;
    const coreEmotion = getEmotionCore(coreId);

    if (coreEmotion) {
      coreCounts[coreEmotion.id] = (coreCounts[coreEmotion.id] || 0) + 1;
    }
  });

  return coreCounts;
}

/**
 * Calculate trigger counts and find top triggers
 */
export function findTopTriggers(logs: Log[], limit: number = 5): [string, number][] {
  const triggerCounts: Record<string, number> = {};

  logs.forEach(log => {
    if (log.triggers) {
      log.triggers.forEach(trigger => {
        triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
      });
    }
  });

  return Object.entries(triggerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
}

/**
 * Detect emotion-trigger patterns
 */
export function detectPatterns(logs: Log[], limit: number = 3): PatternData[] {
  const emotionTriggerMap: Record<string, string[]> = {};

  logs.forEach(log => {
    const subEmotion = getSubEmotionById(log.emotionId);
    const coreId = subEmotion ? subEmotion.coreId : log.emotionId;
    const coreEmotion = getEmotionCore(coreId);

    if (coreEmotion && log.triggers) {
      log.triggers.forEach(trigger => {
        const key = `${coreEmotion.id}_${trigger}`;
        if (!emotionTriggerMap[key]) {
          emotionTriggerMap[key] = [];
        }
        emotionTriggerMap[key].push(log.id);
      });
    }
  });

  return Object.entries(emotionTriggerMap)
    .map(([key, occurrences]) => {
      const [emotion, trigger] = key.split('_');
      return { emotion, trigger, count: occurrences.length };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Calculate average intensity by core emotion
 */
export function calculateAvgIntensityByCore(logs: Log[]): Record<string, number> {
  const intensityByCore: Record<string, number[]> = {};

  logs.forEach(log => {
    const subEmotion = getSubEmotionById(log.emotionId);
    const coreId = subEmotion ? subEmotion.coreId : log.emotionId;
    const coreEmotion = getEmotionCore(coreId);

    if (coreEmotion) {
      if (!intensityByCore[coreEmotion.id]) {
        intensityByCore[coreEmotion.id] = [];
      }
      intensityByCore[coreEmotion.id].push(log.intensity);
    }
  });

  const avgIntensityByCore: Record<string, number> = {};
  Object.entries(intensityByCore).forEach(([core, intensities]) => {
    avgIntensityByCore[core] = intensities.reduce((sum, i) => sum + i, 0) / intensities.length;
  });

  return avgIntensityByCore;
}

/**
 * Calculate overall average intensity
 */
export function calculateAvgIntensity(logs: Log[]): number {
  if (logs.length === 0) return 0;
  return logs.reduce((sum, log) => sum + log.intensity, 0) / logs.length;
}

/**
 * Get recent logs (reversed for chronological order)
 */
export function getRecentLogs(logs: Log[], limit: number = 10): Log[] {
  return logs.slice(-limit).reverse();
}

/**
 * Main function to calculate all trend statistics
 */
export function calculateTrendsStats(logs: Log[]): TrendsStats | null {
  if (logs.length === 0) return null;

  const coreCounts = calculateCoreCounts(logs);
  const topTriggers = findTopTriggers(logs);
  const patterns = detectPatterns(logs);
  const avgIntensityByCore = calculateAvgIntensityByCore(logs);
  const avgIntensity = calculateAvgIntensity(logs);
  const recentLogs = getRecentLogs(logs);

  return {
    total: logs.length,
    avgIntensity: avgIntensity.toFixed(1),
    coreCounts,
    topTriggers,
    patterns,
    avgIntensityByCore,
    recentLogs
  };
}