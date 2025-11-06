import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { UsersService } from '../users/users.service';
import { SmsService } from './sms.service';
import { OtpSession, OtpPurpose } from './entities/otp-session.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private smsService: SmsService,
    @InjectRepository(OtpSession)
    private otpSessionRepository: Repository<OtpSession>,
  ) {}

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }

  async registerWithPhone(userData: any) {
    // Check if phone already exists
    const existingUser = await this.usersService.findByPhone(userData.phone);
    if (existingUser) {
      throw new BadRequestException('Phone number already registered');
    }

    // Check if email already exists
    const existingEmail = await this.usersService.findByEmail(userData.email);
    if (existingEmail) {
      throw new BadRequestException('Email already registered');
    }

    // Generate OTP
    const otp = this.generateOTP();
    const sessionToken = this.generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes

    // Clean up old OTP sessions for this phone and purpose
    await this.otpSessionRepository.delete({
      phone: userData.phone,
      purpose: OtpPurpose.REGISTRATION,
      isVerified: false,
    });

    // Create new OTP session with user data stored temporarily
    const otpSession = this.otpSessionRepository.create({
      phone: userData.phone,
      otp,
      purpose: OtpPurpose.REGISTRATION,
      sessionToken,
      expiresAt,
      isVerified: false,
      attempts: 0,
    });
    await this.otpSessionRepository.save(otpSession);

    // Store user data temporarily (you might want to encrypt this)
    // For now, we'll store it in a separate mechanism or pass it back
    // In production, consider using Redis or encrypted session storage

    // Send OTP via SMS
    await this.smsService.sendOTP(userData.phone, otp);

    return {
      message: 'OTP sent successfully to your phone number',
      sessionToken,
      expiresIn: '10 minutes',
      phone: userData.phone.replace(/.(?=.{4})/g, '*'), // Mask phone number
    };
  }

  async verifyRegistrationOtp(userData: any, otp: string, sessionToken: string) {
    // Find OTP session
    const otpSession = await this.otpSessionRepository.findOne({
      where: {
        phone: userData.phone,
        sessionToken,
        purpose: OtpPurpose.REGISTRATION,
        isVerified: false,
      },
    });

    if (!otpSession) {
      throw new BadRequestException('Invalid session. Please register again.');
    }

    // Check if OTP expired
    if (new Date() > otpSession.expiresAt) {
      await this.otpSessionRepository.delete(otpSession.id);
      throw new BadRequestException('OTP has expired. Please register again.');
    }

    // Check attempts
    if (otpSession.attempts >= 5) {
      await this.otpSessionRepository.delete(otpSession.id);
      throw new BadRequestException('Too many failed attempts. Please register again.');
    }

    // Verify OTP
    if (otpSession.otp !== otp) {
      otpSession.attempts += 1;
      await this.otpSessionRepository.save(otpSession);
      throw new BadRequestException(
        `Invalid OTP. ${5 - otpSession.attempts} attempts remaining.`,
      );
    }

    // Mark as verified
    otpSession.isVerified = true;
    await this.otpSessionRepository.save(otpSession);

    // Create user account
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    // Send welcome SMS
    await this.smsService.sendWelcomeSMS(userData.phone, userData.firstName);

    // Generate JWT token
    const payload = { phone: user.phone, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    // Clean up old sessions
    await this.cleanupExpiredOtpSessions();

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        employeeId: user.employeeId,
      },
      message: 'Registration successful',
    };
  }

  async resendRegistrationOtp(phone: string, sessionToken: string) {
    // Find existing session
    const otpSession = await this.otpSessionRepository.findOne({
      where: {
        phone,
        sessionToken,
        purpose: OtpPurpose.REGISTRATION,
        isVerified: false,
      },
    });

    if (!otpSession) {
      throw new BadRequestException('Invalid session. Please register again.');
    }

    // Generate new OTP
    const otp = this.generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Update session
    otpSession.otp = otp;
    otpSession.expiresAt = expiresAt;
    otpSession.attempts = 0;
    await this.otpSessionRepository.save(otpSession);

    // Send new OTP
    await this.smsService.sendOTP(phone, otp);

    return {
      message: 'New OTP sent successfully',
      expiresIn: '10 minutes',
    };
  }

  async loginWithPhone(phone: string, password: string) {
    // Find user by phone
    const user = await this.usersService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Invalid phone number or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid phone number or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive. Please contact administrator.');
    }

    // Generate OTP
    const otp = this.generateOTP();
    const sessionToken = this.generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes

    // Clean up old OTP sessions for this phone and purpose
    await this.otpSessionRepository.delete({
      phone,
      purpose: OtpPurpose.LOGIN,
      isVerified: false,
    });

    // Create new OTP session
    const otpSession = this.otpSessionRepository.create({
      phone,
      otp,
      purpose: OtpPurpose.LOGIN,
      userId: user.id,
      sessionToken,
      expiresAt,
      isVerified: false,
      attempts: 0,
    });
    await this.otpSessionRepository.save(otpSession);

    // Send OTP via SMS
    await this.smsService.sendOTP(phone, otp);

    return {
      message: 'OTP sent successfully to your phone number',
      sessionToken,
      expiresIn: '10 minutes',
      phone: phone.replace(/.(?=.{4})/g, '*'), // Mask phone number
    };
  }

  async verifyLoginOtp(phone: string, otp: string, sessionToken: string) {
    // Find OTP session
    const otpSession = await this.otpSessionRepository.findOne({
      where: {
        phone,
        sessionToken,
        purpose: OtpPurpose.LOGIN,
        isVerified: false,
      },
    });

    if (!otpSession) {
      throw new BadRequestException('Invalid session. Please login again.');
    }

    // Check if OTP expired
    if (new Date() > otpSession.expiresAt) {
      await this.otpSessionRepository.delete(otpSession.id);
      throw new BadRequestException('OTP has expired. Please login again.');
    }

    // Check attempts
    if (otpSession.attempts >= 5) {
      await this.otpSessionRepository.delete(otpSession.id);
      throw new BadRequestException('Too many failed attempts. Please login again.');
    }

    // Verify OTP
    if (otpSession.otp !== otp) {
      otpSession.attempts += 1;
      await this.otpSessionRepository.save(otpSession);
      throw new BadRequestException(
        `Invalid OTP. ${5 - otpSession.attempts} attempts remaining.`,
      );
    }

    // Mark as verified
    otpSession.isVerified = true;
    await this.otpSessionRepository.save(otpSession);

    // Get user
    const user = await this.usersService.findOne(otpSession.userId);

    // Generate JWT token
    const payload = { phone: user.phone, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    // Clean up old sessions
    await this.cleanupExpiredOtpSessions();

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        employeeId: user.employeeId,
      },
      message: 'Login successful',
    };
  }

  async resendLoginOtp(phone: string, sessionToken: string) {
    // Find existing session
    const otpSession = await this.otpSessionRepository.findOne({
      where: {
        phone,
        sessionToken,
        purpose: OtpPurpose.LOGIN,
        isVerified: false,
      },
    });

    if (!otpSession) {
      throw new BadRequestException('Invalid session. Please login again.');
    }

    // Generate new OTP
    const otp = this.generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Update session
    otpSession.otp = otp;
    otpSession.expiresAt = expiresAt;
    otpSession.attempts = 0;
    await this.otpSessionRepository.save(otpSession);

    // Send new OTP
    await this.smsService.sendOTP(phone, otp);

    return {
      message: 'New OTP sent successfully',
      expiresIn: '10 minutes',
    };
  }

  private async cleanupExpiredOtpSessions() {
    // Delete expired OTP sessions (older than 1 hour)
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    await this.otpSessionRepository.delete({
      createdAt: LessThan(oneHourAgo),
    });
  }
}
