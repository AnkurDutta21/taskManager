import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  EXTENSION_REQUESTED = 'extension-requested',
}

export enum TaskType {
  ONE_TIME = 'oneTime',
  REPETITIVE = 'repetitive',
}

export enum RepetitiveType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually',
}

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  taskTitle: string;

  @Column({ type: 'text' })
  taskDescription: string;

  @Column()
  assignedTo: number;

  @Column()
  assignedBy: number;

  @Column()
  priority: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.ONE_TIME,
  })
  taskType: TaskType;

  @Column({
    type: 'enum',
    enum: RepetitiveType,
    nullable: true,
  })
  repetitiveType: RepetitiveType;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: 'excluded' })
  holidayInclusion: string;

  @Column({ nullable: true })
  projectId: number;

  @Column({ type: 'date', nullable: true })
  requestedExtensionDate: Date;

  @Column({ type: 'text', nullable: true })
  extensionReason: string;

  @Column({ type: 'timestamp', nullable: true })
  extensionRequestDate: Date;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assignedTo' })
  assignedToUser: User;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assignedBy' })
  assignedByUser: User;

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
