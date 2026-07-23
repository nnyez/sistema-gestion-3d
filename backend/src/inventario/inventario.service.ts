import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private inventarioRepo: Repository<Inventario>,
  ) {}

  async findAll() {
    return this.inventarioRepo.find({ order: { tipo_insumo: 'ASC' } });
  }

  async updateStock(id: number, dto: UpdateStockDto) {
    const item = await this.inventarioRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item de inventario no encontrado');
    item.cantidad_stock = dto.cantidad_stock;
    item.updated_at = new Date();
    return this.inventarioRepo.save(item);
  }
}
