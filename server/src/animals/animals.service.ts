import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { QrCode } from '../qr-codes/qr-code.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private repo: Repository<Animal>,
    @InjectRepository(QrCode) private qrRepo: Repository<QrCode>,
  ) {}

  async create(dto: any, picture: string, code: string) {
    const qr = await this.qrRepo.findOne({ where: { code }, relations: ['animal'] });
    if (!qr) throw new Error('QR code not found');
    if (qr.status !== 'unassigned') throw new Error('QR already assigned');

    const animal = this.repo.create({
      ...dto,
      nanoid: nanoid(8),
      pictureUrl: picture ? `/uploads/${picture}` : null,
      ageMonths: dto.ageMonths ? Number(dto.ageMonths) : null,
      lat: dto.lat ? Number(dto.lat) : null,
      lng: dto.lng ? Number(dto.lng) : null,
      accuracy: dto.accuracy ? Number(dto.accuracy) : null,
    });
    const saved = await this.repo.save(animal);

    qr.animal = saved;
    qr.status = 'assigned';
    qr.assignedAt = new Date();
    await this.qrRepo.save(qr);

    return saved;
  }
}
