'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Settings, X, Phone } from 'lucide-react';
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
  // US-HDR-010: Add shadow on scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  return (
    <header
      className={`${styles.appHeader} ${styles[variant]} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
      aria-label="Application header"
    >
      <div className={styles.headerLeft}>
        {!hideMenu && (
          <button
            className={`${styles.menuButton} ${styles.rippleEffect}`}
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            aria-expanded="false"
            aria-controls="navigation-drawer"
          >
            <Menu size={24} strokeWidth={2} />
            <span className={styles.ripple}></span>
          </button>
        )}
      </div>

      <div className={styles.headerCenter}>
        <h1 className={styles.headerTitle} id="app-title">{title}</h1>
        {subtitle && (
          <span className={styles.headerSubtitle} aria-label={`Current page: ${subtitle}`}>
            {subtitle}
          </span>
        )}
      </div>

      <div className={styles.headerRight}>
        {variant !== 'panic' ? (
          <>
            {/* US-HDR-004: Theme toggle now in header */}
            <ThemeToggle />

            {!hideSettings && (
              <button
                className={`${styles.iconButton} ${styles.rippleEffect}`}
                onClick={onSettingsClick}
                aria-label="Open settings"
                aria-haspopup="dialog"
              >
                <Settings size={20} strokeWidth={2} className={styles.rotateOnHover} />
                <span className={styles.ripple}></span>
              </button>
            )}
          </>
        ) : (
          // US-HDR-007: Enhanced panic mode with close and emergency buttons
          <>
            <button
              className={styles.closeExerciseBtn}
              onClick={() => window.history.back()}
              aria-label="Exit panic mode"
            >
              <X size={24} />
              <span>Exit</span>
            </button>
            <a
              href="tel:988"
              className={styles.emergencyCall}
              aria-label="Call crisis hotline"
            >
              <Phone size={20} />
              <span className={styles.emergencyText}>Call 988</span>
            </a>
          </>
        )}
      </div>
    </header>
  );
}