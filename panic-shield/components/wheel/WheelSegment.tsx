/**
 * Individual emotion segment component for wheel rendering
 */

'use client';

import React from 'react';
import { EmotionCore } from '@/utils/emotionDataEnhanced';
import { ChevronRight } from 'lucide-react';

export interface WheelSegmentProps {
  emotion: EmotionCore;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: (emotion: EmotionCore) => void;
  onContextMenu?: (emotion: EmotionCore) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  style?: React.CSSProperties;
  animationDelay?: number;
}

const getEmotionIcon = (emotionId: string): string => {
  const icons: Record<string, string> = {
    anger: '😠',
    disgust: '🤢',
    sad: '😢',
    happy: '😊',
    surprise: '😲',
    fear: '😰'
  };
  return icons[emotionId] || '😐';
};

export const WheelSegment: React.FC<WheelSegmentProps> = ({
  emotion,
  isSelected = false,
  isHovered = false,
  onClick,
  onContextMenu,
  onMouseEnter,
  onMouseLeave,
  className = '',
  style,
  animationDelay = 0
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(emotion);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu?.(emotion);
  };

  const baseStyle: React.CSSProperties = {
    backgroundColor: emotion.color + '20',
    borderColor: emotion.color,
    animationDelay: `${animationDelay}ms`,
    ...style
  };

  return (
    <>
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`emotion-core-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''} ${className}`}
        style={baseStyle}
        data-emotion-id={emotion.id}
        aria-label={`Select ${emotion.name} emotion`}
        title={emotion.description}
      >
        <div
          className="emotion-core-circle"
          style={{ backgroundColor: emotion.color }}
        >
          <span className="emotion-core-icon">
            {getEmotionIcon(emotion.id)}
          </span>
        </div>
        <span className="emotion-core-name">{emotion.name}</span>
        <ChevronRight size={16} className="emotion-core-arrow" />
      </button>

      <style jsx>{`
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
          animation: slideInScale 0.4s ease-out both;
        }

        .emotion-core-card:hover,
        .emotion-core-card.hovered {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .emotion-core-card:active {
          transform: scale(0.98);
        }

        .emotion-core-card.selected {
          transform: scale(1.08);
          box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }

        .emotion-core-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .emotion-core-card:hover .emotion-core-circle,
        .emotion-core-card.hovered .emotion-core-circle {
          transform: scale(1.1);
        }

        .emotion-core-card.selected .emotion-core-circle {
          transform: scale(1.15);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8);
        }

        .emotion-core-icon {
          font-size: 32px;
          transition: all 0.3s ease;
        }

        .emotion-core-card:hover .emotion-core-icon,
        .emotion-core-card.hovered .emotion-core-icon {
          transform: scale(1.1);
        }

        .emotion-core-name {
          font-weight: 600;
          font-size: 16px;
          color: var(--text);
          transition: all 0.2s ease;
        }

        .emotion-core-card:hover .emotion-core-name,
        .emotion-core-card.hovered .emotion-core-name {
          transform: translateY(-2px);
        }

        .emotion-core-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .emotion-core-card:hover .emotion-core-arrow,
        .emotion-core-card.hovered .emotion-core-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(4px);
        }

        .emotion-core-card.selected .emotion-core-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(6px);
        }

        @keyframes slideInScale {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Pulse animation for selection feedback */
        .emotion-core-card.selected::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 20px;
          background: currentColor;
          opacity: 0.1;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.05;
          }
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
        }

        /* Accessibility improvements */
        .emotion-core-card:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .emotion-core-card:focus:not(:focus-visible) {
          outline: none;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .emotion-core-card {
            animation: none;
            transition: none;
          }

          .emotion-core-card:hover {
            transform: none;
          }

          .emotion-core-card.selected::before {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};