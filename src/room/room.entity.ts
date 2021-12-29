import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Student } from 'src/student/student.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teacher_id: number;

  @Column()
  roomName: String;

  @OneToMany(() => Student, (student) => student.rooms)
  students: Student[];
}
