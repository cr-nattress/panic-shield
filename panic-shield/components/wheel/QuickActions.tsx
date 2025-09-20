/**
 * Quick actions component for emotion logging shortcuts
 */

'use client';

import React from 'react';
import { Heart, RotateCcw, Zap, Clock, Bookmark } from 'lucide-react';
import { EmotionCore } from '@/utils/emotionDataEnhanced';

export interface QuickActionsProps {
  selectedEmotion?: EmotionCore | null;
  selectedIntensity: number;
  onQuickLog?: (emotion: EmotionCore, intensity: number) => void;
  onUndo?: () => void;
  onSavePreset?: () => void;
  onLoadPreset?: () => void;
  onRecentEmotion?: (emotionId: string) => void;
  recentEmotions?: string[];
  disabled?: boolean;
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  selectedEmotion,
  selectedIntensity,
  onQuickLog,
  onUndo,
  onSavePreset,
  onLoadPreset,
  onRecentEmotion,
  recentEmotions = [],
  disabled = false,
  className = ''
}) => {
  const handleQuickLog = () => {
    if (selectedEmotion && onQuickLog) {
      onQuickLog(selectedEmotion, selectedIntensity);
    }
  };

  const getIntensityLabel = (intensity: number): string => {
    switch (intensity) {
      case 1: return 'Mild';
      case 2: return 'Moderate';
      case 3: return 'Intense';
      default: return 'Unknown';
    }
  };

  const canQuickLog = selectedEmotion && !disabled;

  return (
    <>
      <div className={`quick-actions ${disabled ? 'disabled' : ''} ${className}`}>
        {/* Primary Quick Log Button */}
        {selectedEmotion && (
          <div className="primary-action">
            <button
              onClick={handleQuickLog}
              disabled={!canQuickLog}
              className="quick-log-btn"
              style={{ backgroundColor: selectedEmotion.color }}
            >
              <Heart size={20} />
              <span className="quick-log-text">
                Quick Log: {selectedEmotion.name}
              </span>
              <span className="intensity-indicator">
                ({getIntensityLabel(selectedIntensity)})
              </span>
            </button>
          </div>
        )}

        {/* Secondary Actions */}
        <div className="secondary-actions">
          {/* Undo Button */}
          {onUndo && (
            <button
              onClick={onUndo}
              disabled={disabled}
              className="action-btn undo-btn"
              title="Undo last action"
              aria-label="Undo last action"
            >
              <RotateCcw size={16} />
              <span>Undo</span>
            </button>
          )}

          {/* Quick Access Buttons */}
          {onSavePreset && (
            <button
              onClick={onSavePreset}
              disabled={disabled || !selectedEmotion}
              className="action-btn save-btn"
              title="Save current selection as preset"
              aria-label="Save current selection as preset"
            >
              <Bookmark size={16} />
              <span>Save</span>
            </button>
          )}

          {onLoadPreset && (
            <button
              onClick={onLoadPreset}
              disabled={disabled}
              className="action-btn load-btn"
              title="Load saved preset"
              aria-label="Load saved preset"
            >
              <Zap size={16} />
              <span>Presets</span>
            </button>
          )}
        </div>

        {/* Recent Emotions */}
        {recentEmotions.length > 0 && onRecentEmotion && (
          <div className="recent-emotions">
            <span className="recent-label">
              <Clock size={14} />
              Recent:
            </span>
            <div className="recent-buttons">
              {recentEmotions.slice(0, 3).map((emotionId, index) => (
                <button
                  key={`${emotionId}-${index}`}
                  onClick={() => onRecentEmotion(emotionId)}
                  disabled={disabled}
                  className="recent-emotion-btn"
                  title={`Quick select ${emotionId}`}
                >
                  {emotionId}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="help-text">
          {selectedEmotion
            ? 'Tap to quickly log this emotion, or explore sub-emotions above'
            : 'Select an emotion to enable quick logging'
          }
        </div>
      </div>

      <style jsx>{`
        .quick-actions {
          margin-bottom: 24px;
        }

        .quick-actions.disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .primary-action {
          margin-bottom: 16px;
        }

        .quick-log-btn {
          width: 100%;
          padding: 16px 20px;
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }

        .quick-log-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quick-log-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .quick-log-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .quick-log-text {
          flex: 1;
          text-align: center;
        }

        .intensity-indicator {
          font-size: 13px;
          opacity: 0.9;
          font-weight: 400;
        }

        /* Pulse animation for the primary button */
        .quick-log-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .secondary-actions {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .action-btn {
          flex: 1;
          padding: 10px 12px;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-btn:hover:not(:disabled) {
          background: var(--secondary);
          border-color: var(--accent);
          transform: translateY(-1px);
        }

        .undo-btn:hover:not(:disabled) {
          border-color: #f59e0b;
          color: #f59e0b;
        }

        .save-btn:hover:not(:disabled) {
          border-color: #10b981;
          color: #10b981;
        }

        .load-btn:hover:not(:disabled) {
          border-color: #8b5cf6;
          color: #8b5cf6;
        }

        .recent-emotions {
          margin-bottom: 16px;
          padding: 12px;
          background: var(--secondary);
          border-radius: 8px;
        }

        .recent-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 8px;
        }

        .recent-buttons {
          display: flex;
          gap: 6px;
        }

        .recent-emotion-btn {
          padding: 6px 10px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          color: var(--text);
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: capitalize;
        }

        .recent-emotion-btn:hover:not(:disabled) {
          background: var(--accent);
          color: white;
          transform: scale(1.05);
        }

        .help-text {
          font-size: 12px;
          color: var(--muted);
          text-align: center;
          line-height: 1.4;
        }

        /* Ripple effect for buttons */
        .action-btn,
        .recent-emotion-btn {
          position: relative;
          overflow: hidden;
        }

        .action-btn:active::before,
        .recent-emotion-btn:active::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          animation: ripple 0.6s ease-out;
        }

        @keyframes ripple {
          to {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        /* Focus styles */
        .quick-log-btn:focus,
        .action-btn:focus,
        .recent-emotion-btn:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .quick-log-btn:focus:not(:focus-visible),
        .action-btn:focus:not(:focus-visible),
        .recent-emotion-btn:focus:not(:focus-visible) {
          outline: none;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .quick-log-btn,
          .action-btn,
          .recent-emotion-btn {
            animation: none;
            transition: none;
          }

          .quick-log-btn:hover,
          .action-btn:hover {
            transform: none;
          }

          .quick-log-btn::before {
            animation: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .action-btn {
            border-width: 3px;
          }

          .quick-log-btn {
            border: 3px solid rgba(255, 255, 255, 0.5);
          }
        }
      `}</style>
    </>
  );
};