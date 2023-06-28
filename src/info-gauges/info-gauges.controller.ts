import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InfoGaugesService } from './info-gauges.service';
import { CreateInfoGaugeDto } from './dto/create-info-gauge.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('infogauges')
export class InfoGaugesController {
  constructor(private readonly infogaugeService: InfoGaugesService) {}
  @Public()
  @Post('create')
  async create(@Body() createInfoGaugeDto: CreateInfoGaugeDto) {
    return await this.infogaugeService.create(createInfoGaugeDto);
  }

  @Get()
  async findAll() {
    return await this.infogaugeService.findAll();
  }

  @Get(':infoName')
  async findOneByInfoGaugeName(@Param('infoName') infoName: string) {
    return await this.infogaugeService.findOneByInfoGaugeName(infoName);
  }

  @Get(':id')
  async findOneByInfoGaugeId(@Param('id') id: string) {
    return await this.infogaugeService.findOneByInfoGaugeId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infogaugeService.remove(id);
  }
}
