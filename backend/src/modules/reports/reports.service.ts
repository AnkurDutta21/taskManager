import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { Task, TaskStatus } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';

export interface TaskReportFilters {
  startDate?: string;
  endDate?: string;
  userId?: number;
  projectId?: number;
  status?: TaskStatus;
}

export interface UserPerformanceReport {
  userId: number;
  userName: string;
  totalTasksAssigned: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completionRate: number;
}

export interface ProjectProgressReport {
  projectId: number;
  projectName: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  progressPercentage: number;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async generateTaskReport(filters: TaskReportFilters) {
    const where: FindOptionsWhere<Task> = {};

    if (filters.startDate && filters.endDate) {
      where.createdAt = Between(
        new Date(filters.startDate),
        new Date(filters.endDate),
      );
    }

    if (filters.userId) {
      where.assignedTo = filters.userId;
    }

    if (filters.projectId) {
      where.projectId = filters.projectId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    const tasks = await this.tasksRepository.find({
      where,
      relations: ['assignedToUser', 'assignedByUser', 'project'],
      order: { createdAt: 'DESC' },
    });

    const summary = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.status === TaskStatus.COMPLETED || t.status === TaskStatus.APPROVED).length,
      inProgressTasks: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
      pendingTasks: tasks.filter((t) => t.status === TaskStatus.PENDING).length,
      abandonedTasks: tasks.filter((t) => t.status === TaskStatus.ABANDONED).length,
    };

    return {
      summary,
      tasks: tasks.map((task) => ({
        id: task.id,
        taskTitle: task.taskTitle,
        status: task.status,
        priority: task.priority,
        assignedTo: task.assignedToUser
          ? `${task.assignedToUser.firstName} ${task.assignedToUser.lastName}`
          : 'Unknown',
        assignedBy: task.assignedByUser
          ? `${task.assignedByUser.firstName} ${task.assignedByUser.lastName}`
          : 'Unknown',
        project: task.project?.projectName || 'No Project',
        dueDate: task.dueDate,
        createdAt: task.createdAt,
      })),
    };
  }

  async generateUserPerformanceReport(
    startDate?: string,
    endDate?: string,
  ): Promise<UserPerformanceReport[]> {
    const users = await this.usersRepository.find({
      where: { isActive: true },
      relations: ['assignedTasks'],
    });

    const reports: UserPerformanceReport[] = [];

    for (const user of users) {
      let tasks = user.assignedTasks;

      if (startDate && endDate) {
        tasks = tasks.filter(
          (task) =>
            task.createdAt >= new Date(startDate) &&
            task.createdAt <= new Date(endDate),
        );
      }

      const totalTasksAssigned = tasks.length;
      const completedTasks = tasks.filter(
        (t) => t.status === TaskStatus.COMPLETED || t.status === TaskStatus.APPROVED,
      ).length;
      const pendingTasks = tasks.filter(
        (t) => t.status === TaskStatus.PENDING,
      ).length;
      const inProgressTasks = tasks.filter(
        (t) => t.status === TaskStatus.IN_PROGRESS,
      ).length;

      const completionRate =
        totalTasksAssigned > 0
          ? (completedTasks / totalTasksAssigned) * 100
          : 0;

      reports.push({
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        totalTasksAssigned,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        completionRate: Math.round(completionRate * 100) / 100,
      });
    }

    return reports.sort((a, b) => b.completionRate - a.completionRate);
  }

  async generateProjectProgressReport(
    startDate?: string,
    endDate?: string,
  ): Promise<ProjectProgressReport[]> {
    const projects = await this.projectsRepository.find({
      relations: ['tasks'],
    });

    const reports: ProjectProgressReport[] = [];

    for (const project of projects) {
      let tasks = project.tasks;

      if (startDate && endDate) {
        tasks = tasks.filter(
          (task) =>
            task.createdAt >= new Date(startDate) &&
            task.createdAt <= new Date(endDate),
        );
      }

      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(
        (t) => t.status === TaskStatus.COMPLETED || t.status === TaskStatus.APPROVED,
      ).length;
      const inProgressTasks = tasks.filter(
        (t) => t.status === TaskStatus.IN_PROGRESS,
      ).length;
      const pendingTasks = tasks.filter(
        (t) => t.status === TaskStatus.PENDING,
      ).length;

      const progressPercentage =
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      reports.push({
        projectId: project.id,
        projectName: project.projectName,
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        progressPercentage: Math.round(progressPercentage * 100) / 100,
      });
    }

    return reports.sort((a, b) => b.progressPercentage - a.progressPercentage);
  }
}
