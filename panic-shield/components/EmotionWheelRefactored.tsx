/**
 * Refactored EmotionWheel component following US-NEXT-003 requirements
 * - Uses extracted components and hooks
 * - Maintains same visual appearance and functionality
 * - Under 250 LOC
 * - Preserves all animations and interactions
 */

'use client';

import React from 'react';
import { EMOTION_CORES, getSubEmotionsByCore } from '@/utils/emotionDataEnhanced';
import { useEmotionSelection } from '@/hooks/useEmotionSelection';
import { WheelSegment } from '@/components/wheel/WheelSegment';
import { IntensitySelector } from '@/components/wheel/IntensitySelector';
import { TriggerInput } from '@/components/wheel/TriggerInput';
import { QuickActions } from '@/components/wheel/QuickActions';
import { calculateStaggerDelay } from '@/utils/wheelGeometry';

interface EmotionWheelRefactoredProps {
  onEmotionSelect: (emotionId: string, intensity: number, triggers?: string[]) => void;
  onBack?: () => void;
}

export default function EmotionWheelRefactored({
  onEmotionSelect,
  onBack
}: EmotionWheelRefactoredProps) {
  const {
    state,
    selectCore,
    goBack,
    selectSubEmotion,
    setIntensity,
    addTrigger,
    removeTrigger,
    clearTriggers,
    quickSelect,
    getSuggestedTriggers
  } = useEmotionSelection(onEmotionSelect);

  const { selectedCore, showSubEmotions, customIntensity, triggers } = state;

  // Sub-emotions view
  if (showSubEmotions && selectedCore) {
    const subEmotions = getSubEmotionsByCore(selectedCore.id);

    return (
      <div className="emotion-wheel-container">
        {/* Header */}
        <div className="emotion-header">
          <button onClick={goBack} className="back-btn-inline">
            ← Back
          </button>
          <h3 style={{ color: selectedCore.color }}>{selectedCore.name}</h3>
        </div>

        <p className="emotion-description">{selectedCore.description}</p>

        {/* Intensity Selector */}
        <IntensitySelector
          selectedIntensity={customIntensity}
          onIntensityChange={setIntensity}
          accentColor={selectedCore.color}
        />

        {/* Trigger Input */}
        <TriggerInput
          triggers={triggers}
          onAddTrigger={addTrigger}
          onRemoveTrigger={removeTrigger}
          onClearTriggers={clearTriggers}
          suggestions={getSuggestedTriggers()}
          maxTriggers={3}
        />

        {/* Quick Actions */}
        <QuickActions
          selectedEmotion={selectedCore}
          selectedIntensity={customIntensity}
          onQuickLog={quickSelect}
        />

        {/* Sub-emotions Grid */}
        <div className="sub-emotions-grid">
          <h4>Or choose a more specific feeling:</h4>
          {subEmotions.map((subEmotion, index) => (
            <button
              key={subEmotion.id}
              onClick={() => selectSubEmotion(subEmotion)}
              className="sub-emotion-card"
              style={{
                backgroundColor: subEmotion.color + '15',
                borderColor: subEmotion.color,
                animationDelay: `${calculateStaggerDelay(index, subEmotions.length, 100)}ms`
              }}
            >
              <div className="sub-emotion-content">
                <div className="sub-emotion-main">
                  <span className="sub-emotion-name" style={{ color: subEmotion.color }}>
                    {subEmotion.name}
                  </span>
                  <span className="sub-emotion-intensity" style={{ color: subEmotion.color }}>
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

        <style jsx>{`
          .emotion-wheel-container { animation: fadeIn 0.3s ease; }
          .emotion-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
          .back-btn-inline { padding: 8px 12px; background: transparent; border: none; color: var(--text); cursor: pointer; font-size: 14px; transition: all 0.2s; }
          .back-btn-inline:hover { background: var(--secondary); border-radius: 8px; }
          .emotion-description { color: var(--muted); font-size: 14px; margin-bottom: 24px; }
          .sub-emotions-grid { display: flex; flex-direction: column; gap: 12px; }
          .sub-emotions-grid h4 { font-size: 14px; color: var(--muted); margin-bottom: 8px; }
          .sub-emotion-card { padding: 14px 16px; border: 2px solid; border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: left; width: 100%; animation: slideInLeft 0.4s ease-out both; }
          .sub-emotion-card:hover { transform: translateX(4px); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .sub-emotion-content { display: flex; flex-direction: column; gap: 6px; }
          .sub-emotion-main { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
          .sub-emotion-name { font-weight: 600; font-size: 15px; flex: 1; }
          .sub-emotion-intensity { font-size: 16px; letter-spacing: 2px; opacity: 0.9; }
          .sub-emotion-desc { font-size: 13px; color: var(--muted); line-height: 1.4; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        `}</style>
      </div>
    );
  }

  // Main emotion selection view
  return (
    <div className="emotion-wheel-container">
      <h3>How are you feeling?</h3>
      <p className="helper-text">
        Tap an emotion to explore it deeper, or long-press for quick logging
      </p>

      {/* Core Emotions Grid */}
      <div className="emotion-cores-grid">
        {EMOTION_CORES.map((core, index) => (
          <WheelSegment
            key={core.id}
            emotion={core}
            onClick={selectCore}
            onContextMenu={quickSelect}
            animationDelay={calculateStaggerDelay(index, EMOTION_CORES.length, 150)}
          />
        ))}
      </div>

      <style jsx>{`
        .emotion-wheel-container { animation: fadeIn 0.3s ease; }
        .helper-text { color: var(--muted); font-size: 13px; margin-bottom: 20px; text-align: center; }
        .emotion-cores-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}