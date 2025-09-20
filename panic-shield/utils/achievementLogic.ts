import { EmotionData } from './storage/secureStorage';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'logging' | 'wellness' | 'progress' | 'special';
  requirement: (stats: UserStats) => boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  isUnlocked?: boolean;
}

export interface UserStats {
  totalLogs: number;
  currentStreak: number;
  longestStreak: number;
  lastLogDate: string | null;
  emotionsLogged: Set<string>;
  triggersIdentified: Set<string>;
  panicSessionsCompleted: number;
  groundingExercisesCompleted: number;
  breathingMinutes: number;
  notesWritten: number;
  daysActive: number;
  weeklyAverage: number;
  emotionalRange: number;
}

export interface StreakData {
  current: number;
  longest: number;
  lastLogDate: string | null;
  isPaused: boolean;
  pauseReason?: string;
  fireLevel: 'none' | 'small' | 'medium' | 'large';
}

export interface LevelData {
  level: number;
  progress: number;
  nextLevel: number;
  totalXP: number;
}

export interface AchievementProgress {
  achievementId: string;
  current: number;
  max: number;
  percentage: number;
  isUnlocked: boolean;
}

// Achievement definitions
export const ACHIEVEMENT_DEFINITIONS: Achievement[] = [
  // Logging achievements
  {
    id: 'first_log',
    name: 'First Step',
    description: 'Log your first emotion',
    icon: '🌱',
    category: 'logging',
    requirement: (stats) => stats.totalLogs >= 1,
    maxProgress: 1
  },
  {
    id: 'consistent_logger',
    name: 'Consistent Logger',
    description: 'Log emotions for 7 days in a row',
    icon: '🔥',
    category: 'logging',
    requirement: (stats) => stats.currentStreak >= 7,
    maxProgress: 7
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Maintain a 30-day streak',
    icon: '💎',
    category: 'logging',
    requirement: (stats) => stats.currentStreak >= 30,
    maxProgress: 30
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Log 100 emotions',
    icon: '💯',
    category: 'logging',
    requirement: (stats) => stats.totalLogs >= 100,
    maxProgress: 100
  },

  // Wellness achievements
  {
    id: 'breath_master',
    name: 'Breath Master',
    description: 'Complete 10 breathing exercises',
    icon: '🌬️',
    category: 'wellness',
    requirement: (stats) => stats.breathingMinutes >= 30,
    maxProgress: 30
  },
  {
    id: 'grounded',
    name: 'Grounded',
    description: 'Complete 5 grounding exercises',
    icon: '🌍',
    category: 'wellness',
    requirement: (stats) => stats.groundingExercisesCompleted >= 5,
    maxProgress: 5
  },
  {
    id: 'crisis_warrior',
    name: 'Crisis Warrior',
    description: 'Successfully manage 3 panic sessions',
    icon: '🛡️',
    category: 'wellness',
    requirement: (stats) => stats.panicSessionsCompleted >= 3,
    maxProgress: 3
  },

  // Progress achievements
  {
    id: 'emotional_explorer',
    name: 'Emotional Explorer',
    description: 'Log 10 different emotions',
    icon: '🗺️',
    category: 'progress',
    requirement: (stats) => stats.emotionalRange >= 10,
    maxProgress: 10
  },
  {
    id: 'pattern_detective',
    name: 'Pattern Detective',
    description: 'Identify 5 different triggers',
    icon: '🔍',
    category: 'progress',
    requirement: (stats) => stats.triggersIdentified.size >= 5,
    maxProgress: 5
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    description: 'Add notes to 20 emotion logs',
    icon: '📝',
    category: 'progress',
    requirement: (stats) => stats.notesWritten >= 20,
    maxProgress: 20
  },

  // Special achievements
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Log emotions after midnight',
    icon: '🦉',
    category: 'special',
    requirement: (stats) => false // Checked separately
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Log emotions before 6 AM',
    icon: '🌅',
    category: 'special',
    requirement: (stats) => false // Checked separately
  },
  {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    description: 'Log every weekend for a month',
    icon: '⚔️',
    category: 'special',
    requirement: (stats) => false // Checked separately
  }
];

/**
 * Calculate streak data from logs
 */
