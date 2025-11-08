import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { QrCode } from '../qr-codes/qr-code.entity';
import { nanoid } from 'nanoid';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

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

async list(opts: {page:number; limit:number; search:string; species?:string; status?:string}) {
  const qb = this.repo.createQueryBuilder('a')
    .leftJoinAndSelect('a.qrCodes', 'q')
    .orderBy('a.createdAt', 'DESC')
    .offset((opts.page - 1) * opts.limit)
    .limit(opts.limit);

  if (opts.search) {
    qb.andWhere('(a.name ILIKE :s OR q.code ILIKE :s)', { s: `%${opts.search}%` });
  }
  if (opts.species) qb.andWhere('a.species = :species', { species: opts.species });
  if (opts.status) qb.andWhere('a.status = :status', { status: opts.status });

  const [items, total] = await qb.getManyAndCount();
  return { items, total, page: opts.page, pages: Math.ceil(total / opts.limit) };
}

async findPublic(nanoid: string) {
  return this.repo.findOneOrFail({
    where: { nanoid },
    select: ['id', 'nanoid', 'name', 'species', 'ageMonths', 'gender', 'status', 'pictureUrl', 'lat', 'lng', 'accuracy'],
    relations: ['qrCodes'],
  });
}
