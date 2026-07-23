import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.png" alt="gio-no-mono" width={28} height={28} className="rounded" />
              <span className="font-bold text-white text-lg">gio-no-mono</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Transformamos tus ideas en realidad con impresión 3D de alta calidad y diseño personalizado. 
              Prototipado rápido, modelado 3D y fabricación digital en Ricaurte.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400 hover:text-indigo-400 transition cursor-default">Impresión 3D</span></li>
              <li><span className="text-gray-400 hover:text-indigo-400 transition cursor-default">Diseño 3D</span></li>
              <li><span className="text-gray-400 hover:text-indigo-400 transition cursor-default">Escaneo 3D</span></li>
              <li><span className="text-gray-400 hover:text-indigo-400 transition cursor-default">Cursos</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cotizador" className="text-gray-400 hover:text-indigo-400 transition">Cotizador</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-indigo-400 transition">Ingresar</Link></li>
              <li><Link href="/registro" className="text-gray-400 hover:text-indigo-400 transition">Registrarse</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} gio-no-mono. Todos los derechos reservados.</p>
          <p>Ricaurte, Molinopamba Alto — Ecuador</p>
        </div>
      </div>
    </footer>
  );
}
