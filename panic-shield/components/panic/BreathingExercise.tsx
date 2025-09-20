'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export type BreathingPattern = '478' | 'box' | 'coherent' | 'calm';

export interface BreathingPhase {
  name: string;
  duration: number;
  instruction: string;
  color: string;
}

export const BREATHING_PATTERNS: Record<BreathingPattern, BreathingPhase[]> = {
  '478': [
    { name: 'inhale', duration: 4, instruction: 'Breathe in slowly', color: '#90EE90' },
    { name: 'hold', duration: 7, instruction: 'Hold your breath', color: '#FFEB9C' },
    { name: 'exhale', duration: 8, instruction: 'Exhale completely', color: '#87CEEB' }
  ],
  'box': [
    { name: 'inhale', duration: 4, instruction: 'Breathe in', color: '#90EE90' },
    { name: 'hold-in', duration: 4, instruction: 'Hold', color: '#FFEB9C' },
    { name: 'exhale', duration: 4, instruction: 'Breathe out', color: '#87CEEB' },
    { name: 'hold-out', duration: 4, instruction: 'Hold empty', color: '#B19CD9' }
  ],
  'coherent': [
    { name: 'inhale', duration: 5, instruction: 'Breathe in', color: '#90EE90' },
    { name: 'exhale', duration: 5, instruction: 'Breathe out', color: '#87CEEB' }
  ],
  'calm': [
    { name: 'inhale', duration: 3, instruction: 'In', color: '#90EE90' },
    { name: 'exhale', duration: 6, instruction: 'Out slowly', color: '#87CEEB' }
  ]
};

interface BreathingExerciseProps {
  breathingPattern: BreathingPattern;
  currentPhaseIndex: number;
  phaseProgress: number;
  cycles: number;
  isPaused: boolean;
  onPatternChange: (pattern: BreathingPattern) => void;
  onPauseToggle: () => void;
  onFeelCalmer: () => void;
  onTryGrounding: () => void;
}

export default function BreathingExercise({
  breathingPattern,
  currentPhaseIndex,
  phaseProgress,
  cycles,
  isPaused,
  onPatternChange,
  onPauseToggle,
  onFeelCalmer,
  onTryGrounding
}: BreathingExerciseProps) {
  const pattern = BREATHING_PATTERNS[breathingPattern];
  const currentPhase = pattern[currentPhaseIndex];
  const progress = (phaseProgress / currentPhase.duration) * 100;

  return (
    <div className="breathing-container">
      <h2>{currentPhase.instruction}</h2>
      <div className="breath-counter">{Math.ceil(currentPhase.duration - phaseProgress)}</div>

      <div className="breathing-visual">
        <div
          className="breathing-circle"
          style={{
            backgroundColor: currentPhase.color,
            transform: `scale(${currentPhase.name.includes('inhale') ? 1.5 :
                         currentPhase.name.includes('hold') ? 1.3 : 1})`,
            opacity: 0.7 + (progress * 0.003)
          }}
        >
          <div className="cycle-info">
            <span>Cycle</span>
            <strong>{cycles + 1}/3</strong>
          </div>
        </div>

        <div className="phase-progress">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
                backgroundColor: currentPhase.color
              }}
            />
          </div>
        </div>
      </div>

      <div className="breathing-controls">
        <button onClick={onPauseToggle} className="control-btn">
          {isPaused ? 'Resume' : 'Pause'}
        </button>

        <select
          value={breathingPattern}
          onChange={(e) => onPatternChange(e.target.value as BreathingPattern)}
          className="pattern-select"
        >
          <option value="478">4-7-8 (Calming)</option>
          <option value="box">Box Breathing</option>
          <option value="coherent">Coherent (5-5)</option>
          <option value="calm">Quick Calm (3-6)</option>
        </select>
      </div>

      {cycles >= 1 && (
        <div className="completion-options">
          <p>How are you feeling now?</p>
          <button onClick={onFeelCalmer} className="btn-success">
            <Heart size={16} />
            I feel calmer
          </button>
          <button onClick={onTryGrounding} className="btn-warning">
            Try grounding exercise
          </button>
        </div>
      )}
    </div>
  );
}