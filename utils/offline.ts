// ===================================================================
// ALISTO APP - OFFLINE SUPPORT UTILITIES
// ===================================================================
// Utilities for handling offline functionality
// ===================================================================

import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from 'react';
import { storageService, CACHE_KEYS, CACHE_DURATION } from './storage';

interface OfflineAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

class OfflineManager {
  private isOnline: boolean = true;
  private pendingActions: OfflineAction[] = [];
  private maxRetries: number = 3;

  constructor() {
    this.initializeNetworkListener();
    this.loadPendingActions();
  }

  // ===================================================================
  // NETWORK STATUS MANAGEMENT
  // ===================================================================

  private async initializeNetworkListener() {
    // Listen for network state changes
    NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected ?? false;

      // If we just came back online, process pending actions
      if (wasOffline && this.isOnline) {
        this.processPendingActions();
      }
    });

    // Get initial network state
    const state = await NetInfo.fetch();
    this.isOnline = state.isConnected ?? false;
  }

  getNetworkStatus(): boolean {
    return this.isOnline;
  }

  // ===================================================================
  // OFFLINE ACTION QUEUE
  // ===================================================================

  async addPendingAction(type: string, data: any): Promise<void> {
    const action: OfflineAction = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    };

    this.pendingActions.push(action);
    await this.savePendingActions();
  }

  private async loadPendingActions(): Promise<void> {
    try {
      const actions = await storageService.getItem<OfflineAction[]>('pending_actions');
      this.pendingActions = actions || [];
    } catch (error) {
      console.error('Error loading pending actions:', error);
      this.pendingActions = [];
    }
  }

  private async savePendingActions(): Promise<void> {
    try {
      await storageService.setItem('pending_actions', this.pendingActions);
    } catch (error) {
      console.error('Error saving pending actions:', error);
    }
  }

  private async processPendingActions(): Promise<void> {
    if (!this.isOnline || this.pendingActions.length === 0) {
      return;
    }

    const actionsToProcess = [...this.pendingActions];
    
    for (const action of actionsToProcess) {
      try {
        await this.executeAction(action);
        
        // Remove successful action
        this.pendingActions = this.pendingActions.filter(a => a.id !== action.id);
      } catch (error) {
        console.error('Error processing pending action:', error);
        
        // Increment retry count
        const actionIndex = this.pendingActions.findIndex(a => a.id === action.id);
        if (actionIndex !== -1) {
          this.pendingActions[actionIndex].retryCount++;
          
          // Remove if max retries reached
          if (this.pendingActions[actionIndex].retryCount >= this.maxRetries) {
            this.pendingActions.splice(actionIndex, 1);
          }
        }
      }
    }

    await this.savePendingActions();
  }

  private async executeAction(action: OfflineAction): Promise<void> {
    // This would be implemented based on your specific action types
    // For example:
    switch (action.type) {
      case 'CREATE_APPOINTMENT':
        // await apiService.createAppointment(action.data);
        break;
      case 'CREATE_ISSUE_REPORT':
        // await apiService.createIssueReport(action.data);
        break;
      case 'SUBMIT_FEEDBACK':
        // await apiService.submitAppFeedback(action.data);
        break;
      default:
        console.warn('Unknown action type:', action.type);
    }
  }

  // ===================================================================
  // OFFLINE DATA MANAGEMENT
  // ===================================================================

  async cacheDataForOffline(): Promise<void> {
    if (!this.isOnline) return;

    try {
      // Cache essential data that users might need offline
      // This would be called periodically when online
      
      // Example: Cache service categories and services
      // const categories = await apiService.getServiceCategories();
      // await storageService.setCachedItem(CACHE_KEYS.SERVICE_CATEGORIES, categories.data, CACHE_DURATION.DAY);

      // Cache emergency hotlines
      // const hotlines = await apiService.getEmergencyHotlines();
      // await storageService.setCachedItem(CACHE_KEYS.EMERGENCY_HOTLINES, hotlines.data, CACHE_DURATION.DAY);

    } catch (error) {
      console.error('Error caching data for offline use:', error);
    }
  }

  async getOfflineData<T>(key: string): Promise<T | null> {
    return await storageService.getCachedItem<T>(key);
  }

  // ===================================================================
  // OFFLINE FORM MANAGEMENT
  // ===================================================================

  async saveFormDraft(formId: string, formData: any): Promise<void> {
    await storageService.saveDraft(formId, formData);
  }

  async getFormDraft(formId: string): Promise<any> {
    return await storageService.getDraft(formId);
  }

  async clearFormDraft(formId: string): Promise<void> {
    await storageService.clearDraft(formId);
  }

  // ===================================================================
  // SYNC STATUS
  // ===================================================================

  getPendingActionsCount(): number {
    return this.pendingActions.length;
  }

  hasPendingActions(): boolean {
    return this.pendingActions.length > 0;
  }

  async clearAllPendingActions(): Promise<void> {
    this.pendingActions = [];
    await this.savePendingActions();
  }
}

// ===================================================================
// REACT HOOK FOR NETWORK STATUS
// ===================================================================

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      setIsConnecting(state.isInternetReachable === false && state.isConnected === true);
    });

    // Get initial state
    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected ?? false);
      setIsConnecting(state.isInternetReachable === false && state.isConnected === true);
    });

    return unsubscribe;
  }, []);

  return {
    isOnline,
    isConnecting,
    isOffline: !isOnline,
  };
}

// ===================================================================
// REACT HOOK FOR OFFLINE MANAGER
// ===================================================================

export function useOfflineManager() {
  const [pendingActionsCount, setPendingActionsCount] = useState(0);
  const networkStatus = useNetworkStatus();

  useEffect(() => {
    // Update pending actions count periodically
    const interval = setInterval(() => {
      setPendingActionsCount(offlineManager.getPendingActionsCount());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addPendingAction = async (type: string, data: any) => {
    await offlineManager.addPendingAction(type, data);
    setPendingActionsCount(offlineManager.getPendingActionsCount());
  };

  const saveFormDraft = async (formId: string, formData: any) => {
    await offlineManager.saveFormDraft(formId, formData);
  };

  const getFormDraft = async (formId: string) => {
    return await offlineManager.getFormDraft(formId);
  };

  const clearFormDraft = async (formId: string) => {
    await offlineManager.clearFormDraft(formId);
  };

  return {
    ...networkStatus,
    pendingActionsCount,
    hasPendingActions: pendingActionsCount > 0,
    addPendingAction,
    saveFormDraft,
    getFormDraft,
    clearFormDraft,
  };
}

// ===================================================================
// EXPORT SINGLETON INSTANCE
// ===================================================================

export const offlineManager = new OfflineManager();
export default offlineManager;