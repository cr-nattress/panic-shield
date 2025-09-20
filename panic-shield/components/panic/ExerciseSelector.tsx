'use client';

import React from 'react';
import { Wind, Brain, Phone } from 'lucide-react';

export type ExerciseType = 'breathing' | 'grounding' | 'emergency';

interface ExerciseSelectorProps {
  onSelectExercise: (type: ExerciseType) => void;
}

export default function ExerciseSelector({ onSelectExercise }: ExerciseSelectorProps) {
  return (
    <div className="exercise-selector">
      <div className="panic-header">
        <h1 className="panic-title">You're going to be okay</h1>
        <p className="panic-subtitle">I'm here to help you through this</p>
      </div>

      <div className="exercise-options">
        <button
          onClick={() => onSelectExercise('breathing')}
          className="exercise-card breathing"
        >
          <div className="exercise-icon">
            <Wind size={32} />
          </div>
          <h3 className="exercise-title">Breathing Exercise</h3>
          <p className="exercise-description">Calm your nervous system</p>
        </button>

        <button
          onClick={() => onSelectExercise('grounding')}
          className="exercise-card grounding"
        >
          <div className="exercise-icon">
            <Brain size={32} />
          </div>
          <h3 className="exercise-title">5-4-3-2-1 Grounding</h3>
          <p className="exercise-description">Anchor to the present</p>
        </button>

        <button
          onClick={() => onSelectExercise('emergency')}
          className="exercise-card emergency"
        >
          <div className="exercise-icon">
            <Phone size={32} />
          </div>
          <h3 className="exercise-title">Get Help</h3>
          <p className="exercise-description">Crisis support</p>
        </button>
      </div>

      <div className="help-section">
        <h2 className="help-title">
          <span>💚</span> Get Help
        </h2>
        <div className="help-options">
          <button
            onClick={() => onSelectExercise('emergency')}
            className="help-button crisis"
          >
            💔 Crisis support
          </button>
          <button
            onClick={() => onSelectExercise('breathing')}
            className="help-button okay"
          >
            💚 I'm okay now
          </button>
        </div>
      </div>
    </div>
  );
}