'use client';

import { useState, useEffect, useCallback } from 'react';
import { secureStorage, EmotionData, PanicSessionData, EmergencyContact } from '@/utils/storage/secureStorage';

export const useSecureStorage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize storage on mount
  useEffect(() => {
    const initStorage = async () => {
      try {
        await secureStorage.init();
        setIsInitialized(true);
      } catch (err) {
        console.error('Failed to initialize secure storage:', err);
        setError('Failed to initialize storage');
      }
    };

    initStorage();
  }, []);

  // Emotion operations
  const saveEmotion = useCallback(async (emotion: EmotionData) => {
    setIsLoading(true);
    setError(null);
    try {
      const id = await secureStorage.saveEmotion(emotion);
      return id;
    } catch (err) {
      setError('Failed to save emotion');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAllEmotions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const emotions = await secureStorage.getAllEmotions();
      return emotions;
    } catch (err) {
      setError('Failed to retrieve emotions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEmotion = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await secureStorage.deleteEmotion(id);
    } catch (err) {
      setError('Failed to delete emotion');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Panic session operations
  const savePanicSession = useCallback(async (session: PanicSessionData) => {
    setIsLoading(true);
    setError(null);
    try {
      const id = await secureStorage.savePanicSession(session);
      return id;
    } catch (err) {
      setError('Failed to save panic session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAllPanicSessions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const sessions = await secureStorage.getAllPanicSessions();
      return sessions;
    } catch (err) {
      setError('Failed to retrieve panic sessions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Emergency contact operations
  const saveEmergencyContact = useCallback(async (contact: EmergencyContact) => {
    setIsLoading(true);
    setError(null);
    try {
      const id = await secureStorage.saveEmergencyContact(contact);
      return id;
    } catch (err) {
      setError('Failed to save emergency contact');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEmergencyContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const contacts = await secureStorage.getEmergencyContacts();
      return contacts;
    } catch (err) {
      setError('Failed to retrieve emergency contacts');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEmergencyContact = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await secureStorage.deleteEmergencyContact(id);
    } catch (err) {
      setError('Failed to delete emergency contact');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Data management operations
  const exportData = useCallback(async (includeSettings = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const encryptedData = await secureStorage.exportData(includeSettings);

      // Create downloadable file
      const blob = new Blob([encryptedData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `panicshield-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      return encryptedData;
    } catch (err) {
      setError('Failed to export data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const importData = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const text = await file.text();
      await secureStorage.importData(text);
    } catch (err) {
      setError('Failed to import data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await secureStorage.clearAllData();
    } catch (err) {
      setError('Failed to clear data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStorageStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stats = await secureStorage.getStorageStats();
      return stats;
    } catch (err) {
      setError('Failed to get storage stats');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Settings operations
  const saveSetting = useCallback(async (key: string, value: any) => {
    try {
      await secureStorage.saveSetting(key, value);
    } catch (err) {
      setError('Failed to save setting');
      throw err;
    }
  }, []);

  const getSetting = useCallback(async (key: string) => {
    try {
      return await secureStorage.getSetting(key);
    } catch (err) {
      setError('Failed to get setting');
      throw err;
    }
  }, []);

  return {
    // State
    isInitialized,
    isLoading,
    error,

    // Emotion operations
    saveEmotion,
    getAllEmotions,
    deleteEmotion,

    // Panic session operations
    savePanicSession,
    getAllPanicSessions,

    // Emergency contact operations
    saveEmergencyContact,
    getEmergencyContacts,
    deleteEmergencyContact,

    // Data management
    exportData,
    importData,
    clearAllData,
    getStorageStats,

    // Settings
    saveSetting,
    getSetting
  };
};