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
  const { logs } = useStore();

  // Calculate simple stats (will be enhanced in US-HDR-006)
  const weeklyLogs = logs.filter(log => {
    const logDate = new Date(log.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate > weekAgo;
  }).length;

  const currentStreak = 2; // Hardcoded for now, will be calculated in US-HDR-006

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
                <Flame size={16} />
                <span>{currentStreak} day streak</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className={styles.statsSection}>
            <h4 className={styles.sectionTitle}>Quick Stats</h4>
            <div className={styles.statsList}>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>📊</span>
                <span className={styles.statText}>{weeklyLogs} logs this week</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>😊</span>
                <span className={styles.statText}>Mostly positive</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statIcon}>📈</span>
                <span className={styles.statText}>Improving trend</span>
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

          {/* Emergency Contacts Section */}
          <div className={styles.emergencySection}>
            <h4 className={styles.sectionTitle}>Emergency Support</h4>
            <a
              href="tel:988"
              className={`${styles.emergencyItem} ${styles.crisis}`}
            >
              <Phone size={20} />
              <span>Crisis Hotline (988)</span>
            </a>
            <a
              href="tel:911"
              className={styles.emergencyItem}
            >
              <AlertCircle size={20} />
              <span>Emergency (911)</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}