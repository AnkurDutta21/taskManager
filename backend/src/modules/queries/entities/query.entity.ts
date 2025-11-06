import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

export enum QueryStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in-progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

@Entity('queries')
export class Query extends BaseEntity {
  @Column()
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column()
  userId: number;

  @Column({ nullable: true })
  taskId: number;

  @Column({
    type: 'enum',
    enum: QueryStatus,
    default: QueryStatus.OPEN,
  })
  status: QueryStatus;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Task, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @OneToMany(() => QueryReply, (reply) => reply.query)
  replies: QueryReply[];
}

@Entity('query_replies')
export class QueryReply extends BaseEntity {
  @Column({ type: 'text' })
  message: string;

  @Column()
  queryId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Query, (query) => query.replies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'queryId' })
  query: Query;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
