'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { Usuario } from '@/types';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminClientesPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rol = localStorage.getItem('userRol');
    if (!localStorage.getItem('token') || rol !== 'admin') { router.push('/login'); return; }
    api.clientes.list().then(setClientes).catch(() => {}).finally(() => setLoading(false));
  }, []);

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
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
              <p className="text-gray-500 mt-1">{clientes.length} clientes registrados</p>
            </div>
            <Link href="/admin" className="text-indigo-700 font-semibold hover:text-indigo-600 transition text-sm">← Volver al Admin</Link>
          </div>

          <Card className="p-6" hover>
            {clientes.length === 0 ? (
              <p className="text-gray-500 text-sm py-6 text-center">No hay clientes registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm table-modern">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-semibold">#</th>
                      <th className="pb-3 font-semibold">Nombre</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Teléfono</th>
                      <th className="pb-3 font-semibold">Rol</th>
                      <th className="pb-3 font-semibold">Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((c) => (
                      <tr key={c.id} className="border-b border-gray-50 transition-colors">
                        <td className="py-3.5 font-medium text-gray-900">{c.id}</td>
                        <td className="py-3.5 text-gray-900 font-medium">{c.nombre}</td>
                        <td className="py-3.5 text-gray-700">{c.email}</td>
                        <td className="py-3.5 text-gray-700">{c.telefono}</td>
                        <td className="py-3.5"><Badge variant={c.rol === 'admin' ? 'danger' : 'info'}>{c.rol}</Badge></td>
                        <td className="py-3.5 text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
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
