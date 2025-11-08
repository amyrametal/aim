import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Vaccine } from './vaccine.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { format } from 'date-fns';

@Injectable()
export class VaccinesService {
  constructor(@InjectRepository(Vaccine) private repo: Repository<Vaccine>) {}

  listByAnimal(animalId: string) {
    return this.repo.find({ where: { animalId }, order: { dueDate: 'ASC' } });
  }

  async add(animalId: string, dto: CreateVaccineDto) {
    const v = this.repo.create({ ...dto, animalId });
    return this.repo.save(v);
  }

  async update(id: string, dto: UpdateVaccineDto) {
    await this.repo.update(id, dto);
    return this.repo.findOneByOrFail({ id });
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { deleted: true };
  }

  async markGiven(ids: string[]) {
    const today = format(new Date(), 'yyyy-MM-dd');
    await this.repo.update(ids, { givenDate: today });
    return { updated: ids.length };
  }

  dueSoon(days: number) {
    const start = format(new Date(), 'yyyy-MM-dd');
    const end = format(new Date(Date.now() + days * 24 * 36e5), 'yyyy-MM-dd');
    return this.repo.find({
      where: { dueDate: Between(start, end), givenDate: null },
      relations: ['animal'],
    });
  }

  generateCard(animalId: string) {
    // stub – returns JSON; later swap for Puppeteer PDF
    return this.listByAnimal(animalId);
  }
}
