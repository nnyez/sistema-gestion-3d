'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { Cotizacion, Pedido, InventarioItem } from '@/types';
import Card from '@/components/Card';
import Badge, { estadoToVariant } from '@/components/Badge';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminReportesPage() {
  const router = useRouter();
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rol = localStorage.getItem('userRol');
    if (!localStorage.getItem('token') || rol !== 'admin') { router.push('/login'); return; }
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

  const totalCotizaciones = cotizaciones.length;
  const totalPedidos = pedidos.length;
  const ingresos = pedidos.reduce((sum, p) => sum + Number(p.total), 0);
  const pendientes = pedidos.filter(p => p.estado === 'pendiente').length;
  const enProduccion = pedidos.filter(p => p.estado === 'en_produccion').length;
  const terminados = pedidos.filter(p => p.estado === 'terminado' || p.estado === 'entregado').length;
  const stockBajo = inventario.filter(i => i.cantidad_stock <= i.stock_minimo).length;

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
              <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
              <p className="text-gray-500 mt-1">Resumen general del sistema</p>
            </div>
            <Link href="/admin" className="text-indigo-700 font-semibold hover:text-indigo-600 transition text-sm">← Volver al Admin</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <Card className="p-6" hover>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Cotizaciones</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalCotizaciones}</p>
              <p className="text-sm text-gray-400 mt-1">Totales registradas</p>
            </Card>
            <Card className="p-6" hover>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Pedidos</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalPedidos}</p>
              <p className="text-sm text-gray-400 mt-1">{pendientes} pendientes, {enProduccion} en producción</p>
            </Card>
            <Card className="p-6" hover>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Ingresos</p>
              <p className="text-3xl font-bold text-emerald-700 mt-1">${ingresos.toFixed(2)}</p>
              <p className="text-sm text-gray-400 mt-1">Total de pedidos</p>
            </Card>
            <Card className="p-6" hover>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Inventario</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{inventario.length}</p>
              <p className="text-sm text-red-500 mt-1">{stockBajo > 0 ? `${stockBajo} insumos con stock bajo` : 'Stock suficiente'}</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6" hover>
              <h3 className="font-bold text-gray-900 mb-3">Distribución de Pedidos</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Pendientes</span><span className="font-semibold">{pendientes}</span></div>
                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: `${totalPedidos ? (pendientes/totalPedidos)*100 : 0}%` }} /></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">En producción</span><span className="font-semibold">{enProduccion}</span></div>
                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${totalPedidos ? (enProduccion/totalPedidos)*100 : 0}%` }} /></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Terminados</span><span className="font-semibold">{terminados}</span></div>
                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${totalPedidos ? (terminados/totalPedidos)*100 : 0}%` }} /></div>
              </div>
            </Card>

            <Card className="p-6 md:col-span-2" hover>
              <h3 className="font-bold text-gray-900 mb-3">Pedidos Recientes</h3>
              {pedidos.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">Sin pedidos registrados.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm table-modern">
                    <thead>
                      <tr className="text-left text-gray-500 border-b border-gray-100">
                        <th className="pb-3 font-semibold">#</th>
                        <th className="pb-3 font-semibold">Cliente</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Estado</th>
                        <th className="pb-3 font-semibold">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidos.slice(0, 10).map((p) => (
                        <tr key={p.id} className="border-b border-gray-50 transition-colors">
                          <td className="py-3 font-medium text-gray-900">#{p.id}</td>
                          <td className="py-3 text-gray-700">{p.usuario?.nombre || '—'}</td>
                          <td className="py-3 font-semibold text-gray-900">${Number(p.total).toFixed(2)}</td>
                          <td className="py-3"><Badge variant={estadoToVariant(p.estado)}>{p.estado}</Badge></td>
                          <td className="py-3 text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
