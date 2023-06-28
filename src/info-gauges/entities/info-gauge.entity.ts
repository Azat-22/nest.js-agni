import { Gauge } from 'src/gauges/entities/gauge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '_infogauges' })
export class InfoGauge {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'title_name', nullable: false })
  title: string;

  @OneToMany(() => Gauge, gauge => gauge.infogauge)
  gauges: Gauge[];
}
