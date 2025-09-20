'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, SkipForward } from 'lucide-react';
import { secureStorage } from '@/utils/storage/secureStorage';

// Extracted components
import ExerciseSelector, { type ExerciseType } from './panic/ExerciseSelector';
import BreathingExercise from './panic/BreathingExercise';
import GroundingExercise from './panic/GroundingExercise';
import EmergencyContacts from './panic/EmergencyContacts';

// Extracted hooks
import { useBreathingExercise } from '@/hooks/useBreathingExercise';
import { useGroundingExercise } from '@/hooks/useGroundingExercise';

interface PanicPageProps {
  onNavigate: (page: string) => void;
}

export default function PanicPageRefactored({ onNavigate }: PanicPageProps) {
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
  const [isActive, setIsActive] = useState(false);
  const sessionStartTime = useRef<number>(Date.now());

  // Breathing exercise state from hook
  const {
    breathingPattern,
    currentPhaseIndex,
    phaseProgress,
    cycles,
    isPaused,
    handlePatternChange,
    togglePause,
    reset: resetBreathing
  } = useBreathingExercise(isActive, exerciseType || '');

  // Grounding exercise state from hook
  const {
    groundingStep,
    groundingInputs,
    handleGroundingInput,
    skipToNextStep,
    reset: resetGrounding
  } = useGroundingExercise();

  const startExercise = (type: ExerciseType) => {
    setExerciseType(type);
    setIsActive(true);
    sessionStartTime.current = Date.now();

    // Log panic session start
    secureStorage.savePanicSession({
      startTime: Date.now(),
      exercises: [type]
    }).catch(console.error);
  };

  const endSession = async (outcome: 'resolved' | 'escalated' = 'resolved') => {
    // Save panic session
    try {
      await secureStorage.savePanicSession({
        startTime: sessionStartTime.current,
        endTime: Date.now(),
        exercises: exerciseType ? [exerciseType] : [],
        outcome,
        effectiveness: outcome === 'resolved' ? 4 : 2
      });
    } catch (error) {
      console.error('Failed to save panic session:', error);
    }

    // Reset states
    setIsActive(false);
    setExerciseType(null);
    resetBreathing();
    resetGrounding();

    onNavigate('home');
  };

  const handleBackToExercises = () => {
    setExerciseType(null);
    setIsActive(false);
    resetBreathing();
    resetGrounding();
  };

  const handleTryGrounding = () => {
    setExerciseType('grounding');
    resetGrounding();
  };

  const handleSwitchToBreathing = () => {
    setExerciseType('breathing');
    resetBreathing();
  };

  // Not active - show exercise selector
  if (!isActive) {
    return (
      <div className="page panic-page">
        <ExerciseSelector onSelectExercise={startExercise} />

        <button onClick={() => onNavigate('home')} className="help-button okay">
          <SkipForward size={16} />
          I'm okay now
        </button>
      </div>
    );
  }

  // Active - show selected exercise
  return (
    <div className="page panic-page active">
      {exerciseType === 'breathing' && (
        <BreathingExercise
          breathingPattern={breathingPattern}
          currentPhaseIndex={currentPhaseIndex}
          phaseProgress={phaseProgress}
          cycles={cycles}
          isPaused={isPaused}
          onPatternChange={handlePatternChange}
          onPauseToggle={togglePause}
          onFeelCalmer={() => endSession('resolved')}
          onTryGrounding={handleTryGrounding}
        />
      )}

      {exerciseType === 'grounding' && (
        <>
          <GroundingExercise
            currentStep={groundingStep}
            inputs={groundingInputs}
            onInputChange={handleGroundingInput}
            onComplete={() => endSession('resolved')}
            onSkip={skipToNextStep}
          />
          <button onClick={handleSwitchToBreathing} className="switch-exercise">
            Switch to breathing
          </button>
        </>
      )}

      {exerciseType === 'emergency' && (
        <>
          <EmergencyContacts />
          <button onClick={handleBackToExercises} className="back-button">
            <ChevronLeft size={16} />
            Back to exercises
          </button>
        </>
      )}

      <p className="crisis-text">
        Remember: This feeling will pass. You are safe.
      </p>

      <style jsx>{`
        .panic-page {
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .help-button {
          padding: 12px 24px;
          background: var(--secondary);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
        }

        .help-button.okay {
          background: var(--success);
          color: white;
        }

        .switch-exercise {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--muted);
          cursor: pointer;
          font-size: 14px;
          margin-top: 16px;
        }

        .back-button {
          padding: 12px 24px;
          background: var(--secondary);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .crisis-text {
          position: fixed;
          bottom: 70px;
          left: 16px;
          right: 16px;
          font-size: 13px;
          color: var(--muted);
          text-align: center;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}