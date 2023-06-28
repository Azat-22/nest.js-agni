import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const existProfile = await this.profileRepository.findOne({
      where: {
        lastName: createProfileDto.lastName,
        firstName: createProfileDto.firstName,
        patronymic: createProfileDto.patronymic,
        phoneNumber: createProfileDto.phoneNumber,
      },
    });
    if (existProfile !== null) {
      throw new ConflictException(
        'Профиль с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newProfile = await this.profileRepository.create({
      lastName: createProfileDto.lastName,
      firstName: createProfileDto.firstName,
      patronymic: createProfileDto.patronymic,
      phoneNumber: createProfileDto.phoneNumber,
    });
    await this.profileRepository.save(newProfile);
    return newProfile;
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: string) {
    const existProfile = await this.profileRepository.findOne({
      where: { id },
    });
    if (existProfile === null) {
      throw new NotFoundException(
        'Профиль с такими данными не найден! Проверьте данные и попробуйте еще раз.',
      );
    }
    return existProfile;
  }
  async remove(id: string) {
    return await this.profileRepository.delete({ id });
  }
}
