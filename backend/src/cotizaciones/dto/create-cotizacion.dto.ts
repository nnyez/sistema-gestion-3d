import { IsString, IsNumber, Min } from 'class-validator';

export class CreateCotizacionDto {
  @IsString()
  material: string;

  @IsString()
  calidad: string;

  @IsNumber()
  @Min(1)
  cantidad: number;

  nombre_archivo?: string;
}
