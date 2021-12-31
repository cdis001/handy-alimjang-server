import { Controller, Req, Res, Get } from '@nestjs/common';

import { RoomService } from './room.service';
import { RoomUsersService } from 'src/room_users/room_users.service';

@Controller('room')
export class RoomController {
  constructor(
    private roomService: RoomService,
    private roomUsersService: RoomUsersService,
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

    const room_users_info = await this.roomUsersService.findRoomUsers(
      room_info,
    );

    return room_users_info;
  }
}
