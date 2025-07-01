// ===================================================================
// ALISTO APP - API HOOKS
// ===================================================================
// Custom hooks for API data fetching with caching and error handling
// ===================================================================

import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { 
  NewsArticleDto, 
  ServiceCategoryDto, 
  CityServiceDto,
  AppointmentDto,
  IssueReportDto,
  TouristSpotDto,
  PublicProjectDto,
  EmergencyHotlineDto,
  NotificationDto,
  PaginatedResponse,
  PaginationRequest 
} from '@/types/api';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface PaginatedApiState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
}

// ===================================================================
// GENERIC API HOOK
// ===================================================================

function useApiCall<T>(
  apiCall: () => Promise<{ success: boolean; data?: T; message?: string }>,
  dependencies: any[] = []
): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
    refetch: async () => {},
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiCall();
      
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          data: response.data!,
          loading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.message || 'Failed to fetch data',
          loading: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

// ===================================================================
// PAGINATED API HOOK
// ===================================================================

function usePaginatedApiCall<T>(
  apiCall: (params: PaginationRequest) => Promise<{ success: boolean; data?: PaginatedResponse<T>; message?: string }>,
  initialParams: PaginationRequest = { pageNumber: 1, pageSize: 10 }
): PaginatedApiState<T> {
  const [state, setState] = useState<PaginatedApiState<T>>({
    data: [],
    loading: true,
    error: null,
    pagination: null,
    refetch: async () => {},
    loadMore: async () => {},
  });

  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (resetData = true) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiCall(params);
      
      if (response.success && response.data) {
        const { items, ...pagination } = response.data;
        
        setState(prev => ({
          ...prev,
          data: resetData ? items : [...prev.data, ...items],
          pagination,
          loading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.message || 'Failed to fetch data',
          loading: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, [params, apiCall]);

  const loadMore = useCallback(async () => {
    if (state.pagination?.hasNextPage && !state.loading) {
      setParams(prev => ({ ...prev, pageNumber: prev.pageNumber! + 1 }));
      await fetchData(false);
    }
  }, [state.pagination?.hasNextPage, state.loading, fetchData]);

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  return {
    ...state,
    refetch: () => fetchData(true),
    loadMore,
  };
}

// ===================================================================
// NEWS HOOKS
// ===================================================================

export function useNews(params?: { category?: string; featured?: boolean; trending?: boolean }) {
  return usePaginatedApiCall(
    (paginationParams) => apiService.getNews({ ...paginationParams, ...params }),
    { pageNumber: 1, pageSize: 10 }
  );
}

export function useNewsById(id: number) {
  return useApiCall(
    () => apiService.getNewsById(id),
    [id]
  );
}

// ===================================================================
// SERVICE HOOKS
// ===================================================================

export function useServiceCategories() {
  return useApiCall(() => apiService.getServiceCategories());
}

export function useServices(categoryId?: number) {
  return useApiCall(
    () => apiService.getServices(categoryId),
    [categoryId]
  );
}

export function useServiceById(id: number) {
  return useApiCall(
    () => apiService.getServiceById(id),
    [id]
  );
}

// ===================================================================
// APPOINTMENT HOOKS
// ===================================================================

export function useUserAppointments(params?: { status?: string }) {
  return usePaginatedApiCall(
    (paginationParams) => apiService.getUserAppointments({ ...paginationParams, ...params }),
    { pageNumber: 1, pageSize: 10 }
  );
}

export function useAppointmentById(id: string) {
  return useApiCall(
    () => apiService.getAppointmentById(id),
    [id]
  );
}

// ===================================================================
// ISSUE REPORT HOOKS
// ===================================================================

export function useUserIssueReports(params?: { status?: string; category?: string }) {
  return usePaginatedApiCall(
    (paginationParams) => apiService.getUserIssueReports({ ...paginationParams, ...params }),
    { pageNumber: 1, pageSize: 10 }
  );
}

export function useIssueReportById(id: string) {
  return useApiCall(
    () => apiService.getIssueReportById(id),
    [id]
  );
}

// ===================================================================
// TOURISM HOOKS
// ===================================================================

export function useTouristSpots() {
  return usePaginatedApiCall(
    (params) => apiService.getTouristSpots(params),
    { pageNumber: 1, pageSize: 20 }
  );
}

export function useTouristSpotById(id: number) {
  return useApiCall(
    () => apiService.getTouristSpotById(id),
    [id]
  );
}

// ===================================================================
// TRANSPARENCY HOOKS
// ===================================================================

export function usePublicProjects(params?: { status?: string }) {
  return usePaginatedApiCall(
    (paginationParams) => apiService.getPublicProjects({ ...paginationParams, ...params }),
    { pageNumber: 1, pageSize: 10 }
  );
}

export function useProjectById(id: number) {
  return useApiCall(
    () => apiService.getProjectById(id),
    [id]
  );
}

// ===================================================================
// HOTLINE HOOKS
// ===================================================================

export function useEmergencyHotlines() {
  return useApiCall(() => apiService.getEmergencyHotlines());
}

// ===================================================================
// NOTIFICATION HOOKS
// ===================================================================

export function useNotifications(params?: { unreadOnly?: boolean }) {
  return usePaginatedApiCall(
    (paginationParams) => apiService.getNotifications({ ...paginationParams, ...params }),
    { pageNumber: 1, pageSize: 20 }
  );
}

// ===================================================================
// DASHBOARD HOOKS
// ===================================================================

export function useDashboardStats() {
  return useApiCall(() => apiService.getDashboardStats());
}