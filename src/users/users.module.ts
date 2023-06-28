import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../roles/entities/role.entity';
import { GroupsModule } from '../groups/groups.module';
import { Group } from '../groups/entities/group.entity';

import { ProfilesModule } from 'src/profiles/profiles.module';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Group, Profile]),
    RolesModule,
    GroupsModule,
    ProfilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
