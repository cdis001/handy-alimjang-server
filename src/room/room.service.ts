import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.entity';
import { roomUser } from 'src/room_users/room_users.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(roomUser)
    private roomUserRepository: Repository<roomUser>,
  ) {}
  async createRoom(room: any) {
    let success = false;
    try {
      const room_info = await this.roomRepository.save(room);
      const room_users = room.students;
      const room_id = room_info.id;

      room_users.map(async (roomUser) => {
        const student_id = roomUser.id;
        const temp = { room_id, student_id };

        await this.roomUserRepository.save(temp);
        return temp;
      });
      success = true;
    } catch (e) {
      success = false;
    } finally {
      return success;
    }
  }
}
