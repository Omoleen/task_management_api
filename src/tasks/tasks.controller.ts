import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Prisma, Task, TaskStatus } from '@prisma/client';
import { GetUser } from 'src/common/decorators/get-user.decorators';
import { AuthenticatedUser } from 'src/auth/interface/user.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  
  @Post()
  @ApiResponse({ status: 201, description: 'Task created', type: TaskDto })
  @ApiOperation({ summary: 'Create Task', description: 'Create a new task' })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: AuthenticatedUser,
  ): Promise<Task> {
    return this.tasksService.create(user, createTaskDto);
  }
  
  @Get()
  @ApiResponse({ status: 200, description: 'Tasks found', type: [TaskDto] })
  @ApiOperation({ summary: 'Get Tasks', description: 'Get all tasks' })
  findAll(
    @GetUser() user: AuthenticatedUser,
    @Query('search') search?: string,
    @Query('status') status?: TaskStatus,
  ): Promise<Task[]> {
    return this.tasksService.findAll(user, search, status);
  }
  
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Task found', type: TaskDto })
  @ApiOperation({ summary: 'Get Task', description: 'Get a task by id' })
  findOne(
    @Param('id') id: string,
    @GetUser() user: AuthenticatedUser,
  ): Promise<Task> {
    return this.tasksService.findOne(user, id);
  }
  
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Task updated', type: TaskDto })
  @ApiOperation({ summary: 'Update Task', description: 'Update a task by id' })
  update(
    @GetUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(user, id, updateTaskDto);
  }
  
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Task deleted' })
  @ApiOperation({ summary: 'Delete Task', description: 'Delete a task by id' })
  remove(
    @Param('id') id: string,
    @GetUser() user: AuthenticatedUser,
  ): Promise<void> {
    return this.tasksService.remove(user, id);
  }
}
