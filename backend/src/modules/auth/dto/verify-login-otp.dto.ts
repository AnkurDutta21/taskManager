import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyLoginOtpDto {
  @ApiProperty({ 
    description: 'Phone number with country code',
    example: '+919876543210'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be in valid international format',
  })
  phone: string;

  @ApiProperty({ 
    description: '6-digit OTP code',
    example: '123456'
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;

  @ApiProperty({ 
    description: 'Temporary session token from phone login',
    example: 'temp_token_xyz123'
  })
  @IsString()
  @IsNotEmpty()
  sessionToken: string;
}
