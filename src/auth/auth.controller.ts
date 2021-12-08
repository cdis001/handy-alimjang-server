import { Controller, Post, Req, Res } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    const user = req.body;
    const { email, password } = user;

    const userInfo = await this.authService.validateUser(email, password);

    const { accessToken, ...accessOption } =
      this.authService.getAccessToken(userInfo);

    const { refreshToken, ...refreshOption } =
      this.authService.getRefreshToken(userInfo);

    await this.usersService.setRefreshToken(refreshToken, userInfo.id);

    res.cookie('Authorization', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);
    return userInfo;
  }
}
