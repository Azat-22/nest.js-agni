import { Module } from '@nestjs/common';
import { InfoGaugesService } from './info-gauges.service';
import { InfoGaugesController } from './info-gauges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoGauge } from './entities/info-gauge.entity';
@Module({
  imports: [TypeOrmModule.forFeature([InfoGauge])],
  controllers: [InfoGaugesController],
  providers: [InfoGaugesService],
  exports: [InfoGaugesService],
})
export class InfoGaugesModule {}
