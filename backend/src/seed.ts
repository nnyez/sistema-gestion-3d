import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Producto } from './productos/entities/producto.entity';
import { Inventario } from './inventario/entities/inventario.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usuarioRepo = app.get(getRepositoryToken(Usuario));
  const productoRepo = app.get(getRepositoryToken(Producto));
  const inventarioRepo = app.get(getRepositoryToken(Inventario));

  const adminExists = await usuarioRepo.findOne({ where: { email: 'admin@gionomono.com' } });
  if (!adminExists) {
    const salt = await bcrypt.genSalt();
    await usuarioRepo.save([
      { nombre: 'Admin Gio', email: 'admin@gionomono.com', telefono: '0999999999', password_hash: await bcrypt.hash('admin123', salt), rol: 'admin' },
      { nombre: 'Cliente Demo', email: 'cliente@demo.com', telefono: '0988888888', password_hash: await bcrypt.hash('cliente123', salt), rol: 'cliente' },
    ]);
    console.log('Usuarios creados');
  }

  const productCount = await productoRepo.count();
  if (productCount === 0) {
    await productoRepo.save([
      { nombre: 'Impresión 3D en PLA', descripcion: 'Impresión de alta calidad en filamento PLA. Ideal para prototipos, piezas mecánicas y objetos decorativos. Variedad de colores disponibles.', categoria: 'impresion', precio_base: 15.0 },
      { nombre: 'Impresión 3D en Resina', descripcion: 'Impresión de alta precisión en resina UV. Perfecta para figuras detalladas, joyería y aplicaciones dentales.', categoria: 'impresion', precio_base: 25.0 },
      { nombre: 'Diseño 3D Personalizado', descripcion: 'Modelado 3D personalizado según tus especificaciones. Incluye asesoría y revisiones hasta lograr el diseño deseado.', categoria: 'diseno', precio_base: 35.0 },
      { nombre: 'Escaneo 3D', descripcion: 'Digitalización de objetos físicos a modelos 3D. Ideal para reverse engineering y preservación digital.', categoria: 'diseno', precio_base: 40.0 },
      { nombre: 'Curso de Impresión 3D', descripcion: 'Taller práctico de introducción a la impresión 3D. Aprende desde el diseño hasta la impresión final.', categoria: 'educacion', precio_base: 50.0 },
    ]);
    console.log('Productos creados');
  }

  const invCount = await inventarioRepo.count();
  if (invCount === 0) {
    await inventarioRepo.save([
      { tipo_insumo: 'Filamento PLA 1kg', cantidad_stock: 15, stock_minimo: 3, precio_unitario: 18.0, proveedor: '3DPrintPro' },
      { tipo_insumo: 'Filamento ABS 1kg', cantidad_stock: 8, stock_minimo: 2, precio_unitario: 22.0, proveedor: '3DPrintPro' },
      { tipo_insumo: 'Resina UV 500ml', cantidad_stock: 5, stock_minimo: 2, precio_unitario: 35.0, proveedor: 'ResinTech' },
      { tipo_insumo: 'Boquilla 0.4mm', cantidad_stock: 20, stock_minimo: 5, precio_unitario: 3.5, proveedor: 'Repuestos3D' },
      { tipo_insumo: 'Cama caliente 220x220', cantidad_stock: 3, stock_minimo: 1, precio_unitario: 45.0, proveedor: 'Repuestos3D' },
    ]);
    console.log('Inventario creado');
  }

  await app.close();
  console.log('Seed completado exitosamente');
}

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
