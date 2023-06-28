import { IsAlpha } from 'class-validator';

export class CreateRoleDto {
  @IsAlpha('ru-RU', {
    message: 'Имя роли должно быть на русском языке',
  })
  roleName: string;
}
