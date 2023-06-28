import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Group } from '../../groups/entities/group.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity({ name: '_users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'username', nullable: false, unique: true })
  username: string;
  @Column({ name: 'email', nullable: false, unique: true })
  email: string;
  @Column({
    name: 'hashed_password',
    nullable: false,
    select: true,
    type: 'text',
  })
  hashedPassword: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinTable({ name: '_users_roles' })
  role: Role;

  @ManyToMany(() => Group)
  @JoinTable({ name: '_users_groups' })
  groups: Group[];

  @OneToOne(() => Profile, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;
}
