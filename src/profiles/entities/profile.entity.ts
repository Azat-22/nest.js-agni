import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: '_profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'patronymic' })
  patronymic: string;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
  @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
  user: User;
}
