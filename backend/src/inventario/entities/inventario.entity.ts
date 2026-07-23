import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  tipo_insumo: string;

  @Column()
  cantidad_stock: number;

  @Column()
  stock_minimo: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ length: 100 })
  proveedor: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  updated_at: Date;
}
