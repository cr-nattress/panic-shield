import { openDB, DBSchema, IDBPDatabase } from 'idb';
import CryptoJS from 'crypto-js';

// Database schema definition
interface PanicShieldDB extends DBSchema {
  emotions: {
    key: string;
    value: {
      id: string;
      data: string; // Encrypted emotion data
      timestamp: number;
      version: number;
    };
  };
  panic_sessions: {
    key: string;
    value: {
      id: string;
      data: string; // Encrypted panic session data
      timestamp: number;
    };
  };
  settings: {
    key: string;
    value: any;
  };
  emergency_contacts: {
    key: string;
    value: {
      id: string;
      data: string; // Encrypted contact data
    };
  };
}

export interface EmotionData {
  id?: string;
  emotionId: string;
  intensity: number;
  triggers?: string[];
  suggestion?: string;
  notes?: string;
  timestamp?: string;
}

export interface PanicSessionData {
  id?: string;
  startTime: number;
  endTime?: number;
  exercises: string[];
  outcome?: 'resolved' | 'escalated' | 'abandoned';
  effectiveness?: number;
}

export interface EmergencyContact {
  id?: string;
  name: string;
  phone: string;
  relationship?: string;
}

class SecureStorage {
  private db: IDBPDatabase<PanicShieldDB> | null = null;
  private dbName = 'PanicShieldDB';
  private dbVersion = 1;
  private encryptionKey: string | null = null;

