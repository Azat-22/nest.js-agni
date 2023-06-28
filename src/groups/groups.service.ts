import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const existGroup = await this.groupRepository.findOne({
      where: {
        name: createGroupDto.groupName,
      },
    });
    if (existGroup !== null) {
      throw new ConflictException(
        'Группа с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newGroup = await this.groupRepository.create({
      name: createGroupDto.groupName,
    });
    await this.groupRepository.save(newGroup);
    return newGroup;
  }

  async findAll() {
    return this.groupRepository.find();
  }

  async findOneById(id: string) {
    const existGroup = await this.groupRepository.findOne({
      where: {
        id,
      },
    });
    if (existGroup === null) {
      throw new NotFoundException(
        'Группа с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existGroup;
  }

  async findOneByName(groupName: string) {
    const existGroup = await this.groupRepository.findOne({
      where: {
        name: groupName,
      },
    });
    if (existGroup === null) {
      throw new NotFoundException(
        'Группа с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existGroup;
  }

  async remove(id: string) {
    return this.groupRepository.delete({
      id,
    });
  }
}
