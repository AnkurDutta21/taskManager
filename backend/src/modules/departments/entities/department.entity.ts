import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';

@Entity('departments')
export class Department extends BaseEntity {
  @Column()
  departmentName: string;

  @Column({ unique: true })
  departmentCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  headOfDepartment: string;

  @Column()
  companyId: number;

  @ManyToOne(() => Company, (company) => company.departments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
