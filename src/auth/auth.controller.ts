import { Controller, Get, Post, Body, Req } from '@nestjs/common';

import { User } from 'src/users/user.entity';
import { UsersDto } from 'src/users/users.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req) {
    const user = req.body;
    const { email, password } = user;
    const userInfo = await this.authService.validateUser(email, password);

    return userInfo;
  }
}
