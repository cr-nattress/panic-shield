export const logPageStyles = `
  .log-page {
    min-height: 100vh;
    background: linear-gradient(180deg, var(--background) 0%, var(--secondary) 100%);
  }

  .log-page .header {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    background: var(--card);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .log-page .header h2 {
    flex: 1;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: var(--text);
  }

  .back-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--secondary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text);
  }

  .back-btn:hover {
    background: var(--primary);
    color: var(--primary-text);
    transform: scale(1.1);
  }

  .back-btn:active {
    transform: scale(0.95);
  }

  .undo-btn {
    padding: 8px 16px;
    background: var(--warning);
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }

  .undo-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
  }

  .step-content {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    animation: fadeSlideIn 0.3s ease;
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Emotion Summary Card */
  .emotion-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 16px;
    border: 2px solid;
    margin-bottom: 32px;
    backdrop-filter: blur(10px);
    animation: pulseGlow 2s ease infinite;
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
    50% { box-shadow: 0 0 30px rgba(0, 0, 0, 0.15); }
  }

  .emotion-label {
    font-size: 14px;
    color: var(--muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .emotion-name {
    flex: 1;
    font-size: 20px;
    font-weight: 700;
  }

  .emotion-intensity {
    font-size: 24px;
    letter-spacing: 4px;
  }

  /* Section Headers */
  .step-content h3 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text);
  }

  .subtitle {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 24px;
  }

  /* Trigger Categories */
  .trigger-categories {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: none;
  }

  .trigger-categories::-webkit-scrollbar {
    display: none;
  }

  .category-tab {
    padding: 10px 20px;
    background: var(--card);
    border: 2px solid var(--border);
    border-radius: 24px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    color: var(--text);
  }

  .category-tab.active {
    background: var(--primary);
    color: var(--primary-text);
    border-color: var(--primary);
    transform: scale(1.05);
  }

  .category-tab:hover:not(.active) {
    background: var(--secondary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Trigger Tags */
  .trigger-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 32px;
  }

  .trigger-tag {
    padding: 10px 18px;
    border: 2px solid;
    border-radius: 20px;
    background: var(--card);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
    overflow: hidden;
  }

  .trigger-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .trigger-tag:hover::before {
    left: 100%;
  }

  .trigger-tag.selected {
    color: white;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .trigger-tag:hover:not(.selected) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Notes Section */
  .notes-section {
    margin: 32px 0;
    position: relative;
  }

  .notes-section label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--text);
  }

  .notes-section textarea {
    width: 100%;
    padding: 16px;
    background: var(--card);
    border: 2px solid var(--border);
    border-radius: 16px;
    font-size: 15px;
    line-height: 1.6;
    resize: vertical;
    color: var(--text);
    font-family: inherit;
    transition: all 0.3s;
  }

  .notes-section textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.1);
  }

  .notes-section textarea::placeholder {
    color: var(--muted);
    opacity: 0.7;
  }

  .char-count {
    position: absolute;
    bottom: -24px;
    right: 0;
    font-size: 12px;
    color: var(--muted);
    background: var(--background);
    padding: 2px 8px;
    border-radius: 12px;
  }

  /* Button Group */
  .button-group {
    display: flex;
    gap: 12px;
    margin-top: 40px;
  }

  .btn-primary, .btn-secondary {
    flex: 1;
    padding: 16px 24px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: var(--primary-text);
    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .btn-secondary {
    background: var(--secondary);
    color: var(--text);
    border: 2px solid var(--border);
  }

  .btn-secondary:hover {
    background: var(--card);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Suggestion Card */
  .suggestion-card {
    padding: 24px;
    background: var(--card);
    border: 2px solid;
    border-radius: 20px;
    margin: 24px 0;
    position: relative;
    overflow: hidden;
  }

  .suggestion-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
  }

  .suggestion-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }

  .suggestion-text {
    font-size: 16px;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 16px;
    color: var(--text);
  }

  .suggestion-duration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
    color: var(--muted);
  }

  /* Trigger Insights */
  .trigger-insights {
    padding: 16px;
    background: var(--card);
    border: 1px solid;
    border-radius: 12px;
    margin: 20px 0;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .trigger-insights p {
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    color: var(--text);
  }

  .trigger-insights strong {
    font-weight: 600;
  }

  /* Progress Bar */
  .progress-bar {
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    padding: 12px;
    background: var(--card);
    border-radius: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .progress-segment {
    width: 40px;
    height: 4px;
    background: var(--secondary);
    border-radius: 2px;
    transition: all 0.3s;
  }

  .progress-segment.active {
    background: var(--primary);
    transform: scaleX(1.2);
  }
`;

export default logPageStyles;