import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from './room.entity';
import { roomUser } from 'src/room_users/room_users.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomUsersService } from 'src/room_users/room_users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, roomUser])],
  providers: [RoomUsersService, RoomService],
  controllers: [RoomController],
  exports: [TypeOrmModule],
})
export class RoomModule {}
