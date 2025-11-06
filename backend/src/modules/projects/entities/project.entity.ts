import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  projectName: string;

  @Column({ unique: true })
  projectCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  priority: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget: number;

  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: 'project_members',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  members: User[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
