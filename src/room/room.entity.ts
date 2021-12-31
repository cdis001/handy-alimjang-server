import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Student } from 'src/student/student.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teacher_id: number;

  @Column()
  roomName: String;
}
