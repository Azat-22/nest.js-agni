import { IsAlphanumeric, IsLowercase, Length } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsAlphanumeric('en-US', {
    message: 'Допустимы только символы латинского алфавита и цифры',
  })
  @IsLowercase({
    message: 'Допустимы только символы нижнего регистра',
  })
  username: string;
  email: string;
  @Length(8, 24, {
    message: 'Пароль должен содержать от 8 до 24 символов',
  })
  rawPassword: string;
  roleName: string;
  groupName: string;
  @IsNotEmpty({ message: 'Обязательное поле' })
  lastName: string;
  @IsNotEmpty({ message: 'Обязательное поле' })
  firstName: string;
  @IsOptional()
  patronymic: string;
  @IsOptional()
  phoneNumber: string;
}
