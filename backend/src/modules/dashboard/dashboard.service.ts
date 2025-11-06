import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Task, TaskStatus } from '../tasks/entities/task.entity';

export interface DashboardStats {
  totalUsers: number;
  activeTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

export interface Activity {
  user: string;
  action: string;
  timestamp: Date;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getStatistics(): Promise<DashboardStats> {
    const totalUsers = await this.usersRepository.count({
      where: { isActive: true },
    });

    const activeTasks = await this.tasksRepository.count({
      where: { status: TaskStatus.IN_PROGRESS },
    });

    const pendingTasks = await this.tasksRepository.count({
      where: { status: TaskStatus.PENDING },
    });

    const completedTasks = await this.tasksRepository.count({
      where: { status: TaskStatus.COMPLETED },
    });

    return {
      totalUsers,
      activeTasks,
      pendingTasks,
      completedTasks,
    };
  }

  async getActivities(limit: number = 20): Promise<Activity[]> {
    // Get recent tasks with their assigned users
    const recentTasks = await this.tasksRepository.find({
      relations: ['assignedToUser', 'assignedByUser'],
      order: { createdAt: 'DESC' },
      take: limit,
    });

    const activities: Activity[] = recentTasks.map((task) => ({
      user: task.assignedByUser
        ? `${task.assignedByUser.firstName} ${task.assignedByUser.lastName}`
        : 'Unknown',
      action: `assigned task "${task.taskTitle}" to ${
        task.assignedToUser
          ? `${task.assignedToUser.firstName} ${task.assignedToUser.lastName}`
          : 'Unknown'
      }`,
      timestamp: task.createdAt,
    }));

    return activities;
  }
}
