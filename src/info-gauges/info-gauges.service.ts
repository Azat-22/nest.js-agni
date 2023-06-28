import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInfoGaugeDto } from './dto/create-info-gauge.dto';
import { InfoGauge } from './entities/info-gauge.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class InfoGaugesService {
  constructor(
    @InjectRepository(InfoGauge)
    private readonly infoGaugeRepository: Repository<InfoGauge>,
  ) {}

  async create(createInfoGaugeDto: CreateInfoGaugeDto) {
    const existInfoGauge = await this.infoGaugeRepository.findOne({
      where: {
        title: createInfoGaugeDto.infoName,
      },
    });
    if (existInfoGauge) {
      throw new ConflictException(
        'Информация с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newInfoGauge = await this.infoGaugeRepository.create({
      title: createInfoGaugeDto.infoName,
    });
    await this.infoGaugeRepository.save(newInfoGauge);
    return newInfoGauge;
  }

  async findAll() {
    return await this.infoGaugeRepository.find();
  }

  async findOneByInfoGaugeName(title: string) {
    const existInfoGauge = await this.infoGaugeRepository.findOne({
      where: {
        title: title,
      },
    });
    if (existInfoGauge === null) {
      throw new NotFoundException(
        'Информация с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existInfoGauge;
  }

  async remove(id: string) {
    return await this.infoGaugeRepository.delete({
      id,
    });
  }

  async findOneByInfoGaugeId(id: string) {
    const existInfoGauge = await this.infoGaugeRepository.findOne({
      where: {
        id,
      },
    });
    if (existInfoGauge === null) {
      throw new NotFoundException(
        'Информация с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existInfoGauge;
  }
}
