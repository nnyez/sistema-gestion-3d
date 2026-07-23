'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.auth.login({ email, password });
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('userName', res.usuario.nombre);
      localStorage.setItem('userRol', res.usuario.rol);
      localStorage.setItem('userId', res.usuario.id.toString());
      router.push(res.usuario.rol === 'admin' ? '/admin' : '/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-1 flex items-center justify-center py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-3xl" />

      <Card glass className="relative p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido de vuelta</h1>
          <p className="text-gray-500 mt-1">Ingresa a tu cuenta de gio-no-mono</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4 text-sm flex items-center gap-2" role="alert">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Correo electrónico" type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" />
          <Input label="Contraseña" type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Ingresar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-indigo-700 font-semibold hover:text-indigo-600 transition">Registrarse</Link>
        </p>

        <div className="mt-6 p-4 bg-gray-50/70 border border-gray-100 rounded-xl text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-gray-700 mb-1.5">Usuarios de prueba:</p>
          <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Admin: admin@gionomono.com / admin123</p>
          <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Cliente: cliente@demo.com / cliente123</p>
        </div>
      </Card>
    </div>
  );
}
