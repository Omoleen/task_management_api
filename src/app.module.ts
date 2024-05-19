import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthModule } from './auth/auth.module';
// import { JwtGuard } from './auth/jwt.guard';
// import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { WebSocketModule } from '@nestjs/websockets';

@Module({
  imports: [
    DatabaseModule,
    TasksModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    EventEmitterModule.forRoot(),
    // WebSocketModule.configure({
    //   handleConnection: (client) => console.log(`Client connected: ${client.id}`),
    //   handleDisconnect: (client) => console.log(`Client disconnected: ${client.id}`),
    // }),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 1000,
    //     limit: 10,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    // JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
