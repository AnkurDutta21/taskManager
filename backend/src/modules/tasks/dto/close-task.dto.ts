import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CloseTaskDto {
  @ApiProperty({ description: 'User ID who closed the task' })
  @IsNotEmpty()
  closedBy: number;

  @ApiPropertyOptional({ description: 'Optional remarks for closing' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
