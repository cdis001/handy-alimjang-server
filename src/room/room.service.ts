import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';

import { Room } from './room.entity';

import { RoomUsersService } from 'src/room_users/room_users.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private roomUsersService: RoomUsersService,
  ) {}
  async createRoom(room: any) {
    const room_info = await this.roomRepository.save(room);
    const room_users = room.students;
    let room2 = {};

    for (let student_id of room_users) {
      const { id, ...otherData } = room_info;

      room2 = { room_id: id, student_id };
      await this.roomUsersService.create(room2);
    }
  }
}
