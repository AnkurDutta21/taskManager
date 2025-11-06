import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Company } from '../../companies/entities/company.entity';
import { Department } from '../../departments/entities/department.entity';
import { Designation } from '../../designations/entities/designation.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Project } from '../../projects/entities/project.entity';

export enum UserRole {
  ADMIN = 'admin',
  TEAM_LEADER = 'team_leader',
  TEAM_MEMBER = 'team_member',
}

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  employeeId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TEAM_MEMBER,
  })
  role: UserRole;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dateOfJoining: Date;

  @Column({ nullable: true })
  companyId: number;

  @Column({ nullable: true })
  departmentId: number;

  @Column({ nullable: true })
  designationId: number;

  @Column({ nullable: true })
  reportingTo: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Company, (company) => company.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @ManyToOne(() => Department, (department) => department.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @ManyToOne(() => Designation, (designation) => designation.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'designationId' })
  designation: Designation;

  @ManyToOne(() => User, (user) => user.subordinates, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'reportingTo' })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  subordinates: User[];

  @OneToMany(() => Task, (task) => task.assignedToUser)
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.assignedByUser)
  createdTasks: Task[];

  @ManyToMany(() => Project, (project) => project.members)
  projects: Project[];
}
