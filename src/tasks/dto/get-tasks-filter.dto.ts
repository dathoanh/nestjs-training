import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  @ApiProperty({ required: false, enum: TaskStatus })
  status?: TaskStatus;

  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;
}
