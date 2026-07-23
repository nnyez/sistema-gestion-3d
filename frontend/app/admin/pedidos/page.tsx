'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { Pedido } from '@/types';
import Badge, { estadoToVariant } from '@/components/Badge';
import Card from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminPedidosPage() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rol = localStorage.getItem('userRol');
    if (!localStorage.getItem('token') || rol !== 'admin') { router.push('/login'); return; }
    api.pedidos.list().then(setPedidos).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateEstado = async (id: number, estado: string) => {
    await api.pedidos.updateEstado(id, estado);
    setPedidos(await api.pedidos.list());
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
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Pedidos</h1>
              <p className="text-gray-500 mt-1">Administra el estado de los pedidos de impresión</p>
            </div>
            <Link href="/admin" className="text-indigo-700 font-semibold hover:text-indigo-600 transition text-sm">← Volver al Admin</Link>
          </div>

          <Card className="p-6" hover>
            {pedidos.length === 0 ? (
              <p className="text-gray-500 text-sm py-6 text-center">No hay pedidos registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold">#</th>
                      <th className="pb-3 font-semibold">Cliente</th>
                      <th className="pb-3 font-semibold">Material</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Estado</th>
                      <th className="pb-3 font-semibold">Dirección</th>
                      <th className="pb-3 font-semibold">Pago</th>
                      <th className="pb-3 font-semibold">Cambiar Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">#{p.id}</td>
                        <td className="py-3.5 text-gray-700">{p.usuario?.nombre || '—'}</td>
                        <td className="py-3.5 text-gray-700">{p.cotizacion?.material || '—'}</td>
                        <td className="py-3.5 font-semibold text-gray-900">${Number(p.total).toFixed(2)}</td>
                        <td className="py-3.5"><Badge variant={estadoToVariant(p.estado)}>{p.estado}</Badge></td>
                        <td className="py-3.5 text-gray-500 max-w-[150px] truncate">{p.direccion_entrega}</td>
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
            )}
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
}
