// ===================================================================
// ALISTO APP - C# BACKEND MODELS AND ENTITIES
// ===================================================================
// Complete C# models for Entity Framework and API implementation
// ===================================================================

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Alisto.Models
{
    // ===================================================================
    // CORE USER AND AUTHENTICATION MODELS
    // ===================================================================

    public class User
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [MaxLength(100)]
        public string? MiddleName { get; set; }

        [Required]
        [Phone]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(500)]
        public string Address { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastLoginAt { get; set; }

        [MaxLength(500)]
        public string? ProfileImageUrl { get; set; }

        [MaxLength(100)]
        public string? EmergencyContactName { get; set; }

        [MaxLength(20)]
        public string? EmergencyContactNumber { get; set; }

        // Navigation properties
        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public virtual ICollection<IssueReport> IssueReports { get; set; } = new List<IssueReport>();
        public virtual ICollection<UserSession> Sessions { get; set; } = new List<UserSession>();
    }

    public class UserSession
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string UserId { get; set; }

        [Required]
        [MaxLength(500)]
        public string Token { get; set; }

        [Required]
        [MaxLength(500)]
        public string RefreshToken { get; set; }

        public DateTime ExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(500)]
        public string? DeviceInfo { get; set; }

        [MaxLength(45)]
        public string? IpAddress { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }

    // ===================================================================
    // NEWS AND ANNOUNCEMENTS MODELS
    // ===================================================================

    public class NewsArticle
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        [MaxLength(500)]
        public string Summary { get; set; }

        [Required]
        public string FullContent { get; set; }

        [Required]
        [MaxLength(500)]
        public string ImageUrl { get; set; }

        public DateTime PublishedDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string PublishedTime { get; set; }

        [Required]
        [MaxLength(200)]
        public string Location { get; set; }

        [MaxLength(100)]
        public string? ExpectedAttendees { get; set; }

        [Required]
        public NewsCategory Category { get; set; }

        [Required]
        [MaxLength(100)]
        public string Author { get; set; }

        [Column(TypeName = "json")]
        public string Tags { get; set; } = "[]";

        public bool IsFeatured { get; set; } = false;

        public bool IsTrending { get; set; } = false;

        public int ViewCount { get; set; } = 0;

        public ContentStatus Status { get; set; } = ContentStatus.Draft;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Helper methods for Tags
        [NotMapped]
        public List<string> TagsList
        {
            get => JsonSerializer.Deserialize<List<string>>(Tags) ?? new List<string>();
            set => Tags = JsonSerializer.Serialize(value);
        }
    }

    public enum NewsCategory
    {
        Festival,
        Infrastructure,
        Health,
        Education,
        Environment,
        Culture,
        Technology,
        Sports,
        Government,
        Emergency
    }

    public enum ContentStatus
    {
        Draft,
        Published,
        Archived,
        Scheduled
    }

    public class Announcement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        public string Message { get; set; }

        public AnnouncementType Type { get; set; }

        public Priority Priority { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [MaxLength(100)]
        public string? TargetAudience { get; set; }

        [Required]
        [MaxLength(100)]
        public string CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum AnnouncementType
    {
        General,
        Emergency,
        ServiceUpdate,
        Holiday,
        Maintenance
    }

    public enum Priority
    {
        Low,
        Medium,
        High,
        Critical
    }

    // ===================================================================
    // CITY SERVICES AND APPOINTMENTS MODELS
    // ===================================================================

    public class ServiceCategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        [MaxLength(50)]
        public string IconName { get; set; }

        public bool IsActive { get; set; } = true;

        public int SortOrder { get; set; }

        // Navigation properties
        public virtual ICollection<CityService> Services { get; set; } = new List<CityService>();
    }

    public class CityService
    {
        [Key]
        public int Id { get; set; }

        public int CategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Fee { get; set; }

        [Required]
        [MaxLength(50)]
        public string ProcessingTime { get; set; }

        [Column(TypeName = "json")]
        public string RequiredDocuments { get; set; } = "[]";

        public bool IsActive { get; set; } = true;

        [Required]
        [MaxLength(200)]
        public string OfficeLocation { get; set; }

        [MaxLength(20)]
        public string? ContactNumber { get; set; }

        [Required]
        [MaxLength(100)]
        public string OperatingHours { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("CategoryId")]
        public virtual ServiceCategory Category { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

        // Helper methods for RequiredDocuments
        [NotMapped]
        public List<string> RequiredDocumentsList
        {
            get => JsonSerializer.Deserialize<List<string>>(RequiredDocuments) ?? new List<string>();
            set => RequiredDocuments = JsonSerializer.Serialize(value);
        }
    }

    public class Appointment
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string UserId { get; set; }

        public int ServiceId { get; set; }

        [Required]
        [MaxLength(20)]
        public string ReferenceNumber { get; set; }

        public DateTime AppointmentDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string AppointmentTime { get; set; }

        public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;

        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalFee { get; set; }

        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;

        public string? Notes { get; set; }

        // Applicant Information
        [Required]
        [MaxLength(100)]
        public string ApplicantFirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string ApplicantLastName { get; set; }

        [MaxLength(100)]
        public string? ApplicantMiddleName { get; set; }

        [Required]
        [MaxLength(20)]
        public string ApplicantContactNumber { get; set; }

        [MaxLength(255)]
        public string? ApplicantEmail { get; set; }

        [Required]
        [MaxLength(500)]
        public string ApplicantAddress { get; set; }

        // Service-specific data (JSON field)
        [Column(TypeName = "json")]
        public string ServiceSpecificData { get; set; } = "{}";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? CompletedAt { get; set; }

        public DateTime? CancelledAt { get; set; }

        [MaxLength(500)]
        public string? CancellationReason { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("ServiceId")]
        public virtual CityService Service { get; set; }

        public virtual CivilRegistryRequest? CivilRegistryRequest { get; set; }
        public virtual BusinessPermitRequest? BusinessPermitRequest { get; set; }
        public virtual HealthServiceRequest? HealthServiceRequest { get; set; }
        public virtual EducationServiceRequest? EducationServiceRequest { get; set; }
        public virtual SocialServiceRequest? SocialServiceRequest { get; set; }
        public virtual TaxServiceRequest? TaxServiceRequest { get; set; }
    }

    public enum AppointmentStatus
    {
        Pending,
        Confirmed,
        InProgress,
        Completed,
        Cancelled,
        NoShow
    }

    public enum PaymentStatus
    {
        Pending,
        Paid,
        Refunded,
        Failed
    }

    // ===================================================================
    // SERVICE-SPECIFIC REQUEST MODELS
    // ===================================================================

    public class CivilRegistryRequest
    {
        [Key]
        public string AppointmentId { get; set; }

        public CivilDocumentType DocumentType { get; set; }

        [Required]
        [MaxLength(100)]
        public string Purpose { get; set; }

        public int NumberOfCopies { get; set; } = 1;

        [MaxLength(50)]
        public string? RegistryNumber { get; set; }

        public DateTime? RegistryDate { get; set; }

        [MaxLength(200)]
        public string? RegistryPlace { get; set; }

        // Navigation properties
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }
    }

    public enum CivilDocumentType
    {
        BirthCertificate,
        MarriageCertificate,
        DeathCertificate,
        CENOMAR
    }

    public class BusinessPermitRequest
    {
        [Key]
        public string AppointmentId { get; set; }

        public BusinessServiceType ServiceType { get; set; }

        [Required]
        [MaxLength(200)]
        public string BusinessName { get; set; }

        [Required]
        [MaxLength(100)]
        public string BusinessType { get; set; }

        [Required]
        [MaxLength(500)]
        public string BusinessAddress { get; set; }

        [Required]
        [MaxLength(100)]
        public string OwnerName { get; set; }

        [MaxLength(20)]
        public string? TinNumber { get; set; }

        [Column(TypeName = "decimal(15,2)")]
        public decimal? CapitalInvestment { get; set; }

        // Navigation properties
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }
    }

    public enum BusinessServiceType
    {
        NewRegistration,
        Renewal,
        Amendment,
        Closure,
        Transfer
    }

    public class HealthServiceRequest
    {
        [Key]
        public string AppointmentId { get; set; }

        public HealthServiceType ServiceType { get; set; }

        [MaxLength(100)]
        public string? CertificatePurpose { get; set; }

        [MaxLength(100)]
        public string? AssistanceType { get; set; }

        public string? MedicalHistory { get; set; }

        public string? CurrentMedications { get; set; }

        [MaxLength(500)]
        public string? Allergies { get; set; }

        public string? Symptoms { get; set; }

        [MaxLength(100)]
        public string? PreferredDoctor { get; set; }

        // Navigation properties
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }
    }

    public enum HealthServiceType
    {
        HealthCertificate,
        MedicalClearance,
        VaccinationRecord,
        MedicalAssistance,
        MentalHealthConsultation,
        MaternalCare
    }

    public class EducationServiceRequest
    {
        [Key]
        public string AppointmentId { get; set; }

        public EducationServiceType ServiceType { get; set; }

        [Required]
        [MaxLength(100)]
        public string StudentFirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string StudentLastName { get; set; }

        [MaxLength(100)]
        public string? StudentMiddleName { get; set; }

        public DateTime StudentBirthDate { get; set; }

        [Required]
        [MaxLength(500)]
        public string StudentAddress { get; set; }

        [MaxLength(50)]
        public string? GradeLevel { get; set; }

        [MaxLength(200)]
        public string? SchoolName { get; set; }

        [MaxLength(10)]
        public string? Gpa { get; set; }

        [MaxLength(100)]
        public string? ScholarshipType { get; set; }

        [MaxLength(100)]
        public string? VocationalCourse { get; set; }

        [Required]
        [MaxLength(100)]
        public string ParentName { get; set; }

        [MaxLength(100)]
        public string? ParentOccupation { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? MonthlyIncome { get; set; }

        public int? FamilySize { get; set; }

        // Navigation properties
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }
    }

    public enum EducationServiceType
    {
        SchoolEnrollment,
        ScholarshipApplication,
        EducationalAssistance,
        SchoolSupplies,
        TutorialProgram,
        VocationalTraining
    }

    public class SocialServiceRequest
    {
        [Key]
        public string AppointmentId { get; set; }

        public SocialServiceType ServiceType { get; set; }

        [MaxLength(100)]
        public string? DisabilityType { get; set; }

        [MaxLength(100)]
        public string? AssistanceType { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? MonthlyIncome { get; set; }

        public int? FamilySize { get; set; }

        // Navigation properties
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }
    }

    public enum SocialServiceType
    {
        SeniorCitizenId,
        PWDId,
        CertificateOfIndigency,
        CertificateOfResidency,
        SoloParentId,
        FinancialAssistance
    }

    public class TaxServiceRequest
    {
        [Key]
        public string AppointmentId { get; set; }

        public TaxServiceType ServiceType { get; set; }

        public int TaxYear { get; set; }

        [MaxLength(100)]
        public string? PropertyType { get; set; }

        [MaxLength(500)]
        public string? PropertyAddress { get; set; }

        [MaxLength(50)]
        public string? PropertyTDN { get; set; }

        [MaxLength(200)]
        public string? BusinessName { get; set; }

        [MaxLength(20)]
        public string? BusinessTIN { get; set; }

        [Column(TypeName = "decimal(15,2)")]
        public decimal? AssessedValue { get; set; }

        [MaxLength(100)]
        public string? ExemptionType { get; set; }

        // Navigation properties
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }
    }

    public enum TaxServiceType
    {
        RPTPayment,
        RPTClearance,
        BusinessTax,
        TaxClearance,
        TaxAssessment,
        TaxExemption
    }

    // ===================================================================
    // ISSUE REPORTING MODELS
    // ===================================================================

    public class IssueReport
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string? UserId { get; set; } // Optional for anonymous reports

        [Required]
        [MaxLength(20)]
        public string ReferenceNumber { get; set; }

        public IssueCategory Category { get; set; }

        public UrgencyLevel UrgencyLevel { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [MaxLength(500)]
        public string Location { get; set; }

        [MaxLength(100)]
        public string? Coordinates { get; set; } // GPS coordinates

        [MaxLength(200)]
        public string? ContactInfo { get; set; }

        public IssueStatus Status { get; set; } = IssueStatus.Submitted;

        public Priority Priority { get; set; }

        [MaxLength(100)]
        public string? AssignedDepartment { get; set; }

        [MaxLength(100)]
        public string? AssignedTo { get; set; }

        public DateTime? EstimatedResolution { get; set; }

        public DateTime? ActualResolution { get; set; }

        public string? ResolutionNotes { get; set; }

        public bool PubliclyVisible { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        public virtual ICollection<IssuePhoto> Photos { get; set; } = new List<IssuePhoto>();
        public virtual ICollection<IssueUpdate> Updates { get; set; } = new List<IssueUpdate>();
    }

    public enum IssueCategory
    {
        Flooding,
        RoadIssues,
        FireHazard,
        PowerOutage,
        Environmental,
        PublicSafety,
        Infrastructure,
        Emergency
    }

    public enum UrgencyLevel
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum IssueStatus
    {
        Submitted,
        UnderReview,
        Assigned,
        InProgress,
        Resolved,
        Closed,
        Rejected
    }

    public class IssuePhoto
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string IssueReportId { get; set; }

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; }

        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; }

        public long FileSize { get; set; }

        [Required]
        [MaxLength(100)]
        public string MimeType { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("IssueReportId")]
        public virtual IssueReport IssueReport { get; set; }
    }

    public class IssueUpdate
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string IssueReportId { get; set; }

        [Required]
        [MaxLength(100)]
        public string UpdatedBy { get; set; }

        public IssueUpdateType UpdateType { get; set; }

        [Required]
        public string Message { get; set; }

        public bool IsPublic { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("IssueReportId")]
        public virtual IssueReport IssueReport { get; set; }
    }

    public enum IssueUpdateType
    {
        StatusChange,
        Assignment,
        Progress,
        Resolution,
        Comment
    }

    // ===================================================================
    // TOURISM AND TRANSPARENCY MODELS
    // ===================================================================

    public class TouristSpot
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [MaxLength(500)]
        public string ImageUrl { get; set; }

        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; }

        [Required]
        [MaxLength(200)]
        public string Location { get; set; }

        [Required]
        [MaxLength(100)]
        public string Coordinates { get; set; }

        [Required]
        [MaxLength(500)]
        public string Address { get; set; }

        [Required]
        [MaxLength(100)]
        public string OpeningHours { get; set; }

        [Required]
        [MaxLength(100)]
        public string EntryFee { get; set; }

        [Column(TypeName = "json")]
        public string Highlights { get; set; } = "[]";

        [Required]
        [MaxLength(100)]
        public string TravelTime { get; set; }

        public bool IsActive { get; set; } = true;

        public int ViewCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Helper methods for Highlights
        [NotMapped]
        public List<string> HighlightsList
        {
            get => JsonSerializer.Deserialize<List<string>>(Highlights) ?? new List<string>();
            set => Highlights = JsonSerializer.Serialize(value);
        }
    }

    public class PublicProject
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Column(TypeName = "decimal(15,2)")]
        public decimal Cost { get; set; }

        [Required]
        [MaxLength(200)]
        public string Contractor { get; set; }

        public ProjectStatus Status { get; set; }

        public int? Progress { get; set; } // Percentage 0-100

        public DateTime StartDate { get; set; }

        public DateTime? ExpectedEndDate { get; set; }

        public DateTime? ActualEndDate { get; set; }

        [MaxLength(200)]
        public string? Location { get; set; }

        [Required]
        [MaxLength(100)]
        public string ProjectType { get; set; }

        [Required]
        [MaxLength(100)]
        public string FundingSource { get; set; }

        public bool IsPublic { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum ProjectStatus
    {
        Planned,
        Ongoing,
        Completed,
        Suspended,
        Cancelled
    }

    // ===================================================================
    // EMERGENCY AND HOTLINES MODELS
    // ===================================================================

    public class EmergencyHotline
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        public bool IsEmergency { get; set; } = false;

        [Required]
        [MaxLength(100)]
        public string Department { get; set; }

        [Required]
        [MaxLength(100)]
        public string OperatingHours { get; set; }

        public bool IsActive { get; set; } = true;

        public int SortOrder { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    // ===================================================================
    // SYSTEM AND CONFIGURATION MODELS
    // ===================================================================

    public class SystemConfiguration
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(100)]
        public string Key { get; set; }

        [Required]
        public string Value { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public ConfigDataType DataType { get; set; }

        public bool IsPublic { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum ConfigDataType
    {
        String,
        Number,
        Boolean,
        JSON,
        Date
    }

    public class AuditLog
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string? UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Action { get; set; }

        [Required]
        [MaxLength(100)]
        public string EntityType { get; set; }

        [Required]
        [MaxLength(100)]
        public string EntityId { get; set; }

        public string? OldValues { get; set; } // JSON

        public string? NewValues { get; set; } // JSON

        [MaxLength(45)]
        public string? IpAddress { get; set; }

        [MaxLength(500)]
        public string? UserAgent { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    // ===================================================================
    // NOTIFICATION MODELS
    // ===================================================================

    public class Notification
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string UserId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        public string Message { get; set; }

        public NotificationType Type { get; set; }

        public bool IsRead { get; set; } = false;

        [MaxLength(500)]
        public string? ActionUrl { get; set; }

        public string? ActionData { get; set; } // JSON

        public DateTime? ExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ReadAt { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }

    public enum NotificationType
    {
        AppointmentConfirmation,
        AppointmentReminder,
        IssueUpdate,
        NewsAlert,
        SystemMaintenance,
        General
    }

    // ===================================================================
    // FILE UPLOAD MODELS
    // ===================================================================

    public class FileUpload
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; set; }

        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; }

        public long FileSize { get; set; }

        [Required]
        [MaxLength(100)]
        public string MimeType { get; set; }

        public string? UploadedBy { get; set; }

        [MaxLength(100)]
        public string? EntityType { get; set; }

        [MaxLength(100)]
        public string? EntityId { get; set; }

        public bool IsTemporary { get; set; } = false;

        public DateTime? ExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    // ===================================================================
    // STATISTICS AND ANALYTICS MODELS
    // ===================================================================

    public class AppUsageStatistics
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public DateTime Date { get; set; }

        public int TotalUsers { get; set; }

        public int ActiveUsers { get; set; }

        public int NewRegistrations { get; set; }

        public int AppointmentsBooked { get; set; }

        public int IssuesReported { get; set; }

        public int NewsViews { get; set; }

        [MaxLength(100)]
        public string MostUsedService { get; set; }

        public int PeakUsageHour { get; set; }
    }

    public class ServiceStatistics
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public int ServiceId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ServiceName { get; set; }

        public int TotalAppointments { get; set; }

        public int CompletedAppointments { get; set; }

        public int CancelledAppointments { get; set; }

        public int AverageProcessingTime { get; set; } // in hours

        [Column(TypeName = "decimal(3,2)")]
        public decimal? CustomerSatisfactionRating { get; set; }

        public StatisticsPeriod Period { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }

    public enum StatisticsPeriod
    {
        Daily,
        Weekly,
        Monthly,
        Quarterly,
        Yearly
    }

    // ===================================================================
    // FEEDBACK AND RATING MODELS
    // ===================================================================

    public class ServiceFeedback
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string AppointmentId { get; set; }

        [Required]
        public string UserId { get; set; }

        public int ServiceId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; } // 1-5 scale

        public string? Comment { get; set; }

        public bool IsAnonymous { get; set; } = false;

        public bool IsPublic { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("ServiceId")]
        public virtual CityService Service { get; set; }
    }

    public class AppFeedback
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string? UserId { get; set; }

        public FeedbackType Type { get; set; }

        [Required]
        [MaxLength(200)]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        [Range(1, 5)]
        public int? Rating { get; set; }

        [MaxLength(255)]
        public string? ContactEmail { get; set; }

        public FeedbackStatus Status { get; set; } = FeedbackStatus.New;

        public string? Response { get; set; }

        [MaxLength(100)]
        public string? RespondedBy { get; set; }

        public DateTime? RespondedAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }

    public enum FeedbackType
    {
        Bug,
        Feature,
        Complaint,
        Suggestion,
        General
    }

    public enum FeedbackStatus
    {
        New,
        InReview,
        Responded,
        Resolved,
        Closed
    }
}