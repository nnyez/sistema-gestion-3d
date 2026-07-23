import { IsString } from 'class-validator';

export class UpdateEstadoDto {
  @IsString()
  estado: string;
}
