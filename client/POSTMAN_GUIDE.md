# Task Manager API - Postman Collection Guide

## Import Instructions

1. Open Postman
2. Click **Import** button (top left)
3. Select `TaskManager.postman_collection.json`
4. The collection will be imported with all endpoints

## Collection Variables

The collection uses these variables:
- **base_url**: `http://localhost:3000/api` (default)
- **access_token**: Auto-populated after login

## Authentication Flow

### 1. Register a New User
**Endpoint**: `POST /auth/register`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "Password123!",
  "employeeId": "EMP001",
  "role": "admin"
}
```

**Roles**: `admin`, `team_leader`, `team_member`

### 2. Login
**Endpoint**: `POST /auth/login`

```json
{
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```

The `access_token` is automatically saved to collection variables.

### 3. Get Profile
**Endpoint**: `GET /auth/profile`
Returns current user information.

### 4. Logout
**Endpoint**: `POST /auth/logout`

## API Endpoints Overview

### Companies
- **POST** `/companies` - Create company
- **GET** `/companies` - List all companies (with pagination)
- **GET** `/companies/:id` - Get company by ID
- **PATCH** `/companies/:id` - Update company
- **DELETE** `/companies/:id` - Delete company
- **GET** `/companies/:id/statistics` - Get company statistics

### Users
- **POST** `/users` - Create user
- **GET** `/users` - List all users (with filters)
- **GET** `/users/:id` - Get user by ID
- **PATCH** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user
- **GET** `/users/:id/hierarchy` - Get user hierarchy

## Sample Request Bodies

### Create Company
```json
{
  "companyName": "Tech Solutions Inc",
  "companyCode": "TECH001",
  "registrationNumber": "REG123456",
  "taxId": "TAX789012",
  "industry": "Information Technology",
  "foundedDate": "2020-01-15",
  "website": "https://techsolutions.com",
  "email": "info@techsolutions.com",
  "phone": "+1234567890",
  "address": "123 Tech Street",
  "city": "San Francisco",
  "state": "California",
  "country": "USA",
  "zipCode": "94102",
  "description": "Leading technology solutions provider"
}
```

### Create User
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "password": "Password123!",
  "employeeId": "EMP002",
  "role": "team_leader",
  "phone": "+1234567891",
  "dateOfJoining": "2024-02-01",
  "companyId": 1,
  "departmentId": 1,
  "designationId": 1,
  "reportingTo": 1,
  "isActive": true
}
```

## Query Parameters

### Companies
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term

### Users
- `page` - Page number
- `limit` - Items per page
- `role` - Filter by role
- `companyId` - Filter by company

## Testing Workflow

1. **Start Backend Server**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Register Admin User**
   - Use Register endpoint
   - Save the credentials

3. **Login**
   - Use Login endpoint
   - Token auto-saves to collection

4. **Create Company**
   - Use Create Company endpoint
   - Note the company ID

5. **Create Additional Users**
   - Use Create User endpoint
   - Assign to company

6. **Test Other Endpoints**
   - All endpoints now have authentication

## Authorization

All endpoints except `/auth/register` and `/auth/login` require Bearer token authentication.

The token is automatically included in requests after login via collection-level auth.

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["validation error messages"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

## Tips

1. **Auto-save tokens**: Login/Register requests automatically save the access token
2. **Collection auth**: Bearer token is set at collection level
3. **Variables**: Use `{{base_url}}` and `{{access_token}}` throughout
4. **Test scripts**: Login endpoints include test scripts to extract tokens
5. **Pagination**: Most list endpoints support `page` and `limit` parameters

## Swagger Documentation

Alternative API documentation available at:
```
http://localhost:3000/api/docs
```

## Support

For issues or questions:
- Check backend console logs
- Verify database connection
- Ensure all environment variables are set
- Check `.env` file configuration
