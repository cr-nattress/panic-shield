'use client';

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { secureStorage, EmotionData } from '@/utils/storage/secureStorage';
import { calculateUserStats, checkAchievements } from '@/utils/gamification';

interface Log extends EmotionData {
  id: string;
  timestamp: string;
}

interface StoreContextType {
  logs: Log[];
  addLog: (log: Omit<Log, 'id' | 'timestamp'>) => Promise<void>;
  removeLastLog: () => Promise<void>;
  clearLogs: () => Promise<void>;
  theme: string;
  toggleTheme: () => void;
  isLoading: boolean;
  error: string | null;
  achievements: string[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);

  // Load data from secure storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Load theme from local storage (non-sensitive)
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);

        // Load achievements from local storage
        const savedAchievements = localStorage.getItem('achievements');
        if (savedAchievements) {
          setAchievements(JSON.parse(savedAchievements));
        }

        // Load emotions from secure storage
        const emotions = await secureStorage.getAllEmotions();
        const logsWithIds = emotions.map(emotion => ({
          ...emotion,
          id: emotion.id || `log_${Date.now()}`,
          timestamp: emotion.timestamp || new Date().toISOString()
        }));
        setLogs(logsWithIds);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load saved data');

        // Fallback to localStorage if secure storage fails
        try {
          const saved = localStorage.getItem('emotion-logs');
          if (saved) {
            setLogs(JSON.parse(saved));
          }
        } catch {
          // Ignore localStorage errors
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  const addLog = async (log: Omit<Log, 'id' | 'timestamp'>) => {
    try {
      const timestamp = new Date().toISOString();
      const emotionData: EmotionData = {
        ...log,
        timestamp
      };

      // Save to secure storage
      const id = await secureStorage.saveEmotion(emotionData);

      // Update local state
      const newLog: Log = {
        ...emotionData,
        id,
        timestamp
      };

      const newLogs = [...logs, newLog];
      setLogs(newLogs);

      // Check for new achievements
      const stats = calculateUserStats(newLogs);
      const newlyUnlocked = checkAchievements(stats, achievements);

      if (newlyUnlocked.length > 0) {
        const newAchievements = [...achievements, ...newlyUnlocked.map(a => a.id)];
        setAchievements(newAchievements);
        localStorage.setItem('achievements', JSON.stringify(newAchievements));

        // TODO: Show achievement notification
        console.log('New achievements unlocked!', newlyUnlocked);
      }

      // Also save to localStorage as backup (without sensitive data)
      const backupLog = {
        id,
        emotionId: log.emotionId,
        intensity: log.intensity,
        timestamp
      };

      const existingBackup = localStorage.getItem('emotion-logs-backup');
      const backupLogs = existingBackup ? JSON.parse(existingBackup) : [];
      backupLogs.push(backupLog);
      localStorage.setItem('emotion-logs-backup', JSON.stringify(backupLogs));

    } catch (err) {
      console.error('Failed to save emotion:', err);
      setError('Failed to save emotion');

      // Fallback to localStorage
      const newLog: Log = {
        ...log,
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      setLogs(prev => {
        const updated = [...prev, newLog];
        localStorage.setItem('emotion-logs', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const removeLastLog = async () => {
    try {
      if (logs.length === 0) return;

      const lastLog = logs[logs.length - 1];

      // Remove from secure storage
      await secureStorage.deleteEmotion(lastLog.id);

      // Update local state
      setLogs(prev => prev.slice(0, -1));

      // Update backup
      const backupLogs = JSON.parse(localStorage.getItem('emotion-logs-backup') || '[]');
      backupLogs.pop();
      localStorage.setItem('emotion-logs-backup', JSON.stringify(backupLogs));

    } catch (err) {
      console.error('Failed to remove log:', err);
      setError('Failed to remove log');

      // Fallback to localStorage
      setLogs(prev => {
        const updated = prev.slice(0, -1);
        localStorage.setItem('emotion-logs', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearLogs = async () => {
    try {
      // Clear from secure storage
      await secureStorage.clearAllData();

      // Clear local state
      setLogs([]);

      // Clear backups
      localStorage.removeItem('emotion-logs');
      localStorage.removeItem('emotion-logs-backup');

    } catch (err) {
      console.error('Failed to clear logs:', err);
      setError('Failed to clear logs');

      // Fallback
      setLogs([]);
      localStorage.removeItem('emotion-logs');
      localStorage.removeItem('emotion-logs-backup');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <StoreContext.Provider
      value={{
        logs,
        addLog,
        removeLastLog,
        clearLogs,
        theme,
        toggleTheme,
        isLoading,
        error,
        achievements
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};