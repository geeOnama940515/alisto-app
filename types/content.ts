// ===================================================================
// ALISTO APP - CONTENT TYPES
// ===================================================================
// News, announcements, and content management types
// ===================================================================

import { BaseEntity, Priority, Trackable } from './common';

// ===================================================================
// NEWS TYPES
// ===================================================================

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
  Emergency = 'Emergency',
}

export enum ContentStatus {
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived',
  Scheduled = 'Scheduled',
}

export interface NewsArticleDto extends BaseEntity, Trackable {
  title: string;
  summary: string;
  fullContent?: string;
  imageUrl: string;
  publishedDate: string;
  publishedTime: string;
  location: string;
  expectedAttendees?: string;
  category: NewsCategory;
  author: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  viewCount: number;
  status: ContentStatus;
}

export interface CreateNewsRequest {
  title: string;
  summary: string;
  fullContent: string;
  imageUrl: string;
  publishedDate: string;
  publishedTime: string;
  location: string;
  expectedAttendees?: string;
  category: NewsCategory;
  author: string;
  tags?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
}

// ===================================================================
// ANNOUNCEMENT TYPES
// ===================================================================

export enum AnnouncementType {
  General = 'General',
  Emergency = 'Emergency',
  ServiceUpdate = 'ServiceUpdate',
  Holiday = 'Holiday',
  Maintenance = 'Maintenance',
}

export interface AnnouncementDto extends BaseEntity, Trackable {
  title: string;
  message: string;
  type: AnnouncementType;
  priority: Priority;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  targetAudience?: string;
}