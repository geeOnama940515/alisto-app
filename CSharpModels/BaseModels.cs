// ===================================================================
// ALISTO APP - C# BASE MODELS
// ===================================================================
// Base classes and common interfaces for Entity Framework models
// ===================================================================

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Alisto.Models.Base
{
    // ===================================================================
    // BASE INTERFACES
    // ===================================================================

    public interface IEntity
    {
        string Id { get; set; }
    }

    public interface ITimestamped
    {
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
    }

    public interface IAuditable
    {
        string? CreatedBy { get; set; }
        string? UpdatedBy { get; set; }
    }

    public interface ISoftDeletable
    {
        bool IsActive { get; set; }
        DateTime? DeletedAt { get; set; }
    }

    public interface ITrackable : ITimestamped, IAuditable
    {
    }

    // ===================================================================
    // BASE CLASSES
    // ===================================================================

    public abstract class BaseEntity : IEntity
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
    }

    public abstract class TimestampedEntity : BaseEntity, ITimestamped
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public abstract class TrackableEntity : TimestampedEntity, ITrackable
    {
        [MaxLength(100)]
        public string? CreatedBy { get; set; }

        [MaxLength(100)]
        public string? UpdatedBy { get; set; }
    }

    public abstract class SoftDeletableEntity : TrackableEntity, ISoftDeletable
    {
        public bool IsActive { get; set; } = true;
        public DateTime? DeletedAt { get; set; }
    }

    // ===================================================================
    // VALUE OBJECTS
    // ===================================================================

    [ComplexType]
    public class PersonName
    {
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? MiddleName { get; set; }

        public string FullName => string.IsNullOrEmpty(MiddleName) 
            ? $"{FirstName} {LastName}" 
            : $"{FirstName} {MiddleName} {LastName}";
    }

    [ComplexType]
    public class ContactInfo
    {
        [Required]
        [Phone]
        [MaxLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;

        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }

        [Required]
        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;
    }

    [ComplexType]
    public class Location
    {
        [Required]
        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Coordinates { get; set; }
    }

    // ===================================================================
    // COMMON ENUMS
    // ===================================================================

    public enum Status
    {
        Active,
        Inactive,
        Pending,
        Completed,
        Cancelled,
        Suspended,
        Archived
    }

    public enum Priority
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum UrgencyLevel
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum SortDirection
    {
        Ascending,
        Descending
    }
}