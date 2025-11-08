import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Animal } from '../animals/animal.entity';

@Entity()
export class QrCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ default: 'unassigned' })
  status: 'unassigned' | 'assigned' | 'lost';

  @Column({ type: 'timestamptz', nullable: true })
  assignedAt: Date;

  @ManyToOne(() => Animal, a => a.qrCodes, { nullable: true })
  animal: Animal;
}
