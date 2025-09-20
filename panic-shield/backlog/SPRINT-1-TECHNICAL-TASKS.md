# Sprint 1: Technical Implementation Tasks

## Week 1: Enhanced Panic Mode & Data Security

### Day 1-2: Panic Mode Enhancements
```typescript
// Tasks for components/PanicPage.tsx
```
- [ ] Add shake-to-activate using device motion API
- [ ] Improve breathing circle animation with smoother transitions
- [ ] Add audio cues for breathing phases
- [ ] Implement haptic feedback patterns
- [ ] Add "Too Fast/Too Slow" adjustment buttons
- [ ] Create panic session logging

### Day 3-4: Secure Data Layer
```typescript
// New file: utils/storage/secureStorage.ts
```
- [ ] Implement IndexedDB wrapper
- [ ] Add AES-256 encryption for sensitive data
- [ ] Create key derivation from biometrics/PIN
- [ ] Implement data compression
- [ ] Add offline queue for future sync
- [ ] Create backup/export functionality

### Day 5: Grounding Exercises
```typescript
// New component: components/GroundingExercises.tsx
```
- [ ] Implement 5-4-3-2-1 sensory technique
- [ ] Add progressive muscle relaxation
- [ ] Create body scan meditation
- [ ] Add bilateral stimulation exercise
- [ ] Implement exercise completion tracking

## Week 2: Emergency Features & Performance

### Day 6-7: Emergency Contacts
```typescript
// New component: components/EmergencyContacts.tsx
```
- [ ] Create contact management UI
- [ ] Add encrypted contact storage
- [ ] Integrate crisis hotline database
- [ ] Implement geo-location for local resources
- [ ] Add one-tap emergency dialing
- [ ] Create pre-composed emergency messages

### Day 8-9: Performance Optimization
- [ ] Implement code splitting for faster initial load
- [ ] Add service worker for offline functionality
- [ ] Optimize image and asset loading
- [ ] Implement lazy loading for non-critical features
- [ ] Add performance monitoring
- [ ] Create loading state optimizations

### Day 10: Integration & Testing
- [ ] Integration testing for panic mode
- [ ] Security testing for data encryption
- [ ] Performance benchmarking
- [ ] Accessibility testing
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness verification

## Implementation Code Examples

### 1. Shake Detection for Panic Mode
```typescript
// utils/shakeDetection.ts
export class ShakeDetector {
  private threshold = 15;
  private timeout = 1000;
  private lastTime = 0;
  private lastX = 0;
  private lastY = 0;
  private lastZ = 0;

  constructor(private onShake: () => void) {}

  start() {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.handleMotion);
    }
  }

  private handleMotion = (event: DeviceMotionEvent) => {
    const current = event.accelerationIncludingGravity;
    if (!current) return;

    const deltaX = Math.abs(current.x! - this.lastX);
    const deltaY = Math.abs(current.y! - this.lastY);
    const deltaZ = Math.abs(current.z! - this.lastZ);

    if (deltaX + deltaY + deltaZ > this.threshold) {
      const currentTime = Date.now();
      if (currentTime - this.lastTime > this.timeout) {
        this.onShake();
        this.lastTime = currentTime;
      }
    }

    this.lastX = current.x!;
    this.lastY = current.y!;
    this.lastZ = current.z!;
  };
}
```

### 2. Secure Storage Implementation
```typescript
// utils/storage/encryption.ts
import CryptoJS from 'crypto-js';

export class SecureStorage {
  private dbName = 'PanicShieldDB';
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create stores
        if (!db.objectStoreNames.contains('emotions')) {
          db.createObjectStore('emotions', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('panic_sessions')) {
          db.createObjectStore('panic_sessions', { keyPath: 'id' });
        }
      };
    });
  }

  encrypt(data: any, key: string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  decrypt(encryptedData: string, key: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  async saveEmotion(emotion: any, encryptionKey: string) {
    const encrypted = this.encrypt(emotion, encryptionKey);
    const transaction = this.db!.transaction(['emotions'], 'readwrite');
    const store = transaction.objectStore('emotions');
    return store.add({
      id: emotion.id,
      data: encrypted,
      timestamp: Date.now()
    });
  }
}
```

### 3. Enhanced Breathing Exercise
```typescript
// components/EnhancedBreathing.tsx
interface BreathingPhase {
  name: 'inhale' | 'hold' | 'exhale';
  duration: number;
  instruction: string;
}

const BREATHING_PATTERNS = {
  '478': [
    { name: 'inhale', duration: 4, instruction: 'Breathe in slowly' },
    { name: 'hold', duration: 7, instruction: 'Hold your breath' },
    { name: 'exhale', duration: 8, instruction: 'Exhale completely' }
  ],
  'box': [
    { name: 'inhale', duration: 4, instruction: 'Breathe in' },
    { name: 'hold', duration: 4, instruction: 'Hold' },
    { name: 'exhale', duration: 4, instruction: 'Breathe out' },
    { name: 'hold', duration: 4, instruction: 'Hold empty' }
  ],
  'coherent': [
    { name: 'inhale', duration: 5, instruction: 'Breathe in' },
    { name: 'exhale', duration: 5, instruction: 'Breathe out' }
  ]
};

// Add haptic feedback
const triggerHaptic = (pattern: 'light' | 'medium' | 'heavy') => {
  if ('vibrate' in navigator) {
    const patterns = {
      'light': [50],
      'medium': [100],
      'heavy': [200]
    };
    navigator.vibrate(patterns[pattern]);
  }
};
```

## Testing Checklist

### Panic Mode Tests
- [ ] Panic button visible on all screens
- [ ] Activates in < 1 second
- [ ] Works in airplane mode
- [ ] Shake detection calibrated
- [ ] Breathing exercises accurate
- [ ] Emergency contacts accessible

### Security Tests
- [ ] Data encrypted at rest
- [ ] No unencrypted PII in localStorage
- [ ] Biometric lock functional
- [ ] Export data encrypted
- [ ] No network calls without consent

### Performance Tests
- [ ] Initial load < 3 seconds on 3G
- [ ] Panic mode activation < 1 second
- [ ] Smooth animations (60 fps)
- [ ] Low battery usage
- [ ] Offline functionality complete

## Deployment Checklist
- [ ] Environment variables configured
- [ ] SSL certificate valid
- [ ] CSP headers configured
- [ ] Service worker registered
- [ ] Error tracking enabled
- [ ] Analytics (privacy-preserving) setup