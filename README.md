# Indian Army Information Platform

A comprehensive Ed-Tech platform designed for defence aspirants preparing for NDA, CDS, and AFCAT examinations. The platform provides study materials, mock tests, SSB preparation resources, and military operations information in a professional military-themed environment.

---

## Features

### For Aspirants

- **Study Materials** - NDA, CDS, AFCAT resources organized by subject
- **Mock Tests** - Practice tests with timer and instant results
- **SSB Preparation** - Complete guide with stages, psychological tests, and GTO tasks
- **PYQ Papers** - Previous year question papers for practice
- **Military Operations** - Detailed information about Indian military operations
- **Results Dashboard** - Track test performance and download PDF reports
- **Profile Management** - Update personal information and change password

### For Administrators

- **Content Management** - Manage subjects, resources, and study materials
- **Question Bank** - Create, edit, and delete questions for tests
- **Test Manager** - Create tests and assign questions
- **SSB Manager** - Manage SSB stages, tests, and resources
- **PYQ Manager** - Upload and manage past year papers
- **User Management** - View users and manage roles (ADMIN/ASPIRANT)
- **Analytics** - View test results and aspirant performance

### Public Pages (No Login Required)

- **Study Hub** - Exam information and preparation tips
- **SSB Guide** - Complete SSB interview guide
- **War Chronicles** - Military history and rank structure
- **Hall of Heroes** - Gallantry award recipients
- **Elite Forces** - Special forces information
- **Defence Intel** - Latest defence news and acquisitions

---

## Tech Stack

### Backend

| Technology | Version |
|------------|---------|
| Framework | Spring Boot 3.5.5 |
| Java | 21 |
| Database | PostgreSQL |
| Security | Spring Security with JWT |
| ORM | Spring Data JPA / Hibernate |
| API Documentation | SpringDoc OpenAPI (Swagger) |

### Frontend

| Technology | Version |
|------------|---------|
| Framework | React 19.2.4 |
| Build Tool | Vite |
| Routing | React Router DOM 7.13.2 |
| HTTP Client | Axios |
| PDF Generation | jsPDF with autoTable |

---

## Prerequisites

- Java 21 or higher
- Node.js 20 or higher
- PostgreSQL 16 or higher
- Maven (or use included wrapper)

---

## Access the Application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |

---

## Default Admin Account

After first run, an admin account is automatically created:

| Field | Value |
|-------|-------|
| Email | rohit@gmail.com |
| Password | rohit123 |

---

## API Endpoints Overview

| Module | Endpoint | Description |
|--------|----------|-------------|
| Auth | `/auth/login` | User login |
| Auth | `/auth/register` | User registration |
| NDA | `/api/nda/subjects` | Manage subjects |
| NDA | `/api/nda/resources` | Manage study resources |
| NDA | `/api/nda/pyq` | Manage PYQ papers |
| SSB | `/api/ssb/stages` | Manage SSB stages |
| SSB | `/api/ssb/tests` | Manage SSB tests |
| SSB | `/api/ssb/resources` | Manage SSB resources |
| Exam | `/api/exam/questions` | Manage question bank |
| Exam | `/api/exam/tests` | Manage tests |
| Exam | `/api/exam/attempts` | Manage test attempts |
| Missions | `/api/operations` | Manage military operations |
| Users | `/api/users` | Manage users |

---

## Features in Detail

### Admin Panel

- Dashboard with statistics
- Content management (Subjects & Resources)
- Question Bank (CRUD operations)
- Test creation and management
- SSB stages and tests management
- PYQ paper upload
- User role management
- Test results analytics

### Aspirant Dashboard

- Study materials by subject
- Available tests with timer
- Test taking interface
- Results history with PDF export
- SSB preparation content
- Military operations information

### Public Pages

- Information-rich static pages
- No login required
- Professional military theme

---

## Security

- JWT-based authentication
- Role-based access control (ADMIN/ASPIRANT)
- Password encryption using BCrypt
- Protected API endpoints
