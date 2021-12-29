import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Student } from 'src/student/student.entity';

@Entity()
export class roomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @Column()
  room_id: number;

  @OneToMany(() => Student, (student) => student.name)
  @JoinColumn({ name: 'student.name' })
  name: string;
}
