import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Animal } from '../animals/animal.entity';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  animalId: string;

  @ManyToOne(() => Animal, a => a.vaccines, { onDelete: 'CASCADE' })
  animal: Animal;

  @Column()
  vaccineType: string;          // e.g. 'Anti-Rabies', 'DHPPiL'

  @Column({ nullable: true })
  brand: string;

  @Column({ type: 'date' })
  dueDate: string;

  @Column({ type: 'date', nullable: true })
  givenDate: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: false })
  reminderSent: boolean;
}
