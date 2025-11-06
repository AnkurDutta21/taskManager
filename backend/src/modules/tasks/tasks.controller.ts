import {
  Controller,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { ApproveTaskDto } from './dto/approve-task.dto';
import { AbandonTaskDto } from './dto/abandon-task.dto';
import { CloseTaskDto } from './dto/close-task.dto';
import { ReassignTaskDto } from './dto/reassign-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a completed task' })
  approveTask(@Param('id') id: string, @Body() approveTaskDto: ApproveTaskDto) {
    return this.tasksService.approveTask(+id, approveTaskDto);
  }

  @Patch(':id/abandon')
  @ApiOperation({ summary: 'Mark a task as abandoned' })
  abandonTask(@Param('id') id: string, @Body() abandonTaskDto: AbandonTaskDto) {
    return this.tasksService.abandonTask(+id, abandonTaskDto);
  }

  @Patch(':id/close')
  @ApiOperation({ summary: 'Close a task' })
  closeTask(@Param('id') id: string, @Body() closeTaskDto: CloseTaskDto) {
    return this.tasksService.closeTask(+id, closeTaskDto);
  }

  @Patch(':id/reassign')
  @ApiOperation({ summary: 'Reassign a task to another user' })
  reassignTask(@Param('id') id: string, @Body() reassignTaskDto: ReassignTaskDto) {
    return this.tasksService.reassignTask(+id, reassignTaskDto);
  }
}
