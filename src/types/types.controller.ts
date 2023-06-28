import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('types')
export class TypesController {
  constructor(private readonly typeService: TypesService) {}
  @Public()
  @Post('create')
  async create(@Body() createTypeDto: CreateTypeDto) {
    return await this.typeService.create(createTypeDto);
  }
  @Public()
  @Get()
  async findAll() {
    return await this.typeService.findAll();
  }

  @Get(':typeName')
  async findOneByTypeName(@Param('typeName') typeName: string) {
    return await this.typeService.findOneByTypeName(typeName);
  }

  @Get(':id')
  async findOneByTypeId(@Param('id') id: string) {
    return await this.typeService.findOneByTypeId(id);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove(id);
  }
}
