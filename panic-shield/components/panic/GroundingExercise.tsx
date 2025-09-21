'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Ear, Hand, Wind, Brain, Check, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './GroundingExercise.module.css';

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
  const CurrentIcon = currentPrompt?.icon;
  const isComplete = currentStep >= GROUNDING_PROMPTS.length;
  const [showCelebration, setShowCelebration] = useState(false);

  // Check if current step is fully filled
  const currentStepInputs = inputs[currentStep] || [];
  const allFieldsFilled = currentPrompt && currentStepInputs.filter(Boolean).length === currentPrompt.count;

  // Trigger celebration when exercise completes
  useEffect(() => {
    if (isComplete && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    }
  }, [isComplete, showCelebration]);

  if (isComplete) {
    return (
      <div className={styles.groundingContainer}>
        <h2>Well Done!</h2>
        <div className={`${styles.groundingComplete} ${showCelebration ? styles.celebrateSuccess : ''}`}>
          <Check size={48} className={styles.successIcon} />
          <p>You've successfully anchored yourself in the present moment.</p>
          <p>Your senses are powerful tools for managing anxiety.</p>
          <button onClick={onComplete} className={styles.btnPrimary}>
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
    <div className={styles.groundingContainer}>
      <h2>5-4-3-2-1 Grounding</h2>
      <p className={styles.groundingIntro}>Focus on your senses to anchor yourself in the present</p>

      <div className={styles.groundingStep}>
        <div className={styles.stepHeader}>
          <CurrentIcon size={32} className={styles.senseIcon} />
          <div>
            <h3>{currentPrompt.prompt}</h3>
            <p className={styles.stepLabel}>Step {currentStep + 1} of {GROUNDING_PROMPTS.length}</p>
          </div>
        </div>

        <div className={styles.groundingInputs}>
          {Array.from({ length: currentPrompt.count }).map((_, index) => {
            const inputValue = inputs[currentStep]?.[index] || '';
            const isCompleted = inputValue.trim().length > 0;

            return (
              <div key={`${currentStep}-${index}`} style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder={`${currentPrompt.sense} ${index + 1}...`}
                  value={inputValue}
                  onChange={(e) => handleInput(index, e.target.value)}
                  className={`${styles.groundingInput} ${isCompleted ? styles.completed : ''}`}
                  autoFocus={index === 0}
                />
                {isCompleted && (
                  <span className={styles.inputCheckmark}>✓</span>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.stepProgress}>
          {GROUNDING_PROMPTS.map((_, i) => (
            <div
              key={i}
              className={`${styles.progressDot} ${
                i < currentStep ? styles.completed :
                i === currentStep ? styles.active : ''
              }`}
              title={`Step ${i + 1}: ${GROUNDING_PROMPTS[i].prompt}`}
            />
          ))}
        </div>

        {/* Continue button when all fields are filled */}
        {allFieldsFilled && currentStep < GROUNDING_PROMPTS.length - 1 && (
          <button
            onClick={() => onInputChange(currentStep + 1, -1, '')}
            className={styles.continueBtn}
          >
            Continue to Step {currentStep + 2}
            <ArrowRight size={20} />
          </button>
        )}

        {/* Skip button (only show if continue isn't shown) */}
        {!allFieldsFilled && currentStep > 0 && (
          <button onClick={onSkip} className={styles.skipBtn}>
            Skip to next step
          </button>
        )}
      </div>
    </div>
  );
}