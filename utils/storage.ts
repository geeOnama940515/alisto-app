// ===================================================================
// ALISTO APP - STORAGE UTILITIES
// ===================================================================
// Utilities for local data storage and caching
// ===================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

class StorageService {
  // ===================================================================
  // BASIC STORAGE OPERATIONS
  // ===================================================================

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // ===================================================================
  // CACHE OPERATIONS WITH EXPIRATION
  // ===================================================================

  async setCachedItem<T>(
    key: string, 
    value: T, 
    expiresInMs: number = 5 * 60 * 1000 // 5 minutes default
  ): Promise<void> {
    const cacheItem: CacheItem<T> = {
      data: value,
      timestamp: Date.now(),
      expiresIn: expiresInMs,
    };

    await this.setItem(`cache_${key}`, cacheItem);
  }

  async getCachedItem<T>(key: string): Promise<T | null> {
    try {
      const cacheItem = await this.getItem<CacheItem<T>>(`cache_${key}`);
      
      if (!cacheItem) {
        return null;
      }

      const now = Date.now();
      const isExpired = (now - cacheItem.timestamp) > cacheItem.expiresIn;

      if (isExpired) {
        await this.removeItem(`cache_${key}`);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      return null;
    }
  }

  async clearExpiredCache(): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const cacheKeys = allKeys.filter(key => key.startsWith('cache_'));
      
      for (const key of cacheKeys) {
        const cacheItem = await this.getItem<CacheItem<any>>(key);
        if (cacheItem) {
          const now = Date.now();
          const isExpired = (now - cacheItem.timestamp) > cacheItem.expiresIn;
          
          if (isExpired) {
            await this.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  }

  // ===================================================================
  // SPECIFIC DATA STORAGE METHODS
  // ===================================================================

  // User preferences
  async setUserPreferences(preferences: any): Promise<void> {
    await this.setItem('user_preferences', preferences);
  }

  async getUserPreferences(): Promise<any> {
    return await this.getItem('user_preferences');
  }

  // App settings
  async setAppSettings(settings: any): Promise<void> {
    await this.setItem('app_settings', settings);
  }

  async getAppSettings(): Promise<any> {
    return await this.getItem('app_settings');
  }

  // Offline data
  async setOfflineData<T>(key: string, data: T): Promise<void> {
    await this.setItem(`offline_${key}`, {
      data,
      timestamp: Date.now(),
    });
  }

  async getOfflineData<T>(key: string): Promise<T | null> {
    const offlineItem = await this.getItem<{ data: T; timestamp: number }>(`offline_${key}`);
    return offlineItem?.data || null;
  }

  // Draft data (for forms)
  async saveDraft(formId: string, data: any): Promise<void> {
    await this.setItem(`draft_${formId}`, {
      data,
      timestamp: Date.now(),
    });
  }

  async getDraft(formId: string): Promise<any> {
    const draft = await this.getItem<{ data: any; timestamp: number }>(`draft_${formId}`);
    return draft?.data || null;
  }

  async clearDraft(formId: string): Promise<void> {
    await this.removeItem(`draft_${formId}`);
  }

  // Recently viewed items
  async addToRecentlyViewed(type: string, item: any, maxItems: number = 10): Promise<void> {
    const key = `recent_${type}`;
    const recentItems = await this.getItem<any[]>(key) || [];
    
    // Remove if already exists
    const filteredItems = recentItems.filter(recent => recent.id !== item.id);
    
    // Add to beginning
    const updatedItems = [item, ...filteredItems].slice(0, maxItems);
    
    await this.setItem(key, updatedItems);
  }

  async getRecentlyViewed(type: string): Promise<any[]> {
    return await this.getItem<any[]>(`recent_${type}`) || [];
  }

  // Search history
  async addToSearchHistory(query: string, maxItems: number = 20): Promise<void> {
    const searchHistory = await this.getItem<string[]>('search_history') || [];
    
    // Remove if already exists
    const filteredHistory = searchHistory.filter(term => term !== query);
    
    // Add to beginning
    const updatedHistory = [query, ...filteredHistory].slice(0, maxItems);
    
    await this.setItem('search_history', updatedHistory);
  }

  async getSearchHistory(): Promise<string[]> {
    return await this.getItem<string[]>('search_history') || [];
  }

  async clearSearchHistory(): Promise<void> {
    await this.removeItem('search_history');
  }
}

// ===================================================================
// CACHE KEYS CONSTANTS
// ===================================================================

export const CACHE_KEYS = {
  NEWS: 'news',
  SERVICES: 'services',
  SERVICE_CATEGORIES: 'service_categories',
  TOURIST_SPOTS: 'tourist_spots',
  PUBLIC_PROJECTS: 'public_projects',
  EMERGENCY_HOTLINES: 'emergency_hotlines',
  USER_APPOINTMENTS: 'user_appointments',
  USER_REPORTS: 'user_reports',
  NOTIFICATIONS: 'notifications',
} as const;

// ===================================================================
// CACHE DURATIONS (in milliseconds)
// ===================================================================

export const CACHE_DURATION = {
  SHORT: 2 * 60 * 1000,      // 2 minutes
  MEDIUM: 5 * 60 * 1000,     // 5 minutes
  LONG: 15 * 60 * 1000,      // 15 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
  DAY: 24 * 60 * 60 * 1000,  // 24 hours
} as const;

// ===================================================================
// EXPORT SINGLETON INSTANCE
// ===================================================================

export const storageService = new StorageService();
export default storageService;