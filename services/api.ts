// ===================================================================
// ALISTO APP - API SERVICE LAYER
// ===================================================================
// Centralized API service for all backend communications
// ===================================================================

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp: string;
  requestId?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'Ascending' | 'Descending';
  searchTerm?: string;
}

class ApiService {
  private baseURL: string;
  private authToken: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // ===================================================================
  // AUTHENTICATION METHODS
  // ===================================================================

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  // ===================================================================
  // GENERIC HTTP METHODS
  // ===================================================================

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  private async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  private async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  private async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // ===================================================================
  // AUTHENTICATION API
  // ===================================================================

  async login(email: string, password: string, deviceInfo?: string) {
    return this.post<AuthResponse>('/auth/login', {
      email,
      password,
      deviceInfo,
    });
  }

  async register(userData: RegisterRequest) {
    return this.post<AuthResponse>('/auth/register', userData);
  }

  async refreshToken(refreshToken: string) {
    return this.post<AuthResponse>('/auth/refresh', { refreshToken });
  }

  async logout() {
    return this.post('/auth/logout');
  }

  // ===================================================================
  // USER API
  // ===================================================================

  async getCurrentUser() {
    return this.get<UserDto>('/users/me');
  }

  async updateUser(userData: UpdateUserRequest) {
    return this.put<UserDto>('/users/me', userData);
  }

