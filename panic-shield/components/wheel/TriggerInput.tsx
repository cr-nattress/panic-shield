/**
 * Trigger input component with tags and suggestions
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Tag } from 'lucide-react';

export interface TriggerInputProps {
  triggers: string[];
  onAddTrigger: (trigger: string) => void;
  onRemoveTrigger: (trigger: string) => void;
  onClearTriggers?: () => void;
  suggestions?: string[];
  placeholder?: string;
  maxTriggers?: number;
  disabled?: boolean;
  className?: string;
}

export const TriggerInput: React.FC<TriggerInputProps> = ({
  triggers,
  onAddTrigger,
  onRemoveTrigger,
  onClearTriggers,
  suggestions = [],
  placeholder = 'What triggered this feeling?',
  maxTriggers = 5,
  disabled = false,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on input and exclude already selected triggers
  const filteredSuggestions = suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !triggers.includes(suggestion) &&
      inputValue.length > 0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
    setFocusedSuggestionIndex(-1);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedSuggestionIndex >= 0 && filteredSuggestions[focusedSuggestionIndex]) {
        addTrigger(filteredSuggestions[focusedSuggestionIndex]);
      } else if (inputValue.trim()) {
        addTrigger(inputValue.trim());
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedSuggestionIndex(prev =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
    } else if (e.key === 'Backspace' && inputValue === '' && triggers.length > 0) {
      // Remove last trigger when backspacing on empty input
      onRemoveTrigger(triggers[triggers.length - 1]);
    }
  };

  const addTrigger = (trigger: string) => {
    if (
      trigger &&
      !triggers.includes(trigger) &&
      triggers.length < maxTriggers &&
      !disabled
    ) {
      onAddTrigger(trigger);
      setInputValue('');
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTrigger(suggestion);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
    }, 150);
  };

  const handleInputFocus = () => {
    if (inputValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Effect to scroll focused suggestion into view
  useEffect(() => {
    if (focusedSuggestionIndex >= 0) {
      const suggestionElement = document.querySelector(
        `[data-suggestion-index="${focusedSuggestionIndex}"]`
      );
      suggestionElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedSuggestionIndex]);

  const canAddMore = triggers.length < maxTriggers;

  return (
    <>
      <div className={`trigger-input-container ${disabled ? 'disabled' : ''} ${className}`}>
        <label className="trigger-label">
          <Tag size={16} />
          What triggered this feeling?
          {triggers.length > 0 && (
            <span className="trigger-count">({triggers.length}/{maxTriggers})</span>
          )}
        </label>

        {/* Selected triggers */}
        {triggers.length > 0 && (
          <div className="trigger-tags">
            {triggers.map((trigger, index) => (
              <div key={`${trigger}-${index}`} className="trigger-tag">
                <span>{trigger}</span>
                <button
                  onClick={() => onRemoveTrigger(trigger)}
                  disabled={disabled}
                  className="remove-trigger"
                  aria-label={`Remove ${trigger} trigger`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {onClearTriggers && triggers.length > 1 && (
              <button
                onClick={onClearTriggers}
                disabled={disabled}
                className="clear-all-triggers"
                aria-label="Clear all triggers"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* Input field */}
        {canAddMore && (
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              disabled={disabled}
              className="trigger-input"
              aria-describedby="trigger-help"
            />
            {inputValue && (
              <button
                onClick={() => addTrigger(inputValue.trim())}
                disabled={disabled || !inputValue.trim()}
                className="add-trigger-btn"
                aria-label="Add trigger"
              >
                <Plus size={16} />
              </button>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`suggestion-item ${
                      index === focusedSuggestionIndex ? 'focused' : ''
                    }`}
                    data-suggestion-index={index}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Help text */}
        <div id="trigger-help" className="help-text">
          {canAddMore
            ? 'Type and press Enter, or click suggestions below'
            : `Maximum ${maxTriggers} triggers reached`}
        </div>

        {/* Quick suggestions */}
        {canAddMore && suggestions.length > 0 && (
          <div className="quick-suggestions">
            <span className="suggestions-label">Quick add:</span>
            <div className="suggestion-buttons">
              {suggestions
                .filter(s => !triggers.includes(s))
                .slice(0, 4)
                .map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => addTrigger(suggestion)}
                    disabled={disabled}
                    className="quick-suggestion"
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .trigger-input-container {
          margin-bottom: 24px;
        }

        .trigger-input-container.disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .trigger-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 12px;
          color: var(--text);
        }

        .trigger-count {
          color: var(--muted);
          font-size: 12px;
          font-weight: normal;
        }

        .trigger-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .trigger-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          background: var(--secondary);
          border: 1px solid var(--border);
          border-radius: 16px;
          font-size: 13px;
          color: var(--text);
          animation: tagSlideIn 0.2s ease-out;
        }

        .remove-trigger {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted);
          padding: 2px;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-trigger:hover {
          background: var(--destructive);
          color: white;
        }

        .clear-all-triggers {
          padding: 6px 12px;
          background: var(--destructive);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clear-all-triggers:hover {
          background: var(--destructive);
          opacity: 0.8;
        }

        .input-container {
          position: relative;
        }

        .trigger-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--border);
          border-radius: 12px;
          background: var(--card);
          color: var(--text);
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .trigger-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(107, 115, 255, 0.1);
        }

        .trigger-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .add-trigger-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-trigger-btn:hover {
          background: var(--accent);
          opacity: 0.8;
        }

        .add-trigger-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--card);
          border: 2px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          max-height: 200px;
          overflow-y: auto;
          margin-top: 4px;
        }

        .suggestion-item {
          width: 100%;
          padding: 12px 16px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--text);
          font-size: 14px;
        }

        .suggestion-item:hover,
        .suggestion-item.focused {
          background: var(--secondary);
        }

        .help-text {
          font-size: 12px;
          color: var(--muted);
          margin-top: 8px;
        }

        .quick-suggestions {
          margin-top: 12px;
        }

        .suggestions-label {
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 8px;
          display: block;
        }

        .suggestion-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .quick-suggestion {
          padding: 6px 12px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          font-size: 12px;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-suggestion:hover {
          background: var(--secondary);
          border-color: var(--accent);
        }

        @keyframes tagSlideIn {
          from {
            opacity: 0;
            transform: translateX(-10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .trigger-tag {
            animation: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .trigger-input {
            border-width: 3px;
          }

          .trigger-tag {
            border-width: 2px;
          }
        }
      `}</style>
    </>
  );
};