import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { Task } from '@prisma/client';
// import { Task } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({
  // namespace: 'tasks',
  cors: {
    origin: '*',
  },
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
  ) {}

  private disconnect(client: Socket) {
    client.emit('Error', new UnauthorizedException());
    client.disconnect();
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    try {
      const decodedToken = await this.authService.verifyJwt(
        client.handshake.headers.authorization,
      );
      const user = await this.databaseService.user.findUnique({
        where: { id: decodedToken.sub },
      });
      if (!user) {
        return this.disconnect(client);
      }
      await this.databaseService.socketConnection.create({
        data: {
          id: client.id,
          user: { connect: { id: user.id } },
        },
      });
      const tasks: Task[] = await this.databaseService.task.findMany({
        where: {},
      });
      return this.server.to(client.id).emit('tasks', tasks);
    } catch (error) {
      console.log('Error:', error);
      return this.disconnect(client);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    await this.databaseService.socketConnection.delete({
      where: { id: client.id },
    });
    client.disconnect();
  }

  async broadcastNewTask(task: Task) {
    this.server.emit('tasks', task);
  }
}
