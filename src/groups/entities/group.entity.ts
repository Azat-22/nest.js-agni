import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '_groups' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'group_name', nullable: false, unique: true })
  name: string;
}
