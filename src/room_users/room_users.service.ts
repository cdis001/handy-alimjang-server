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
    return await this.roomUsersRepository.save(roomUser);
  }
}
