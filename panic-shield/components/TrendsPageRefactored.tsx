'use client';

import React, { useState } from 'react';
import { Calendar, LineChart, PieChart, Activity } from 'lucide-react';
import { useTrendsData } from '@/hooks/useTrendsData';
import EmotionChart from '@/components/charts/EmotionChartRefactored';
import TrendsSummaryCard from '@/components/trends/TrendsSummaryCard';
import EmotionDistribution from '@/components/trends/EmotionDistribution';
import TriggerAnalysis from '@/components/trends/TriggerAnalysis';
import PatternInsights from '@/components/trends/PatternInsights';
import RecentLogs from '@/components/trends/RecentLogs';
import { useStore } from '@/contexts/StoreContext';

interface TrendsPageRefactoredProps {
  onNavigate: (page: string) => void;
}

export default function TrendsPageRefactored({ onNavigate }: TrendsPageRefactoredProps) {
  const { logs } = useStore();
  const stats = useTrendsData();
  const [activeChart, setActiveChart] = useState<'timeline' | 'distribution' | 'intensity' | 'weekly'>('timeline');

  return (
    <div className="page trends-page">
      <div className="header">
        <h2>Your Trends</h2>
      </div>

      {stats ? (
        <div className="trends-content">
          <TrendsSummaryCard stats={stats} />

          {/* Visual Charts Section */}
          <div className="charts-section">
            <div className="chart-tabs">
              <button
                className={`chart-tab ${activeChart === 'timeline' ? 'active' : ''}`}
                onClick={() => setActiveChart('timeline')}
              >
                <LineChart size={16} />
                Timeline
              </button>
              <button
                className={`chart-tab ${activeChart === 'distribution' ? 'active' : ''}`}
                onClick={() => setActiveChart('distribution')}
              >
                <PieChart size={16} />
                Distribution
              </button>
              <button
                className={`chart-tab ${activeChart === 'intensity' ? 'active' : ''}`}
                onClick={() => setActiveChart('intensity')}
              >
                <Activity size={16} />
                Intensity
              </button>
              <button
                className={`chart-tab ${activeChart === 'weekly' ? 'active' : ''}`}
                onClick={() => setActiveChart('weekly')}
              >
                <Calendar size={16} />
                Weekly
              </button>
            </div>

            <EmotionChart logs={logs} type={activeChart} />
          </div>

          <EmotionDistribution stats={stats} />
          <TriggerAnalysis stats={stats} />
          <PatternInsights stats={stats} />
          <RecentLogs stats={stats} />
        </div>
      ) : (
        <div className="empty-state">
          <Calendar size={48} />
          <h3>No logs yet</h3>
          <p>Start logging your emotions to see patterns</p>
          <button onClick={() => onNavigate('log')} className="btn-primary">
            Log your first emotion
          </button>
        </div>
      )}

      <style jsx>{`
        .charts-section {
          margin: 20px 0;
        }

        .chart-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .chart-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: var(--secondary);
          border: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .chart-tab.active {
          background: var(--primary);
          color: var(--primary-text);
        }

        .chart-tab:hover:not(.active) {
          background: var(--card);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}