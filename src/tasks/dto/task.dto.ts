import { TaskStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskDto {
  @ApiProperty({
    example: 'cuid12345',
    description: 'The unique identifier of the task',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Task title', description: 'The title of the task' })
  title: string;

  @ApiProperty({
    example: 'Task content',
    description: 'The content of the task',
  })
  @Expose()
  content: string;

  @ApiProperty({
    example: TaskStatus.TODO,
    enum: TaskStatus,
    description: 'The status of the task',
  })
  @Expose()
  status: TaskStatus;

  @ApiProperty({
    example: new Date(),
    description: 'The date the task was created',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The date the task was last updated',
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    example: 'cuid12345',
    description: 'The unique identifier of the user',
  })
  @Expose()
  userId: string;
}
