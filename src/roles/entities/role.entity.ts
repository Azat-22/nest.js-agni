import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '_roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'role_name', nullable: false, unique: true })
  name: string;
}
