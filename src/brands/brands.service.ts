import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const existBrand = await this.brandRepository.findOne({
      where: {
        name: createBrandDto.brandName,
      },
    });
    if (existBrand) {
      throw new ConflictException(
        'Бренд с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newBrand = await this.brandRepository.create({
      name: createBrandDto.brandName,
    });
    await this.brandRepository.save(newBrand);
    return newBrand;
  }

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOneByBrandName(brandName: string) {
    const existBrand = await this.brandRepository.findOne({
      where: {
        name: brandName,
      },
    });
    if (existBrand === null) {
      throw new NotFoundException(
        'Бренд с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existBrand;
  }

  async remove(id: string) {
    return await this.brandRepository.delete({
      id,
    });
  }

  async findOneByBrandId(id: string) {
    const existBrand = await this.brandRepository.findOne({
      where: {
        id,
      },
    });
    if (existBrand === null) {
      throw new NotFoundException(
        'Бренд с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existBrand;
  }
}
