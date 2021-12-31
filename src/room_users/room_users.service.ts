import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';
import { roomUser } from './room_users.entity';
import { Student } from 'src/student/student.entity';

@Injectable()
export class RoomUsersService {
  constructor(
    @InjectRepository(roomUser)
    private roomUsersRepository: Repository<roomUser>,

    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(roomUser: any) {
    let success = false;
    try {
      await this.roomUsersRepository.save(roomUser);
      success = true;
    } catch (e) {
      success = false;
    }
    return success;
  }

  async addRoomUsers(roomUsers: any) {
    let success = false;
    try {
      const room_id = roomUsers.room_id;
      const students = roomUsers.students.split(',');

      let temp = {};

      for (let student_id of students) {
        temp = { room_id, student_id };
        await this.roomUsersRepository.save(temp);
      }
      success = true;
    } catch (e) {
      success = false;
    }
    return success;
  }
  async findRoomUsers(room: any) {
    try {
      const room_users_info = await getConnection()
        .createQueryBuilder()
        .select('room_user')
        .from(roomUser, 'room_user')
        .leftJoinAndSelect(
          'student',
          'student',
          'student.id = room_user.student_id',
        )
        .where('room_id = :id', { id: room.room_id })
        .getMany();

      for (let student of room_users_info) {
        const studentInfo = await this.studentsRepository.findOne({
          id: student.student_id,
        });

        student.students = { ...studentInfo };
      }

      return room_users_info;
    } catch (e) {}
  }
}
