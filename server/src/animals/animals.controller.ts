import { Controller, Post, Body, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { AnimalsService } from './animals.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { QrCode } from '../qr-codes/qr-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, QrCode])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
  exports: [AnimalsService],
})
export class AnimalsModule {}

@Get()
list(
  @Query('page')  page = 1,
  @Query('limit') limit = 20,
  @Query('search') search = '',
  @Query('species') species?: 'dog'|'cow',
  @Query('status') status?: string,
) {
  return this.svc.list({ page: +page, limit: +limit, search, species, status });
}

@Controller('animals')
export class AnimalsController {
  constructor(private readonly svc: AnimalsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({ destination: './uploads', filename: (req, file, cb) =>
      cb(null, `${uuid()}${extname(file.originalname)}`) }),
    limits: { fileSize: 3 * 1024 * 1024 },
  }))
  async create(
    @Body() dto: any,
    @UploadedFile() pic: Express.Multer.File,
    @Query('code') code: string,
  ) {
    return this.svc.create(dto, pic?.filename, code);
  }
}

@Get('public/:nanoid')
async publicOne(@Param('nanoid') nanoid: string) {
  return this.svc.findPublic(nanoid);
}
