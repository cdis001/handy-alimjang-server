import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_id: number;

  @Column()
  comment: String;

  @CreateDateColumn()
  date: Date;
}
