import { Gauge } from 'src/gauges/entities/gauge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '_types' })
export class Type {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'type_name', nullable: false, unique: true })
  name: string;
  @OneToMany(() => Gauge, gauge => gauge.type)
  gauges: Gauge[];
}
