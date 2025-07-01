// ===================================================================
// ALISTO APP - C# DATA TRANSFER OBJECTS (DTOs)
// ===================================================================
// DTOs for API requests and responses
// ===================================================================

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Alisto.DTOs
{
    // ===================================================================
    // API RESPONSE MODELS
    // ===================================================================

    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public List<string>? Errors { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? RequestId { get; set; }
    }

    public class PaginatedResponse<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasNextPage { get; set; }
        public bool HasPreviousPage { get; set; }
    }

    public class PaginationRequest
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SortBy { get; set; }
        public SortDirection SortDirection { get; set; } = SortDirection.Ascending;
        public string? SearchTerm { get; set; }
    }

    public enum SortDirection
    {
        Ascending,
        Descending
    }

    // ===================================================================
    // AUTHENTICATION DTOs
    // ===================================================================

    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        public string? DeviceInfo { get; set; }
    }

    public class RegisterRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string? MiddleName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        public string Address { get; set; }

        public DateTime? DateOfBirth { get; set; }
    }

    public class AuthResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiresAt { get; set; }
        public UserDto User { get; set; }
    }

    public class RefreshTokenRequest
    {
        [Required]
        public string RefreshToken { get; set; }
    }

    // ===================================================================
    // USER DTOs
    // ===================================================================

    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? MiddleName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public string? ProfileImageUrl { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactNumber { get; set; }
    }

    public class UpdateUserRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MiddleName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactNumber { get; set; }
    }

    // ===================================================================
    // NEWS DTOs
    // ===================================================================

    public class NewsArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string? FullContent { get; set; }
        public string ImageUrl { get; set; }
        public DateTime PublishedDate { get; set; }
        public string PublishedTime { get; set; }
        public string Location { get; set; }
        public string? ExpectedAttendees { get; set; }
        public string Category { get; set; }
        public string Author { get; set; }
        public List<string> Tags { get; set; } = new List<string>();
        public bool IsFeatured { get; set; }
        public bool IsTrending { get; set; }
        public int ViewCount { get; set; }
    }

    public class CreateNewsRequest
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Summary { get; set; }

        [Required]
        public string FullContent { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public DateTime PublishedDate { get; set; }

        [Required]
        public string PublishedTime { get; set; }

        [Required]
        public string Location { get; set; }

        public string? ExpectedAttendees { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Author { get; set; }

        public List<string> Tags { get; set; } = new List<string>();

        public bool IsFeatured { get; set; }

        public bool IsTrending { get; set; }
    }

    // ===================================================================
    // APPOINTMENT DTOs
    // ===================================================================

    public class AppointmentDto
    {
        public string Id { get; set; }
        public string ReferenceNumber { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string AppointmentTime { get; set; }
        public string Status { get; set; }
        public decimal TotalFee { get; set; }
        public string PaymentStatus { get; set; }
        public string ServiceName { get; set; }
        public string ServiceCategory { get; set; }
        public string ApplicantFirstName { get; set; }
        public string ApplicantLastName { get; set; }
        public string ApplicantContactNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }

    public class CreateAppointmentRequest
    {
        [Required]
        public int ServiceId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public string AppointmentTime { get; set; }

        [Required]
        public string ApplicantFirstName { get; set; }

        [Required]
        public string ApplicantLastName { get; set; }

        public string? ApplicantMiddleName { get; set; }

        [Required]
        public string ApplicantContactNumber { get; set; }

        public string? ApplicantEmail { get; set; }

        [Required]
        public string ApplicantAddress { get; set; }

        public object? ServiceSpecificData { get; set; }
    }

    // ===================================================================
    // ISSUE REPORT DTOs
    // ===================================================================

    public class IssueReportDto
    {
        public string Id { get; set; }
        public string ReferenceNumber { get; set; }
        public string Category { get; set; }
        public string UrgencyLevel { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string? Coordinates { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string? AssignedDepartment { get; set; }
        public DateTime? EstimatedResolution { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<IssuePhotoDto> Photos { get; set; } = new List<IssuePhotoDto>();
    }

    public class CreateIssueReportRequest
    {
        [Required]
        public string Category { get; set; }

        [Required]
        public string UrgencyLevel { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Location { get; set; }

        public string? Coordinates { get; set; }

        public string? ContactInfo { get; set; }

        public List<string> PhotoIds { get; set; } = new List<string>();
    }

    public class IssuePhotoDto
    {
        public string Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public DateTime UploadedAt { get; set; }
    }

    // ===================================================================
    // SERVICE DTOs
    // ===================================================================

    public class ServiceCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string IconName { get; set; }
        public List<CityServiceDto> Services { get; set; } = new List<CityServiceDto>();
    }

    public class CityServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Fee { get; set; }
        public string ProcessingTime { get; set; }
        public List<string> RequiredDocuments { get; set; } = new List<string>();
        public string OfficeLocation { get; set; }
        public string? ContactNumber { get; set; }
        public string OperatingHours { get; set; }
    }

    // ===================================================================
    // TOURISM DTOs
    // ===================================================================

    public class TouristSpotDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public decimal Rating { get; set; }
        public string Location { get; set; }
        public string Coordinates { get; set; }
        public string Address { get; set; }
        public string OpeningHours { get; set; }
        public string EntryFee { get; set; }
        public List<string> Highlights { get; set; } = new List<string>();
        public string TravelTime { get; set; }
        public int ViewCount { get; set; }
    }

    // ===================================================================
    // PROJECT DTOs
    // ===================================================================

    public class PublicProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public decimal Cost { get; set; }
        public string Contractor { get; set; }
        public string Status { get; set; }
        public int? Progress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? ExpectedEndDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public string? Location { get; set; }
        public string ProjectType { get; set; }
        public string FundingSource { get; set; }
    }

    // ===================================================================
    // HOTLINE DTOs
    // ===================================================================

    public class EmergencyHotlineDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public bool IsEmergency { get; set; }
        public string Department { get; set; }
        public string OperatingHours { get; set; }
    }

    // ===================================================================
    // NOTIFICATION DTOs
    // ===================================================================

    public class NotificationDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public bool IsRead { get; set; }
        public string? ActionUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
    }

    // ===================================================================
    // FEEDBACK DTOs
    // ===================================================================

    public class CreateServiceFeedbackRequest
    {
        [Required]
        public string AppointmentId { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        public string? Comment { get; set; }

        public bool IsAnonymous { get; set; } = false;
    }

    public class CreateAppFeedbackRequest
    {
        [Required]
        public string Type { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        [Range(1, 5)]
        public int? Rating { get; set; }

        public string? ContactEmail { get; set; }
    }

    // ===================================================================
    // STATISTICS DTOs
    // ===================================================================

    public class DashboardStatsDto
    {
        public int TotalUsers { get; set; }
        public int ActiveAppointments { get; set; }
        public int PendingIssues { get; set; }
        public int CompletedProjects { get; set; }
        public decimal CustomerSatisfactionRating { get; set; }
        public List<ServiceUsageDto> TopServices { get; set; } = new List<ServiceUsageDto>();
    }

    public class ServiceUsageDto
    {
        public string ServiceName { get; set; }
        public int UsageCount { get; set; }
        public decimal SatisfactionRating { get; set; }
    }
}