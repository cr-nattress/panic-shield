'use client';

import React from 'react';
import { Phone } from 'lucide-react';

interface EmergencyContactsProps {
  onContactClick?: (number: string) => void;
}

export default function EmergencyContacts({ onContactClick }: EmergencyContactsProps) {
  const handleContactClick = (action: string, number: string) => {
    if (onContactClick) {
      onContactClick(number);
    }
    window.location.href = action;
  };

  return (
    <div className="help-section">
      <h2 className="help-title">Emergency Support</h2>
      <p className="help-subtitle">If you're in crisis, immediate help is available</p>

      <div className="emergency-contacts">
        <button
          onClick={() => handleContactClick('tel:988', '988')}
          className="emergency-contact"
        >
          <Phone size={24} />
          <span className="emergency-number">988</span>
          <span className="emergency-label">Crisis Lifeline</span>
        </button>

        <button
          onClick={() => handleContactClick('tel:911', '911')}
          className="emergency-contact"
        >
          <Phone size={24} />
          <span className="emergency-number">911</span>
          <span className="emergency-label">Emergency</span>
        </button>

        <button
          onClick={() => handleContactClick('sms:741741', '741741')}
          className="emergency-contact"
        >
          <Phone size={24} />
          <span className="emergency-number">741741</span>
          <span className="emergency-label">Crisis Text Line</span>
        </button>
      </div>

      <div className="additional-resources">
        <p className="resource-note">These services are available 24/7</p>
        <p className="resource-note">Your call or text is confidential</p>
      </div>
    </div>
  );
}