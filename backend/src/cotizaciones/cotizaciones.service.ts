import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cotizacion } from './entities/cotizacion.entity';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';

const PRECIOS_MATERIAL: Record<string, number> = {
  PLA: 0.05,
  ABS: 0.07,
  Resina: 0.12,
};

const MULTIPLICADOR_CALIDAD: Record<string, number> = {
  Baja: 1.0,
  Media: 1.3,
  Alta: 1.7,
};

const TARIFA_HORA = 2.5;

@Injectable()
export class CotizacionesService {
  constructor(
    @InjectRepository(Cotizacion)
    private cotizacionRepo: Repository<Cotizacion>,
  ) {}

  async create(dto: CreateCotizacionDto, usuarioId: number) {
    const precioMaterial = PRECIOS_MATERIAL[dto.material] || 0.05;
    const multiplicador = MULTIPLICADOR_CALIDAD[dto.calidad] || 1.0;

    const volumen = 50 + Math.random() * 150;
    const tiempoEstimado = Math.max(1, Math.round((volumen / 10) * multiplicador));
    const precio = volumen * precioMaterial * multiplicador + tiempoEstimado * TARIFA_HORA;

    const cotizacion = this.cotizacionRepo.create({
      material: dto.material,
      calidad: dto.calidad,
      cantidad: dto.cantidad,
      nombre_archivo: dto.nombre_archivo || 'archivo_subido.stl',
      volumen_cc: Math.round(volumen * 100) / 100,
      precio_total: Math.round(precio * dto.cantidad * 100) / 100,
      tiempo_estimado_h: Math.round(tiempoEstimado * dto.cantidad * 100) / 100,
      estado: 'pendiente',
      usuario: { id: usuarioId } as any,
    });

    return this.cotizacionRepo.save(cotizacion);
  }

  async findAllByUser(usuarioId: number) {
    return this.cotizacionRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: { pedido: true },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const cotizacion = await this.cotizacionRepo.findOne({
      where: { id },
      relations: { usuario: true, pedido: true },
    });
    if (!cotizacion) throw new NotFoundException('Cotización no encontrada');
    return cotizacion;
  }

  async findAll() {
    return this.cotizacionRepo.find({ relations: { usuario: true, pedido: true }, order: { created_at: 'DESC' } });
  }
}
