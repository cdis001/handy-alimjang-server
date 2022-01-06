import { Controller, Req, Res, Get } from '@nestjs/common';

import { RoomService } from './room.service';
import { RoomUsersService } from 'src/room_users/room_users.service';
import { NoticeService } from 'src/notice/notice.service';

@Controller('room')
export class RoomController {
  constructor(
    private roomService: RoomService,
    private roomUsersService: RoomUsersService,
    private noticeService: NoticeService,
  ) {}

  @Get('createRoom')
  async createRoom(@Req() req) {
    const room_info = req.body;
    const success = await this.roomService.createRoom(room_info);

    return success;
  }

  @Get('moveRoom')
  async moveRoom(@Req() req) {
    const room_info = req.body;

    const room_id = room_info.room_id;

    const students = await this.roomUsersService.findRoomUsers(room_info);

    const notices = await this.noticeService.findNotices(room_id);

    const info = { room_id, students, notices };

    return info;
  }

  @Get('deleteRoom')
  async deleteRoom(@Req() req) {
    const room = req.body;

    const result = await this.roomService.deleteRoom(room);
  }
}
