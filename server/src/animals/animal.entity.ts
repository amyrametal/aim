import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QrCode } from '../qr-codes/qr-code.entity';
import { Vaccine } from '../vaccines/vaccine.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nanoid: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['dog', 'cow'] })
  species: 'dog' | 'cow';

  @Column({ nullable: true })
  pictureUrl: string;

  @Column({ type: 'int', nullable: true })
  ageMonths: number;

  @Column({ nullable: true })
  gender: string;
  
  @Column({ type: 'double precision', nullable: true })
  lat: number;
  
  @Column({ type: 'double precision', nullable: true })
  lng: number;
  
  @Column({ type: 'double precision', nullable: true })
  accuracy: number;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => Vaccine, v => v.animal)
  vaccines: Vaccine[];

  @OneToMany(() => QrCode, q => q.animal)
  qrCodes: QrCode[];
}
