'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { InventarioItem } from '@/types';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminInventarioPage() {
  const router = useRouter();
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const rol = localStorage.getItem('userRol');
    if (!localStorage.getItem('token') || rol !== 'admin') { router.push('/login'); return; }
    api.inventario.list().then(setInventario).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateStock = async (id: number, cantidad_stock: number) => {
    try {
      await api.inventario.updateStock(id, cantidad_stock);
      setInventario(await api.inventario.list());
    } catch (err: any) {
      alert(err.message || 'Error al actualizar stock');
    }
  };

  const debouncedUpdate = (id: number, cantidad_stock: number) => {
    if (debounceRef.current[id]) clearTimeout(debounceRef.current[id]);
    debounceRef.current[id] = setTimeout(() => updateStock(id, cantidad_stock), 500);
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
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Inventario</h1>
              <p className="text-gray-500 mt-1">Control de insumos y materias primas</p>
            </div>
            <Link href="/admin" className="text-indigo-700 font-semibold hover:text-indigo-600 transition text-sm">← Volver al Admin</Link>
          </div>

          <Card className="p-6" hover>
            {inventario.length === 0 ? (
              <p className="text-gray-500 text-sm py-6 text-center">No hay insumos registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold">Insumo</th>
                      <th className="pb-3 font-semibold">Stock Actual</th>
                      <th className="pb-3 font-semibold">Stock Mínimo</th>
                      <th className="pb-3 font-semibold">Precio Unitario</th>
                      <th className="pb-3 font-semibold">Proveedor</th>
                      <th className="pb-3 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventario.map((item) => (
                      <tr key={item.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">{item.tipo_insumo}</td>
                        <td className="py-3.5">
                          <input type="number" value={item.cantidad_stock} min={0}
                            onChange={(e) => debouncedUpdate(item.id, Number(e.target.value))}
                            className="w-20 px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                        </td>
                        <td className="py-3.5 text-gray-700">{item.stock_minimo}</td>
                        <td className="py-3.5 text-gray-900 font-medium">${Number(item.precio_unitario).toFixed(2)}</td>
                        <td className="py-3.5 text-gray-700">{item.proveedor}</td>
                        <td className="py-3.5">
                          {item.cantidad_stock <= item.stock_minimo ? (
                            <Badge variant="danger">Stock bajo</Badge>
                          ) : (
                            <Badge variant="success">Stock suficiente</Badge>
                          )}
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
