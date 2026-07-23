'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Producto } from '@/types';

const iconMap: Record<string, string> = {
  impresion: '🖨️',
  diseno: '🎨',
  educacion: '📚',
};

const gradientMap: Record<string, string> = {
  impresion: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
  diseno: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
  educacion: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
};

const fallbackProductos: Producto[] = [
  { id: 1, nombre: 'Impresión 3D en PLA', descripcion: 'Impresión de alta calidad en filamento PLA. Ideal para prototipos, piezas mecánicas y objetos decorativos.', categoria: 'impresion', precio_base: 15, imagen_url: '' },
  { id: 2, nombre: 'Impresión 3D en Resina', descripcion: 'Impresión de alta precisión en resina UV. Perfecta para figuras detalladas, joyería y aplicaciones dentales.', categoria: 'impresion', precio_base: 25, imagen_url: '' },
  { id: 3, nombre: 'Diseño 3D Personalizado', descripcion: 'Modelado 3D personalizado según tus especificaciones. Incluye asesoría y revisiones hasta lograr el diseño deseado.', categoria: 'diseno', precio_base: 35, imagen_url: '' },
  { id: 4, nombre: 'Escaneo 3D', descripcion: 'Digitalización de objetos físicos a modelos 3D. Ideal para reverse engineering y preservación digital.', categoria: 'diseno', precio_base: 40, imagen_url: '' },
  { id: 5, nombre: 'Curso de Impresión 3D', descripcion: 'Taller práctico de introducción a la impresión 3D. Aprende desde el diseño hasta la impresión final.', categoria: 'educacion', precio_base: 50, imagen_url: '' },
];

export default function CatalogoCards() {
  const [productos, setProductos] = useState<Producto[]>(fallbackProductos);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.productos.list().then((data) => {
      if (data && data.length > 0) setProductos(data);
    }).catch(() => {}).finally(() => setLoaded(true));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((p) => (
        <div key={p.id}
          className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className={`h-44 bg-gradient-to-br ${gradientMap[p.categoria] || gradientMap.impresion} flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
            <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">{iconMap[p.categoria] || '🖨️'}</span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full">
                {p.categoria === 'impresion' ? 'Impresión' : p.categoria === 'diseno' ? 'Diseño' : 'Educación'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{p.nombre}</h3>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">{p.descripcion}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-2xl font-bold text-indigo-700">${p.precio_base.toFixed(2)}</p>
              <span className="text-xs text-gray-400">precio base</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
