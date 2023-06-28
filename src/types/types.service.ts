import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(createTypeDto: CreateTypeDto) {
    const existType = await this.typeRepository.findOne({
      where: {
        name: createTypeDto.typeName,
      },
    });
    if (existType) {
      throw new ConflictException(
        'Тип с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newType = await this.typeRepository.create({
      name: createTypeDto.typeName,
    });
    await this.typeRepository.save(newType);
    return newType;
  }

  async findAll() {
    return await this.typeRepository.find();
  }

  async findOneByTypeName(typeName: string) {
    const existType = await this.typeRepository.findOne({
      where: {
        name: typeName,
      },
    });
    if (existType === null) {
      throw new NotFoundException(
        'Тип с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existType;
  }

  async remove(id: string) {
    return await this.typeRepository.delete({
      id,
    });
  }

  async findOneByTypeId(id: string) {
    const existType = await this.typeRepository.findOne({
      where: {
        id,
      },
    });
    if (existType === null) {
      throw new NotFoundException(
        'Тип с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existType;
  }
}
