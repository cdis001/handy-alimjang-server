import { Controller, Get, Post, Body } from '@nestjs/common';

import { User } from 'src/users/user.entity';
import { UsersDto } from 'src/users/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User) {
    const result = await this.authService.create(user);
    return result;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}
