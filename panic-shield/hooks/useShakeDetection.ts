'use client';

import { useEffect, useRef } from 'react';

interface ShakeDetectionOptions {
  threshold?: number;
  timeout?: number;
  onShake: () => void;
}

export const useShakeDetection = ({
  threshold = 15,
  timeout = 1000,
  onShake
}: ShakeDetectionOptions) => {
  const lastTime = useRef(0);
  const lastX = useRef<number | null>(null);
  const lastY = useRef<number | null>(null);
  const lastZ = useRef<number | null>(null);

  useEffect(() => {
    if (!('DeviceMotionEvent' in window)) {
      console.warn('Device motion not supported');
      return;
    }

    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;

      if (!current || current.x === null || current.y === null || current.z === null) {
        return;
      }

      if (lastX.current !== null && lastY.current !== null && lastZ.current !== null) {
        const deltaX = Math.abs(current.x - lastX.current);
        const deltaY = Math.abs(current.y - lastY.current);
        const deltaZ = Math.abs(current.z - lastZ.current);
        const delta = deltaX + deltaY + deltaZ;

        if (delta > threshold) {
          const currentTime = Date.now();

          if (currentTime - lastTime.current > timeout) {
            onShake();
            lastTime.current = currentTime;

            // Haptic feedback on shake detection
            if ('vibrate' in navigator) {
              navigator.vibrate([100, 50, 100]);
            }
          }
        }
      }

      lastX.current = current.x;
      lastY.current = current.y;
      lastZ.current = current.z;
    };

    // Check for permission on iOS 13+
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS devices
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [threshold, timeout, onShake]);
};