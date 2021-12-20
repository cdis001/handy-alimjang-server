import { Controller, Req, Res, Get } from '@nestjs/common';

import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('createRoom')
  async createRoom(@Req() req, @Res({ passthrough: true }) res) {
    const user = req.body;
    const test = this.roomService.createRoom(user);
  }
}
