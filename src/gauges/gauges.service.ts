import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGaugeDto } from './dto/CreateGaugeDto';
import { Gauge } from './entities/gauge.entity';
import { Repository } from 'typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { TypesService } from 'src/types/types.service';

@Injectable()
export class GaugesService {
  constructor(
    @InjectRepository(Gauge)
    private readonly gaugeRepository: Repository<Gauge>,
    private readonly brandsService: BrandsService,
    private readonly typesService: TypesService,
  ) {}

  async create(createGaugeDto: CreateGaugeDto, file: Express.Multer.File) {
    const existBrand = await this.brandsService.findOneByBrandName(
      createGaugeDto.brandName,
    );
    const existType = await this.typesService.findOneByTypeName(
      createGaugeDto.typeName,
    );

    const existGauge = await this.gaugeRepository.findOne({
      where: {
        zname: createGaugeDto.gaugeName,
      },
    });
    if (existGauge) {
      throw new ConflictException(
        'Прибор с такими данными уже существует! Проверьте данные и попробуйте еще раз.',
      );
    }
    const newGauge = await this.gaugeRepository.create({
      zname: createGaugeDto.gaugeName,
      img: (file.originalname = Buffer.from(
        file.originalname,
        'latin1',
      ).toString('utf8')),
      brand: {
        id: existBrand.id,
        name: existBrand.name,
      },
      type: {
        id: existType.id,
        name: existType.name,
      },
    });

    await this.gaugeRepository.save(newGauge);
    existBrand.gauges = [newGauge];
    existType.gauges = [newGauge];
    return newGauge;
  }

  async findAll() {
    return await this.gaugeRepository.find();
  }

  async findOneByGaugeName(gaugeName: string) {
    const existGauge = await this.gaugeRepository.findOne({
      where: {
        zname: gaugeName,
      },
    });
    if (existGauge === null) {
      throw new NotFoundException(
        'Прибор с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existGauge;
  }

  async remove(id: string) {
    return await this.gaugeRepository.delete({
      id,
    });
  }

  async findOneByGaugeId(id: string) {
    const existGauge = await this.gaugeRepository.findOne({
      where: {
        id,
      },
    });
    if (existGauge === null) {
      throw new NotFoundException(
        'Прибор с такими данными не найдена! Проверьте данные и повторите еще раз.',
      );
    }
    return existGauge;
  }
}
