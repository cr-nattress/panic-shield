'use client';

import React from 'react';
import { Eye, Ear, Hand, Wind, Brain, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface GroundingPrompt {
  count: number;
  sense: string;
  icon: LucideIcon;
  prompt: string;
}

const GROUNDING_PROMPTS: GroundingPrompt[] = [
  { count: 5, sense: 'see', icon: Eye, prompt: 'Name 5 things you can see' },
  { count: 4, sense: 'touch', icon: Hand, prompt: 'Name 4 things you can touch' },
  { count: 3, sense: 'hear', icon: Ear, prompt: 'Name 3 things you can hear' },
  { count: 2, sense: 'smell', icon: Wind, prompt: 'Name 2 things you can smell' },
  { count: 1, sense: 'taste', icon: Brain, prompt: 'Name 1 thing you can taste' }
];

interface GroundingExerciseProps {
  currentStep: number;
  inputs: string[][];
  onInputChange: (stepIndex: number, inputIndex: number, value: string) => void;
  onComplete: () => void;
  onSkip: () => void;
}

export default function GroundingExercise({
  currentStep,
  inputs,
  onInputChange,
  onComplete,
  onSkip
}: GroundingExerciseProps) {
  const currentPrompt = GROUNDING_PROMPTS[currentStep];
  const CurrentIcon = currentPrompt.icon;
  const isComplete = currentStep >= GROUNDING_PROMPTS.length;

  if (isComplete) {
    return (
      <div className="grounding-container">
        <h2>Well Done!</h2>
        <div className="grounding-complete">
          <Check size={48} className="success-icon" />
          <p>You've successfully anchored yourself in the present moment.</p>
          <p>Your senses are powerful tools for managing anxiety.</p>
          <button onClick={onComplete} className="btn-primary">
            Finish Exercise
          </button>
        </div>
      </div>
    );
  }

  const handleInput = (index: number, value: string) => {
    onInputChange(currentStep, index, value);

    // Auto-advance when all inputs are filled for this step
    const filledCount = inputs[currentStep].filter(Boolean).length;
    const updatedCount = value ? filledCount + (inputs[currentStep][index] ? 0 : 1) : filledCount - 1;

    if (updatedCount === currentPrompt.count && currentStep < GROUNDING_PROMPTS.length - 1) {
      setTimeout(() => onInputChange(currentStep + 1, -1, ''), 500); // Trigger next step
    }
  };

  return (
    <div className="grounding-container">
      <h2>5-4-3-2-1 Grounding</h2>
      <p className="grounding-intro">Focus on your senses to anchor yourself in the present</p>

      <div className="grounding-step">
        <div className="step-header">
          <CurrentIcon size={32} className="sense-icon" />
          <h3>{currentPrompt.prompt}</h3>
        </div>

        <div className="grounding-inputs">
          {Array.from({ length: currentPrompt.count }).map((_, index) => (
            <input
              key={`${currentStep}-${index}`}
              type="text"
              placeholder={`${currentPrompt.sense} ${index + 1}...`}
              value={inputs[currentStep]?.[index] || ''}
              onChange={(e) => handleInput(index, e.target.value)}
              className="grounding-input"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div className="step-progress">
          {GROUNDING_PROMPTS.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i <= currentStep ? 'active' : ''}`}
            />
          ))}
        </div>

        {currentStep > 0 && (
          <button onClick={onSkip} className="skip-btn">
            Skip to next step
          </button>
        )}
      </div>
    </div>
  );
}