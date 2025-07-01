# Alisto App - C# Backend Models

This directory contains comprehensive C# models, DTOs, and Entity Framework configuration for the Alisto city services application.

## 📁 File Structure

- **Models.cs** - Complete entity models for all app features
- **DTOs.cs** - Data Transfer Objects for API requests/responses  
- **DbContext.cs** - Entity Framework database context configuration
- **README.md** - This documentation file

## 🏗️ Architecture Overview

### Core Features Covered

1. **User Management & Authentication**
   - User registration, login, sessions
   - Profile management and security

2. **News & Announcements**
   - Article management with categories
   - System announcements with priority levels

3. **City Services & Appointments**
   - 6 service categories (Civil Registry, Business, Health, Education, Social, Tax)
   - Comprehensive appointment booking system
   - Service-specific data models

4. **Issue Reporting System**
   - 8 issue categories with urgency levels
   - Photo uploads and status tracking
   - Department assignment and resolution tracking

5. **Tourism & Transparency**
   - Tourist spot management with ratings
   - Public project transparency with budget tracking

6. **Emergency Services**
   - Hotline management system
   - Emergency vs regular contact categorization

7. **System Features**
   - Notifications and feedback systems
   - File upload management
   - Analytics and usage statistics
   - Audit logging for security

## 🚀 Getting Started

### 1. Install Required NuGet Packages

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package System.Text.Json
```

### 2. Configure Connection String

Add to your `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=AlistoDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

### 3. Register DbContext in Startup/Program.cs

```csharp
builder.Services.AddDbContext<AlistoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### 4. Create and Run Migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## 📊 Database Schema Highlights

### Key Relationships

- **Users** → **Appointments** (One-to-Many)
- **Users** → **IssueReports** (One-to-Many)  
- **Appointments** → **Service-Specific Requests** (One-to-One)
- **IssueReports** → **IssuePhotos** (One-to-Many)
- **Services** → **ServiceCategories** (Many-to-One)

### Performance Optimizations

- **Indexes** on frequently queried fields (email, reference numbers, status fields)
- **Composite indexes** for complex queries
- **JSON columns** for flexible data storage
- **Enum-to-string conversion** for better readability

### Security Features

- **Audit logging** for sensitive operations
- **Soft deletes** for important data
- **Foreign key constraints** with appropriate cascade rules
- **Data validation** attributes

## 🔧 Usage Examples

### Creating an Appointment

```csharp
var appointment = new Appointment
{
    UserId = userId,
    ServiceId = serviceId,
    ReferenceNumber = GenerateReferenceNumber(),
    AppointmentDate = appointmentDate,
    AppointmentTime = appointmentTime,
    ApplicantFirstName = "John",
    ApplicantLastName = "Doe",
    ApplicantContactNumber = "09123456789",
    ApplicantAddress = "123 Main St, Laoag City",
    TotalFee = 155.00m,
    Status = AppointmentStatus.Pending
};

context.Appointments.Add(appointment);
await context.SaveChangesAsync();
```

### Querying News with Pagination

```csharp
var news = await context.NewsArticles
    .Where(n => n.Status == ContentStatus.Published)
    .OrderByDescending(n => n.PublishedDate)
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

### Creating an Issue Report

```csharp
var issueReport = new IssueReport
{
    UserId = userId,
    ReferenceNumber = GenerateIssueReference(),
    Category = IssueCategory.RoadIssues,
    UrgencyLevel = UrgencyLevel.Medium,
    Title = "Pothole on Main Street",
    Description = "Large pothole causing traffic issues",
    Location = "Main Street near City Hall",
    Status = IssueStatus.Submitted,
    Priority = Priority.Medium
};

context.IssueReports.Add(issueReport);
await context.SaveChangesAsync();
```

## 🔒 Security Considerations

1. **Authentication & Authorization**
   - Implement JWT token authentication
   - Use role-based access control (RBAC)
   - Validate all user inputs

2. **Data Protection**
   - Encrypt sensitive data at rest
   - Use HTTPS for all communications
   - Implement proper session management

3. **API Security**
   - Rate limiting for API endpoints
   - Input validation and sanitization
   - SQL injection prevention through EF Core

## 📈 Performance Tips

1. **Database Optimization**
   - Use appropriate indexes
   - Implement database connection pooling
   - Consider read replicas for heavy read operations

2. **Caching Strategy**
   - Cache frequently accessed data (news, services, hotlines)
   - Use Redis for distributed caching
   - Implement cache invalidation strategies

3. **File Management**
   - Use cloud storage (Azure Blob, AWS S3) for files
   - Implement CDN for image delivery
   - Compress images before storage

## 🔄 Background Jobs

Consider implementing background jobs for:

- **Appointment reminders** (send notifications 24 hours before)
- **Issue report status updates** (notify users of progress)
- **Data cleanup** (remove expired sessions, temporary files)
- **Statistics generation** (daily/weekly usage reports)
- **Email notifications** (appointment confirmations, issue updates)

## 📝 API Endpoint Structure

Recommended REST API structure:

```
/api/auth/*           - Authentication endpoints
/api/users/*          - User management
/api/news/*           - News and announcements  
/api/services/*       - City services
/api/appointments/*   - Appointment management
/api/reports/*        - Issue reporting
/api/tourism/*        - Tourism information
/api/transparency/*   - Public projects
/api/hotlines/*       - Emergency contacts
/api/feedback/*       - User feedback
/api/admin/*          - Administrative functions
```

## 🧪 Testing

1. **Unit Tests**
   - Test business logic in services
   - Mock database dependencies
   - Validate data transformations

2. **Integration Tests**
   - Test API endpoints end-to-end
   - Validate database operations
   - Test authentication flows

3. **Performance Tests**
   - Load test critical endpoints
   - Monitor database query performance
   - Test file upload limits

## 📚 Additional Resources

- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [ASP.NET Core Web API](https://docs.microsoft.com/en-us/aspnet/core/web-api/)
- [System.Text.Json Documentation](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-overview)

## 🤝 Contributing

When extending these models:

1. Follow existing naming conventions
2. Add appropriate indexes for new query patterns
3. Update the DbContext configuration
4. Create corresponding DTOs for API operations
5. Add validation attributes where appropriate
6. Update this documentation

---

**Built with ❤️ for the people of Laoag City**