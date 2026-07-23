'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Usuario } from '@/types';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function PerfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.auth.profile().then(setUser).catch(() => router.push('/login')).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-indigo-600 border-t-transparent" />
    </div>
  );

  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-500 mb-8">Información de tu cuenta</p>

        {user && (
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-700">{user.nombre.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.nombre}</h2>
                <p className="text-sm text-gray-500 capitalize">{user.rol}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                  <p className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">{user.nombre}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <p className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                  <p className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">{user.telefono}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Rol</label>
                  <p className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 capitalize">{user.rol}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de registro</label>
                <p className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
              <Button variant="secondary" onClick={() => router.push('/dashboard')}>Volver al Dashboard</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
