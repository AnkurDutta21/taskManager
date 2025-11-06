import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AbandonTaskDto {
  @ApiProperty({ description: 'Reason for abandoning the task' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ description: 'User ID who abandoned the task' })
  @IsNotEmpty()
  abandonedBy: number;
}
