import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './../auth/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async singUp(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSaltSync();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === 'EREQUEST') {
                throw new ConflictException('Username already exits');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            const { password, salt, ...result } = user;

            return result;
        } else {
            return null;
        }
    }

    private async hashPassword( password: string, salt: string): Promise<string> {
        return bcrypt.hashSync( password, salt);
    }
}
