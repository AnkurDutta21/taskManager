import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('holidays')
export class Holiday extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  type: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  isRecurring: boolean;
}
