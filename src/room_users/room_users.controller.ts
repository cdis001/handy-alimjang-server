import { Controller, Get, Req } from '@nestjs/common';

import { RoomUsersService } from './room_users.service';

@Controller('room_users')
export class RoomUsersController {
  constructor(private roomUsersService: RoomUsersService) {}
  @Get('addRoomUsers')
  async addRoomUsers(@Req() req) {
    const users = req.body;
    const result = await this.roomUsersService.addRoomUsers(users);

    return result;
  }
}
