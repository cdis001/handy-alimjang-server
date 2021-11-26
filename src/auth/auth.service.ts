import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainTextPassword: string): Promise<any> {
    try {
      const user = await this.userService.findOne(email);
      await this.verifyPassword(plainTextPassword, user.password);
      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

    if (!isMatch) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getAccessToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET_KEY,
      expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_TIME}s`,
    });

    return {
      accessToken,
      httpOnly: true,
      maxAge: Number(process.env.JWT_ACCESS_EXPIRATION_TIME),
    };
  }

  getRefreshToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: `${process.env.JWT_REFRESH_EXPIRATION_TIME}s`,
    });
    return {
      refreshToken,
      httpOnly: true,
      maxAge: Number(process.env.JWT_REFRESH_EXPIRATION_TIME),
    };
  }
}
