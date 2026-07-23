import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Cotizacion } from '../../cotizaciones/entities/cotizacion.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cotizacion, (cotizacion) => cotizacion.pedido)
  @JoinColumn()
  cotizacion: Cotizacion;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  usuario: Usuario;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ length: 255, nullable: true })
  direccion_entrega: string;

  @Column({ length: 50, nullable: true })
  metodo_pago: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  updated_at: Date;
}
