import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

import { UsersService } from 'src/users/users.service';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    try {
      const req_accessToken = req.cookies['Authorization'];
      const req_refreshToken = req.cookies['Refresh'];

      if (!req_refreshToken) {
        throw new UnauthorizedException(
          '비정상적인 접근입니다. 다시 로그인을 시도해 주세요',
        );
      } else if (!req_accessToken) {
        await this.jwtService.verify(req_refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET_KEY,
        });
      }

      const user = await this.usersService.getUserInfoIfRefreshToken(
        req_refreshToken,
      );
      const { accessToken, ...accessOption } =
        this.authService.getAccessToken(user);

      res.cookie('Authorization', accessToken, accessOption);

      return true;
    } catch (e) {
      res.clearCookie('Authorization');
      res.clearCookie('Refresh');
      return false;
    }
  }

  handleRequest(err, user, info: Error) {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
