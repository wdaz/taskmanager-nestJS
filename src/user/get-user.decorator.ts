import { User } from 'src/user/user.entity';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req): User => {
    return req.user;
});