export function calculateStreak(logs: EmotionData[]): StreakData {
  if (logs.length === 0) {
    return {
      current: 0,
      longest: 0,
      lastLogDate: null,
      isPaused: false,
      fireLevel: 'none'
    };
  }

  // Sort logs by date
  const sortedLogs = [...logs].sort((a, b) =>
    new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastLog = new Date(sortedLogs[0].timestamp || 0);
  lastLog.setHours(0, 0, 0, 0);

  const daysSinceLastLog = Math.floor((today.getTime() - lastLog.getTime()) / (1000 * 60 * 60 * 24));

  let currentStreak = 0;
  let longestStreak = 0;
  let isPaused = false;

  if (daysSinceLastLog === 0 || daysSinceLastLog === 1) {
    currentStreak = 1;

    // Count consecutive days
    let previousDate = lastLog;
    for (let i = 1; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].timestamp || 0);
      logDate.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor((previousDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dayDiff === 0) {
        continue;
      } else if (dayDiff === 1) {
        currentStreak++;
        previousDate = logDate;
      } else {
        break;
      }
    }
  } else if (daysSinceLastLog === 2) {
    isPaused = true;
    currentStreak = 1;
  }

  // Calculate longest streak
  let tempStreak = 1;
  let prevDate = new Date(sortedLogs[0].timestamp || 0);
  prevDate.setHours(0, 0, 0, 0);

  for (let i = 1; i < sortedLogs.length; i++) {
    const currDate = new Date(sortedLogs[i].timestamp || 0);
    currDate.setHours(0, 0, 0, 0);

    const dayDiff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff === 0) {
      continue;
    } else if (dayDiff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }

    prevDate = currDate;
  }

  longestStreak = Math.max(longestStreak, currentStreak, tempStreak);

  // Determine fire level
  let fireLevel: 'none' | 'small' | 'medium' | 'large' = 'none';
  if (currentStreak >= 30) fireLevel = 'large';
  else if (currentStreak >= 7) fireLevel = 'medium';
  else if (currentStreak >= 3) fireLevel = 'small';
  else if (currentStreak > 0) fireLevel = 'small';

  return {
    current: currentStreak,
    longest: longestStreak,
    lastLogDate: sortedLogs[0].timestamp || null,
    isPaused,
    fireLevel
  };
}

/**
 * Calculate user statistics from logs and sessions
 */
