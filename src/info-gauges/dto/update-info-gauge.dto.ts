import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoGaugeDto } from './create-info-gauge.dto';

export class UpdateInfoGaugeDto extends PartialType(CreateInfoGaugeDto) {}
