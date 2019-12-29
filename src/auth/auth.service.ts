import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './../user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.singUp(authCredentialsDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username: user.username, id: user.id };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
