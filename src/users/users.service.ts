import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { hash } from 'argon2';
import { RolesService } from '../roles/roles.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/entities/profile.entity';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileService: ProfilesService,
    @InjectRepository(Profile)
    private readonly profileRepositoty: Repository<Profile>,
    private readonly rolesService: RolesService,
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    const existRole = await this.rolesService.findOneByRoleName(
      registerUserDto.roleName,
    );
    const existUser = await this.userRepository.findOne({
      where: {
        email: registerUserDto.email,
        username: registerUserDto.username,
      },
      relations: {
        profile: true,
      },
    });
    if (existUser !== null) {
      throw new ConflictException(
        'Пользователь с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newUser = await this.userRepository.create({
      username: registerUserDto.username,
      email: registerUserDto.email,
      hashedPassword: await hash(registerUserDto.rawPassword),
      role: {
        id: existRole.id,
        name: existRole.name,
      },
    });
    const { patronymic, firstName, lastName, phoneNumber } = registerUserDto;
    const nwProfile = await this.profileService.create({
      patronymic,
      firstName,
      lastName,
      phoneNumber,
    });
    await this.profileRepositoty.save(nwProfile);
    newUser.profile = nwProfile;
    await this.userRepository.save(newUser);
    const { hashedPassword, ...rest } = newUser;
    return rest;
  }
  async createUser(registerUserDto: RegisterUserDto) {
    const existRole = await this.rolesService.findOneByRoleName(
      registerUserDto.roleName,
    );
    const existUser = await this.userRepository.findOne({
      where: {
        email: registerUserDto.email,
        username: registerUserDto.username,
      },
      relations: {
        profile: true,
      },
    });
    if (existUser !== null) {
      throw new ConflictException(
        'Пользователь с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newUser = await this.userRepository.create({
      username: registerUserDto.username,
      email: registerUserDto.email,
      hashedPassword: await hash(registerUserDto.rawPassword),
      role: {
        id: existRole.id,
        name: existRole.name,
      },
    });
    const { patronymic, firstName, lastName, phoneNumber } = registerUserDto;
    const nwProfile = await this.profileService.create({
      patronymic,
      firstName,
      lastName,
      phoneNumber,
    });
    await this.profileRepositoty.save(nwProfile);
    newUser.profile = nwProfile;
    await this.userRepository.save(newUser);
    const { hashedPassword, ...rest } = newUser;
    return rest;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: true,
        profile: true,
      },
    });
  }
  async findOneByUsername(username: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (existUser === null) {
      throw new NotFoundException(
        'Пользователя с такими данными не существует! Проверьте данные и попробуйте еще раз',
      );
    }
    return this.returnUserWithoutPassword(existUser);
  }

  async findOneByUsernameWithCredentials(username: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: {
        profile: true,
      },
    });
    if (existUser === null) {
      throw new NotFoundException(
        'Пользователя с такими данными не существует! Проверьте данные и попробуйте еще раз',
      );
    }
    return existUser;
  }

  async findOneById(id: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });

    if (existUser === null) {
      throw new NotFoundException(
        'Пользователя с такими данными не существует! Проверьте данные и попробуйте еще раз',
      );
    }
    return this.returnUserWithoutPassword(existUser);
  }

  async remove(id: string) {
    return await this.userRepository.delete({
      id,
    });
  }

  async removeUser(id: string) {
    const existUser = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
    if (!existUser) {
      throw new NotFoundException(
        'Пользователя с такими данными не существует! Проверьте данные и попробуйте еще раз',
      );
    }
    return await this.userRepository.delete({
      id,
    });
  }

  returnUserWithoutPassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...newUserWithoutPassword } = user;
    return newUserWithoutPassword;
  }
}
