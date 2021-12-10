import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findOne(email: string) {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
  }

  async create(user: User) {
    return await this.usersRepository.save(this.usersRepository.create(user));
  }

  async setRefreshToken(refreshToken: string, id: number) {
    const hashedRefreshToken = refreshToken;
    await this.usersRepository.update(id, {
      hashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async getUserInfoIfRefreshToken(hashedRefreshToken) {
    const user = await this.usersRepository.findOne({ hashedRefreshToken });
    if (user) {
      return user;
    }
  }
}
