import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'Message text content' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'Sender name or identifier' })
  @IsString()
  @IsNotEmpty()
  sender: string;

  @ApiPropertyOptional({ description: 'File URL if message contains a file' })
  @IsString()
  @IsOptional()
  file?: string;

  @ApiPropertyOptional({ description: 'File name' })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  fileSize?: number;

  @ApiPropertyOptional({ description: 'File MIME type' })
  @IsString()
  @IsOptional()
  fileType?: string;
}
