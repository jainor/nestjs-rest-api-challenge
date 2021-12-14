import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PublicUserDto } from './dto/public-user.dto';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): PublicUserDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
