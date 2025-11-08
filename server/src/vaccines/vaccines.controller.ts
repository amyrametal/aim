import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly svc: VaccinesService) {}

  @Get('animal/:animalId')
  list(@Param('animalId') animalId: string) {
    return this.svc.listByAnimal(animalId);
  }

  @Post('animal/:animalId')
  add(@Param('animalId') animalId: string, @Body() dto: CreateVaccineDto) {
    return this.svc.add(animalId, dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVaccineDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }

  @Post('batch-given')
  batchGiven(@Body() dto: { ids: string[] }) {
    return this.svc.markGiven(dto.ids);
  }

  @Get('report/due')
  dueSoon(@Query('days') days = 7) {
    return this.svc.dueSoon(+days);
  }

  @Get('card/:animalId/pdf')
  cardPdf(@Param('animalId') animalId: string) {
    return this.svc.generateCard(animalId);
  }
}
