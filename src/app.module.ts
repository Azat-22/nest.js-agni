import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { GroupsModule } from './groups/groups.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/entities/profile.entity';
import { Group } from './groups/entities/group.entity';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { Brand } from './brands/entities/brand.entity';
import { TypesModule } from './types/types.module';
import { Type } from './types/entities/type.entity';
import { GaugesModule } from './gauges/gauges.module';
import { Gauge } from './gauges/entities/gauge.entity';
import { InfoGaugesModule } from './info-gauges/info-gauges.module';
import { InfoGauge } from './info-gauges/entities/info-gauge.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
        fileFilter(file) {
          file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
          );
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User, Role, Group, Profile, Brand, Type, Gauge, InfoGauge],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    GroupsModule,
    AuthModule,
    BrandsModule,
    TypesModule,
    GaugesModule,
    InfoGaugesModule,
    ProfilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
