export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  created_at: string;
}

export interface Cotizacion {
  id: number;
  material: string;
  calidad: string;
  cantidad: number;
  nombre_archivo: string;
  volumen_cc: number;
  precio_total: number;
  tiempo_estimado_h: number;
  estado: string;
  created_at: string;
  pedido?: Pedido;
}

export interface Pedido {
  id: number;
  cotizacion: Cotizacion;
  usuario?: Usuario;
  estado: string;
  direccion_entrega: string;
  metodo_pago: string;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio_base: number;
  imagen_url: string;
}

export interface InventarioItem {
  id: number;
  tipo_insumo: string;
  cantidad_stock: number;
  stock_minimo: number;
  precio_unitario: number;
  proveedor: string;
}

export interface LoginResponse {
  access_token: string;
  usuario: Usuario;
}
