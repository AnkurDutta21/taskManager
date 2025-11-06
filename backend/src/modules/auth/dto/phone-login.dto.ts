import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneLoginDto {
  @ApiProperty({ 
    description: 'Phone number with country code',
    example: '+919876543210'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be in valid international format (e.g., +919876543210)',
  })
  phone: string;

  @ApiProperty({ 
    description: 'User password',
    example: 'Password123!'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
