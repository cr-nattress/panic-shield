/**
 * Hook for managing emotion selection state and logic
 */

import { useState, useCallback } from 'react';
import { EmotionCore, SubEmotion, getSubEmotionsByCore, ALL_TRIGGERS } from '@/utils/emotionDataEnhanced';

export interface EmotionSelectionState {
  selectedCore: EmotionCore | null;
  selectedSubEmotion: SubEmotion | null;
  customIntensity: number;
  showSubEmotions: boolean;
  triggers: string[];
  isLoading: boolean;
}

export interface UseEmotionSelectionReturn {
  // State
  state: EmotionSelectionState;

  // Core emotion actions
  selectCore: (core: EmotionCore) => void;
  clearCoreSelection: () => void;

  // Sub emotion actions
  selectSubEmotion: (subEmotion: SubEmotion) => void;
  clearSubEmotionSelection: () => void;

  // Navigation
  showSubEmotions: () => void;
  hideSubEmotions: () => void;
  goBack: () => void;

  // Intensity management
  setIntensity: (intensity: number) => void;

  // Trigger management
  addTrigger: (trigger: string) => void;
  removeTrigger: (trigger: string) => void;
  clearTriggers: () => void;

  // Quick actions
  quickSelect: (core: EmotionCore, intensity?: number) => void;

  // Utility
  reset: () => void;
  getSubEmotions: () => SubEmotion[];
  getSuggestedTriggers: () => string[];
}

const initialState: EmotionSelectionState = {
  selectedCore: null,
  selectedSubEmotion: null,
  customIntensity: 2,
  showSubEmotions: false,
  triggers: [],
  isLoading: false
};

export const useEmotionSelection = (
  onEmotionSelect?: (emotionId: string, intensity: number, triggers?: string[]) => void
): UseEmotionSelectionReturn => {
  const [state, setState] = useState<EmotionSelectionState>(initialState);

  // Helper function to trigger haptic feedback
  const triggerHapticFeedback = useCallback((pattern: number | number[] = 50) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  // Core emotion selection
  const selectCore = useCallback((core: EmotionCore) => {
    setState(prev => ({
      ...prev,
      selectedCore: core,
      selectedSubEmotion: null, // Clear sub-emotion when selecting new core
      showSubEmotions: false
    }));
    triggerHapticFeedback();
  }, [triggerHapticFeedback]);

  const clearCoreSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedCore: null,
      selectedSubEmotion: null,
      showSubEmotions: false
    }));
  }, []);

  // Sub emotion selection
  const selectSubEmotion = useCallback((subEmotion: SubEmotion) => {
    setState(prev => ({
      ...prev,
      selectedSubEmotion: subEmotion,
      customIntensity: subEmotion.intensity
    }));

    triggerHapticFeedback([50, 50, 50]);

    // Auto-confirm after delay for better UX
    if (onEmotionSelect) {
      setTimeout(() => {
        onEmotionSelect(subEmotion.id, subEmotion.intensity, state.triggers);
      }, 300);
    }
  }, [onEmotionSelect, state.triggers, triggerHapticFeedback]);

  const clearSubEmotionSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedSubEmotion: null
    }));
  }, []);

  // Navigation
  const showSubEmotions = useCallback(() => {
    setState(prev => ({
      ...prev,
      showSubEmotions: true
    }));
  }, []);

  const hideSubEmotions = useCallback(() => {
    setState(prev => ({
      ...prev,
      showSubEmotions: false,
      selectedSubEmotion: null
    }));
  }, []);

  const goBack = useCallback(() => {
    if (state.showSubEmotions) {
      hideSubEmotions();
    } else {
      clearCoreSelection();
    }
  }, [state.showSubEmotions, hideSubEmotions, clearCoreSelection]);

  // Intensity management
  const setIntensity = useCallback((intensity: number) => {
    if (intensity >= 1 && intensity <= 3) {
      setState(prev => ({
        ...prev,
        customIntensity: intensity
      }));
      triggerHapticFeedback(30);
    }
  }, [triggerHapticFeedback]);

  // Trigger management
  const addTrigger = useCallback((trigger: string) => {
    if (trigger.trim() && !state.triggers.includes(trigger.trim())) {
      setState(prev => ({
        ...prev,
        triggers: [...prev.triggers, trigger.trim()]
      }));
    }
  }, [state.triggers]);

  const removeTrigger = useCallback((trigger: string) => {
    setState(prev => ({
      ...prev,
      triggers: prev.triggers.filter(t => t !== trigger)
    }));
  }, []);

  const clearTriggers = useCallback(() => {
    setState(prev => ({
      ...prev,
      triggers: []
    }));
  }, []);

  // Quick actions
  const quickSelect = useCallback((core: EmotionCore, intensity?: number) => {
    const finalIntensity = intensity ?? state.customIntensity;

    triggerHapticFeedback(100);

    if (onEmotionSelect) {
      onEmotionSelect(core.id, finalIntensity, state.triggers);
    }
  }, [state.customIntensity, state.triggers, onEmotionSelect, triggerHapticFeedback]);

  // Utility functions
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const getSubEmotions = useCallback((): SubEmotion[] => {
    if (!state.selectedCore) return [];
    return getSubEmotionsByCore(state.selectedCore.id);
  }, [state.selectedCore]);

  const getSuggestedTriggers = useCallback((): string[] => {
    // Get triggers based on current emotion
    if (state.selectedSubEmotion?.commonTriggers) {
      return state.selectedSubEmotion.commonTriggers;
    }

    // Return common triggers based on core emotion
    const coreBasedTriggers: Record<string, string[]> = {
      anger: ['work', 'traffic', 'conflict', 'deadlines', 'criticism'],
      disgust: ['news', 'social media', 'conflict', 'values', 'behavior'],
      sad: ['alone', 'memories', 'loss', 'rejection', 'failure'],
      happy: ['success', 'friends', 'achievement', 'progress', 'love'],
      surprise: ['news', 'unexpected', 'change', 'discovery', 'meeting'],
      fear: ['future', 'health', 'money', 'unknown', 'change']
    };

    if (state.selectedCore) {
      return coreBasedTriggers[state.selectedCore.id] || [];
    }

    // Return most common triggers as fallback
    return ['work', 'family', 'health', 'money', 'social media'];
  }, [state.selectedCore, state.selectedSubEmotion]);

  // Actions that require core selection
  const selectCoreAndShow = useCallback((core: EmotionCore) => {
    selectCore(core);
    showSubEmotions();
  }, [selectCore, showSubEmotions]);

  return {
    state,
    selectCore: selectCoreAndShow,
    clearCoreSelection,
    selectSubEmotion,
    clearSubEmotionSelection,
    showSubEmotions,
    hideSubEmotions,
    goBack,
    setIntensity,
    addTrigger,
    removeTrigger,
    clearTriggers,
    quickSelect,
    reset,
    getSubEmotions,
    getSuggestedTriggers
  };
};