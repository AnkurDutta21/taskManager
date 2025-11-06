import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Company } from '../../companies/entities/company.entity';
import { Department } from '../../departments/entities/department.entity';
import { User } from '../../users/entities/user.entity';

@Entity('teams')
export class Team extends BaseEntity {
  @Column()
  teamName: string;

  @Column({ unique: true })
  teamCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  companyId: number;

  @Column({ nullable: true })
  departmentId: number;

  @Column()
  teamLeaderId: number;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @ManyToOne(() => Department, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamLeaderId' })
  teamLeader: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'team_members',
    joinColumn: { name: 'teamId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  members: User[];
}
