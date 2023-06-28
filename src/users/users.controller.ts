import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  @Public()
  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
  // @Roles('Администратор')
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @Get('id')
  async findOneById(@Param('id') id: string) {
    return await this.usersService.findOneById(id);
  }
  @Get('me')
  async findOneByUsername(@Request() req) {
    return await this.usersService.findOneById(req.user.id);
  }
  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
