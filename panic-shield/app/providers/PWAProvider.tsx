'use client';

import { useEffect, useState } from 'react';

export default function PWAProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  if (confirm('New version available! Reload to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data.type === 'SYNC_COMPLETE') {
          console.log('Data synced successfully');
        }
      });
    }

    // Handle install prompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);

      // Show install banner if user hasn't installed and has used app multiple times
      const visits = localStorage.getItem('visitCount');
      if (!visits || parseInt(visits) > 3) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    // Track app visits
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount.toString());

    // Handle online/offline
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial online status
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('App installed');
        setShowInstallBanner(false);
      }

      setInstallPrompt(null);
    }
  };

  return (
    <>
      {children}

      {/* Offline indicator */}
      {isOffline && (
        <div
          style={{
            position: 'fixed',
            bottom: 72,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fbbf24',
            color: '#000',
            padding: '8px 16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          📡 You're offline - Changes will sync when connected
        </div>
      )}

      {/* Install banner */}
      {showInstallBanner && (
        <div
          style={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px',
            zIndex: 99,
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>
              📱 Install Panic Shield
            </h3>
            <p style={{ fontSize: '14px', marginBottom: '12px', opacity: 0.9 }}>
              Get quick access from your home screen and use offline!
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleInstall}
                style={{
                  padding: '8px 20px',
                  background: 'rgba(255,255,255,0.3)',
                  border: '2px solid white',
                  borderRadius: '20px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                style={{
                  padding: '8px 20px',
                  background: 'transparent',
                  border: '2px solid rgba(255,255,255,0.5)',
                  borderRadius: '20px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}