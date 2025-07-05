// ===================================================================
// ALISTO APP - SYSTEM TYPES
// ===================================================================
// System, notifications, and utility types
// ===================================================================

import { BaseEntity, Trackable } from './common';

// ===================================================================
// NOTIFICATION TYPES
// ===================================================================

export enum NotificationType {
  AppointmentConfirmation = 'AppointmentConfirmation',
  AppointmentReminder = 'AppointmentReminder',
  IssueUpdate = 'IssueUpdate',
  NewsAlert = 'NewsAlert',
  SystemMaintenance = 'SystemMaintenance',
  General = 'General',
}

export interface NotificationDto extends BaseEntity {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  actionUrl?: string;
  actionData?: Record<string, any>;
  expiresAt?: string;
  readAt?: string;
}

// ===================================================================
// HOTLINE TYPES
// ===================================================================

export interface EmergencyHotlineDto extends BaseEntity, Trackable {
  title: string;
  phoneNumber: string;
  description: string;
  isEmergency: boolean;
  department: string;
  operatingHours: string;
  isActive: boolean;
  sortOrder: number;
}

// ===================================================================
// FEEDBACK TYPES
// ===================================================================

export enum FeedbackType {
  Bug = 'Bug',
  Feature = 'Feature',
  Complaint = 'Complaint',
  Suggestion = 'Suggestion',
  General = 'General',
}

export enum FeedbackStatus {
  New = 'New',
  InReview = 'InReview',
  Responded = 'Responded',
  Resolved = 'Resolved',
  Closed = 'Closed',
}

export interface CreateServiceFeedbackRequest {
  appointmentId: string;
  rating: number;
  comment?: string;
  isAnonymous?: boolean;
}

export interface CreateAppFeedbackRequest {
  type: FeedbackType;
  subject: string;
  message: string;
  rating?: number;
  contactEmail?: string;
}

export interface ServiceFeedbackDto extends BaseEntity {
  appointmentId: string;
  userId: string;
  serviceId: number;
  rating: number;
  comment?: string;
  isAnonymous: boolean;
  isPublic: boolean;
}

export interface AppFeedbackDto extends BaseEntity {
  userId?: string;
  type: FeedbackType;
  subject: string;
  message: string;
  rating?: number;
  contactEmail?: string;
  status: FeedbackStatus;
  response?: string;
  respondedBy?: string;
  respondedAt?: string;
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

export enum StatisticsPeriod {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly',
}

// ===================================================================
// FILE UPLOAD TYPES
// ===================================================================

export interface FileUploadDto extends BaseEntity {
  fileName: string;
  originalFileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedBy?: string;
  entityType?: string;
  entityId?: string;
  isTemporary: boolean;
  expiresAt?: string;
}

// ===================================================================
// CONFIGURATION TYPES
// ===================================================================

export enum ConfigDataType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  JSON = 'JSON',
  Date = 'Date',
}

export interface SystemConfigurationDto extends BaseEntity, Trackable {
  key: string;
  value: string;
  description?: string;
  dataType: ConfigDataType;
  isPublic: boolean;
}