  // Initialize the database
  async init(): Promise<void> {
    try {
      this.db = await openDB<PanicShieldDB>(this.dbName, this.dbVersion, {
        upgrade(db) {
          // Create object stores if they don't exist
          if (!db.objectStoreNames.contains('emotions')) {
            db.createObjectStore('emotions', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('panic_sessions')) {
            db.createObjectStore('panic_sessions', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings');
          }
          if (!db.objectStoreNames.contains('emergency_contacts')) {
            db.createObjectStore('emergency_contacts', { keyPath: 'id' });
          }
        },
      });

      // Initialize encryption key from local storage or generate new
      this.initEncryptionKey();
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  // Initialize or retrieve encryption key
  private initEncryptionKey(): void {
    let key = localStorage.getItem('ps_encryption_key');

    if (!key) {
      // Generate a new key for this device
      key = CryptoJS.lib.WordArray.random(256 / 8).toString();
      localStorage.setItem('ps_encryption_key', key);
    }

    this.encryptionKey = key;
  }

  // Derive key from user PIN/biometric (future enhancement)
  async deriveKeyFromUserAuth(userInput: string): Promise<void> {
    const salt = localStorage.getItem('ps_salt') || CryptoJS.lib.WordArray.random(128 / 8).toString();
    localStorage.setItem('ps_salt', salt);

    // Use PBKDF2 for key derivation
    this.encryptionKey = CryptoJS.PBKDF2(userInput, salt, {
      keySize: 256 / 32,
      iterations: 1000
    }).toString();
  }

  // Encryption helpers
  private encrypt(data: any): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized');
    }
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptionKey).toString();
  }

  private decrypt(encryptedData: string): any {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized');
    }

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  // Emotion storage methods
  async saveEmotion(emotion: EmotionData): Promise<string> {
    if (!this.db) await this.init();

    const id = emotion.id || `emotion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const encryptedData = this.encrypt(emotion);

    await this.db!.put('emotions', {
      id,
      data: encryptedData,
      timestamp: Date.now(),
      version: 1
    });

    return id;
  }

  async getEmotion(id: string): Promise<EmotionData | null> {
    if (!this.db) await this.init();

    const record = await this.db!.get('emotions', id);
    if (!record) return null;

    return this.decrypt(record.data) as EmotionData;
  }

  async getAllEmotions(): Promise<EmotionData[]> {
    if (!this.db) await this.init();

    const records = await this.db!.getAll('emotions');
    return records.map(record => this.decrypt(record.data) as EmotionData);
  }

  async deleteEmotion(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete('emotions', id);
  }

  // Panic session storage methods
  async savePanicSession(session: PanicSessionData): Promise<string> {
    if (!this.db) await this.init();

    const id = session.id || `panic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const encryptedData = this.encrypt(session);

    await this.db!.put('panic_sessions', {
      id,
      data: encryptedData,
      timestamp: Date.now()
    });

    return id;
  }

  async getPanicSession(id: string): Promise<PanicSessionData | null> {
    if (!this.db) await this.init();

    const record = await this.db!.get('panic_sessions', id);
    if (!record) return null;

    return this.decrypt(record.data) as PanicSessionData;
  }

  async getAllPanicSessions(): Promise<PanicSessionData[]> {
    if (!this.db) await this.init();

    const records = await this.db!.getAll('panic_sessions');
    return records.map(record => this.decrypt(record.data) as PanicSessionData);
  }

  // Emergency contacts storage
  async saveEmergencyContact(contact: EmergencyContact): Promise<string> {
    if (!this.db) await this.init();

    const id = contact.id || `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const encryptedData = this.encrypt(contact);

    await this.db!.put('emergency_contacts', {
      id,
      data: encryptedData
    });

    return id;
  }

  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    if (!this.db) await this.init();

    const records = await this.db!.getAll('emergency_contacts');
    return records.map(record => this.decrypt(record.data) as EmergencyContact);
  }

  async deleteEmergencyContact(id: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete('emergency_contacts', id);
  }

  // Settings storage (unencrypted for performance)
  async saveSetting(key: string, value: any): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.put('settings', value, key);
  }

  async getSetting(key: string): Promise<any> {
    if (!this.db) await this.init();
    return this.db!.get('settings', key);
  }

  // Data export functionality
  async exportData(includeSettings: boolean = false): Promise<string> {
    if (!this.db) await this.init();

    const exportData = {
      emotions: await this.getAllEmotions(),
      panicSessions: await this.getAllPanicSessions(),
      emergencyContacts: await this.getEmergencyContacts(),
      settings: includeSettings ? await this.db!.getAll('settings') : [],
      exportDate: new Date().toISOString(),
      version: this.dbVersion
    };

    // Encrypt the entire export
    return this.encrypt(exportData);
  }

  // Data import functionality
  async importData(encryptedData: string): Promise<void> {
    try {
      const data = this.decrypt(encryptedData);

      // Import emotions
      if (data.emotions) {
        for (const emotion of data.emotions) {
          await this.saveEmotion(emotion);
        }
      }

      // Import panic sessions
      if (data.panicSessions) {
        for (const session of data.panicSessions) {
          await this.savePanicSession(session);
        }
      }

      // Import emergency contacts
      if (data.emergencyContacts) {
        for (const contact of data.emergencyContacts) {
          await this.saveEmergencyContact(contact);
        }
      }
    } catch (error) {
      console.error('Import failed:', error);
      throw new Error('Failed to import data. Invalid or corrupted file.');
    }
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    if (!this.db) await this.init();

    const tx = this.db!.transaction(['emotions', 'panic_sessions', 'emergency_contacts'], 'readwrite');
    await Promise.all([
      tx.objectStore('emotions').clear(),
      tx.objectStore('panic_sessions').clear(),
      tx.objectStore('emergency_contacts').clear()
    ]);
  }

  // Get storage statistics
  async getStorageStats(): Promise<{
    emotionCount: number;
    panicSessionCount: number;
    contactCount: number;
    estimatedSize?: number;
  }> {
    if (!this.db) await this.init();

    const [emotions, sessions, contacts] = await Promise.all([
      this.db!.count('emotions'),
      this.db!.count('panic_sessions'),
      this.db!.count('emergency_contacts')
    ]);

    let estimatedSize: number | undefined;
    if ('estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      estimatedSize = estimate.usage;
    }

    return {
      emotionCount: emotions,
      panicSessionCount: sessions,
      contactCount: contacts,
      estimatedSize
    };
  }
}

// Export singleton instance
export const secureStorage = new SecureStorage();

// Initialize on module load
if (typeof window !== 'undefined') {
  secureStorage.init().catch(console.error);
}