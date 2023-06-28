import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Public()
  @Post('create')
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    return await this.groupsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.groupsService.findOneById(id);
  }

  @Get(':groupName')
  async findOneByGroupName(@Param('groupName') groupName: string) {
    return await this.groupsService.findOneByName(groupName);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.groupsService.remove(id);
  }
}
