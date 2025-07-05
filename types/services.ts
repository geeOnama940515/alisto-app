// ===================================================================
// ALISTO APP - SERVICES TYPES
// ===================================================================
// City services and appointment management types
// ===================================================================

import { BaseEntity, PersonName, ContactInfo, Trackable } from './common';

// ===================================================================
// SERVICE TYPES
// ===================================================================

export interface ServiceCategoryDto extends BaseEntity {
  name: string;
  description: string;
  iconName: string;
  isActive: boolean;
  sortOrder: number;
  services: CityServiceDto[];
}

export interface CityServiceDto extends BaseEntity, Trackable {
  categoryId: number;
  name: string;
  description: string;
  fee: number;
  processingTime: string;
  requiredDocuments: string[];
  officeLocation: string;
  contactNumber?: string;
  operatingHours: string;
  isActive: boolean;
}

// ===================================================================
// APPOINTMENT TYPES
// ===================================================================

export enum AppointmentStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  NoShow = 'NoShow',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Refunded = 'Refunded',
  Failed = 'Failed',
}

export interface AppointmentDto extends BaseEntity, Trackable {
  userId: string;
  serviceId: number;
  referenceNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  totalFee: number;
  paymentStatus: PaymentStatus;
  notes?: string;
  applicant: AppointmentApplicant;
  serviceSpecificData?: Record<string, any>;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface AppointmentApplicant extends PersonName, ContactInfo {
  email?: string;
}

export interface CreateAppointmentRequest {
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  applicant: AppointmentApplicant;
  serviceSpecificData?: Record<string, any>;
}

// ===================================================================
// SERVICE-SPECIFIC TYPES
// ===================================================================

export enum CivilDocumentType {
  BirthCertificate = 'BirthCertificate',
  MarriageCertificate = 'MarriageCertificate',
  DeathCertificate = 'DeathCertificate',
  CENOMAR = 'CENOMAR',
}

export enum BusinessServiceType {
  NewRegistration = 'NewRegistration',
  Renewal = 'Renewal',
  Amendment = 'Amendment',
  Closure = 'Closure',
  Transfer = 'Transfer',
}

export enum HealthServiceType {
  HealthCertificate = 'HealthCertificate',
  MedicalClearance = 'MedicalClearance',
  VaccinationRecord = 'VaccinationRecord',
  MedicalAssistance = 'MedicalAssistance',
  MentalHealthConsultation = 'MentalHealthConsultation',
  MaternalCare = 'MaternalCare',
}

export enum EducationServiceType {
  SchoolEnrollment = 'SchoolEnrollment',
  ScholarshipApplication = 'ScholarshipApplication',
  EducationalAssistance = 'EducationalAssistance',
  SchoolSupplies = 'SchoolSupplies',
  TutorialProgram = 'TutorialProgram',
  VocationalTraining = 'VocationalTraining',
}

export enum SocialServiceType {
  SeniorCitizenId = 'SeniorCitizenId',
  PWDId = 'PWDId',
  CertificateOfIndigency = 'CertificateOfIndigency',
  CertificateOfResidency = 'CertificateOfResidency',
  SoloParentId = 'SoloParentId',
  FinancialAssistance = 'FinancialAssistance',
}

export enum TaxServiceType {
  RPTPayment = 'RPTPayment',
  RPTClearance = 'RPTClearance',
  BusinessTax = 'BusinessTax',
  TaxClearance = 'TaxClearance',
  TaxAssessment = 'TaxAssessment',
  TaxExemption = 'TaxExemption',
}