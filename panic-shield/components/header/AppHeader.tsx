'use client';

import React from 'react';
import { Menu, Settings } from 'lucide-react';
import styles from './AppHeader.module.css';
import ThemeToggle from '@/components/ThemeToggle';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'minimal' | 'panic';
  onMenuClick?: () => void;
  onSettingsClick?: () => void;
  hideMenu?: boolean;
  hideSettings?: boolean;
}

export default function AppHeader({
  title = 'Emotion Tracker',
  subtitle,
  variant = 'default',
  onMenuClick,
  onSettingsClick,
  hideMenu = false,
  hideSettings = false
}: AppHeaderProps) {
  return (
    <header className={`${styles.appHeader} ${styles[variant]}`}>
      <div className={styles.headerLeft}>
        {!hideMenu && (
          <button
            className={styles.menuButton}
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className={styles.headerCenter}>
        <h1 className={styles.headerTitle}>{title}</h1>
        {subtitle && (
          <span className={styles.headerSubtitle}>{subtitle}</span>
        )}
      </div>

      <div className={styles.headerRight}>
        {variant !== 'panic' ? (
          <>
            {/* US-HDR-004: Theme toggle now in header */}
            <ThemeToggle />

            {!hideSettings && (
              <button
                className={styles.iconButton}
                onClick={onSettingsClick}
                aria-label="Open settings"
              >
                <Settings size={20} strokeWidth={2} />
              </button>
            )}
          </>
        ) : (
          // Panic mode - show emergency call button
          <a
            href="tel:988"
            className={styles.emergencyCall}
            aria-label="Call crisis hotline"
          >
            <span className={styles.emergencyText}>Call 988</span>
          </a>
        )}
      </div>
    </header>
  );
}