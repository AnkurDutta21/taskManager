import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { Task } from '../../tasks/entities/task.entity';

export enum ChatType {
  PROJECT = 'project',
  TASK = 'task',
}

@Entity('chats')
export class Chat extends BaseEntity {
  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: ChatType,
  })
  chatType: ChatType;

  @Column({ nullable: true })
  projectId: number;

  @Column({ nullable: true })
  taskId: number;

  @Column()
  userId: number;

  @Column({ type: 'simple-array', nullable: true })
  attachments: string[];

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
