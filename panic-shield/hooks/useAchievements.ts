import { useMemo, useCallback } from 'react';
import { useStore } from '@/contexts/StoreContext';
import {
  ACHIEVEMENT_DEFINITIONS,
  Achievement,
  UserStats,
  StreakData,
  LevelData,
  AchievementProgress,
  calculateUserStats,
  calculateStreak,
  calculateLevel,
  getAchievementProgress,
  checkAchievements,
  getStreakMessage,
  getFireIcon,
  groupAchievementsByCategory
} from '@/utils/achievementLogic';

export interface UseAchievementsReturn {
  // Core data
  stats: UserStats;
  streak: StreakData;
  level: LevelData;

  // Achievement data
  achievements: Achievement[];
  achievementsByCategory: Record<string, Achievement[]>;
  unlockedAchievements: Achievement[];
  lockedAchievements: Achievement[];

  // Progress tracking
  getProgress: (achievementId: string) => AchievementProgress;
  progressByCategory: Record<string, AchievementProgress[]>;

  // Summary stats
  totalAchievements: number;
  unlockedCount: number;
  completionPercentage: number;

  // Utility functions
  isAchievementUnlocked: (achievementId: string) => boolean;
  getStreakMessage: () => string;
  getFireIcon: () => string;

  // Actions
  checkForNewUnlocks: () => Achievement[];
  refreshAchievements: () => void;
}

/**
 * Custom hook for managing achievement state and operations
 */
export function useAchievements(): UseAchievementsReturn {
  const { logs, achievements: unlockedAchievementIds = [] } = useStore();

  // Calculate base stats
  const stats = useMemo(() => {
    return calculateUserStats(logs);
  }, [logs]);

  // Calculate streak data
  const streak = useMemo(() => {
    return calculateStreak(logs);
  }, [logs]);

  // Calculate level data
  const level = useMemo(() => {
    // Calculate total XP (simplified calculation)
    const totalXP = logs.length * 10 + unlockedAchievementIds.length * 25;
    return calculateLevel(totalXP);
  }, [logs, unlockedAchievementIds]);

  // Process achievements with unlock status
  const achievements = useMemo(() => {
    return ACHIEVEMENT_DEFINITIONS.map(achievement => ({
      ...achievement,
      isUnlocked: unlockedAchievementIds.includes(achievement.id),
      unlockedAt: unlockedAchievementIds.includes(achievement.id)
        ? new Date().toISOString()
        : undefined,
      progress: getAchievementProgress(achievement, stats).current
    }));
  }, [stats, unlockedAchievementIds]);

  // Group achievements by category
  const achievementsByCategory = useMemo(() => {
    return groupAchievementsByCategory(ACHIEVEMENT_DEFINITIONS, unlockedAchievementIds, stats);
  }, [stats, unlockedAchievementIds]);

  // Separate unlocked and locked achievements
  const unlockedAchievements = useMemo(() => {
    return achievements.filter(achievement => achievement.isUnlocked);
  }, [achievements]);

  const lockedAchievements = useMemo(() => {
    return achievements.filter(achievement => !achievement.isUnlocked);
  }, [achievements]);

  // Progress tracking
  const getProgress = useCallback((achievementId: string): AchievementProgress => {
    const achievement = ACHIEVEMENT_DEFINITIONS.find(a => a.id === achievementId);
    if (!achievement) {
      return {
        achievementId,
        current: 0,
        max: 1,
        percentage: 0,
        isUnlocked: false
      };
    }
    return getAchievementProgress(achievement, stats);
  }, [stats]);

  const progressByCategory = useMemo(() => {
    const categories: Record<string, AchievementProgress[]> = {
      logging: [],
      wellness: [],
      progress: [],
      special: []
    };

    ACHIEVEMENT_DEFINITIONS.forEach(achievement => {
      const progress = getAchievementProgress(achievement, stats);
      categories[achievement.category].push(progress);
    });

    return categories;
  }, [stats]);

  // Summary statistics
  const totalAchievements = ACHIEVEMENT_DEFINITIONS.length;
  const unlockedCount = unlockedAchievementIds.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  // Utility functions
  const isAchievementUnlocked = useCallback((achievementId: string): boolean => {
    return unlockedAchievementIds.includes(achievementId);
  }, [unlockedAchievementIds]);

  const getStreakMessageMemo = useCallback(() => {
    return getStreakMessage(streak.current);
  }, [streak.current]);

  const getFireIconMemo = useCallback(() => {
    return getFireIcon(streak.fireLevel);
  }, [streak.fireLevel]);

  // Check for newly unlocked achievements
  const checkForNewUnlocks = useCallback((): Achievement[] => {
    return checkAchievements(stats, unlockedAchievementIds);
  }, [stats, unlockedAchievementIds]);

  // Refresh achievements (trigger recalculation)
  const refreshAchievements = useCallback(() => {
    // This function can be used to trigger re-evaluation
    // In a real implementation, this might call the store to refresh data
    console.log('Refreshing achievements...');
  }, []);

  return {
    // Core data
    stats,
    streak,
    level,

    // Achievement data
    achievements,
    achievementsByCategory,
    unlockedAchievements,
    lockedAchievements,

    // Progress tracking
    getProgress,
    progressByCategory,

    // Summary stats
    totalAchievements,
    unlockedCount,
    completionPercentage,

    // Utility functions
    isAchievementUnlocked,
    getStreakMessage: getStreakMessageMemo,
    getFireIcon: getFireIconMemo,

    // Actions
    checkForNewUnlocks,
    refreshAchievements
  };
}

export default useAchievements;