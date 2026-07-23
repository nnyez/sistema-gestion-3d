'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { Cotizacion, Pedido } from '@/types';
import Badge, { estadoToVariant } from '@/components/Badge';
import Card from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function DashboardPage() {
  const router = useRouter();
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    setUserName(localStorage.getItem('userName') || '');

    Promise.all([
      api.cotizaciones.mine(),
      api.pedidos.mine(),
    ]).then(([cotizaciones, pedidos]) => {
      setCotizaciones(cotizaciones);
      setPedidos(pedidos);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const [creandoPedido, setCreandoPedido] = useState<number | null>(null);

  const crearPedido = async (cotizacionId: number) => {
    const direccion = prompt('Dirección de entrega:');
    if (!direccion) return;
    const metodo = prompt('Método de pago (transferencia/efectivo):') || 'transferencia';

    setCreandoPedido(cotizacionId);
    try {
      await api.pedidos.create({ cotizacion_id: cotizacionId, direccion_entrega: direccion, metodo_pago: metodo });
      alert('Pedido creado exitosamente');
      setPedidos(await api.pedidos.mine());
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCreandoPedido(null);
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Panel del Cliente</h1>
            <p className="text-gray-500 mt-1">Bienvenido, <span className="font-semibold text-gray-700">{userName}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <Link href="/cotizador"
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">Nueva Cotización</h3>
              <p className="text-sm text-gray-500 mt-1">Solicita una cotización para tu proyecto</p>
            </Link>
            <Card className="p-6 hover">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="font-bold text-gray-900">{cotizaciones.length} Cotizaciones</h3>
              <p className="text-sm text-gray-500 mt-1">{cotizaciones.filter(c => c.estado === 'pendiente').length} pendientes</p>
            </Card>
            <Card className="p-6 hover">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                <span className="text-xl">📦</span>
              </div>
              <h3 className="font-bold text-gray-900">{pedidos.length} Pedidos</h3>
              <p className="text-sm text-gray-500 mt-1">{pedidos.filter(p => p.estado === 'en_produccion').length} en producción</p>
            </Card>
          </div>

          <Card className="p-6 mb-6" hover>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Mis Cotizaciones</h2>
            </div>
            {cotizaciones.length === 0 ? (
              <p className="text-gray-500 text-sm py-6 text-center">No tienes cotizaciones aún. <Link href="/cotizador" className="text-indigo-700 font-medium hover:underline">Crear una</Link></p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold">#</th>
                      <th className="pb-3 font-semibold">Material</th>
                      <th className="pb-3 font-semibold">Calidad</th>
                      <th className="pb-3 font-semibold">Cant.</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Estado</th>
                      <th className="pb-3 font-semibold">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotizaciones.map((c) => (
                      <tr key={c.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">{c.id}</td>
                        <td className="py-3.5 text-gray-700">{c.material}</td>
                        <td className="py-3.5 text-gray-700">{c.calidad}</td>
                        <td className="py-3.5 text-gray-700">{c.cantidad}</td>
                        <td className="py-3.5 font-semibold text-gray-900">${Number(c.precio_total).toFixed(2)}</td>
                        <td className="py-3.5"><Badge variant={estadoToVariant(c.estado)}>{c.estado}</Badge></td>
                        <td className="py-3.5">
                          {c.estado === 'pendiente' && !c.pedido ? (
                            <button onClick={() => crearPedido(c.id)} disabled={creandoPedido === c.id}
                              className="text-indigo-700 font-semibold text-xs hover:text-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                              {creandoPedido === c.id ? 'Creando...' : 'Crear Pedido →'}
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="p-6" hover>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Mis Pedidos</h2>
            </div>
            {pedidos.length === 0 ? (
              <p className="text-gray-500 text-sm py-6 text-center">No tienes pedidos aún.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold"># Pedido</th>
                      <th className="pb-3 font-semibold">Cotización</th>
                      <th className="pb-3 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Estado</th>
                      <th className="pb-3 font-semibold">Dirección</th>
                      <th className="pb-3 font-semibold">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">#{p.id}</td>
                        <td className="py-3.5 text-gray-500">#{p.cotizacion?.id}</td>
                        <td className="py-3.5 font-semibold text-gray-900">${Number(p.total).toFixed(2)}</td>
                        <td className="py-3.5"><Badge variant={estadoToVariant(p.estado)}>{p.estado}</Badge></td>
                        <td className="py-3.5 text-gray-700 max-w-[150px] truncate">{p.direccion_entrega}</td>
                        <td className="py-3.5 text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
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
