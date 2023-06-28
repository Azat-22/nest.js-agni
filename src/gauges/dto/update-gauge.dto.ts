import { PartialType } from '@nestjs/mapped-types';
import { CreateGaugeDto } from './CreateGaugeDto';

export class UpdateGaugeDto extends PartialType(CreateGaugeDto) {}
