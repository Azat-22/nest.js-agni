import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}
  @Public()
  @Post('create')
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }
  @Public()
  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @Get(':brandName')
  async findOneByBrandName(@Param('brandName') brandName: string) {
    return await this.brandService.findOneByBrandName(brandName);
  }

  @Get(':id')
  async findOneByBrandId(@Param('id') id: string) {
    return await this.brandService.findOneByBrandId(id);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
