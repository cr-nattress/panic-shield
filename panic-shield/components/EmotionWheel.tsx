'use client';

import React, { useState } from 'react';
import { EMOTION_CORES, SUB_EMOTIONS, getSubEmotionsByCore, EmotionCore, SubEmotion } from '@/utils/emotionDataEnhanced';
import { ChevronRight, Heart } from 'lucide-react';

interface EmotionWheelProps {
  onEmotionSelect: (emotionId: string, intensity: number) => void;
  onBack?: () => void;
}

export default function EmotionWheel({ onEmotionSelect, onBack }: EmotionWheelProps) {
  const [selectedCore, setSelectedCore] = useState<EmotionCore | null>(null);
  const [selectedSubEmotion, setSelectedSubEmotion] = useState<SubEmotion | null>(null);
  const [customIntensity, setCustomIntensity] = useState<number>(2);
  const [showSubEmotions, setShowSubEmotions] = useState(false);

  const handleCoreSelect = (core: EmotionCore) => {
    setSelectedCore(core);
    setShowSubEmotions(true);

    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleSubEmotionSelect = (subEmotion: SubEmotion) => {
    setSelectedSubEmotion(subEmotion);
    setCustomIntensity(subEmotion.intensity);

    // Auto-confirm after a short delay for better UX
    setTimeout(() => {
      onEmotionSelect(subEmotion.id, subEmotion.intensity);
    }, 300);

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  const handleQuickSelect = (core: EmotionCore) => {
    // Quick select with default intensity
    onEmotionSelect(core.id, customIntensity);

    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  const handleIntensityChange = (intensity: number) => {
    setCustomIntensity(intensity);
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  if (showSubEmotions && selectedCore) {
    const subEmotions = getSubEmotionsByCore(selectedCore.id);

    return (
      <div className="emotion-wheel-container">
        <div className="emotion-header">
          <button onClick={() => setShowSubEmotions(false)} className="back-btn-inline">
            ← Back
          </button>
          <h3 style={{ color: selectedCore.color }}>{selectedCore.name}</h3>
        </div>

        <p className="emotion-description">{selectedCore.description}</p>

        <div className="intensity-selector">
          <label>How intense is this feeling?</label>
          <div className="intensity-buttons-inline">
            {[1, 2, 3].map(level => (
              <button
                key={level}
                onClick={() => handleIntensityChange(level)}
                className={`intensity-btn-compact ${customIntensity === level ? 'active' : ''}`}
                style={{
                  backgroundColor: customIntensity === level ? selectedCore.color : 'transparent',
                  borderColor: selectedCore.color
                }}
              >
                <span className="intensity-label">
                  {level === 1 ? 'Mild' : level === 2 ? 'Moderate' : 'Intense'}
                </span>
                <span className="intensity-dots">
                  {Array(level).fill('•').map((dot, i) => (
                    <span key={i} style={{ opacity: 0.6 + (i * 0.2), marginLeft: i > 0 ? '2px' : '0' }}>{dot}</span>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="quick-select-option">
          <button
            onClick={() => handleQuickSelect(selectedCore)}
            className="quick-select-btn"
            style={{ backgroundColor: selectedCore.color }}
          >
            <Heart size={20} />
            Quick Log: {selectedCore.name} (Intensity {customIntensity})
          </button>
        </div>

        <div className="sub-emotions-grid">
          <h4>Or choose a more specific feeling:</h4>
          {subEmotions.map(subEmotion => (
            <button
              key={subEmotion.id}
              onClick={() => handleSubEmotionSelect(subEmotion)}
              className={`sub-emotion-card ${selectedSubEmotion?.id === subEmotion.id ? 'selected' : ''}`}
              style={{
                backgroundColor: subEmotion.color + '15',
                borderColor: subEmotion.color
              }}
            >
              <div className="sub-emotion-content">
                <div className="sub-emotion-main">
                  <span className="sub-emotion-name" style={{ color: subEmotion.color }}>
                    {subEmotion.name}
                  </span>
                  <span className="sub-emotion-intensity" style={{ color: subEmotion.color, marginLeft: 'auto' }}>
                    {Array(subEmotion.intensity).fill('•').map((dot, i) => (
                      <span key={i} style={{ marginLeft: i > 0 ? '2px' : '0' }}>{dot}</span>
                    ))}
                  </span>
                </div>
                {subEmotion.description && (
                  <span className="sub-emotion-desc">{subEmotion.description}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="emotion-wheel-container">
      <h3>How are you feeling?</h3>
      <p className="helper-text">Tap an emotion to explore it deeper, or long-press for quick logging</p>

      <div className="emotion-cores-grid">
        {EMOTION_CORES.map(core => (
          <button
            key={core.id}
            onClick={() => handleCoreSelect(core)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleQuickSelect(core);
            }}
            className="emotion-core-card"
            style={{
              backgroundColor: core.color + '20',
              borderColor: core.color
            }}
          >
            <div
              className="emotion-core-circle"
              style={{ backgroundColor: core.color }}
            >
              <span className="emotion-core-icon">
                {core.id === 'anger' && '😠'}
                {core.id === 'disgust' && '🤢'}
                {core.id === 'sad' && '😢'}
                {core.id === 'happy' && '😊'}
                {core.id === 'surprise' && '😲'}
                {core.id === 'fear' && '😰'}
              </span>
            </div>
            <span className="emotion-core-name">{core.name}</span>
            <ChevronRight size={16} className="emotion-core-arrow" />
          </button>
        ))}
      </div>

      <style jsx>{`
        .emotion-wheel-container {
          animation: fadeIn 0.3s ease;
        }

        .emotion-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .back-btn-inline {
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: var(--text);
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .back-btn-inline:hover {
          background: var(--secondary);
          border-radius: 8px;
        }

        .emotion-description {
          color: var(--muted);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .helper-text {
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 20px;
          text-align: center;
        }

        .emotion-cores-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .emotion-core-card {
          padding: 20px;
          border: 2px solid;
          border-radius: 16px;
          background: var(--card);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .emotion-core-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .emotion-core-card:active {
          transform: scale(0.98);
        }

        .emotion-core-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .emotion-core-icon {
          font-size: 32px;
        }

        .emotion-core-name {
          font-weight: 600;
          font-size: 16px;
          color: var(--text);
        }

        .emotion-core-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.5;
        }

        .intensity-selector {
          margin-bottom: 24px;
        }

        .intensity-selector label {
          display: block;
          font-size: 14px;
          margin-bottom: 12px;
          color: var(--text);
        }

        .intensity-buttons-inline {
          display: flex;
          gap: 12px;
        }

        .intensity-btn-compact {
          flex: 1;
          padding: 12px;
          border: 2px solid;
          border-radius: 12px;
          background: var(--card);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .intensity-btn-compact:hover {
          transform: scale(1.02);
        }

        .intensity-btn-compact.active {
          color: white;
          transform: scale(1.05);
        }

        .intensity-label {
          font-size: 13px;
          font-weight: 500;
        }

        .intensity-dots {
          font-size: 18px;
          display: flex;
          gap: 2px;
          justify-content: center;
        }

        .quick-select-option {
          margin-bottom: 24px;
        }

        .quick-select-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .quick-select-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .sub-emotions-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sub-emotions-grid h4 {
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 8px;
        }

        .sub-emotion-card {
          padding: 14px 16px;
          border: 2px solid;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
        }

        .sub-emotion-card:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .sub-emotion-card.selected {
          transform: scale(0.98);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .sub-emotion-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sub-emotion-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .sub-emotion-name {
          font-weight: 600;
          font-size: 15px;
          flex: 1;
        }

        .sub-emotion-intensity {
          font-size: 16px;
          letter-spacing: 2px;
          opacity: 0.9;
        }

        .sub-emotion-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.4;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}