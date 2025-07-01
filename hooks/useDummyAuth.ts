// ===================================================================
// ALISTO APP - DUMMY AUTHENTICATION HOOK
// ===================================================================
// React hook for managing dummy authentication state
// ===================================================================

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DummyUser, dummyAuthService } from '@/utils/dummyAuth';

interface AuthState {
  user: DummyUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const USER_STORAGE_KEY = 'dummy_auth_user';

export function useDummyAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from storage
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const result = await dummyAuthService.login(email, password);
      
      if (result.success && result.user) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: result.error };
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }, []);

  const register = useCallback(async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const result = await dummyAuthService.register(userData);
      
      if (result.success && result.user) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true,
        });
        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: result.error };
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  const updateUser = useCallback(async (updates: Partial<DummyUser>) => {
    if (!authState.user) return { success: false, error: 'No user logged in' };

    try {
      const result = await dummyAuthService.updateUser(authState.user.id, updates);
      
      if (result.success && result.user) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
        setAuthState(prev => ({
          ...prev,
          user: result.user!,
        }));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Update failed',
      };
    }
  }, [authState.user]);

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser,
  };
}