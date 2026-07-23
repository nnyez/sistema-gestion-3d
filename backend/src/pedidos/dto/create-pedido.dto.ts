import { IsNumber, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber()
  cotizacion_id: number;

  @IsString()
  direccion_entrega: string;

  @IsString()
  metodo_pago: string;
}
