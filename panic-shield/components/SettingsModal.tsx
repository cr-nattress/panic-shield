'use client';

import React from 'react';
import { X, Shield, Download, Trash2 } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { logs, clearLogs } = useStore();

  const exportData = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = `emotion-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      clearLogs();
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button onClick={onClose} className="icon-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="info-card">
            <Shield size={16} />
            <div>
              <strong>Privacy First</strong>
              <p>All data stays on your device. No tracking.</p>
            </div>
          </div>

          <div className="settings-section">
            <h3>Data Management</h3>
            <button onClick={exportData} className="btn-secondary" disabled={logs.length === 0}>
              <Download size={16} />
              Export Data (JSON)
            </button>
            <button onClick={handleClearData} className="btn-danger" disabled={logs.length === 0}>
              <Trash2 size={16} />
              Clear All Data
            </button>
            <small>{logs.length} emotion logs stored</small>
          </div>

          <div className="settings-section">
            <h3>About</h3>
            <p>Emotion Wheel POC v0.1.0</p>
            <small>Evidence-based emotion tracking demo</small>
          </div>
        </div>
      </div>
    </div>
  );
}