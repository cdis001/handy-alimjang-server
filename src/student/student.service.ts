import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private teacherRepository: Repository<Student>,
  ) {}
  async create(student: Student) {
    return await this.teacherRepository.save(student);
  }
}
