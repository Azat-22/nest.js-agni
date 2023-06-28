import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post('profiles')
  async create(@Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.create(createProfileDto);
  }
  @Public()
  @Get()
  async findAll() {
    return await this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profilesService.findOne(id);
  }
  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.profilesService.remove(id);
  }
}
