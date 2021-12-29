import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { roomUser } from './room_users.entity';

@Injectable()
export class RoomUsersService {
  constructor(
    @InjectRepository(roomUser)
    private roomUsersRepository: Repository<roomUser>,
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

  async addRoomUser(roomUser: any) {
    let success = false;
    try {
      await this.roomUsersRepository.save(roomUser);
      success = true;
    } catch (e) {
      success = false;
    }
    return success;
  }
  async findRoomUsers(room_id: any) {
    try {
      const room_users_info = await this.roomUsersRepository
        .createQueryBuilder('room_user')
        .leftJoinAndSelect(
          'student',
          'student',
          'student.id = room_user.student_id',
        )
        .select(['room_user.id', 'room_user.student_id', 'student.name'])
        .where('room_id = :id', { id: room_id.room_id })
        .getMany();
      return room_users_info;
    } catch (e) {}
  }
}
