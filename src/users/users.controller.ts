import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  async GetFindOne(@Param('email') email: string) {
    console.log('email : ', email);
    const user = await this.usersService.findOne(email);
    console.log('user : ', { ...user });
    return user;
  }
}
