import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UsersDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User) {
    try {
      const returnUser = await this.usersRepository.save(
        this.usersRepository.create(user),
      );
      return returnUser;
    } catch (e) {
      console.log(e);
    }
  }

  findAll() {
    const result = this.usersRepository.find();
    return result;
  }
}
