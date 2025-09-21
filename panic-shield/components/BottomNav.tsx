'use client';

import React from 'react';
import { Home, Edit3, AlertCircle, TrendingUp } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'log', label: 'Log', icon: Edit3 },
    { id: 'panic', label: 'Panic', icon: AlertCircle, danger: true },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
  ];

  // Hide bottom nav in panic mode to avoid navigation issues
  // EP-006: US-GND-002 - Ensure navigation is visible when needed
  const shouldHideNav = currentPage === 'panic';

  return (
    <div className={`bottom-nav ${shouldHideNav ? 'hidden-in-panic' : ''}`}>
      {navItems.map(({ id, label, icon: Icon, danger }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`nav-item ${currentPage === id ? 'active' : ''} ${danger ? 'danger' : ''}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}