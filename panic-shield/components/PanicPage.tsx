'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, Phone, Heart, Brain, Eye, Ear, Hand, Wind, SkipForward, ChevronLeft } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { secureStorage } from '@/utils/storage/secureStorage';

interface PanicPageProps {
  onNavigate: (page: string) => void;
}

type ExerciseType = 'breathing' | 'grounding' | 'emergency';
type BreathingPattern = '478' | 'box' | 'coherent' | 'calm';

interface BreathingPhase {
  name: string;
  duration: number;
  instruction: string;
  color: string;
}

const BREATHING_PATTERNS: Record<BreathingPattern, BreathingPhase[]> = {
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

export default function PanicPage({ onNavigate }: PanicPageProps) {
  const [exerciseType, setExerciseType] = useState<ExerciseType>('breathing');
  const [isActive, setIsActive] = useState(false);
  const [breathingPattern, setBreathingPattern] = useState<BreathingPattern>('478');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Grounding exercise state
  const [groundingStep, setGroundingStep] = useState(0);
  const [groundingInputs, setGroundingInputs] = useState<string[][]>([[], [], [], [], []]);
  const groundingPrompts = [
    { count: 5, sense: 'see', icon: Eye, prompt: 'Name 5 things you can see' },
    { count: 4, sense: 'touch', icon: Hand, prompt: 'Name 4 things you can touch' },
    { count: 3, sense: 'hear', icon: Ear, prompt: 'Name 3 things you can hear' },
    { count: 2, sense: 'smell', icon: Wind, prompt: 'Name 2 things you can smell' },
    { count: 1, sense: 'taste', icon: Brain, prompt: 'Name 1 thing you can taste' }
  ];

  const sessionStartTime = useRef<number>(Date.now());

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
        exercises: [exerciseType],
        outcome,
        effectiveness: outcome === 'resolved' ? 4 : 2
      });
    } catch (error) {
      console.error('Failed to save panic session:', error);
    }

    onNavigate('home');
  };

  const handleGroundingInput = (index: number, value: string) => {
    const newInputs = [...groundingInputs];
    newInputs[groundingStep][index] = value;
    setGroundingInputs(newInputs);

    // Check if all inputs for this step are filled
    if (newInputs[groundingStep].filter(Boolean).length === groundingPrompts[groundingStep].count) {
      if (groundingStep < 4) {
        setTimeout(() => setGroundingStep(groundingStep + 1), 500);
      }
    }
  };

  const renderBreathingExercise = () => {
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
          <button onClick={() => setIsPaused(!isPaused)} className="control-btn">
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <select
            value={breathingPattern}
            onChange={(e) => {
              setBreathingPattern(e.target.value as BreathingPattern);
              setCurrentPhaseIndex(0);
              setPhaseProgress(0);
            }}
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
            <button onClick={() => endSession('resolved')} className="btn-success">
              <Heart size={16} />
              I feel calmer
            </button>
            <button onClick={() => setExerciseType('grounding')} className="btn-warning">
              Try grounding exercise
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderGroundingExercise = () => {
    const currentPrompt = groundingPrompts[groundingStep];
    const CurrentIcon = currentPrompt.icon;

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
                key={`${groundingStep}-${index}`}
                type="text"
                placeholder={`${currentPrompt.sense} ${index + 1}...`}
                value={groundingInputs[groundingStep][index] || ''}
                onChange={(e) => handleGroundingInput(index, e.target.value)}
                className="grounding-input"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="step-progress">
            {groundingPrompts.map((_, i) => (
              <div
                key={i}
                className={`progress-dot ${i <= groundingStep ? 'active' : ''}`}
                style={{
                  backgroundColor: i <= groundingStep ? '#90EE90' : 'var(--border)'
                }}
              />
            ))}
          </div>
        </div>

        {groundingStep === 4 && groundingInputs[4].filter(Boolean).length === 1 && (
          <div className="completion-options">
            <h3>Well done! You're grounded in the present.</h3>
            <button onClick={() => endSession('resolved')} className="btn-success">
              <Heart size={16} />
              I feel better
            </button>
          </div>
        )}

        <button onClick={() => setExerciseType('breathing')} className="switch-exercise">
          Switch to breathing
        </button>
      </div>
    );
  };

  const renderEmergencyOptions = () => (
    <div className="help-section">
      <h2 className="help-title">Emergency Support</h2>
      <p className="help-subtitle">If you're in crisis, immediate help is available</p>

      <div className="emergency-contacts">
        <button onClick={() => window.location.href = 'tel:988'} className="emergency-contact">
          <Phone size={24} />
          <span className="emergency-number">988</span>
          <span className="emergency-label">Crisis Lifeline</span>
        </button>

        <button onClick={() => window.location.href = 'tel:911'} className="emergency-contact">
          <Phone size={24} />
          <span className="emergency-number">911</span>
          <span className="emergency-label">Emergency</span>
        </button>

        <button onClick={() => window.location.href = 'sms:741741'} className="emergency-contact">
          <Phone size={24} />
          <span className="emergency-number">741741</span>
          <span className="emergency-label">Crisis Text Line</span>
        </button>
      </div>

      <button onClick={() => setExerciseType('breathing')} className="back-button">
        <ChevronLeft size={16} />
        Back to exercises
      </button>
    </div>
  );

  if (!isActive) {
    return (
      <div className="page panic-page">
        <div className="panic-start">
          <h1 className="panic-title">You're going to be okay</h1>
          <p className="panic-subtitle">I'm here to help you through this</p>

          <div className="exercise-options">
            <button onClick={() => startExercise('breathing')} className="exercise-card breathing">
              <div className="exercise-icon"><Wind size={32} /></div>
              <h3 className="exercise-title">Breathing Exercise</h3>
              <p className="exercise-description">Calm your nervous system</p>
            </button>

            <button onClick={() => startExercise('grounding')} className="exercise-card grounding">
              <div className="exercise-icon"><Eye size={32} /></div>
              <h3 className="exercise-title">5-4-3-2-1 Grounding</h3>
              <p className="exercise-description">Anchor to the present</p>
            </button>

            <button onClick={() => startExercise('emergency')} className="exercise-card emergency">
              <div className="exercise-icon"><Phone size={32} /></div>
              <h3 className="exercise-title">Get Help</h3>
              <p className="exercise-description">Crisis support</p>
            </button>
          </div>

          <button onClick={() => onNavigate('home')} className="help-button okay">
            <SkipForward size={16} />
            I'm okay now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page panic-page active">
      {exerciseType === 'breathing' && renderBreathingExercise()}
      {exerciseType === 'grounding' && renderGroundingExercise()}
      {exerciseType === 'emergency' && renderEmergencyOptions()}

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

        .panic-start h1 {
          font-size: 28px;
          margin-bottom: 8px;
          color: var(--text);
        }

        .reassurance {
          color: var(--muted);
          font-size: 16px;
          margin-bottom: 32px;
        }

        .exercise-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 320px;
          margin-bottom: 24px;
        }

        .exercise-card {
          padding: 20px;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .exercise-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .exercise-card.breathing {
          border-color: #90EE90;
          background: #90EE9020;
        }

        .exercise-card.grounding {
          border-color: #87CEEB;
          background: #87CEEB20;
        }

        .exercise-card.emergency {
          border-color: #FF6B6B;
          background: #FF6B6B20;
        }

        .exercise-card h3 {
          font-size: 18px;
          margin: 0;
        }

        .exercise-card p {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
        }

        .skip-btn {
          padding: 12px 24px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto;
        }

        .breathing-container {
          width: 100%;
          max-width: 400px;
        }

        .breathing-container h2 {
          font-size: 24px;
          margin-bottom: 16px;
        }

        .breath-counter {
          font-size: 48px;
          font-weight: bold;
          color: var(--primary);
          margin-bottom: 24px;
        }

        .breathing-visual {
          position: relative;
          margin-bottom: 32px;
        }

        .breathing-circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 1s ease-in-out;
        }

        .cycle-info {
          display: flex;
          flex-direction: column;
          color: white;
          font-weight: bold;
        }

        .phase-progress {
          margin-top: 24px;
        }

        .progress-track {
          height: 8px;
          background: var(--border);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.1s linear;
          border-radius: 4px;
        }

        .breathing-controls {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .control-btn {
          padding: 8px 20px;
          background: var(--secondary);
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .pattern-select {
          padding: 8px 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
        }

        .grounding-container {
          width: 100%;
          max-width: 400px;
        }

        .grounding-intro {
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .grounding-step {
          background: var(--card);
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .sense-icon {
          color: var(--primary);
        }

        .step-header h3 {
          font-size: 18px;
          margin: 0;
        }

        .grounding-inputs {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .grounding-input {
          padding: 12px;
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 16px;
          color: var(--text);
        }

        .grounding-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .step-progress {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .emergency-container {
          width: 100%;
          max-width: 400px;
        }

        .emergency-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 24px 0;
        }

        .emergency-btn {
          padding: 20px;
          background: var(--card);
          border: 2px solid;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s;
        }

        .emergency-btn.crisis {
          border-color: #FFB366;
        }

        .emergency-btn.urgent {
          border-color: #FF6B6B;
        }

        .emergency-btn.text {
          border-color: #87CEEB;
        }

        .emergency-btn span {
          font-size: 20px;
          font-weight: bold;
        }

        .emergency-btn small {
          font-size: 14px;
          color: var(--muted);
          margin-left: auto;
        }

        .completion-options {
          margin-top: 24px;
          padding: 20px;
          background: var(--card);
          border-radius: 12px;
        }

        .completion-options p {
          font-size: 18px;
          margin-bottom: 16px;
        }

        .btn-success {
          padding: 12px 24px;
          background: var(--success);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-right: 12px;
        }

        .btn-warning {
          padding: 12px 24px;
          background: #FFB366;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
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

        .back-to-exercises {
          padding: 12px 24px;
          background: var(--secondary);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 16px;
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