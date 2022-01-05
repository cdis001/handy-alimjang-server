import { Controller, Get, Post, Req } from '@nestjs/common';

import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Get('addNotice')
  async addNotice(@Req() req) {
    const notice = req.body;

    const result = this.noticeService.addNotice(notice);

    return result;
  }

  @Get('updateNotice')
  async updateNotice(@Req() req) {
    const notice = req.body;

    const result = this.noticeService.updateNotice(notice);

    return result;
  }

  @Get('deleteNotice')
  async deleteNotice(@Req() req) {
    const notice = req.body;

    const result = this.noticeService.deleteNotice(notice);

    return result;
  }
}
