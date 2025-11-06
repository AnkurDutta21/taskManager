# Task Manager Backend API

A comprehensive task management system backend built with NestJS, TypeORM, and PostgreSQL.

## 📋 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Company Management**: Multi-company support with hierarchical structure
- **Department Management**: Organize teams by departments
- **User Management**: Complete user lifecycle with roles and permissions
- **Team Management**: Create and manage teams with leaders and members
- **Project Management**: Multi-step project creation with team assignments
- **Task Management**: 
  - Individual and project-based tasks
  - One-time and repetitive tasks (daily, weekly, monthly, annually)
  - Task priorities and status tracking
  - Extension requests and approvals
  - Holiday inclusion/exclusion
- **Holiday Calendar**: Manage company holidays with recurring support
- **Communication**: Project and task-specific chat functionality
- **Query Management**: Member queries with reply system
- **Alerts**: User notification system
- **Reports**: Comprehensive reporting and analytics

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=taskmanager
   
   JWT_SECRET=your-secret-key-change-this
   JWT_EXPIRATION=7d
   
   PORT=3000
   NODE_ENV=development
   
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Create PostgreSQL database**
   ```bash
   createdb taskmanager
   ```
   Or using psql:
   ```sql
   CREATE DATABASE taskmanager;
   ```

5. **Run database migrations** (auto-sync in development)
   ```bash
   npm run start:dev
   ```
   The database schema will be automatically created on first run.

6. **Create remaining module stubs** (optional)
   ```bash
   bash CREATE_REMAINING_MODULES.sh
   ```

### Running the Application

**Development mode:**
```bash
npm run start:dev
```

**Production mode:**
```bash
npm run build
npm run start:prod
```

**Debug mode:**
```bash
npm run start:debug
```

## 📚 API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

Detailed API documentation is available in `API_DOCUMENTATION.md`

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── common/              # Shared utilities and base entities
│   │   └── entities/
│   │       └── base.entity.ts
│   ├── modules/             # Feature modules
│   │   ├── auth/           # Authentication & JWT
│   │   ├── users/          # User management
│   │   ├── companies/      # Company management
│   │   ├── departments/    # Department management
│   │   ├── teams/          # Team management
│   │   ├── projects/       # Project management
│   │   ├── tasks/          # Task management
│   │   ├── holidays/       # Holiday calendar
│   │   ├── designations/   # Organizational hierarchy
│   │   ├── chats/          # Communication
│   │   ├── queries/        # Query management
│   │   ├── alerts/         # Notifications
│   │   └── reports/        # Analytics & reporting
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
├── test/                    # E2E tests
├── .env.example            # Environment variables template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Register a new user:
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "team_member"
  }
}
```

### Use the token in subsequent requests:
```bash
Authorization: Bearer <access_token>
```

## 📦 Database Schema

### Core Entities

- **User**: System users with roles (admin, team_leader, team_member)
- **Company**: Organizations using the system
- **Department**: Departments within companies
- **Designation**: Job titles and hierarchy levels
- **Team**: Work groups with leaders and members
- **Project**: Projects with assigned team members
- **Task**: Work items (one-time or repetitive)
- **Holiday**: Company holidays
- **Chat**: Communication messages
- **Query**: User queries and replies
- **Alert**: User notifications

### Relationships

- Users belong to Companies and Departments
- Users have Designations and report to other Users
- Teams belong to Companies and have multiple Users
- Projects have multiple Users (many-to-many)
- Tasks are assigned to Users and belong to Projects
- Chats are linked to Projects or Tasks
- Queries are created by Users and linked to Tasks

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Development

### Adding a New Module

1. Generate module using NestJS CLI:
   ```bash
   nest g module modules/feature-name
   nest g controller modules/feature-name
   nest g service modules/feature-name
   ```

2. Create entity in `modules/feature-name/entities/`
3. Create DTOs in `modules/feature-name/dto/`
4. Implement service logic
5. Add routes in controller
6. Register in `app.module.ts`

### Code Style

The project uses ESLint and Prettier for code formatting:
```bash
npm run lint
npm run format
```

## 📝 Module Implementation Status

### ✅ Completed
- Base entities and configuration
- Authentication module (JWT)
- Companies module (full CRUD)
- Users module (full CRUD)

### 🚧 To Implement
Follow the pattern in `MODULES_GENERATOR.md` to implement:
- Departments (controller, service, DTOs)
- Teams (controller, service, DTOs)
- Projects (controller, service, DTOs)
- Tasks (controller, service, DTOs)
- Holidays (controller, service, DTOs)
- Designations (controller, service, DTOs)
- Chats (controller, service, DTOs)
- Queries (controller, service, DTOs)
- Alerts (controller, service, DTOs)
- Reports (aggregation logic)

All entities are already created. Use the Companies module as a reference.

## 🐛 Common Issues

### Database Connection Error
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -l`

### Port Already in Use
- Change PORT in `.env`
- Or kill process: `lsof -ti:3000 | xargs kill`

### Module Not Found Errors
- Run `npm install` to install dependencies
- Check import paths are correct

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📄 License

MIT

## 📞 Support

For issues and questions, please create an issue in the repository.

## 🔗 Related Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Module Generator Guide](./MODULES_GENERATOR.md)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
