# Task Manager API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## **1. Authentication APIs**

### POST /auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### POST /auth/login
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST /auth/logout
Logout user

### GET /auth/profile
Get current user profile

---

## **2. Company APIs**

### GET /companies
Get all companies
- Query params: `?page=1&limit=10&search=`

### GET /companies/:id
Get company by ID

### POST /companies
Create new company
```json
{
  "companyName": "Tech Solutions Inc.",
  "companyCode": "TSI",
  "registrationNumber": "GST123456",
  "taxId": "PAN123456",
  "industry": "Technology",
  "foundedDate": "2020-01-01",
  "website": "https://example.com",
  "email": "info@example.com",
  "phone": "+91 9101033202",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "zipCode": "400001",
  "description": "A tech company"
}
```

### PUT /companies/:id
Update company

### DELETE /companies/:id
Delete company

### GET /companies/:id/statistics
Get company statistics (departments, employees)

---

## **3. Department APIs**

### GET /departments
Get all departments
- Query params: `?companyId=&page=1&limit=10`

### GET /departments/:id
Get department by ID

### POST /departments
Create new department
```json
{
  "departmentName": "Engineering",
  "departmentCode": "ENG",
  "companyId": 1,
  "description": "Engineering department",
  "headOfDepartment": "John Doe"
}
```

### PUT /departments/:id
Update department

### DELETE /departments/:id
Delete department

---

## **4. User APIs**

### GET /users
Get all users
- Query params: `?role=&companyId=&departmentId=&page=1&limit=10`

### GET /users/:id
Get user by ID

