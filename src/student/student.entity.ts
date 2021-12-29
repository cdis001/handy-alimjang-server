import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Room } from 'src/room/room.entity';

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

  @ManyToMany(() => Room, (room) => room.students)
  rooms: Room[];
}
