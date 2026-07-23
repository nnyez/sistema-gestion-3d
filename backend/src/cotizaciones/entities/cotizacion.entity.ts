import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('cotizaciones')
export class Cotizacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.cotizaciones)
  usuario: Usuario;

  @Column({ nullable: true })
  nombre_archivo: string;

  @Column()
  material: string;

  @Column()
  calidad: string;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  volumen_cc: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_total: number;

  @Column('decimal', { precision: 5, scale: 2 })
  tiempo_estimado_h: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Pedido, (pedido) => pedido.cotizacion)
  pedido: Pedido;
}
