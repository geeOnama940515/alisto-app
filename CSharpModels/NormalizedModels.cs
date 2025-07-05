// ===================================================================
// ALISTO APP - NORMALIZED C# MODELS
// ===================================================================
// Refactored models using base classes and normalized structure
// ===================================================================

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Alisto.Models.Base;

namespace Alisto.Models
{
    // ===================================================================
    // USER MODELS
    // ===================================================================

    public class User : SoftDeletableEntity
    {
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        public PersonName Name { get; set; } = new();
        public ContactInfo Contact { get; set; } = new();

        public DateTime? DateOfBirth { get; set; }
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

    public class UserSession : TimestampedEntity
    {
        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Token { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string RefreshToken { get; set; } = string.Empty;

        public DateTime ExpiresAt { get; set; }

        [MaxLength(500)]
        public string? DeviceInfo { get; set; }

        [MaxLength(45)]
        public string? IpAddress { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }

    // ===================================================================
    // CONTENT MODELS
    // ===================================================================

    public class NewsArticle : TrackableEntity
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Summary { get; set; } = string.Empty;

        [Required]
        public string FullContent { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        public DateTime PublishedDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string PublishedTime { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Location { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? ExpectedAttendees { get; set; }

        public NewsCategory Category { get; set; }

        [Required]
        [MaxLength(100)]
        public string Author { get; set; } = string.Empty;

        [Column(TypeName = "json")]
        public string Tags { get; set; } = "[]";

        public bool IsFeatured { get; set; } = false;
        public bool IsTrending { get; set; } = false;
        public int ViewCount { get; set; } = 0;
        public ContentStatus Status { get; set; } = ContentStatus.Draft;

        // Helper property for Tags
        [NotMapped]
        public List<string> TagsList
        {
            get => JsonSerializer.Deserialize<List<string>>(Tags) ?? new List<string>();
            set => Tags = JsonSerializer.Serialize(value);
        }
    }

    public class Announcement : TrackableEntity
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        public AnnouncementType Type { get; set; }
        public Priority Priority { get; set; }
        public bool IsActive { get; set; } = true;

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [MaxLength(100)]
        public string? TargetAudience { get; set; }
    }

    // ===================================================================
    // SERVICE MODELS
    // ===================================================================

    public class ServiceCategory : TimestampedEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string IconName { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        public int SortOrder { get; set; }

        // Navigation properties
        public virtual ICollection<CityService> Services { get; set; } = new List<CityService>();
    }

    public class CityService : TrackableEntity
    {
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10,2)")]
        public decimal Fee { get; set; }

        [Required]
        [MaxLength(50)]
        public string ProcessingTime { get; set; } = string.Empty;

        [Column(TypeName = "json")]
        public string RequiredDocuments { get; set; } = "[]";

        public bool IsActive { get; set; } = true;

        [Required]
        [MaxLength(200)]
        public string OfficeLocation { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? ContactNumber { get; set; }

        [Required]
        [MaxLength(100)]
        public string OperatingHours { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("CategoryId")]
        public virtual ServiceCategory Category { get; set; } = null!;

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

        // Helper property for RequiredDocuments
        [NotMapped]
        public List<string> RequiredDocumentsList
        {
            get => JsonSerializer.Deserialize<List<string>>(RequiredDocuments) ?? new List<string>();
            set => RequiredDocuments = JsonSerializer.Serialize(value);
        }
    }

    public class Appointment : TrackableEntity
    {
        [Required]
        public string UserId { get; set; } = string.Empty;

        public int ServiceId { get; set; }

        [Required]
        [MaxLength(20)]
        public string ReferenceNumber { get; set; } = string.Empty;

        public DateTime AppointmentDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string AppointmentTime { get; set; } = string.Empty;

        public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;

        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalFee { get; set; }

        public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Pending;

        public string? Notes { get; set; }

        // Applicant Information as value object
        public PersonName ApplicantName { get; set; } = new();
        public ContactInfo ApplicantContact { get; set; } = new();

        // Service-specific data (JSON field)
        [Column(TypeName = "json")]
        public string ServiceSpecificData { get; set; } = "{}";

        public DateTime? CompletedAt { get; set; }
        public DateTime? CancelledAt { get; set; }

        [MaxLength(500)]
        public string? CancellationReason { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        [ForeignKey("ServiceId")]
        public virtual CityService Service { get; set; } = null!;
    }

    // ===================================================================
    // ISSUE REPORT MODELS
    // ===================================================================

    public class IssueReport : TrackableEntity
    {
        public string? UserId { get; set; } // Optional for anonymous reports

        [Required]
        [MaxLength(20)]
        public string ReferenceNumber { get; set; } = string.Empty;

        public IssueCategory Category { get; set; }
        public UrgencyLevel UrgencyLevel { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public Location Location { get; set; } = new();

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

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        public virtual ICollection<IssuePhoto> Photos { get; set; } = new List<IssuePhoto>();
        public virtual ICollection<IssueUpdate> Updates { get; set; } = new List<IssueUpdate>();
    }

    public class IssuePhoto : TimestampedEntity
    {
        [Required]
        public string IssueReportId { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; } = string.Empty;

        public long FileSize { get; set; }

        [Required]
        [MaxLength(100)]
        public string MimeType { get; set; } = string.Empty;

        // Navigation properties
        [ForeignKey("IssueReportId")]
        public virtual IssueReport IssueReport { get; set; } = null!;
    }

    public class IssueUpdate : TimestampedEntity
    {
        [Required]
        public string IssueReportId { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string UpdatedBy { get; set; } = string.Empty;

        public IssueUpdateType UpdateType { get; set; }

        [Required]
        public string Message { get; set; } = string.Empty;

        public bool IsPublic { get; set; } = true;

        // Navigation properties
        [ForeignKey("IssueReportId")]
        public virtual IssueReport IssueReport { get; set; } = null!;
    }

    // ===================================================================
    // TOURISM AND TRANSPARENCY MODELS
    // ===================================================================

    public class TouristSpot : TrackableEntity
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; }

        public Location Location { get; set; } = new();

        [Required]
        [MaxLength(100)]
        public string OpeningHours { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string EntryFee { get; set; } = string.Empty;

        [Column(TypeName = "json")]
        public string Highlights { get; set; } = "[]";

        [Required]
        [MaxLength(100)]
        public string TravelTime { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        public int ViewCount { get; set; } = 0;

        // Helper property for Highlights
        [NotMapped]
        public List<string> HighlightsList
        {
            get => JsonSerializer.Deserialize<List<string>>(Highlights) ?? new List<string>();
            set => Highlights = JsonSerializer.Serialize(value);
        }
    }

    public class PublicProject : TrackableEntity
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Column(TypeName = "decimal(15,2)")]
        public decimal Cost { get; set; }

        [Required]
        [MaxLength(200)]
        public string Contractor { get; set; } = string.Empty;

        public ProjectStatus Status { get; set; }
        public int? Progress { get; set; } // Percentage 0-100

        public DateTime StartDate { get; set; }
        public DateTime? ExpectedEndDate { get; set; }
        public DateTime? ActualEndDate { get; set; }

        [MaxLength(200)]
        public string? Location { get; set; }

        [Required]
        [MaxLength(100)]
        public string ProjectType { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string FundingSource { get; set; } = string.Empty;

        public bool IsPublic { get; set; } = true;
    }

    // ===================================================================
    // SYSTEM MODELS
    // ===================================================================

    public class EmergencyHotline : TrackableEntity
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public bool IsEmergency { get; set; } = false;

        [Required]
        [MaxLength(100)]
        public string Department { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string OperatingHours { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        public int SortOrder { get; set; }
    }

    public class Notification : TimestampedEntity
    {
        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        public NotificationType Type { get; set; }
        public bool IsRead { get; set; } = false;

        [MaxLength(500)]
        public string? ActionUrl { get; set; }

        public string? ActionData { get; set; } // JSON

        public DateTime? ExpiresAt { get; set; }
        public DateTime? ReadAt { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }

    public class FileUpload : TimestampedEntity
    {
        [Required]
        [MaxLength(255)]
        public string FileName { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; } = string.Empty;

        public long FileSize { get; set; }

        [Required]
        [MaxLength(100)]
        public string MimeType { get; set; } = string.Empty;

        public string? UploadedBy { get; set; }

        [MaxLength(100)]
        public string? EntityType { get; set; }

        [MaxLength(100)]
        public string? EntityId { get; set; }

        public bool IsTemporary { get; set; } = false;
        public DateTime? ExpiresAt { get; set; }
    }

    // ===================================================================
    // ENUMS
    // ===================================================================

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

    public enum AnnouncementType
    {
        General,
        Emergency,
        ServiceUpdate,
        Holiday,
        Maintenance
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

    public enum IssueUpdateType
    {
        StatusChange,
        Assignment,
        Progress,
        Resolution,
        Comment
    }

    public enum ProjectStatus
    {
        Planned,
        Ongoing,
        Completed,
        Suspended,
        Cancelled
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
}