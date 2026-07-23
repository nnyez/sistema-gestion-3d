'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const res = await api.auth.register({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        password: form.password,
      });
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('userName', res.usuario.nombre);
      localStorage.setItem('userRol', res.usuario.rol);
      localStorage.setItem('userId', res.usuario.id.toString());
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="relative flex-1 flex items-center justify-center py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      <div className="absolute top-20 right-10 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl" />

      <Card glass className="relative p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
          <p className="text-gray-500 mt-1">Regístrate para solicitar cotizaciones</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4 text-sm flex items-center gap-2" role="alert">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nombre completo" type="text" required value={form.nombre}
            onChange={(e) => updateField('nombre', e.target.value)} placeholder="Juan Pérez" />
          <Input label="Correo electrónico" type="email" required value={form.email}
            onChange={(e) => updateField('email', e.target.value)} placeholder="correo@ejemplo.com" />
          <Input label="Teléfono" type="tel" required value={form.telefono}
            onChange={(e) => updateField('telefono', e.target.value)} placeholder="0999999999" />
          <Input label="Contraseña" type="password" required value={form.password}
            onChange={(e) => updateField('password', e.target.value)} placeholder="Mínimo 6 caracteres" />
          <Input label="Confirmar contraseña" type="password" required value={form.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)} placeholder="Repite la contraseña" />

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Crear Cuenta
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-indigo-700 font-semibold hover:text-indigo-600 transition">Inicia sesión</Link>
        </p>
      </Card>
    </div>
  );
}
