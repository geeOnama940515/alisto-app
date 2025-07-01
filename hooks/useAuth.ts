// ===================================================================
// ALISTO APP - AUTHENTICATION HOOK
// ===================================================================
// Custom hook for managing authentication state
// ===================================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '@/services/api';
import { UserDto, AuthResponse, RegisterRequest } from '@/types/api';

interface AuthState {
  user: UserDto | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export function useAuth() {
  const mountedRef = useRef(true);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from storage
  useEffect(() => {
    mountedRef.current = true;
    initializeAuth();
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const safeSetAuthState = useCallback((updater: React.SetStateAction<AuthState>) => {
    if (mountedRef.current) {
      setAuthState(updater);
    }
  }, []);

  const initializeAuth = async () => {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(USER_DATA_KEY),
      ]);

      if (token && userData) {
        const user = JSON.parse(userData);
        apiService.setAuthToken(token);
        
        if (mountedRef.current) {
          safeSetAuthState({
            user,
            token,
            isLoading: false,
            isAuthenticated: true,
          });
        }

        // Verify token is still valid
        try {
          const response = await apiService.getCurrentUser();
          if (response.success && response.data) {
            // Update user data if successful
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
            safeSetAuthState(prev => ({
              ...prev,
              user: response.data!,
            }));
          }
        } catch (error) {
          // Token might be expired, try to refresh
          await attemptTokenRefresh();
        }
      } else {
        safeSetAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      safeSetAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const attemptTokenRefresh = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        const response = await apiService.refreshToken(refreshToken);
        if (response.success && response.data) {
          await saveAuthData(response.data);
          return true;
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    
    // If refresh fails, logout
    await logout();
    return false;
  };

  const saveAuthData = async (authData: AuthResponse) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(AUTH_TOKEN_KEY, authData.token),
        AsyncStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken),
        AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(authData.user)),
      ]);

      apiService.setAuthToken(authData.token);
      
      safeSetAuthState({
        user: authData.user,
        token: authData.token,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw error;
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      safeSetAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await apiService.login(email, password);
      
      if (response.success && response.data) {
        await saveAuthData(response.data);
        return { success: true };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      safeSetAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }, [safeSetAuthState]);

  const register = useCallback(async (userData: RegisterRequest) => {
    try {
      safeSetAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await apiService.register(userData);
      
      if (response.success && response.data) {
        await saveAuthData(response.data);
        return { success: true };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      safeSetAuthState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  }, [safeSetAuthState]);

  const logout = useCallback(async () => {
    try {
      // Call logout API if authenticated
      if (authState.isAuthenticated) {
        await apiService.logout();
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage regardless of API call result
      await Promise.all([
        AsyncStorage.removeItem(AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
        AsyncStorage.removeItem(USER_DATA_KEY),
      ]);

      apiService.clearAuthToken();
      
      safeSetAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, [authState.isAuthenticated, safeSetAuthState]);

  const updateUser = useCallback(async (userData: Partial<UserDto>) => {
    try {
      const response = await apiService.updateUser(userData);
      
      if (response.success && response.data) {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
        safeSetAuthState(prev => ({
          ...prev,
          user: response.data!,
        }));
        return { success: true };
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Update failed',
      };
    }
  }, [safeSetAuthState]);

  const refreshUserData = useCallback(async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.success && response.data) {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
        safeSetAuthState(prev => ({
          ...prev,
          user: response.data!,
        }));
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  }, [safeSetAuthState]);

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser,
    refreshUserData,
  };
}