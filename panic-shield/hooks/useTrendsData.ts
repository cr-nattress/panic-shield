import { useMemo } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { calculateTrendsStats, TrendsStats } from '@/utils/trendCalculations';

/**
 * Custom hook for extracting and calculating trends data
 * Replaces the large useMemo in TrendsPage component
 */
export function useTrendsData(): TrendsStats | null {
  const { logs } = useStore();

  const stats = useMemo(() => {
    return calculateTrendsStats(logs);
  }, [logs]);

  return stats;
}