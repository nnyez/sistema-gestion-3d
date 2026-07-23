'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { Cotizacion, Pedido, InventarioItem } from '@/types';
import Badge, { estadoToVariant } from '@/components/Badge';
import Card from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminPage() {
  const router = useRouter();
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('userRol');
    if (!token || rol !== 'admin') { router.push('/login'); return; }

    Promise.all([
      api.cotizaciones.list(),
      api.pedidos.list(),
      api.inventario.list(),
    ]).then(([c, p, i]) => {
      setCotizaciones(c);
      setPedidos(p);
      setInventario(i);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateEstado = async (id: number, estado: string) => {
    try {
      await api.pedidos.updateEstado(id, estado);
      setPedidos(await api.pedidos.list());
    } catch (err: any) {
      alert(err.message);
    }
  };

  const updateStock = async (id: number, cantidad: number) => {
    try {
      await api.inventario.updateStock(id, cantidad);
      setInventario(await api.inventario.list());
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-indigo-600 border-t-transparent" />
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="flex-1 bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel Administrativo</h1>
              <p className="text-gray-500 mt-1">Resumen del sistema</p>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <Link href="/admin/clientes"
                className="bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition shadow-md text-xs">
                Clientes
              </Link>
              <Link href="/admin/pedidos"
                className="bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition shadow-md text-xs">
                Pedidos
              </Link>
              <Link href="/admin/produccion"
                className="bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition shadow-md text-xs">
                Producción
              </Link>
              <Link href="/admin/inventario"
                className="border-2 border-indigo-600 text-indigo-700 px-4 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition text-xs">
                Inventario
              </Link>
              <Link href="/admin/reportes"
                className="border-2 border-indigo-600 text-indigo-700 px-4 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition text-xs">
                Reportes
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <Card className="p-6" hover>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">{cotizaciones.length} Cotizaciones</h3>
              <p className="text-sm text-gray-500 mt-1">Total registradas</p>
            </Card>
            <Card className="p-6" hover>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">{pedidos.length} Pedidos</h3>
              <p className="text-sm text-gray-500 mt-1">{pedidos.filter(p => p.estado === 'pendiente').length} pendientes</p>
            </Card>
            <Card className="p-6" hover>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">{inventario.length} Insumos</h3>
              <p className="text-sm text-gray-500 mt-1">{inventario.filter(i => i.cantidad_stock <= i.stock_minimo).length} bajo stock</p>
            </Card>
          </div>

          <Card className="p-6 mb-6" hover>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Pedidos Recientes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-modern">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-semibold">#</th>
                    <th className="pb-3 font-semibold">Cliente</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Estado</th>
                    <th className="pb-3 font-semibold">Pago</th>
                    <th className="pb-3 font-semibold">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.slice(0, 5).map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 transition-colors">
                      <td className="py-3.5 font-medium text-gray-900">#{p.id}</td>
                      <td className="py-3.5 text-gray-700">{p.usuario?.nombre || '—'}</td>
                      <td className="py-3.5 font-semibold text-gray-900">${Number(p.total).toFixed(2)}</td>
                      <td className="py-3.5"><Badge variant={estadoToVariant(p.estado)}>{p.estado}</Badge></td>
                      <td className="py-3.5 text-gray-700 capitalize">{p.metodo_pago}</td>
                      <td className="py-3.5">
                        <select value={p.estado} onChange={(e) => updateEstado(p.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                          <option value="pendiente">Pendiente</option>
                          <option value="en_produccion">En producción</option>
                          <option value="terminado">Terminado</option>
                          <option value="entregado">Entregado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pedidos.length > 5 && (
              <Link href="/admin/pedidos" className="inline-block mt-4 text-sm text-indigo-700 font-semibold hover:text-indigo-600 transition">
                Ver todos los pedidos →
              </Link>
            )}
          </Card>

          <Card className="p-6" hover>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Inventario</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-modern">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-semibold">Insumo</th>
                    <th className="pb-3 font-semibold">Stock</th>
                    <th className="pb-3 font-semibold">Stock Mínimo</th>
                    <th className="pb-3 font-semibold">Precio Unit.</th>
                    <th className="pb-3 font-semibold">Proveedor</th>
                    <th className="pb-3 font-semibold">Alerta</th>
                  </tr>
                </thead>
                <tbody>
                  {inventario.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 transition-colors">
                      <td className="py-3.5 font-medium text-gray-900">{item.tipo_insumo}</td>
                      <td className="py-3.5">
                        <input type="number" value={item.cantidad_stock} min={0}
                          onChange={(e) => updateStock(item.id, Number(e.target.value))}
                          className="w-20 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                      </td>
                      <td className="py-3.5 text-gray-700">{item.stock_minimo}</td>
                      <td className="py-3.5 text-gray-900 font-medium">${Number(item.precio_unitario).toFixed(2)}</td>
                      <td className="py-3.5 text-gray-700">{item.proveedor}</td>
                      <td className="py-3.5">
                        {item.cantidad_stock <= item.stock_minimo ? (
                          <Badge variant="danger">Stock bajo</Badge>
                        ) : (
                          <Badge variant="success">OK</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
}
