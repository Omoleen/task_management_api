import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TasksGateway } from './tasks.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksGateway],
})
export class TasksModule {}
