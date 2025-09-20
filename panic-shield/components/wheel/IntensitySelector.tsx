/**
 * Intensity selector component with dots visualization
 */

'use client';

import React from 'react';

export interface IntensitySelectorProps {
  selectedIntensity: number;
  onIntensityChange: (intensity: number) => void;
  accentColor?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

interface IntensityLevel {
  value: number;
  label: string;
  description: string;
}

const INTENSITY_LEVELS: IntensityLevel[] = [
  { value: 1, label: 'Mild', description: 'Light, manageable feeling' },
  { value: 2, label: 'Moderate', description: 'Noticeable, present feeling' },
  { value: 3, label: 'Intense', description: 'Strong, overwhelming feeling' }
];

export const IntensitySelector: React.FC<IntensitySelectorProps> = ({
  selectedIntensity,
  onIntensityChange,
  accentColor = '#6B73FF',
  disabled = false,
  size = 'medium',
  className = ''
}) => {
  const handleIntensitySelect = (intensity: number) => {
    if (!disabled) {
      onIntensityChange(intensity);
    }
  };

  const sizeClasses = {
    small: 'intensity-selector-small',
    medium: 'intensity-selector-medium',
    large: 'intensity-selector-large'
  };

  return (
    <>
      <div className={`intensity-selector ${sizeClasses[size]} ${disabled ? 'disabled' : ''} ${className}`}>
        <label className="intensity-label">
          How intense is this feeling?
        </label>
        <div className="intensity-buttons-container">
          {INTENSITY_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => handleIntensitySelect(level.value)}
              disabled={disabled}
              className={`intensity-btn ${selectedIntensity === level.value ? 'active' : ''}`}
              style={{
                backgroundColor: selectedIntensity === level.value ? accentColor : 'transparent',
                borderColor: accentColor,
                color: selectedIntensity === level.value ? 'white' : 'var(--text)'
              }}
              aria-label={`${level.label} intensity - ${level.description}`}
              title={level.description}
            >
              <span className="intensity-text">
                {level.label}
              </span>
              <div className="intensity-dots">
                {Array(level.value).fill(0).map((_, i) => (
                  <span
                    key={i}
                    className="dot"
                    style={{
                      opacity: 0.6 + (i * 0.2),
                      color: selectedIntensity === level.value ? 'white' : accentColor
                    }}
                  >
                    •
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .intensity-selector {
          margin-bottom: 24px;
        }

        .intensity-selector.disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .intensity-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 12px;
          color: var(--text);
        }

        .intensity-buttons-container {
          display: flex;
          gap: 12px;
        }

        .intensity-btn {
          flex: 1;
          padding: 12px;
          border: 2px solid;
          border-radius: 12px;
          background: var(--card);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          overflow: hidden;
        }

        .intensity-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .intensity-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .intensity-btn.active {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .intensity-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .intensity-text {
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .intensity-dots {
          display: flex;
          gap: 3px;
          justify-content: center;
          align-items: center;
        }

        .dot {
          font-size: 18px;
          line-height: 1;
          transition: all 0.3s ease;
        }

        /* Ripple effect */
        .intensity-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.3;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s;
        }

        .intensity-btn:active::before {
          width: 100px;
          height: 100px;
        }

        /* Size variations */
        .intensity-selector-small .intensity-btn {
          padding: 8px;
          gap: 4px;
        }

        .intensity-selector-small .intensity-text {
          font-size: 12px;
        }

        .intensity-selector-small .dot {
          font-size: 14px;
        }

        .intensity-selector-large .intensity-btn {
          padding: 16px;
          gap: 8px;
        }

        .intensity-selector-large .intensity-text {
          font-size: 15px;
        }

        .intensity-selector-large .dot {
          font-size: 22px;
        }

        /* Focus styles */
        .intensity-btn:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .intensity-btn:focus:not(:focus-visible) {
          outline: none;
        }

        /* Animation for dots */
        .intensity-btn:hover .dot {
          animation: dotBounce 0.6s ease-in-out infinite alternate;
        }

        .intensity-btn.active .dot {
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        @keyframes dotBounce {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-3px);
          }
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        /* Stagger the dot animations */
        .intensity-btn:hover .dot:nth-child(1) {
          animation-delay: 0ms;
        }

        .intensity-btn:hover .dot:nth-child(2) {
          animation-delay: 100ms;
        }

        .intensity-btn:hover .dot:nth-child(3) {
          animation-delay: 200ms;
        }

        .intensity-btn.active .dot:nth-child(1) {
          animation-delay: 0ms;
        }

        .intensity-btn.active .dot:nth-child(2) {
          animation-delay: 300ms;
        }

        .intensity-btn.active .dot:nth-child(3) {
          animation-delay: 600ms;
        }

        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .intensity-btn,
          .dot {
            animation: none !important;
            transition: none;
          }

          .intensity-btn:hover,
          .intensity-btn.active {
            transform: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .intensity-btn {
            border-width: 3px;
          }

          .intensity-btn.active {
            background: ButtonText;
            color: ButtonFace;
          }
        }
      `}</style>
    </>
  );
};