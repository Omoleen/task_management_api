import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from 'src/auth/interface/user.interface';

export const GetUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ): AuthenticatedUser | any => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
