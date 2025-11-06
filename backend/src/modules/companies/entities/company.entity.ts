import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Department } from '../../departments/entities/department.entity';
import { User } from '../../users/entities/user.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  companyName: string;

  @Column({ unique: true })
  companyCode: string;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  taxId: string;

  @Column()
  industry: string;

  @Column({ type: 'date', nullable: true })
  foundedDate: Date;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'Active' })
  status: string;

  @OneToMany(() => Department, (department) => department.company)
  departments: Department[];

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
