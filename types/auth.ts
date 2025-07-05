// ===================================================================
// ALISTO APP - AUTHENTICATION TYPES
// ===================================================================
// Authentication and user management types
// ===================================================================

import { BaseEntity, PersonName, ContactInfo, Trackable } from './common';

// ===================================================================
// USER TYPES
// ===================================================================

export interface UserDto extends BaseEntity, PersonName, ContactInfo, Trackable {
  email: string;
  isActive: boolean;
  lastLoginAt?: string;
  profileImageUrl?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

export interface CreateUserRequest extends PersonName, ContactInfo {
  email: string;
  password: string;
  dateOfBirth?: string;
}

export interface UpdateUserRequest extends Partial<PersonName>, Partial<ContactInfo> {
  dateOfBirth?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

// ===================================================================
// AUTHENTICATION TYPES
// ===================================================================

export interface LoginRequest {
  email: string;
  password: string;
  deviceInfo?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserSession extends BaseEntity {
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
  deviceInfo?: string;
  ipAddress?: string;
}