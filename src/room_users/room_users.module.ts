import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { roomUser } from './room_users.entity';
import { RoomUsersService } from './room_users.service';
import { RoomUsersController } from './room_users.controller';
@Module({
  imports: [TypeOrmModule.forFeature([roomUser])],
  providers: [RoomUsersService],
  controllers: [RoomUsersController],
  exports: [TypeOrmModule],
})
export class RoomUsersModule {}
