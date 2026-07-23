import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async findAll() {
    return this.productoRepo.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    return this.productoRepo.findOne({ where: { id } });
  }
}
