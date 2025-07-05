// ===================================================================
// ALISTO APP - REPORTS TYPES
// ===================================================================
// Issue reporting and tracking types
// ===================================================================

import { BaseEntity, Priority, UrgencyLevel, FileReference, Location, Trackable } from './common';

// ===================================================================
// ISSUE REPORT TYPES
// ===================================================================

export enum IssueCategory {
  Flooding = 'Flooding',
  RoadIssues = 'RoadIssues',
  FireHazard = 'FireHazard',
  PowerOutage = 'PowerOutage',
  Environmental = 'Environmental',
  PublicSafety = 'PublicSafety',
  Infrastructure = 'Infrastructure',
  Emergency = 'Emergency',
}

export enum IssueStatus {
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Assigned = 'Assigned',
  InProgress = 'InProgress',
  Resolved = 'Resolved',
  Closed = 'Closed',
  Rejected = 'Rejected',
}

export interface IssueReportDto extends BaseEntity, Location, Trackable {
  userId?: string;
  referenceNumber: string;
  category: IssueCategory;
  urgencyLevel: UrgencyLevel;
  title: string;
  description: string;
  contactInfo?: string;
  status: IssueStatus;
  priority: Priority;
  assignedDepartment?: string;
  assignedTo?: string;
  estimatedResolution?: string;
  actualResolution?: string;
  resolutionNotes?: string;
  publiclyVisible: boolean;
  photos: IssuePhotoDto[];
  updates: IssueUpdateDto[];
}

export interface CreateIssueReportRequest extends Location {
  category: IssueCategory;
  urgencyLevel: UrgencyLevel;
  title: string;
  description: string;
  contactInfo?: string;
  photoIds?: string[];
}

export interface IssuePhotoDto extends FileReference {
  issueReportId: string;
}

export enum IssueUpdateType {
  StatusChange = 'StatusChange',
  Assignment = 'Assignment',
  Progress = 'Progress',
  Resolution = 'Resolution',
  Comment = 'Comment',
}

export interface IssueUpdateDto extends BaseEntity {
  issueReportId: string;
  updatedBy: string;
  updateType: IssueUpdateType;
  message: string;
  isPublic: boolean;
}