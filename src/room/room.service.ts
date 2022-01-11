import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Room } from './room.entity';
import { roomUser } from 'src/room_users/room_users.entity';
import { Notice } from 'src/notice/notice.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(roomUser)
    private roomUserRepository: Repository<roomUser>,
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
    private connection: Connection,
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
  async deleteRoom(room: any) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    const room_id = room.room_id;

    try {
      await this.roomRepository.delete(room_id);

      await this.roomUserRepository.delete(room_id);

      await this.noticeRepository.delete(room_id);
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}
