import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepository.findOne({
      where: {
        name: createRoleDto.roleName,
      },
    });
    if (existRole !== null) {
      throw new ConflictException(
        'Роль с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newRole = await this.roleRepository.create({
      name: createRoleDto.roleName,
    });
    await this.roleRepository.save(newRole);
    return newRole;
  }
  async findAll() {
    return await this.roleRepository.find();
  }

  async findOneByRoleName(roleName: string) {
    const existRole = await this.roleRepository.findOne({
      where: {
        name: roleName,
      },
    });
    if (existRole === null) {
      throw new NotFoundException(
        'Роль с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existRole;
  }

  async remove(id: string) {
    return await this.roleRepository.delete({
      id,
    });
  }

  async findOneByRoleId(id: string) {
    const existRole = await this.roleRepository.findOne({
      where: {
        id,
      },
    });
    if (existRole === null) {
      throw new NotFoundException(
        'Роль с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existRole;
  }
}
