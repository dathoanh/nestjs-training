import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Task')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách công việc.' })
  @ApiResponse({
    status: 500,
    description: 'Lỗi trong quá trình lấy danh sách công việc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách công việc thành công.',
  })
  getTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDto?: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lấy nội dung công việc theo ID' })
  @ApiResponse({
    status: 500,
    description: 'Lỗi trong quá trình lấy nội dung công việc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy nội dung công việc thành công.',
  })
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