export function calculateUserStats(
  logs: EmotionData[],
  panicSessions: any[] = [],
  groundingSessions: any[] = []
): UserStats {
  const streak = calculateStreak(logs);
  const emotionsLogged = new Set(logs.map(log => log.emotionId));
  const triggersIdentified = new Set(logs.flatMap(log => log.triggers || []));

  // Calculate days active
  const uniqueDays = new Set(
    logs.map(log => {
      const date = new Date(log.timestamp || 0);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  );

  // Calculate weekly average
  const oldestLog = logs.reduce((oldest, log) => {
    const logDate = new Date(log.timestamp || 0);
    return logDate < oldest ? logDate : oldest;
  }, new Date());

  const weeksSinceStart = Math.max(1, Math.floor(
    (Date.now() - oldestLog.getTime()) / (1000 * 60 * 60 * 24 * 7)
  ));

  const weeklyAverage = Math.round(logs.length / weeksSinceStart);

  // Count notes
  const notesWritten = logs.filter(log => log.notes && log.notes.trim().length > 0).length;

  return {
    totalLogs: logs.length,
    currentStreak: streak.current,
    longestStreak: streak.longest,
    lastLogDate: streak.lastLogDate,
    emotionsLogged,
    triggersIdentified,
    panicSessionsCompleted: panicSessions.length,
    groundingExercisesCompleted: groundingSessions.length,
    breathingMinutes: panicSessions.reduce((total, session) => {
      const duration = session.endTime ? (session.endTime - session.startTime) / 60000 : 0;
      return total + duration;
    }, 0),
    notesWritten,
    daysActive: uniqueDays.size,
    weeklyAverage,
    emotionalRange: emotionsLogged.size
  };
}

/**
 * Calculate XP based on actions
 */
export function calculateXP(action: string): number {
  const xpValues: Record<string, number> = {
    'emotion_log': 10,
    'add_trigger': 5,
    'add_note': 5,
    'complete_breathing': 15,
    'complete_grounding': 15,
    'manage_panic': 20,
    'daily_login': 5,
    'achieve_unlock': 25
  };

  return xpValues[action] || 0;
}

/**
 * Calculate user level from total XP
 */
export function calculateLevel(totalXP: number): LevelData {
  const baseXP = 100;
  const multiplier = 1.5;

  let level = 1;
  let requiredXP = baseXP;
  let cumulativeXP = 0;

  while (totalXP >= cumulativeXP + requiredXP) {
    cumulativeXP += requiredXP;
    level++;
    requiredXP = Math.floor(baseXP * Math.pow(multiplier, level - 1));
  }

  const progress = totalXP - cumulativeXP;
  const nextLevel = requiredXP;

  return { level, progress, nextLevel, totalXP };
}

/**
 * Get achievement progress for a specific achievement
 */
export function getAchievementProgress(achievement: Achievement, stats: UserStats): AchievementProgress {
  let current = 0;
  let max = achievement.maxProgress || 1;

  switch (achievement.id) {
    case 'first_log':
      current = Math.min(stats.totalLogs, 1);
      break;
    case 'consistent_logger':
      current = Math.min(stats.currentStreak, 7);
      break;
    case 'dedicated':
      current = Math.min(stats.currentStreak, 30);
      break;
    case 'centurion':
      current = Math.min(stats.totalLogs, 100);
      break;
    case 'breath_master':
      current = Math.min(stats.breathingMinutes, 30);
      break;
    case 'grounded':
      current = Math.min(stats.groundingExercisesCompleted, 5);
      break;
    case 'crisis_warrior':
      current = Math.min(stats.panicSessionsCompleted, 3);
      break;
    case 'emotional_explorer':
      current = Math.min(stats.emotionalRange, 10);
      break;
    case 'pattern_detective':
      current = Math.min(stats.triggersIdentified.size, 5);
      break;
    case 'storyteller':
      current = Math.min(stats.notesWritten, 20);
      break;
    default:
      current = 0;
  }

  const percentage = max > 0 ? (current / max) * 100 : 0;
  const isUnlocked = achievement.requirement(stats);

  return {
    achievementId: achievement.id,
    current,
    max,
    percentage,
    isUnlocked
  };
}

/**
 * Check for newly unlocked achievements
 */
export function checkAchievements(stats: UserStats, previousAchievements: string[] = []): Achievement[] {
  const newlyUnlocked: Achievement[] = [];

  ACHIEVEMENT_DEFINITIONS.forEach(achievement => {
    if (!previousAchievements.includes(achievement.id) && achievement.requirement(stats)) {
      newlyUnlocked.push({
        ...achievement,
        unlockedAt: new Date().toISOString(),
        isUnlocked: true
      });
    }
  });

  // Check special time-based achievements
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 0 && hour < 6 && !previousAchievements.includes('early_bird')) {
    const earlyBird = ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'early_bird');
    if (earlyBird) {
      newlyUnlocked.push({
        ...earlyBird,
        unlockedAt: new Date().toISOString(),
        isUnlocked: true
      });
    }
  }

  if (hour >= 0 && hour < 4 && !previousAchievements.includes('night_owl')) {
    const nightOwl = ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'night_owl');
    if (nightOwl) {
      newlyUnlocked.push({
        ...nightOwl,
        unlockedAt: new Date().toISOString(),
        isUnlocked: true
      });
    }
  }

  return newlyUnlocked;
}

/**
 * Get motivational streak messages
 */
export function getStreakMessage(streak: number): string {
  if (streak === 0) return "Start your journey today!";
  if (streak === 1) return "Great start! Keep it up!";
  if (streak < 3) return "Building momentum!";
  if (streak < 7) return "You're on fire! 🔥";
  if (streak < 14) return "One week strong! Amazing!";
  if (streak < 30) return "Unstoppable force!";
  if (streak < 60) return "Monthly master!";
  if (streak < 100) return "Legendary dedication!";
  return "You're an inspiration! 🌟";
}

/**
 * Get fire icon based on streak level
 */
export function getFireIcon(level: string): string {
  switch (level) {
    case 'large': return '🔥🔥🔥';
    case 'medium': return '🔥🔥';
    case 'small': return '🔥';
    default: return '✨';
  }
}

/**
 * Group achievements by category
 */
export function groupAchievementsByCategory(
  achievements: Achievement[],
  unlockedIds: string[],
  stats: UserStats
): Record<string, Achievement[]> {
  const categories: Record<string, Achievement[]> = {
    logging: [],
    wellness: [],
    progress: [],
    special: []
  };

  achievements.forEach(achievement => {
    const isUnlocked = unlockedIds.includes(achievement.id);
    const progress = getAchievementProgress(achievement, stats);

    categories[achievement.category].push({
      ...achievement,
      unlockedAt: isUnlocked ? new Date().toISOString() : undefined,
      progress: progress.current,
      isUnlocked
    });
  });

  return categories;
}