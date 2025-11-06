# Remaining Modules to Create

This document provides templates for creating the remaining modules. Each module follows the same pattern as the Companies module.

## Module Structure Pattern

For each module, create the following files:

### 1. Users Module
```
src/modules/users/
├── entities/user.entity.ts (already created)
├── dto/create-user.dto.ts
├── dto/update-user.dto.ts
├── users.controller.ts
├── users.service.ts
└── users.module.ts
```

### 2. Departments Module
### 3. Teams Module
### 4. Projects Module
### 5. Tasks Module
### 6. Holidays Module
### 7. Designations Module
### 8. Chats Module
### 9. Queries Module
### 10. Alerts Module
### 11. Reports Module

## Quick Module Template

Each module needs:

1. **DTO Files**: Create DTOs with validation decorators
2. **Service**: Inject repository, implement CRUD operations
3. **Controller**: Define routes with decorators, use guards
4. **Module**: Import TypeOrmModule.forFeature([Entity]), export service

## Example Service Template

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class XxxService {
  constructor(
    @InjectRepository(Entity)
    private repository: Repository<Entity>,
  ) {}

  async create(dto: CreateDto): Promise<Entity> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  async findOne(id: number): Promise<Entity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException();
    return entity;
  }

  async update(id: number, dto: UpdateDto): Promise<Entity> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return await this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
```

## Example Controller Template

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('xxx')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('xxx')
export class XxxController {
  constructor(private readonly service: XxxService) {}

  @Post()
  create(@Body() dto: CreateDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.service.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
```

## Example Module Template

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XxxService } from './xxx.service';
import { XxxController } from './xxx.controller';
import { Entity } from './entities/xxx.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [XxxController],
  providers: [XxxService],
  exports: [XxxService],
})
export class XxxModule {}
```

## Notes

- All entities are already created
- Follow the Companies module as a complete reference
- Add specific business logic as needed for each module
- Tasks module needs special handling for repetitive tasks
- Reports module should aggregate data from other modules
