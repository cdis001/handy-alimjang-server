import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teacher_id: number;

  @Column()
  roomName: String;
}
