import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { VerifyLoginOtpDto } from './dto/verify-login-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Register with phone number (Step 1)',
    description: 'Initiates registration and sends OTP to phone number'
  })
  async register(@Body() userData: any) {
    return this.authService.registerWithPhone(userData);
  }

  @Post('verify-registration-otp')
  @ApiOperation({ 
    summary: 'Verify OTP for registration (Step 2)',
    description: 'Verifies OTP and completes user registration'
  })
  async verifyRegistrationOtp(@Body() body: { userData: any; otp: string; sessionToken: string }) {
    return this.authService.verifyRegistrationOtp(
      body.userData,
      body.otp,
      body.sessionToken,
    );
  }

  @Post('resend-registration-otp')
  @ApiOperation({ 
    summary: 'Resend OTP for registration',
    description: 'Resends OTP to the phone number for active registration session'
  })
  async resendRegistrationOtp(@Body() body: { phone: string; sessionToken: string }) {
    return this.authService.resendRegistrationOtp(body.phone, body.sessionToken);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return { message: 'Logged out successfully' };
  }

  @Post('phone-login')
  @ApiOperation({ 
    summary: 'Login with phone number and password (Step 1)',
    description: 'Validates credentials and sends OTP to phone number'
  })
  async phoneLogin(@Body() phoneLoginDto: PhoneLoginDto) {
    return this.authService.loginWithPhone(
      phoneLoginDto.phone,
      phoneLoginDto.password,
    );
  }

  @Post('verify-login-otp')
  @ApiOperation({ 
    summary: 'Verify OTP for phone login (Step 2)',
    description: 'Verifies OTP and returns JWT access token'
  })
  async verifyLoginOtp(@Body() verifyLoginOtpDto: VerifyLoginOtpDto) {
    return this.authService.verifyLoginOtp(
      verifyLoginOtpDto.phone,
      verifyLoginOtpDto.otp,
      verifyLoginOtpDto.sessionToken,
    );
  }

  @Post('resend-login-otp')
  @ApiOperation({ 
    summary: 'Resend OTP for phone login',
    description: 'Resends OTP to the phone number for active login session'
  })
  async resendLoginOtp(@Body() body: { phone: string; sessionToken: string }) {
    return this.authService.resendLoginOtp(body.phone, body.sessionToken);
  }
}
