import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QrCodesService } from './qr-codes.service';

@Controller('qr-codes')
export class QrCodesController {
  constructor(private readonly svc: QrCodesService) {}

  @Post('bulk-upload')
  async bulk(@Body() dto: { codes: string[] }) {
    return this.svc.bulkCreate(dto.codes);
  }

  @Get(':code/status')
  async status(@Param('code') code: string) {
    return this.svc.getStatus(code);
  }
}
