import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './decorators/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
}
