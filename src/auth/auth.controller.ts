import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser} from '../user/get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/singup')
    singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.singUp(authCredentialsDto);
    }

    @Post('/singin')
    singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto);
    }

}
