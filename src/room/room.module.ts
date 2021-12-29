import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from './room.entity';
import { Student } from 'src/student/student.entity';

import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Student])],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [TypeOrmModule],
})
export class RoomModule {}
