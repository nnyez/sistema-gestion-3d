'use client';

import Image from 'next/image';
import Card from '@/components/Card';

const TRABAJOS = [
  { titulo: 'Soporte para drones', desc: 'Pieza estructural ligera en PLA', material: 'PLA', color: 'Negro', imagen: null },
  { titulo: 'Prototipo de engranaje', desc: 'Engranaje helicoidal para maquinaria', material: 'ABS', color: 'Blanco', imagen: null },
  { titulo: 'Figura decorativa', desc: 'Estatua personalizada en resina', material: 'Resina', color: 'Gris', imagen: null },
  { titulo: 'Carcasa para electrónica', desc: 'Gabinete a medida para PCB', material: 'PLA', color: 'Azul', imagen: null },
  { titulo: 'Molde de inyección', desc: 'Molde prototipo para pruebas', material: 'ABS', color: 'Naranja', imagen: null },
  { titulo: 'Maqueta arquitectónica', desc: 'Modelo a escala de edificio', material: 'PLA', color: 'Blanco', imagen: null },
];

export default function GaleriaPage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Galería de Trabajos</h1>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Algunos de los proyectos que hemos realizado para nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRABAJOS.map((t, i) => (
            <Card key={i} hover className="p-0 overflow-hidden group">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-indigo-300 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="12 15.5 12 22 22 15.5 22 8.5"/><polyline points="2 8.5 2 15.5 12 22"/>
                </svg>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg">{t.titulo}</h3>
                <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">{t.material}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{t.color}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
