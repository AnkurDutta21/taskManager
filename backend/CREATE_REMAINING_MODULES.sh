#!/bin/bash

# This script creates stub files for all remaining modules
# Run this after npm install to complete the backend structure

# Create Departments Module
mkdir -p src/modules/departments/dto
cat > src/modules/departments/departments.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  exports: [TypeOrmModule],
})
export class DepartmentsModule {}
EOF

# Create Teams Module
mkdir -p src/modules/teams/dto
cat > src/modules/teams/teams.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  exports: [TypeOrmModule],
})
export class TeamsModule {}
EOF

# Create Projects Module
mkdir -p src/modules/projects/dto
cat > src/modules/projects/projects.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
EOF

# Create Tasks Module
mkdir -p src/modules/tasks/dto
cat > src/modules/tasks/tasks.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  exports: [TypeOrmModule],
})
export class TasksModule {}
EOF

# Create Holidays Module
mkdir -p src/modules/holidays/dto
cat > src/modules/holidays/holidays.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from './entities/holiday.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday])],
  exports: [TypeOrmModule],
})
export class HolidaysModule {}
EOF

# Create Designations Module
mkdir -p src/modules/designations/dto
cat > src/modules/designations/designations.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Designation } from './entities/designation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Designation])],
  exports: [TypeOrmModule],
})
export class DesignationsModule {}
EOF

# Create Chats Module
mkdir -p src/modules/chats/dto
cat > src/modules/chats/chats.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  exports: [TypeOrmModule],
})
export class ChatsModule {}
EOF

# Create Queries Module
mkdir -p src/modules/queries/dto
cat > src/modules/queries/queries.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Query, QueryReply } from './entities/query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Query, QueryReply])],
  exports: [TypeOrmModule],
})
export class QueriesModule {}
EOF

# Create Alerts Module
mkdir -p src/modules/alerts/dto
cat > src/modules/alerts/alerts.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  exports: [TypeOrmModule],
})
export class AlertsModule {}
EOF

# Create Reports Module
mkdir -p src/modules/reports/dto
cat > src/modules/reports/reports.module.ts << 'EOF'
import { Module } from '@nestjs/common';

@Module({})
export class ReportsModule {}
EOF

echo "All module stubs created successfully!"
echo "Now implement controllers and services following the Companies module pattern"
