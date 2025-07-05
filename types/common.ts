// ===================================================================
// ALISTO APP - COMMON TYPE DEFINITIONS
// ===================================================================
// Shared types and enums used across the application
// ===================================================================

// ===================================================================
// COMMON ENUMS
// ===================================================================

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Suspended = 'Suspended',
  Archived = 'Archived',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export enum UrgencyLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export enum SortDirection {
  Ascending = 'Ascending',
  Descending = 'Descending',
}

// ===================================================================
// COMMON INTERFACES
// ===================================================================

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimestampedEntity {
  createdAt: string;
  updatedAt?: string;
}

export interface SoftDeletable {
  isActive: boolean;
  deletedAt?: string;
}

export interface Auditable {
  createdBy?: string;
  updatedBy?: string;
}

export interface Trackable extends TimestampedEntity, Auditable {}

export interface ContactInfo {
  phoneNumber: string;
  email?: string;
  address: string;
}

export interface PersonName {
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface FullPerson extends PersonName, ContactInfo {
  dateOfBirth?: string;
}

export interface Location {
  address: string;
  coordinates?: string;
}

export interface FileReference {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

// ===================================================================
// API RESPONSE TYPES
// ===================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp: string;
  requestId?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  searchTerm?: string;
}

// ===================================================================
// VALIDATION TYPES
// ===================================================================

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isDirty: boolean;
}