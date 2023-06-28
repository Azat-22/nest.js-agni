import { Gauge } from 'src/gauges/entities/gauge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '_brands' })
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'brand_name', nullable: false, unique: true })
  name: string;

  @OneToMany(() => Gauge, gauge => gauge.brand)
  gauges: Gauge[];
}