  async uploadProfileImage(imageFile: FormData) {
    return this.request<{ imageUrl: string }>('/users/me/profile-image', {
      method: 'POST',
      body: imageFile,
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
      },
    });
  }

  // ===================================================================
  // NEWS API
  // ===================================================================

  async getNews(params?: PaginationRequest & { category?: string; featured?: boolean; trending?: boolean }) {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.trending !== undefined) queryParams.append('trending', params.trending.toString());

    const endpoint = `/news${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<PaginatedResponse<NewsArticleDto>>(endpoint);
  }

  async getNewsById(id: number) {
    return this.get<NewsArticleDto>(`/news/${id}`);
  }

  async incrementNewsView(id: number) {
    return this.post(`/news/${id}/view`);
  }

  // ===================================================================
  // SERVICES API
  // ===================================================================

  async getServiceCategories() {
    return this.get<ServiceCategoryDto[]>('/services/categories');
  }

  async getServices(categoryId?: number) {
    const endpoint = categoryId ? `/services?categoryId=${categoryId}` : '/services';
    return this.get<CityServiceDto[]>(endpoint);
  }

  async getServiceById(id: number) {
    return this.get<CityServiceDto>(`/services/${id}`);
  }

  // ===================================================================
  // APPOINTMENTS API
  // ===================================================================

  async createAppointment(appointmentData: CreateAppointmentRequest) {
    return this.post<AppointmentDto>('/appointments', appointmentData);
  }

  async getUserAppointments(params?: PaginationRequest & { status?: string }) {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.status) queryParams.append('status', params.status);

    const endpoint = `/appointments/my${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<PaginatedResponse<AppointmentDto>>(endpoint);
  }

  async getAppointmentById(id: string) {
    return this.get<AppointmentDto>(`/appointments/${id}`);
  }

  async cancelAppointment(id: string, reason: string) {
    return this.put(`/appointments/${id}/cancel`, { reason });
  }

  async rescheduleAppointment(id: string, newDate: string, newTime: string) {
    return this.put(`/appointments/${id}/reschedule`, {
      appointmentDate: newDate,
      appointmentTime: newTime,
    });
  }

  // ===================================================================
  // ISSUE REPORTS API
  // ===================================================================

  async createIssueReport(reportData: CreateIssueReportRequest) {
    return this.post<IssueReportDto>('/reports', reportData);
  }

  async getUserIssueReports(params?: PaginationRequest & { status?: string; category?: string }) {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);

    const endpoint = `/reports/my${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<PaginatedResponse<IssueReportDto>>(endpoint);
  }

  async getIssueReportById(id: string) {
    return this.get<IssueReportDto>(`/reports/${id}`);
  }

  async uploadIssuePhoto(reportId: string, imageFile: FormData) {
    return this.request<IssuePhotoDto>(`/reports/${reportId}/photos`, {
      method: 'POST',
      body: imageFile,
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
      },
    });
  }

  // ===================================================================
  // TOURISM API
  // ===================================================================

  async getTouristSpots(params?: PaginationRequest) {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);

    const endpoint = `/tourism/spots${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<PaginatedResponse<TouristSpotDto>>(endpoint);
  }

  async getTouristSpotById(id: number) {
    return this.get<TouristSpotDto>(`/tourism/spots/${id}`);
  }

  async incrementSpotView(id: number) {
    return this.post(`/tourism/spots/${id}/view`);
  }

  // ===================================================================
  // TRANSPARENCY API
  // ===================================================================

  async getPublicProjects(params?: PaginationRequest & { status?: string }) {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.status) queryParams.append('status', params.status);

    const endpoint = `/transparency/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<PaginatedResponse<PublicProjectDto>>(endpoint);
  }

  async getProjectById(id: number) {
    return this.get<PublicProjectDto>(`/transparency/projects/${id}`);
  }

  // ===================================================================
  // HOTLINES API
  // ===================================================================

  async getEmergencyHotlines() {
    return this.get<EmergencyHotlineDto[]>('/hotlines');
  }

  // ===================================================================
  // NOTIFICATIONS API
  // ===================================================================

  async getNotifications(params?: PaginationRequest & { unreadOnly?: boolean }) {
    const queryParams = new URLSearchParams();
    
    if (params?.pageNumber) queryParams.append('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.unreadOnly) queryParams.append('unreadOnly', params.unreadOnly.toString());

    const endpoint = `/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<PaginatedResponse<NotificationDto>>(endpoint);
  }

  async markNotificationAsRead(id: string) {
    return this.put(`/notifications/${id}/read`);
  }

  async markAllNotificationsAsRead() {
    return this.put('/notifications/read-all');
  }

  // ===================================================================
  // FEEDBACK API
  // ===================================================================

  async submitServiceFeedback(feedbackData: CreateServiceFeedbackRequest) {
    return this.post('/feedback/service', feedbackData);
  }

  async submitAppFeedback(feedbackData: CreateAppFeedbackRequest) {
    return this.post('/feedback/app', feedbackData);
  }

  // ===================================================================
  // STATISTICS API
  // ===================================================================

  async getDashboardStats() {
    return this.get<DashboardStatsDto>('/stats/dashboard');
  }

  // ===================================================================
  // FILE UPLOAD API
  // ===================================================================

  async uploadFile(file: FormData, entityType?: string, entityId?: string) {
    const queryParams = new URLSearchParams();
    if (entityType) queryParams.append('entityType', entityType);
    if (entityId) queryParams.append('entityId', entityId);

    const endpoint = `/files/upload${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    return this.request<FileUploadDto>(endpoint, {
      method: 'POST',
      body: file,
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
      },
    });
  }
}

// ===================================================================
// EXPORT SINGLETON INSTANCE
// ===================================================================

export const apiService = new ApiService();
export default apiService;

// ===================================================================
// TYPE EXPORTS
// ===================================================================

export type {
  ApiResponse,
  PaginatedResponse,
  PaginationRequest,
  AuthResponse,
  RegisterRequest,
  UpdateUserRequest,
  UserDto,
  NewsArticleDto,
  ServiceCategoryDto,
  CityServiceDto,
  AppointmentDto,
  CreateAppointmentRequest,
  IssueReportDto,
  CreateIssueReportRequest,
  IssuePhotoDto,
  TouristSpotDto,
  PublicProjectDto,
  EmergencyHotlineDto,
  NotificationDto,
  CreateServiceFeedbackRequest,
  CreateAppFeedbackRequest,
  DashboardStatsDto,
  FileUploadDto,
};