### POST /users
Create new user
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "employeeId": "EMP001",
  "role": "team_member",
  "designation": "Developer",
  "companyId": 1,
  "departmentId": 1,
  "phone": "+91 9876543210",
  "dateOfJoining": "2024-01-01",
  "reportingTo": 2
}
```

### PUT /users/:id
Update user

### DELETE /users/:id
Delete user

### GET /users/:id/hierarchy
Get user's reporting hierarchy

---

## **5. Team APIs**

### GET /teams
Get all teams
- Query params: `?companyId=&page=1&limit=10`

### GET /teams/:id
Get team by ID

### POST /teams
Create new team
```json
{
  "teamName": "Backend Team",
  "teamCode": "BE-001",
  "companyId": 1,
  "departmentId": 1,
  "teamLeaderId": 2,
  "description": "Backend development team"
}
```

### PUT /teams/:id
Update team

### DELETE /teams/:id
Delete team

### POST /teams/:id/members
Add team member
```json
{
  "userId": 5
}
```

### DELETE /teams/:id/members/:userId
Remove team member

### GET /teams/:id/members
Get team members

---

## **6. Designation/Hierarchy APIs**

### GET /designations
Get all designations

### GET /designations/:id
Get designation by ID

### POST /designations
Create designation
```json
{
  "title": "Senior Developer",
  "level": 3,
  "description": "Senior level developer"
}
```

### PUT /designations/:id
Update designation

### DELETE /designations/:id
Delete designation

---

## **7. Project APIs**

### GET /projects
Get all projects
- Query params: `?status=&priority=&page=1&limit=10`

### GET /projects/:id
Get project by ID

### POST /projects
Create new project
```json
{
  "projectName": "SKYTRON BACKEND",
  "projectCode": "PROJ-2024-001",
  "description": "Backend development project",
  "startDate": "2024-11-01",
  "endDate": "2025-02-01",
  "priority": "High",
  "budget": 100000,
  "status": "active"
}
```

### PUT /projects/:id
Update project

### DELETE /projects/:id
Delete project

### POST /projects/:id/members
Assign team member to project
```json
{
  "userId": 5,
  "role": "Developer"
}
```

### DELETE /projects/:id/members/:userId
Remove team member from project

### GET /projects/:id/members
Get project members

### POST /projects/:id/invite
Generate invite URL
```json
{
  "email": "external@example.com"
}
```

### GET /projects/:id/tasks
Get all tasks for a project

---

## **8. Task APIs**

### GET /tasks
Get all tasks
- Query params: `?assignedTo=&status=&priority=&projectId=&page=1&limit=10`

### GET /tasks/:id
Get task by ID

### POST /tasks
Create new task
```json
{
  "taskTitle": "Update User Dashboard",
  "taskDescription": "Redesign the user dashboard",
  "assignmentType": "others",
  "assignedTo": 5,
  "priority": "High",
  "dueDate": "2025-11-10",
  "taskType": "oneTime",
  "projectId": 1,
  "holidayInclusion": "excluded"
}
```

### POST /tasks/repetitive
Create repetitive task
```json
{
  "taskTitle": "Daily Standup Report",
  "taskDescription": "Submit daily standup",
  "assignedTo": 5,
  "priority": "Medium",
  "taskType": "repetitive",
  "repetitiveType": "daily",
  "startDate": "2024-11-01",
  "endDate": "2025-02-01",
  "holidayInclusion": "excluded"
}
```

### PUT /tasks/:id
Update task

### DELETE /tasks/:id
Delete task

### PATCH /tasks/:id/status
Update task status
```json
{
  "status": "in-progress"
}
```

### POST /tasks/:id/extension
Request task extension
```json
{
  "requestedExtensionDate": "2025-11-20",
  "extensionReason": "Need more time for testing"
}
```

### PATCH /tasks/:id/extension/approve
Approve extension request

### PATCH /tasks/:id/extension/reject
Reject extension request
```json
{
  "rejectionReason": "Deadline is critical"
}
```

### GET /tasks/my-tasks
Get tasks assigned to current user

### GET /tasks/assigned-by-me
Get tasks assigned by current user

---

## **9. Holiday APIs**

### GET /holidays
Get all holidays
- Query params: `?type=&month=&year=2025`

### GET /holidays/:id
Get holiday by ID

### POST /holidays
Create holiday
```json
{
  "name": "Diwali",
  "date": "2025-10-20",
  "type": "Festival",
  "description": "Festival of Lights",
  "isRecurring": true
}
```

### PUT /holidays/:id
Update holiday

### DELETE /holidays/:id
Delete holiday

### GET /holidays/upcoming
Get upcoming holidays

---

## **10. Chat APIs**

### GET /chats/project/:projectId
Get project chat messages

### POST /chats/project/:projectId
Send project chat message
```json
{
  "message": "Hello team!",
  "attachments": []
}
```

### GET /chats/task/:taskId
Get task chat messages

### POST /chats/task/:taskId
Send task chat message
```json
{
  "message": "Task update",
  "attachments": []
}
```

---

## **11. Query APIs**

### GET /queries
Get all queries
- Query params: `?status=&userId=`

### GET /queries/:id
Get query by ID

### POST /queries
Create query
```json
{
  "subject": "Need clarification",
  "message": "Can you explain the requirement?",
  "taskId": 5
}
```

### POST /queries/:id/reply
Reply to query
```json
{
  "message": "Here is the clarification..."
}
```

### PATCH /queries/:id/status
Update query status
```json
{
  "status": "resolved"
}
```

---

## **12. Alert APIs**

### GET /alerts
Get all alerts for current user

### POST /alerts
Create alert
```json
{
  "title": "Task Deadline",
  "message": "Task due tomorrow",
  "type": "warning",
  "userId": 5
}
```

### PATCH /alerts/:id/read
Mark alert as read

### DELETE /alerts/:id
Delete alert

---

## **13. Report APIs**

### GET /reports/tasks
Get task reports
- Query params: `?startDate=&endDate=&userId=&projectId=`

### GET /reports/projects
Get project reports

### GET /reports/users
Get user performance reports

### GET /reports/dashboard
Get dashboard statistics
```json
{
  "totalTasks": 150,
  "completedTasks": 80,
  "pendingTasks": 50,
  "inProgressTasks": 20,
  "totalProjects": 10,
  "activeProjects": 7,
  "totalUsers": 50
}
```

---

## **Status Codes**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## **Authentication**

All APIs (except `/auth/register` and `/auth/login`) require JWT token in header:
```
Authorization: Bearer <token>
```
