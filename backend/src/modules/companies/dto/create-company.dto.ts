import { IsString, IsEmail, IsOptional, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  companyCode: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  taxId?: string;

  @ApiProperty()
  @IsString()
  industry: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  foundedDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}
