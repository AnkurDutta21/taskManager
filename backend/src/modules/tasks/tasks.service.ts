import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { ApproveTaskDto } from './dto/approve-task.dto';
import { AbandonTaskDto } from './dto/abandon-task.dto';
import { CloseTaskDto } from './dto/close-task.dto';
import { ReassignTaskDto } from './dto/reassign-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async approveTask(id: number, approveTaskDto: ApproveTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.status !== TaskStatus.COMPLETED) {
      throw new BadRequestException('Only completed tasks can be approved');
    }

    task.status = TaskStatus.APPROVED;
    task.approvedBy = approveTaskDto.approvedBy;
    task.approvalRemarks = approveTaskDto.remarks;
    task.approvedAt = new Date();

    return await this.tasksRepository.save(task);
  }

  async abandonTask(id: number, abandonTaskDto: AbandonTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.APPROVED) {
      throw new BadRequestException('Cannot abandon a completed or approved task');
    }

    task.status = TaskStatus.ABANDONED;
    task.abandonedBy = abandonTaskDto.abandonedBy;
    task.abandonReason = abandonTaskDto.reason;
    task.abandonedAt = new Date();

    return await this.tasksRepository.save(task);
  }

  async closeTask(id: number, closeTaskDto: CloseTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.status = TaskStatus.CLOSED;
    task.closedBy = closeTaskDto.closedBy;
    task.closeRemarks = closeTaskDto.remarks;
    task.closedAt = new Date();

    return await this.tasksRepository.save(task);
  }

  async reassignTask(id: number, reassignTaskDto: ReassignTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.APPROVED || task.status === TaskStatus.CLOSED) {
      throw new BadRequestException('Cannot reassign a completed, approved, or closed task');
    }

    const previousAssignee = task.assignedTo;
    task.assignedTo = reassignTaskDto.newAssignee;
    
    // You might want to log this reassignment in a separate table
    // For now, we'll just update the task

    return await this.tasksRepository.save(task);
  }
}
