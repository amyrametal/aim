import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateVaccineDto {
  @IsString()  vaccineType: string;
  @IsOptional() @IsString()  brand?: string;
  @IsDateString()  dueDate: string;        // YYYY-MM-DD
  @IsOptional() @IsDateString()  givenDate?: string;
  @IsOptional() @IsString()  notes?: string;
}
