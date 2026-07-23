import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Cotizacion } from '../cotizaciones/entities/cotizacion.entity';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Cotizacion])],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
