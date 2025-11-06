import { Entity, Column, CreateDateColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum OtpPurpose {
  REGISTRATION = 'registration',
  LOGIN = 'login',
  PASSWORD_RESET = 'password_reset',
}

@Entity('otp_sessions')
export class OtpSession extends BaseEntity {
  @Column()
  phone: string;

  @Column()
  otp: string;

  @Column({
    type: 'enum',
    enum: OtpPurpose,
    default: OtpPurpose.REGISTRATION,
  })
  purpose: OtpPurpose;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  sessionToken: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 0 })
  attempts: number;

  @CreateDateColumn()
  createdAt: Date;
}
