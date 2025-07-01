// ===================================================================
// ALISTO APP - API TYPE DEFINITIONS
// ===================================================================
// TypeScript interfaces matching the C# backend DTOs
// ===================================================================

// ===================================================================
// AUTHENTICATION TYPES
// ===================================================================

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  address: string;
  dateOfBirth?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

// ===================================================================
// USER TYPES
// ===================================================================

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phoneNumber: string;
  address: string;
  dateOfBirth?: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
  profileImageUrl?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

// ===================================================================
// NEWS TYPES
// ===================================================================

export interface NewsArticleDto {
  id: number;
  title: string;
  summary: string;
  fullContent?: string;
  imageUrl: string;
  publishedDate: string;
  publishedTime: string;
  location: string;
  expectedAttendees?: string;
  category: string;
  author: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  viewCount: number;
}

// ===================================================================
// SERVICE TYPES
// ===================================================================

export interface ServiceCategoryDto {
  id: number;
  name: string;
  description: string;
  iconName: string;
  services: CityServiceDto[];
}

export interface CityServiceDto {
  id: number;
  name: string;
  description: string;
  fee: number;
  processingTime: string;
  requiredDocuments: string[];
  officeLocation: string;
  contactNumber?: string;
  operatingHours: string;
}

// ===================================================================
// APPOINTMENT TYPES
// ===================================================================

export interface AppointmentDto {
  id: string;
  referenceNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  totalFee: number;
  paymentStatus: string;
  serviceName: string;
  serviceCategory: string;
  applicantFirstName: string;
  applicantLastName: string;
  applicantContactNumber: string;
  createdAt: string;
  completedAt?: string;
}

export interface CreateAppointmentRequest {
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  applicantFirstName: string;
  applicantLastName: string;
  applicantMiddleName?: string;
  applicantContactNumber: string;
  applicantEmail?: string;
  applicantAddress: string;
  serviceSpecificData?: any;
}

// ===================================================================
// ISSUE REPORT TYPES
// ===================================================================

export interface IssueReportDto {
  id: string;
  referenceNumber: string;
  category: string;
  urgencyLevel: string;
  title: string;
  description: string;
  location: string;
  coordinates?: string;
  status: string;
  priority: string;
  assignedDepartment?: string;
  estimatedResolution?: string;
  createdAt: string;
  photos: IssuePhotoDto[];
}

export interface CreateIssueReportRequest {
  category: string;
  urgencyLevel: string;
  title: string;
  description: string;
  location: string;
  coordinates?: string;
  contactInfo?: string;
  photoIds?: string[];
}

export interface IssuePhotoDto {
  id: string;
  fileName: string;
  filePath: string;
  uploadedAt: string;
}

// ===================================================================
// TOURISM TYPES
// ===================================================================

export interface TouristSpotDto {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  location: string;
  coordinates: string;
  address: string;
  openingHours: string;
  entryFee: string;
  highlights: string[];
  travelTime: string;
  viewCount: number;
}

// ===================================================================
// TRANSPARENCY TYPES
// ===================================================================

export interface PublicProjectDto {
  id: number;
  title: string;
  description?: string;
  cost: number;
  contractor: string;
  status: string;
  progress?: number;
  startDate: string;
  expectedEndDate?: string;
  actualEndDate?: string;
  location?: string;
  projectType: string;
  fundingSource: string;
}

// ===================================================================
// HOTLINE TYPES
// ===================================================================

export interface EmergencyHotlineDto {
  id: number;
  title: string;
  phoneNumber: string;
  description: string;
  isEmergency: boolean;
  department: string;
  operatingHours: string;
}

// ===================================================================
// NOTIFICATION TYPES
// ===================================================================

export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

// ===================================================================
// FEEDBACK TYPES
// ===================================================================

export interface CreateServiceFeedbackRequest {
  appointmentId: string;
  rating: number;
  comment?: string;
  isAnonymous?: boolean;
}

export interface CreateAppFeedbackRequest {
  type: string;
  subject: string;
  message: string;
  rating?: number;
  contactEmail?: string;
}

// ===================================================================
// STATISTICS TYPES
// ===================================================================

export interface DashboardStatsDto {
  totalUsers: number;
  activeAppointments: number;
  pendingIssues: number;
  completedProjects: number;
  customerSatisfactionRating: number;
  topServices: ServiceUsageDto[];
}

export interface ServiceUsageDto {
  serviceName: string;
  usageCount: number;
  satisfactionRating: number;
}

// ===================================================================
// FILE UPLOAD TYPES
// ===================================================================

export interface FileUploadDto {
  id: string;
  fileName: string;
  originalFileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

// ===================================================================
// COMMON ENUMS
// ===================================================================

export enum AppointmentStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  NoShow = 'NoShow'
}

export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Refunded = 'Refunded',
  Failed = 'Failed'
}

export enum IssueCategory {
  Flooding = 'Flooding',
  RoadIssues = 'RoadIssues',
  FireHazard = 'FireHazard',
  PowerOutage = 'PowerOutage',
  Environmental = 'Environmental',
  PublicSafety = 'PublicSafety',
  Infrastructure = 'Infrastructure',
  Emergency = 'Emergency'
}

export enum UrgencyLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export enum IssueStatus {
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Assigned = 'Assigned',
  InProgress = 'InProgress',
  Resolved = 'Resolved',
  Closed = 'Closed',
  Rejected = 'Rejected'
}

export enum NewsCategory {
  Festival = 'Festival',
  Infrastructure = 'Infrastructure',
  Health = 'Health',
  Education = 'Education',
  Environment = 'Environment',
  Culture = 'Culture',
  Technology = 'Technology',
  Sports = 'Sports',
  Government = 'Government',
  Emergency = 'Emergency'
}

export enum ProjectStatus {
  Planned = 'Planned',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Suspended = 'Suspended',
  Cancelled = 'Cancelled'
}

export enum NotificationType {
  AppointmentConfirmation = 'AppointmentConfirmation',
  AppointmentReminder = 'AppointmentReminder',
  IssueUpdate = 'IssueUpdate',
  NewsAlert = 'NewsAlert',
  SystemMaintenance = 'SystemMaintenance',
  General = 'General'
}