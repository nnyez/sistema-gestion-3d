'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { Pedido } from '@/types';
import Badge, { estadoToVariant } from '@/components/Badge';
import Card from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminProduccionPage() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rol = localStorage.getItem('userRol');
    if (!localStorage.getItem('token') || rol !== 'admin') { router.push('/login'); return; }
    api.pedidos.list().then(setPedidos).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const asignarImpresora = async (id: number) => {
    try {
      await api.pedidos.updateEstado(id, 'en_produccion');
      setPedidos(await api.pedidos.list());
    } catch (err: any) {
      alert(err.message);
    }
  };

  const finalizar = async (id: number) => {
    try {
      await api.pedidos.updateEstado(id, 'terminado');
      setPedidos(await api.pedidos.list());
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-indigo-600 border-t-transparent" />
    </div>
  );

  const pendientes = pedidos.filter(p => p.estado === 'pendiente');
  const enProduccion = pedidos.filter(p => p.estado === 'en_produccion');
  const terminados = pedidos.filter(p => p.estado === 'terminado' || p.estado === 'entregado');

  return (
    <ErrorBoundary>
      <div className="flex-1 bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Producción</h1>
              <p className="text-gray-500 mt-1">Control de impresiones y asignación de trabajos</p>
            </div>
            <Link href="/admin" className="text-indigo-700 font-semibold hover:text-indigo-600 transition text-sm">← Volver al Admin</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <Card className="p-6" hover>
              <h3 className="font-bold text-gray-900 text-lg">{pendientes.length}</h3>
              <p className="text-sm text-gray-500">Pendientes de producción</p>
            </Card>
            <Card className="p-6" hover>
              <h3 className="font-bold text-amber-600 text-lg">{enProduccion.length}</h3>
              <p className="text-sm text-gray-500">En producción</p>
            </Card>
            <Card className="p-6" hover>
              <h3 className="font-bold text-emerald-600 text-lg">{terminados.length}</h3>
              <p className="text-sm text-gray-500">Terminados</p>
            </Card>
          </div>

          {pendientes.length > 0 && (
            <Card className="p-6 mb-6" hover>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Pendientes — Asignar Impresora</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold"># Pedido</th>
                      <th className="pb-3 font-semibold">Cliente</th>
                      <th className="pb-3 font-semibold">Material</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Estado</th>
                      <th className="pb-3 font-semibold">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendientes.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">#{p.id}</td>
                        <td className="py-3.5 text-gray-700">{p.usuario?.nombre || '—'}</td>
                        <td className="py-3.5 text-gray-700">{p.cotizacion?.material || '—'}</td>
                        <td className="py-3.5 font-semibold text-gray-900">${Number(p.total).toFixed(2)}</td>
                        <td className="py-3.5"><Badge variant={estadoToVariant(p.estado)}>{p.estado}</Badge></td>
                        <td className="py-3.5">
                          <button onClick={() => asignarImpresora(p.id)}
                            className="bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-semibold text-xs hover:bg-indigo-600 transition">
                            Asignar impresora
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {enProduccion.length > 0 && (
            <Card className="p-6 mb-6" hover>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">En Producción</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold"># Pedido</th>
                      <th className="pb-3 font-semibold">Cliente</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Estado</th>
                      <th className="pb-3 font-semibold">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enProduccion.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">#{p.id}</td>
                        <td className="py-3.5 text-gray-700">{p.usuario?.nombre || '—'}</td>
                        <td className="py-3.5 font-semibold text-gray-900">${Number(p.total).toFixed(2)}</td>
                        <td className="py-3.5"><Badge variant={estadoToVariant(p.estado)}>{p.estado}</Badge></td>
                        <td className="py-3.5">
                          <button onClick={() => finalizar(p.id)}
                            className="bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-semibold text-xs hover:bg-emerald-600 transition">
                            Marcar terminado
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {terminados.length > 0 && (
            <Card className="p-6" hover>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Terminados</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold"># Pedido</th>
                      <th className="pb-3 font-semibold">Cliente</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terminados.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">#{p.id}</td>
                        <td className="py-3.5 text-gray-700">{p.usuario?.nombre || '—'}</td>
                        <td className="py-3.5 font-semibold text-gray-900">${Number(p.total).toFixed(2)}</td>
                        <td className="py-3.5"><Badge variant={estadoToVariant(p.estado)}>{p.estado}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
