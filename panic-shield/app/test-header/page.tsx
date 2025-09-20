'use client';

import { useState } from 'react';
import AppHeader from '@/components/header/AppHeader';
import MenuDrawer from '@/components/header/MenuDrawer';

export default function TestHeaderPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [variant, setVariant] = useState<'default' | 'minimal' | 'panic'>('default');

  return (
    <div className="app">
      <AppHeader
        subtitle="Test Page"
        variant={variant}
        onMenuClick={() => setMenuOpen(true)}
      />

      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPage="test"
      />

      <main className="app-content" style={{ padding: '20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2>Header Test Page</h2>
          <p>This page tests the AppHeader and MenuDrawer components.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3>Test Variants</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => setVariant('default')}
              style={{
                padding: '10px 20px',
                background: variant === 'default' ? '#3b82f6' : '#e5e7eb',
                color: variant === 'default' ? 'white' : 'black',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Default
            </button>
            <button
              onClick={() => setVariant('minimal')}
              style={{
                padding: '10px 20px',
                background: variant === 'minimal' ? '#3b82f6' : '#e5e7eb',
                color: variant === 'minimal' ? 'white' : 'black',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Minimal
            </button>
            <button
              onClick={() => setVariant('panic')}
              style={{
                padding: '10px 20px',
                background: variant === 'panic' ? '#ef4444' : '#e5e7eb',
                color: variant === 'panic' ? 'white' : 'black',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Panic
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3>Test Actions</h3>
          <ul>
            <li>Click the menu button (hamburger icon) to open the drawer</li>
            <li>Click the overlay or press Escape to close the drawer</li>
            <li>Try switching between variants above</li>
            <li>In panic mode, see the emergency call button</li>
          </ul>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3>Long Content for Scroll Test</h3>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ marginBottom: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              This is paragraph {i + 1} of 20.
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}