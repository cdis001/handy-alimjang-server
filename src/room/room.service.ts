import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';

import { Room } from './room.entity';
import { Student } from 'src/student/student.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  async createRoom(room: Room) {
    let success = false;
    try {
      // const room_info = await this.roomRepository.create(room);
      const room_users = room.students;
      let student2 = [];
      // console.log('room_info : ', room_info);

      for (let student of room_users) {
        const student1 = await this.studentRepository.findOne({
          id: student.id,
        });

        student2 = [...student2, student1];
        console.log('student2 : ', student2);
      }
      room.students = student2;
      const result = await this.roomRepository.create(room);
      await this.roomRepository.save(result);
      console.log(result);
      success = true;
    } catch (e) {
      success = false;
    } finally {
      return success;
    }
  }
}
