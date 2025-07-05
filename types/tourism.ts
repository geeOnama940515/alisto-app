// ===================================================================
// ALISTO APP - TOURISM TYPES
// ===================================================================
// Tourism and transparency types
// ===================================================================

import { BaseEntity, Location, Trackable } from './common';

// ===================================================================
// TOURISM TYPES
// ===================================================================

export interface TouristSpotDto extends BaseEntity, Location, Trackable {
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  location: string;
  openingHours: string;
  entryFee: string;
  highlights: string[];
  travelTime: string;
  isActive: boolean;
  viewCount: number;
}

// ===================================================================
// TRANSPARENCY TYPES
// ===================================================================

export enum ProjectStatus {
  Planned = 'Planned',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Suspended = 'Suspended',
  Cancelled = 'Cancelled',
}

export interface PublicProjectDto extends BaseEntity, Trackable {
  title: string;
  description?: string;
  cost: number;
  contractor: string;
  status: ProjectStatus;
  progress?: number;
  startDate: string;
  expectedEndDate?: string;
  actualEndDate?: string;
  location?: string;
  projectType: string;
  fundingSource: string;
  isPublic: boolean;
}