import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrCode } from './qr-code.entity';
import { In } from 'typeorm';


@Injectable()
export class QrCodesService {
  constructor(@InjectRepository(QrCode) private repo: Repository<QrCode>) {}

  async bulkCreate(codes: string[]) {
    const existing = await this.repo.findBy({ code: In(codes) });
    const set = new Set(existing.map(e => e.code));
    const toIns = codes.filter(c => !set.has(c)).map(code => ({ code }));
    await this.repo.insert(toIns);
    return { created: toIns.length, skipped: set.size };
  }

  async getStatus(code: string) {
    const qr = await this.repo.findOne({ where: { code }, relations: ['animal'] });
    if (!qr) return { exists: false };
    return { exists: true, status: qr.status, animal: qr.animal };
  }
}
