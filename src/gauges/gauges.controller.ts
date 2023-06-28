import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GaugesService } from './gauges.service';
import { CreateGaugeDto } from './dto/CreateGaugeDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('gauges')
export class GaugesController {
  constructor(private readonly gaugeService: GaugesService) {}
  @Public()
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createGaugeDto: CreateGaugeDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return await this.gaugeService.create(createGaugeDto, file);
  }
  @Get()
  async findAll() {
    return await this.gaugeService.findAll();
  }

  @Get(':gaugeName')
  async findOneByGaugeName(@Param('gaugeName') gaugeName: string) {
    return await this.gaugeService.findOneByGaugeName(gaugeName);
  }

  @Get(':id')
  async findOneByGaugeId(@Param('id') id: string) {
    return await this.gaugeService.findOneByGaugeId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gaugeService.remove(id);
  }
}
