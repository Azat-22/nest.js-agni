import { Module } from '@nestjs/common';
import { GaugesService } from './gauges.service';
import { GaugesController } from './gauges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gauge } from './entities/gauge.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Type } from 'src/types/entities/type.entity';
import { BrandsModule } from 'src/brands/brands.module';
import { TypesModule } from 'src/types/types.module';
import { InfoGauge } from 'src/info-gauges/entities/info-gauge.entity';
import { InfoGaugesModule } from 'src/info-gauges/info-gauges.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Gauge, Brand, Type, InfoGauge]),
    BrandsModule,
    TypesModule,
    InfoGaugesModule,
  ],
  controllers: [GaugesController],
  providers: [GaugesService],
  exports: [GaugesService],
})
export class GaugesModule {}
