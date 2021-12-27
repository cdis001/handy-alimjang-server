import { Controller, Req, Res, Get } from '@nestjs/common';

import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('createRoom')
  async createRoom(@Req() req) {
    const room_info = req.body;
    const test = await this.roomService.createRoom(room_info);
  }
}
