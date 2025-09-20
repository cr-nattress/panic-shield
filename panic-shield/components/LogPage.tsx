'use client';

import React, { useState } from 'react';
import { ChevronLeft, Undo2, Check, Heart, Clock, MessageSquare, TrendingUp } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import EmotionWheel from './EmotionWheelRefactored';
import { TRIGGER_CATEGORIES, getQuickSuggestion, getSubEmotionById, getEmotionCore } from '@/utils/emotionDataEnhanced';

interface LogPageProps {
  onNavigate: (page: string) => void;
}

export default function LogPage({ onNavigate }: LogPageProps) {
  const { addLog, removeLastLog } = useStore();
  const [step, setStep] = useState('emotion');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [emotionIntensity, setEmotionIntensity] = useState<number>(2);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [showUndo, setShowUndo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('personal');

  const handleEmotionSelect = (emotionId: string, intensity: number) => {
    setSelectedEmotion(emotionId);
    setEmotionIntensity(intensity);
    setStep('triggers');

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleTriggersConfirm = async () => {
    if (!selectedEmotion) return;

    setIsProcessing(true);

    // Get emotion details for suggestion
    const subEmotion = getSubEmotionById(selectedEmotion);
    const coreEmotion = subEmotion ? getEmotionCore(subEmotion.coreId) : getEmotionCore(selectedEmotion);
    const suggestion = getQuickSuggestion(
      subEmotion ? subEmotion.coreId : selectedEmotion,
      emotionIntensity
    );

    try {
      await addLog({
        emotionId: selectedEmotion,
        intensity: emotionIntensity,
        triggers,
        notes: notes.trim(),
        suggestion
      });

      setStep('suggestion');
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 5000);
    } catch (error) {
      console.error('Failed to save emotion:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUndo = async () => {
    await removeLastLog();
    onNavigate('home');
  };

  const handleTriggerToggle = (trigger: string) => {
    setTriggers(prev =>
      prev.includes(trigger)
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  const getEmotionDetails = () => {
    if (!selectedEmotion) return null;

    const subEmotion = getSubEmotionById(selectedEmotion);
    if (subEmotion) {
      return {
        name: subEmotion.name,
        color: subEmotion.color,
        coreId: subEmotion.coreId
      };
    }

    const coreEmotion = getEmotionCore(selectedEmotion);
    if (coreEmotion) {
      return {
        name: coreEmotion.name,
        color: coreEmotion.color,
        coreId: coreEmotion.id
      };
    }

    return null;
  };

  const emotionDetails = getEmotionDetails();
  const suggestion = emotionDetails ? getQuickSuggestion(emotionDetails.coreId, emotionIntensity) : null;

  return (
    <div className="page log-page">
      <div className="header">
        <button onClick={() => onNavigate('home')} className="back-btn">
          <ChevronLeft size={24} />
        </button>
        <h2>Quick Log</h2>
        {showUndo && (
          <button onClick={handleUndo} className="undo-btn">
            <Undo2 size={16} />
            Undo
          </button>
        )}
      </div>

      {step === 'emotion' && (
        <div className="step-content">
          <EmotionWheel
            onEmotionSelect={handleEmotionSelect}
            onBack={() => onNavigate('home')}
          />
        </div>
      )}

      {step === 'triggers' && emotionDetails && (
        <div className="step-content">
          <div className="emotion-summary" style={{ backgroundColor: emotionDetails.color + '20', borderColor: emotionDetails.color }}>
            <span className="emotion-label">Feeling:</span>
            <span className="emotion-name" style={{ color: emotionDetails.color }}>
              {emotionDetails.name}
            </span>
            <span className="emotion-intensity">
              {'•'.repeat(emotionIntensity)}
            </span>
          </div>

          <h3>What triggered this? (optional)</h3>
          <p className="subtitle">Understanding patterns helps you grow</p>

          <div className="trigger-categories">
            {Object.entries(TRIGGER_CATEGORIES).map(([category, categoryTriggers]) => (
              <div key={category} className="trigger-category">
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </div>
            ))}
          </div>

          <div className="trigger-tags">
            {TRIGGER_CATEGORIES[activeCategory as keyof typeof TRIGGER_CATEGORIES].map(trigger => (
              <button
                key={trigger}
                onClick={() => handleTriggerToggle(trigger)}
                className={`trigger-tag ${triggers.includes(trigger) ? 'selected' : ''}`}
                style={{
                  backgroundColor: triggers.includes(trigger) ? emotionDetails.color : 'transparent',
                  borderColor: emotionDetails.color,
                  color: triggers.includes(trigger) ? 'white' : 'var(--text)'
                }}
              >
                {triggers.includes(trigger) && <Check size={14} />}
                {trigger}
              </button>
            ))}
          </div>

          <div className="notes-section">
            <label htmlFor="notes">
              <MessageSquare size={16} />
              Add notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any thoughts you'd like to capture?"
              maxLength={500}
              rows={3}
            />
            <span className="char-count">{notes.length}/500</span>
          </div>

          <div className="button-group">
            <button onClick={handleTriggersConfirm} className="btn-secondary" disabled={isProcessing}>
              Skip Triggers
            </button>
            <button onClick={handleTriggersConfirm} className="btn-primary" disabled={isProcessing}>
              {isProcessing ? 'Saving...' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {step === 'suggestion' && emotionDetails && suggestion && (
        <div className="step-content">
          <h3>Here's something that might help</h3>
          <div className="suggestion-card" style={{ borderColor: emotionDetails.color }}>
            <div className="suggestion-icon" style={{ backgroundColor: emotionDetails.color + '30' }}>
              <Heart size={24} style={{ color: emotionDetails.color }} />
            </div>
            <p className="suggestion-text">{suggestion}</p>
            <div className="suggestion-duration">
              <Clock size={14} />
              30 seconds - 2 minutes
            </div>
          </div>

          {triggers.length > 0 && (
            <div className="trigger-insights" style={{ borderColor: emotionDetails.color + '40' }}>
              <TrendingUp size={16} style={{ color: emotionDetails.color }} />
              <p>
                <strong>Pattern detected:</strong> You often feel {emotionDetails.name.toLowerCase()}
                {triggers.includes('work') && ' at work'}
                {triggers.includes('social') && ' in social situations'}
                {triggers.includes('alone') && ' when alone'}.
                {' '}Awareness is the first step to change.
              </p>
            </div>
          )}

          <div className="button-group">
            <button onClick={() => onNavigate('home')} className="btn-secondary">
              Skip
            </button>
            <button onClick={() => onNavigate('home')} className="btn-primary">
              I'll try this
            </button>
          </div>
        </div>
      )}

      <div className="progress-bar">
        {['emotion', 'triggers', 'suggestion'].map((s, i) => (
          <div
            key={s}
            className={`progress-segment ${i <= ['emotion', 'triggers', 'suggestion'].indexOf(step) ? 'active' : ''}`}
          />
        ))}
      </div>

    </div>
  );
}