'use client';

import React, { useEffect, useRef } from 'react';
import {
  Trophy,
  Settings,
  Bell,
  HelpCircle,
  Info,
  Phone,
  AlertCircle,
  Flame,
  X
} from 'lucide-react';
import styles from './MenuDrawer.module.css';
import { useStore } from '@/contexts/StoreContext';
import { calculateUserStats, calculateStreak, getStreakMessage } from '@/utils/gamification';
import { EMOTION_CORES, SUB_EMOTIONS } from '@/utils/emotionDataEnhanced';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
}

export default function MenuDrawer({
  isOpen,
  onClose,
  currentPage
}: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { logs, achievements } = useStore();

  // US-HDR-006: Calculate comprehensive user stats
  const userStats = calculateUserStats(logs);
  const streakData = calculateStreak(logs);

  // Calculate weekly logs
  const weeklyLogs = logs.filter(log => {
    const logDate = new Date(log.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate > weekAgo;
  }).length;

  // Calculate most frequent emotion in the past week
  const recentLogs = logs.filter(log => {
    const logDate = new Date(log.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate > weekAgo;
  });

  const emotionFrequency = new Map<string, number>();
  recentLogs.forEach(log => {
    if (log.emotionId) {
      emotionFrequency.set(log.emotionId, (emotionFrequency.get(log.emotionId) || 0) + 1);
    }
  });

  let mostFrequentEmotion = 'Balanced';
  let maxCount = 0;
  emotionFrequency.forEach((count, emotionId) => {
    if (count > maxCount) {
      maxCount = count;
      // Find emotion name from cores or sub-emotions
      const coreEmotion = EMOTION_CORES.find(e => e.id === emotionId);
      if (coreEmotion) {
        mostFrequentEmotion = coreEmotion.name;
      } else {
        const subEmotion = SUB_EMOTIONS.find(e => e.id === emotionId);
        if (subEmotion) {
          mostFrequentEmotion = subEmotion.name;
        }
      }
    }
  });

  // Calculate average intensity
  const avgIntensity = recentLogs.length > 0
    ? Math.round(recentLogs.reduce((sum, log) => sum + (log.intensity || 0), 0) / recentLogs.length)
    : 0;

  // Determine emotional trend
  const emotionalTrend = avgIntensity <= 3 ? 'Calm' : avgIntensity <= 6 ? 'Moderate' : 'Intense';

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className={styles.drawerContent}>
          {/* Close button */}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Profile Section */}
          <div className={styles.profileSection}>
            <div className={styles.avatar}>👤</div>
            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>Guest User</h3>
              <div className={styles.streak}>
                <Flame size={16} className={streakData.fireLevel !== 'none' ? styles[`fire${streakData.fireLevel}`] : ''} />
                <span>{streakData.current} day streak</span>
              </div>
              <p className={styles.streakMessage}>{getStreakMessage(streakData.current)}</p>
            </div>
          </div>

          {/* US-HDR-006: Enhanced Quick Stats Section */}
          <div className={styles.statsSection}>
            <h4 className={styles.sectionTitle}>Quick Stats</h4>
            <div className={styles.statsList}>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>📊</span>
                <div className={styles.statContent}>
                  <span className={styles.statText}>{weeklyLogs} logs this week</span>
                  <span className={styles.statSubtext}>Avg: {userStats.weeklyAverage}/week</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>🎭</span>
                <div className={styles.statContent}>
                  <span className={styles.statText}>Mostly {mostFrequentEmotion.toLowerCase()}</span>
                  <span className={styles.statSubtext}>{emotionalTrend} intensity</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>🏆</span>
                <div className={styles.statContent}>
                  <span className={styles.statText}>{achievements.length} achievements</span>
                  <span className={styles.statSubtext}>{userStats.daysActive} days active</span>
                </div>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>📝</span>
                <div className={styles.statContent}>
                  <span className={styles.statText}>{userStats.totalLogs} total logs</span>
                  <span className={styles.statSubtext}>{userStats.emotionalRange} unique emotions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className={styles.menuSection}>
            <h4 className={styles.sectionTitle}>Menu</h4>
            <button
              className={`${styles.menuItem} ${currentPage === 'achievements' ? styles.active : ''}`}
              onClick={() => {
                console.log('Navigate to achievements');
                onClose();
              }}
            >
              <Trophy size={20} />
              <span>Achievements</span>
            </button>
            <button
              className={styles.menuItem}
              onClick={() => {
                console.log('Open settings');
                onClose();
              }}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button
              className={styles.menuItem}
              onClick={() => {
                console.log('Open reminders');
                onClose();
              }}
            >
              <Bell size={20} />
              <span>Reminders</span>
            </button>
            <button
              className={styles.menuItem}
              onClick={() => {
                console.log('Open help');
                onClose();
              }}
            >
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </button>
            <button
              className={styles.menuItem}
              onClick={() => {
                console.log('Open about');
                onClose();
              }}
            >
              <Info size={20} />
              <span>About</span>
            </button>
          </nav>

          {/* US-HDR-009: Enhanced Emergency Contacts Section */}
          <div className={styles.emergencySection}>
            <h4 className={styles.sectionTitle}>Emergency Support</h4>
            <a
              href="tel:988"
              className={`${styles.emergencyItem} ${styles.crisis}`}
              aria-label="Call Crisis Hotline at 988"
            >
              <Phone size={20} />
              <div className={styles.emergencyContent}>
                <span className={styles.emergencyTitle}>Crisis Hotline</span>
                <span className={styles.emergencyNumber}>988</span>
                <span className={styles.emergencyDescription}>24/7 suicide & crisis support</span>
              </div>
            </a>
            <a
              href="tel:911"
              className={styles.emergencyItem}
              aria-label="Call Emergency Services at 911"
            >
              <AlertCircle size={20} />
              <div className={styles.emergencyContent}>
                <span className={styles.emergencyTitle}>Emergency</span>
                <span className={styles.emergencyNumber}>911</span>
                <span className={styles.emergencyDescription}>Immediate danger or medical emergency</span>
              </div>
            </a>
            <a
              href="tel:1-800-273-8255"
              className={styles.emergencyItem}
              aria-label="Call National Suicide Prevention Lifeline"
            >
              <Phone size={20} />
              <div className={styles.emergencyContent}>
                <span className={styles.emergencyTitle}>Prevention Lifeline</span>
                <span className={styles.emergencyNumber}>1-800-273-8255</span>
                <span className={styles.emergencyDescription}>Alternative crisis support line</span>
              </div>
            </a>
            <a
              href="sms:741741?body=HELLO"
              className={styles.emergencyItem}
              aria-label="Text Crisis Text Line at 741741"
            >
              <AlertCircle size={20} />
              <div className={styles.emergencyContent}>
                <span className={styles.emergencyTitle}>Crisis Text Line</span>
                <span className={styles.emergencyNumber}>Text HOME to 741741</span>
                <span className={styles.emergencyDescription}>24/7 text support</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}