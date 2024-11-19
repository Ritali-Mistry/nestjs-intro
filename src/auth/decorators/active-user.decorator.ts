import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../interface/active-user-data.interface';
import { REQUEST_USER_KET } from '../constants/auth.constants';

export const ActiveUser = createParamDecorator(
  (filed: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData = request[REQUEST_USER_KET];

    return filed ? user?.[filed] : user;
  },
);
