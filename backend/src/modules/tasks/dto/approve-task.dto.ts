import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApproveTaskDto {
  @ApiProperty({ description: 'User ID who approved the task' })
  @IsNotEmpty()
  approvedBy: number;

  @ApiPropertyOptional({ description: 'Optional remarks for approval' })
  @IsString()
  @IsOptional()
  remarks?: string;
}
