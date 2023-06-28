import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsernameWithCredentials(
      username,
    );
    const isPasswordMatch = verify(user.hashedPassword, password);

    if (user && isPasswordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const existUser = await this.usersService.findOneByUsernameWithCredentials(
      loginUserDto.username,
    );

    const confirmPasswords = await verify(
      existUser.hashedPassword,
      loginUserDto.rawPassword,
    );
    if (!confirmPasswords) {
      throw new UnauthorizedException(
        'Доступ к сервису запрещен! Проверьте данные и попробуйте еще раз.',
      );
    }

    const payload = {
      sub: existUser.id,
      username: existUser.username,
      role: existUser.role,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...result } = existUser;
    return {
      ...result,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    return await this.usersService.create(registerUserDto);
  }
}
