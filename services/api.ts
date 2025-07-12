// ===================================================================
// ALISTO APP - API SERVICE LAYER
// ===================================================================
// Centralized API service for all backend communications
// ===================================================================

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://alisto.gregdoesdev.xyz';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
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

// Tourist Spot interface
interface TouristSpot {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  location: string;
  coordinates?: string;
  address: string;
  openingHours?: string;
  entryFee?: string;
  highlights: string[];
  travelTime?: string;
  isActive: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// News Article interface
interface NewsArticle {
  id: number;
  title: string;
  summary?: string;
  fullContent?: string;
  imageUrl?: string;
  publishedDate?: string;
  publishedTime?: string;
  location: string;
  expectedAttendees?: string;
  category: string;
  author: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  viewCount: number;
  status: string;
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
  // TOURIST SPOTS API
  // ===================================================================

  async getTouristSpots(params?: { page?: number; pageSize?: number; isActive?: boolean }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());

    const endpoint = `/api/touristspot${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<TouristSpot[]>(endpoint);
  }

  async getTouristSpotById(id: number) {
    return this.get<TouristSpot>(`/api/touristspot/${id}`);
  }

  // ===================================================================
  // NEWS API
  // ===================================================================

  async getNews(params?: { 
    page?: number; 
    pageSize?: number; 
    category?: string; 
    isFeatured?: boolean; 
    isTrending?: boolean 
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.isFeatured !== undefined) queryParams.append('isFeatured', params.isFeatured.toString());
    if (params?.isTrending !== undefined) queryParams.append('isTrending', params.isTrending.toString());

    const endpoint = `/api/news${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get<NewsArticle[]>(endpoint);
  }

  async getNewsById(id: number) {
    return this.get<NewsArticle>(`/api/news/${id}`);
  }

  async getFeaturedNews() {
    return this.get<NewsArticle[]>('/api/news/featured');
  }

  async getTrendingNews() {
    return this.get<NewsArticle[]>('/api/news/trending');
  }

  // ===================================================================
  // UTILITY METHODS
  // ===================================================================

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${this.baseURL}${imagePath}`;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

