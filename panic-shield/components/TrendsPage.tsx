'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, BarChart3, TrendingUp, Calendar, Brain, Target, AlertTriangle, LineChart, PieChart, Activity } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { getSubEmotionById, getEmotionCore, EMOTION_CORES } from '@/utils/emotionDataEnhanced';
import EmotionChart from '@/components/charts/EmotionChart';

interface TrendsPageProps {
  onNavigate: (page: string) => void;
}

export default function TrendsPage({ onNavigate }: TrendsPageProps) {
  const { logs } = useStore();
  const [activeChart, setActiveChart] = useState<'timeline' | 'distribution' | 'intensity' | 'weekly'>('timeline');

  const stats = useMemo(() => {
    if (logs.length === 0) return null;

    // Core emotion counts
    const coreCounts: Record<string, number> = {};
    const triggerCounts: Record<string, number> = {};
    const emotionTriggerMap: Record<string, string[]> = {};
    const intensityByCore: Record<string, number[]> = {};

    logs.forEach(log => {
      // Get emotion details
      const subEmotion = getSubEmotionById(log.emotionId);
      const coreId = subEmotion ? subEmotion.coreId : log.emotionId;
      const coreEmotion = getEmotionCore(coreId);

      if (coreEmotion) {
        // Count core emotions
        coreCounts[coreEmotion.id] = (coreCounts[coreEmotion.id] || 0) + 1;

        // Track intensity by core
        if (!intensityByCore[coreEmotion.id]) {
          intensityByCore[coreEmotion.id] = [];
        }
        intensityByCore[coreEmotion.id].push(log.intensity);

        // Count triggers
        if (log.triggers) {
          log.triggers.forEach(trigger => {
            triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;

            // Map emotions to triggers
            const key = `${coreEmotion.id}_${trigger}`;
            if (!emotionTriggerMap[key]) {
              emotionTriggerMap[key] = [];
            }
            emotionTriggerMap[key].push(log.id);
          });
        }
      }
    });

    // Calculate average intensity
    const avgIntensity = logs.reduce((sum, log) => sum + log.intensity, 0) / logs.length;

    // Find top triggers
    const topTriggers = Object.entries(triggerCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Find patterns (emotion-trigger combinations)
    const patterns = Object.entries(emotionTriggerMap)
      .map(([key, occurrences]) => {
        const [emotion, trigger] = key.split('_');
        return { emotion, trigger, count: occurrences.length };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Calculate average intensity per core
    const avgIntensityByCore: Record<string, number> = {};
    Object.entries(intensityByCore).forEach(([core, intensities]) => {
      avgIntensityByCore[core] = intensities.reduce((sum, i) => sum + i, 0) / intensities.length;
    });

    return {
      total: logs.length,
      avgIntensity: avgIntensity.toFixed(1),
      coreCounts,
      topTriggers,
      patterns,
      avgIntensityByCore,
      recentLogs: logs.slice(-10).reverse()
    };
  }, [logs]);

  const getEmotionColor = (emotionId: string) => {
    const subEmotion = getSubEmotionById(emotionId);
    if (subEmotion) return subEmotion.color;

    const coreEmotion = getEmotionCore(emotionId);
    return coreEmotion?.color || '#999';
  };

  const getEmotionName = (emotionId: string) => {
    const subEmotion = getSubEmotionById(emotionId);
    if (subEmotion) return subEmotion.name;

    const coreEmotion = getEmotionCore(emotionId);
    return coreEmotion?.name || 'Unknown';
  };

  return (
    <div className="page trends-page">
      <div className="header">
        <button onClick={() => onNavigate('home')} className="back-btn">
          <ChevronLeft size={24} />
        </button>
        <h2>Your Trends</h2>
      </div>

      {stats ? (
        <div className="trends-content">
          <div className="stats-grid">
            <div className="stat-card">
              <BarChart3 size={20} />
              <span className="stat-label">Total logs</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-card">
              <TrendingUp size={20} />
              <span className="stat-label">Avg intensity</span>
              <span className="stat-value">{stats.avgIntensity}</span>
            </div>
          </div>

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

          <div className="emotion-distribution">
            <h3>Emotion distribution</h3>
            {Object.entries(stats.coreCounts).map(([core, count]) => {
              const percentage = (count / stats.total) * 100;
              const coreEmotion = EMOTION_CORES.find(e => e.id === core);
              const avgIntensity = stats.avgIntensityByCore[core];

              return (
                <div key={core} className="distribution-row">
                  <span className="distribution-label">{coreEmotion?.name || core}</span>
                  <div className="distribution-bar">
                    <div
                      className="distribution-fill"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: coreEmotion?.color,
                        opacity: 0.4 + (avgIntensity * 0.2)
                      }}
                    />
                  </div>
                  <span className="distribution-count">{count}</span>
                  <span className="distribution-intensity" title="Average intensity">
                    {'•'.repeat(Math.round(avgIntensity))}
                  </span>
                </div>
              );
            })}
          </div>

          {stats.topTriggers.length > 0 && (
            <div className="trigger-analysis">
              <h3>
                <Target size={16} />
                Top triggers
              </h3>
              <div className="trigger-list">
                {stats.topTriggers.map(([trigger, count]) => (
                  <div key={trigger} className="trigger-item">
                    <span className="trigger-name">{trigger}</span>
                    <span className="trigger-count">{count} times</span>
                    <div className="trigger-bar">
                      <div
                        className="trigger-fill"
                        style={{
                          width: `${(count / stats.total) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.patterns.length > 0 && (
            <div className="pattern-insights">
              <h3>
                <Brain size={16} />
                Patterns detected
              </h3>
              {stats.patterns.map((pattern, index) => {
                const coreEmotion = EMOTION_CORES.find(e => e.id === pattern.emotion);
                return (
                  <div key={index} className="pattern-card" style={{ borderColor: coreEmotion?.color }}>
                    <AlertTriangle size={14} style={{ color: coreEmotion?.color }} />
                    <p>
                      You often feel <strong style={{ color: coreEmotion?.color }}>{coreEmotion?.name.toLowerCase()}</strong> when
                      dealing with <strong>{pattern.trigger}</strong> ({pattern.count} times)
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="recent-logs">
            <h3>Recent logs</h3>
            {stats.recentLogs.map(log => {
              const color = getEmotionColor(log.emotionId);
              const name = getEmotionName(log.emotionId);

              return (
                <div key={log.id} className="log-item">
                  <div className="log-emotion">
                    <div className="log-dot" style={{ backgroundColor: color }} />
                    <div>
                      <strong>{name}</strong>
                      <small>{formatDate(log.timestamp)}</small>
                    </div>
                  </div>
                  <div className="log-details">
                    <span className="log-intensity">{'•'.repeat(log.intensity)}</span>
                    {log.triggers && log.triggers.length > 0 && (
                      <small className="log-triggers">{log.triggers.join(', ')}</small>
                    )}
                    {log.notes && (
                      <small className="log-notes" title={log.notes}>
                        📝 {log.notes.substring(0, 30)}...
                      </small>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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

        .trigger-analysis {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .trigger-analysis h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .trigger-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trigger-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .trigger-name {
          font-size: 14px;
          text-transform: capitalize;
        }

        .trigger-count {
          font-size: 12px;
          color: var(--muted);
        }

        .trigger-bar {
          grid-column: 1 / -1;
          height: 4px;
          background: var(--secondary);
          border-radius: 2px;
          overflow: hidden;
        }

        .trigger-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .pattern-insights {
          padding: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .pattern-insights h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .pattern-card {
          padding: 12px;
          background: var(--secondary);
          border-left: 3px solid;
          border-radius: 4px;
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .pattern-card p {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }

        .distribution-row {
          display: grid;
          grid-template-columns: 80px 1fr 40px 30px;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .distribution-intensity {
          font-size: 14px;
          opacity: 0.8;
        }

        .log-intensity {
          font-size: 16px;
        }

        .log-triggers {
          display: block;
          color: var(--muted);
          font-size: 12px;
          margin-top: 2px;
          text-transform: capitalize;
        }

        .log-notes {
          display: block;
          color: var(--muted);
          font-size: 12px;
          margin-top: 2px;
          font-style: italic;
        }

        .log-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
      `}</style>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(date));
}