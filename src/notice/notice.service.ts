import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notice } from './notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  async addNotice(notice: Notice) {
    try {
      const result = this.noticeRepository.save(notice);
      return result;
    } catch (e) {
      return e;
    }
  }
}
