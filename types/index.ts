// ===================================================================
// ALISTO APP - TYPE EXPORTS
// ===================================================================
// Central export file for all types
// ===================================================================

// Common types
export * from './common';

// Authentication types
export * from './auth';

// Content types
export * from './content';

// Services types
export * from './services';

// Reports types
export * from './reports';

// Tourism types
export * from './tourism';

// System types
export * from './system';

// Legacy compatibility - re-export from api.ts for backward compatibility
export type {
  ApiResponse,
  PaginatedResponse,
  PaginationRequest,
} from './common';

export type {
  AuthResponse,
  UserDto,
  CreateUserRequest as RegisterRequest,
  UpdateUserRequest,
} from './auth';

export type {
  NewsArticleDto,
  CreateNewsRequest,
} from './content';

export type {
  ServiceCategoryDto,
  CityServiceDto,
  AppointmentDto,
  CreateAppointmentRequest,
} from './services';

export type {
  IssueReportDto,
  CreateIssueReportRequest,
  IssuePhotoDto,
} from './reports';

export type {
  TouristSpotDto,
  PublicProjectDto,
} from './tourism';

export type {
  NotificationDto,
  EmergencyHotlineDto,
  CreateServiceFeedbackRequest,
  CreateAppFeedbackRequest,
  DashboardStatsDto,
  ServiceUsageDto,
  FileUploadDto,
} from './system';