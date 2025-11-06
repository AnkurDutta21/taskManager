import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReassignTaskDto {
  @ApiProperty({ description: 'User ID of the new assignee' })
  @IsNotEmpty()
  newAssignee: number;

  @ApiProperty({ description: 'Reason for reassignment' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
