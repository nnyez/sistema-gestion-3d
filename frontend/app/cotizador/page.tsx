'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import Button from '@/components/Button';
import Card from '@/components/Card';

const MATERIALES = [
  { id: 'PLA', label: 'PLA', price: '$0.05/cc', desc: 'Ideal para prototipos y piezas mecánicas', color: 'from-indigo-500/20 to-purple-500/20' },
  { id: 'ABS', label: 'ABS', price: '$0.07/cc', desc: 'Resistente para aplicaciones funcionales', color: 'from-emerald-500/20 to-teal-500/20' },
  { id: 'Resina', label: 'Resina', price: '$0.12/cc', desc: 'Alta precisión para detalles finos', color: 'from-amber-500/20 to-orange-500/20' },
];

const CALIDADES = [
  { id: 'Baja', label: 'Baja', multiplier: '1.0x', desc: 'Borrador rápido' },
  { id: 'Media', label: 'Media', multiplier: '1.3x', desc: 'Balance calidad/tiempo' },
  { id: 'Alta', label: 'Alta', multiplier: '1.7x', desc: 'Máximo detalle' },
];

export default function CotizadorPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [material, setMaterial] = useState('PLA');
  const [calidad, setCalidad] = useState('Media');
  const [cantidad, setCantidad] = useState(1);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'result'>('form');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.cotizaciones.create({ material, calidad, cantidad });
      setResultado(res);
      setStep('result');
    } catch (err: any) {
      setError(err.message || 'Error al generar cotización');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Card className="p-10 max-w-md text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso requerido</h1>
          <p className="text-gray-500 mb-6">Debes iniciar sesión para usar el cotizador.</p>
          <Button onClick={() => router.push('/login')}>Iniciar Sesión</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cotizador Online</h1>
          <p className="text-gray-500 mt-1">Completa los datos para recibir una cotización automática.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm flex items-center gap-2" role="alert">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {error}
          </div>
        )}

        {step === 'form' ? (
          <Card className="p-8" hover>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Archivo 3D (STL/OBJ)</label>
                <div onClick={() => document.getElementById('file-input')?.click()} className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-indigo-400 transition cursor-pointer bg-gray-50/50">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">Arrastra tu archivo o haz clic para seleccionar</p>
                  <p className="text-xs text-gray-400 mt-1">Formatos: STL, OBJ, 3MF (simulado)</p>
                  <input type="file" id="file-input" accept=".stl,.obj,.3mf" className="hidden" onChange={(e) => setArchivo(e.target.files?.[0] || null)} />
                </div>
                {archivo && (
                  <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {archivo.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {MATERIALES.map((m) => (
                    <button key={m.id} type="button" onClick={() => setMaterial(m.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${material === m.id ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'}`}>
                      <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${m.color} mb-2`} />
                      <p className="font-bold text-gray-900 text-sm">{m.label}</p>
                      <p className="text-xs text-indigo-600 font-medium">{m.price}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Calidad</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {CALIDADES.map((c) => (
                    <button key={c.id} type="button" onClick={() => setCalidad(c.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${calidad === c.id ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm'}`}>
                      <p className="font-bold text-gray-900 text-sm">{c.label}</p>
                      <p className="text-xs text-indigo-600 font-medium">{c.multiplier}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cantidad de unidades</label>
                <input type="number" min={1} max={100} value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-32 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white" />
              </div>

              <Button type="submit" loading={loading} className="w-full" size="lg">
                {loading ? 'Calculando...' : 'Generar Cotización'}
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="p-8" hover>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Cotización Generada</h2>
              <p className="text-gray-500">Cotización #{resultado.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Material', value: resultado.material },
                { label: 'Calidad', value: resultado.calidad },
                { label: 'Cantidad', value: `${resultado.cantidad} unidad(es)` },
                { label: 'Volumen estimado', value: `${resultado.volumen_cc} cc` },
                { label: 'Tiempo estimado', value: `${resultado.tiempo_estimado_h} horas` },
                { label: 'Estado', value: resultado.estado, highlight: true },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50/70 border border-gray-100 p-4 rounded-xl">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                  <p className={`font-semibold mt-1 ${item.highlight ? 'text-amber-600 capitalize' : 'text-gray-900'}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="text-center mb-6 py-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total</p>
              <p className="text-5xl font-bold text-indigo-700 mt-1">${Number(resultado.precio_total).toFixed(2)}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setStep('form'); setResultado(null); }}
                className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition">
                Nueva Cotización
              </button>
              <Link href="/dashboard"
                className="flex-1 bg-indigo-700 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-600 transition text-center block shadow-md">
                Ir a Mis Cotizaciones
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
