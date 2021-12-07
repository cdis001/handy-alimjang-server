import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { response } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET_KEY,
      passReqToCallback: true,
      ignoreExpiration: true,
    });
  }

  async validate(req, payload: any) {
    const refreshToken = req.cookies['Authorization'];
    return this.usersService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.sub,
    );
  }
}
