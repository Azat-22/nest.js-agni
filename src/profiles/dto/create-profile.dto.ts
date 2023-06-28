import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Обязательное поле' })
  lastName: string;
  @IsNotEmpty({ message: 'Обязательное поле' })
  firstName: string;
  @IsOptional()
  patronymic: string;
  @IsOptional()
  phoneNumber: string;
}
