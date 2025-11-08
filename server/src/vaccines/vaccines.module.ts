import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccine } from './vaccine.entity';
import { VaccinesService } from './vaccines.service';
import { VaccinesController } from './vaccines.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  providers: [VaccinesService],
  controllers: [VaccinesController],
})
export class VaccinesModule {}
