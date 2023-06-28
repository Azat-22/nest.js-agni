import { Brand } from 'src/brands/entities/brand.entity';
import { InfoGauge } from 'src/info-gauges/entities/info-gauge.entity';
import { Type } from 'src/types/entities/type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '_gauges' })
export class Gauge {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'zname', nullable: false, unique: true })
  zname: string;
  @Column({ name: 'img_name', nullable: false })
  img: string;

  @ManyToOne(() => Brand)
  brand: Brand;
  @ManyToOne(() => Type)
  type: Type;
  @ManyToOne(() => InfoGauge)
  infogauge: InfoGauge;
}
