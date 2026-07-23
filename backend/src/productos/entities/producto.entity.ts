import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column({ length: 50 })
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_base: number;

  @Column({ nullable: true })
  imagen_url: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
