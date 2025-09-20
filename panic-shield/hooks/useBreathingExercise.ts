import { useState, useEffect, useRef } from 'react';
import { BREATHING_PATTERNS, type BreathingPattern } from '@/components/panic/BreathingExercise';

export function useBreathingExercise(isActive: boolean, exerciseType: string) {
  const [breathingPattern, setBreathingPattern] = useState<BreathingPattern>('478');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isActive || isPaused || exerciseType !== 'breathing') return;

    const pattern = BREATHING_PATTERNS[breathingPattern];
    const currentPhase = pattern[currentPhaseIndex];

    const interval = setInterval(() => {
      setPhaseProgress(prev => {
        if (prev >= currentPhase.duration) {
          // Move to next phase
          setCurrentPhaseIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % pattern.length;
            if (nextIndex === 0) {
              setCycles(c => c + 1);
            }
            return nextIndex;
          });

          // Haptic feedback on phase change
          if ('vibrate' in navigator) {
            navigator.vibrate(30);
          }

          return 0;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isPaused, exerciseType, breathingPattern, currentPhaseIndex]);

  const handlePatternChange = (pattern: BreathingPattern) => {
    setBreathingPattern(pattern);
    setCurrentPhaseIndex(0);
    setPhaseProgress(0);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const reset = () => {
    setCurrentPhaseIndex(0);
    setPhaseProgress(0);
    setCycles(0);
    setIsPaused(false);
  };

  return {
    breathingPattern,
    currentPhaseIndex,
    phaseProgress,
    cycles,
    isPaused,
    handlePatternChange,
    togglePause,
    reset
  };
}