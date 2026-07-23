import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Cotizacion } from '../cotizaciones/entities/cotizacion.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Cotizacion)
    private cotizacionRepo: Repository<Cotizacion>,
  ) {}

  async create(dto: CreatePedidoDto, usuarioId: number) {
    const cotizacion = await this.cotizacionRepo.findOne({ where: { id: dto.cotizacion_id } });
    if (!cotizacion) throw new NotFoundException('Cotización no encontrada');

    const existing = await this.pedidoRepo.findOne({ where: { cotizacion: { id: dto.cotizacion_id } } });
    if (existing) throw new BadRequestException('Esta cotización ya tiene un pedido asociado');

    await this.cotizacionRepo.update(dto.cotizacion_id, { estado: 'aprobada' });

    const pedido = this.pedidoRepo.create({
      cotizacion,
      usuario: { id: usuarioId } as any,
      direccion_entrega: dto.direccion_entrega,
      metodo_pago: dto.metodo_pago,
      total: cotizacion.precio_total,
      estado: 'pendiente',
    });

    return this.pedidoRepo.save(pedido);
  }

  async findAllByUser(usuarioId: number) {
    return this.pedidoRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: { cotizacion: true },
      order: { created_at: 'DESC' },
    });
  }

  async findAll() {
    return this.pedidoRepo.find({
      relations: { cotizacion: true, usuario: true },
      order: { created_at: 'DESC' },
    });
  }

  async updateEstado(id: number, dto: UpdateEstadoDto) {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');

    pedido.estado = dto.estado;
    pedido.updated_at = new Date();
    return this.pedidoRepo.save(pedido);
  }
}
