-- Initial Database Setup Script
-- This script runs automatically when the PostgreSQL container starts for the first time

-- Create database if not exists (handled by POSTGRES_DB env var)
-- Additional setup can be added here

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Log initialization
DO $$
BEGIN
    RAISE NOTICE 'Task Manager Database initialized successfully';
END $$;
