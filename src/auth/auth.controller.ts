import { Controller, Get, Post, Body, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Req() req) {
    const user = req.body;
    const { email, password } = user;

    const userInfo = await this.authService.validateUser(email, password);

    const { accessToken, ...accessOption } =
      this.authService.getAccessToken(userInfo);

    console.log(accessToken);
    return userInfo;
  }
}
