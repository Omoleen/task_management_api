import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { AuthenticatedUser } from 'src/auth/interface/user.interface';
import { DatabaseService } from 'src/database/database.service';
import { TasksGateway } from './tasks.gateway';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly tasksGateway: TasksGateway,
  ) {}

  async create(
    user: AuthenticatedUser,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const existingTask = await this.databaseService.task.findUnique({
      where: { title: createTaskDto.title, userId: user.id },
    });
    if (existingTask) {
      throw new BadRequestException('Task name already exists');
    }
    const newTask = await this.databaseService.task.create({
      data: { ...createTaskDto, user: { connect: { id: user.id } } },
    });
    await this.tasksGateway.broadcastNewTask(newTask);
    return newTask;
  }

  async findAll(
    user: AuthenticatedUser,
    search?: string,
    status?: string,
  ): Promise<Task[]> {
    const whereClause = { userId: user.id };

    if (status) {
      whereClause['status'] = status;
    }

    if (search) {
      whereClause['OR'] = [
        { title: { contains: search } },
        { content: { contains: search } },
      ];
    }

    return this.databaseService.task.findMany({
      where: whereClause,
    });
  }

  async findOne(user: AuthenticatedUser, id: string): Promise<Task> {
    const task = await this.databaseService.task.findUnique({
      where: { id, userId: user.id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(
    user: AuthenticatedUser,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.databaseService.task.update({
      where: { id, userId: user.id },
      data: updateTaskDto,
    });
  }

  async remove(user: AuthenticatedUser, id: string) {
    try {
      await this.databaseService.task.delete({
        where: { id, userId: user.id },
      });
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }
}
