'use client';

import React, { useState } from 'react';
import { Download, FileJson, FileText, FileSpreadsheet, X } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import {
  exportEmotionsAsJSON,
  exportEmotionsAsCSV,
  exportEmotionsAsMarkdown
} from '@/utils/dataExport';
import styles from './ExportModal.module.css';

interface ExportModalProps {
  onClose: () => void;
}

export default function ExportModal({ onClose }: ExportModalProps) {
  const { logs, achievements } = useStore();
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'markdown'>('json');
  const [dateRange, setDateRange] = useState<'all' | 'week' | 'month' | 'custom'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = () => {
    // Filter logs based on date range
    let filteredLogs = [...logs];

    if (dateRange !== 'all') {
      const now = new Date();
      let fromDate: Date;

      if (dateRange === 'week') {
        const fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filteredLogs = filteredLogs.filter(log => {
          const logDate = new Date(log.timestamp);
          return logDate >= fromDate;
        });
      } else if (dateRange === 'month') {
        const fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filteredLogs = filteredLogs.filter(log => {
          const logDate = new Date(log.timestamp);
          return logDate >= fromDate;
        });
      } else if (dateRange === 'custom' && startDate && endDate) {
        const fromDate = new Date(startDate);
        const toDate = new Date(endDate);
        filteredLogs = filteredLogs.filter(log => {
          const logDate = new Date(log.timestamp);
          return logDate >= fromDate && logDate <= toDate;
        });
      }
    }

    // Export based on selected format
    switch (exportFormat) {
      case 'json':
        exportEmotionsAsJSON(filteredLogs, achievements);
        break;
      case 'csv':
        exportEmotionsAsCSV(filteredLogs);
        break;
      case 'markdown':
        exportEmotionsAsMarkdown(filteredLogs, achievements);
        break;
    }

    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Export Your Data</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* Format Selection */}
          <div className={styles.section}>
            <h3>Choose Format</h3>
            <div className={styles.formatOptions}>
              <button
                className={`${styles.formatButton} ${exportFormat === 'json' ? styles.active : ''}`}
                onClick={() => setExportFormat('json')}
              >
                <FileJson size={32} />
                <span>JSON</span>
                <small>Complete data with metadata</small>
              </button>

              <button
                className={`${styles.formatButton} ${exportFormat === 'csv' ? styles.active : ''}`}
                onClick={() => setExportFormat('csv')}
              >
                <FileSpreadsheet size={32} />
                <span>CSV</span>
                <small>Open in Excel/Sheets</small>
              </button>

              <button
                className={`${styles.formatButton} ${exportFormat === 'markdown' ? styles.active : ''}`}
                onClick={() => setExportFormat('markdown')}
              >
                <FileText size={32} />
                <span>Markdown</span>
                <small>Formatted report</small>
              </button>
            </div>
          </div>

          {/* Date Range Selection */}
          <div className={styles.section}>
            <h3>Date Range</h3>
            <div className={styles.dateOptions}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="dateRange"
                  value="all"
                  checked={dateRange === 'all'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                />
                <span>All time ({logs.length} logs)</span>
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="dateRange"
                  value="week"
                  checked={dateRange === 'week'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                />
                <span>Last 7 days</span>
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="dateRange"
                  value="month"
                  checked={dateRange === 'month'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                />
                <span>Last 30 days</span>
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="dateRange"
                  value="custom"
                  checked={dateRange === 'custom'}
                  onChange={(e) => setDateRange(e.target.value as any)}
                />
                <span>Custom range</span>
              </label>
            </div>

            {dateRange === 'custom' && (
              <div className={styles.customDateRange}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={styles.dateInput}
                />
                <span>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={styles.dateInput}
                />
              </div>
            )}
          </div>

          {/* Export Info */}
          <div className={styles.infoBox}>
            <p>
              <strong>What's included:</strong>
            </p>
            <ul>
              <li>All emotion logs with timestamps</li>
              <li>Intensity levels and triggers</li>
              <li>Notes and reflections</li>
              {exportFormat !== 'csv' && <li>Statistics and insights</li>}
              {exportFormat === 'json' && <li>Achievement progress</li>}
            </ul>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.exportButton} onClick={handleExport}>
            <Download size={20} />
            Export {exportFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}