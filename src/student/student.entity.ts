import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { roomUser } from 'src/room_users/room_users.entity';
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: false })
  user_id: number;

  @ManyToOne((type) => roomUser, (roomUser) => roomUser.students)
  rooms: roomUser;
}
