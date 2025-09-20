import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { TrendsStats } from '@/utils/trendCalculations';

interface TrendsSummaryCardProps {
  stats: TrendsStats;
}

export default function TrendsSummaryCard({ stats }: TrendsSummaryCardProps) {
  return (
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
  );
}