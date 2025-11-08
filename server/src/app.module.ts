import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Animal } from './animals/animal.entity';
import { QrCode } from './qr-codes/qr-code.entity';
import { Vaccine } from './vaccines/vaccine.entity';
import { AnimalsModule } from './animals/animals.module';
import { QrCodesModule } from './qr-codes/qr-codes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: join(process.cwd(), 'uploads'), serveRoot: '/uploads' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Animal, QrCode, Vaccine],
      synchronize: true,
    }),
    AnimalsModule,
    QrCodesModule,
  ],
})
export class AppModule {}
