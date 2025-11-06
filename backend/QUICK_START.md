# Quick Start Guide

## 🚀 Get the Backend Running in 5 Minutes

### Step 1: Install Dependencies (2 min)
```bash
cd backend
npm install
```

### Step 2: Setup Database (1 min)
```bash
# Create PostgreSQL database
createdb taskmanager

# Or using psql:
psql -U postgres
CREATE DATABASE taskmanager;
\q
```

### Step 3: Configure Environment (1 min)
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
# Minimum required:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=taskmanager
JWT_SECRET=change-this-secret-key
```

### Step 4: Start Server (1 min)
```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

### Step 5: Test the API
```bash
# Open Swagger documentation
http://localhost:3000/api/docs

# Or test with curl:
curl http://localhost:3000/api/companies
```

---

## 📝 What's Included

### ✅ Ready to Use
- **Authentication**: JWT-based auth with register/login
- **Companies Module**: Full CRUD operations
- **Users Module**: User management with hierarchy
- **Database**: All 14 tables with relationships
- **Swagger Docs**: Interactive API documentation

### 🔨 To Complete
Other modules need controllers and services implemented. Follow the Companies module pattern.

---

## 🧪 Test the Backend

### 1. Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'
```

Save the `access_token` from the response.

### 3. Create a Company
```bash
curl -X POST http://localhost:3000/api/companies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "companyName": "Tech Solutions Inc.",
    "companyCode": "TSI",
    "industry": "Technology",
    "email": "info@techsolutions.com"
  }'
```

### 4. Get All Companies
```bash
curl http://localhost:3000/api/companies \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `psql -l | grep taskmanager`

### "Port 3000 already in use"
- Change PORT in `.env` to 3001 or another port
- Or kill the process: `lsof -ti:3000 | xargs kill` (Mac/Linux)

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

---

## 📚 Next Steps

1. **Explore Swagger Docs**: `http://localhost:3000/api/docs`
2. **Read API Documentation**: `API_DOCUMENTATION.md`
3. **Implement Remaining Modules**: Use `MODULES_GENERATOR.md`
4. **Connect Frontend**: Update frontend API base URL to `http://localhost:3000/api`

---

## 🎯 Development Workflow

1. Make changes to code
2. Server auto-restarts (watch mode)
3. Test in Swagger or with curl
4. Check database: `psql taskmanager`

---

## 💡 Useful Commands

```bash
# Development
npm run start:dev        # Start with hot reload

# Production
npm run build           # Build the app
npm run start:prod      # Run production build

# Testing
npm run test            # Run unit tests
npm run test:e2e        # Run e2e tests

# Code Quality
npm run lint            # Check code style
npm run format          # Format code

# Database
psql taskmanager        # Connect to database
\dt                     # List all tables
\d users                # Describe users table
```

---

## 🔗 Important URLs

- **API Server**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000 (returns 404, but server is running)

---

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database created
- [ ] Dependencies installed (`node_modules` exists)
- [ ] `.env` file configured
- [ ] Server starts without errors
- [ ] Swagger docs accessible
- [ ] Can register and login
- [ ] Can create a company

If all checked, you're ready to develop! 🎉
