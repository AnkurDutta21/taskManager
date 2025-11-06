import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('designations')
export class Designation extends BaseEntity {
  @Column()
  title: string;

  @Column()
  level: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.designation)
  users: User[];
}
