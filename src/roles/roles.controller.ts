import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Public()
  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }
  @Public()
  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }
  @Public()
  @Get(':roleName')
  async findOneByRoleName(@Param('roleName') roleName: string) {
    return await this.rolesService.findOneByRoleName(roleName);
  }

  @Get(':id')
  async findOneByRoleId(@Param('id') id: string) {
    return await this.rolesService.findOneByRoleId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
