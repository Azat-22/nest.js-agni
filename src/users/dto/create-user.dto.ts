import { IsAlphanumeric, IsEmail, IsLowercase, Length } from 'class-validator';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
export class CreateUserDto extends RegisterUserDto {
  @IsAlphanumeric('en-US', {
    message: 'Допустимы только символы латинского алфавита и цифры',
  })
  @IsLowercase({
    message: 'Допустимы только символы нижнего регистра',
  })
  username: string;
  @IsEmail()
  email: string;
  @Length(8, 24, {
    message: 'Пароль должен содержать от 8 до 24 символов',
  })
  rawPassword: string;
  roleName: string;
  groupName: string;
}
