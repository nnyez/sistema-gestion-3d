'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userRol, setUserRol] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('userName');
    const r = localStorage.getItem('userRol');
    setToken(t);
    if (u) setUserName(u);
    if (r) setUserRol(r);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRol');
    localStorage.removeItem('userId');
    router.push('/');
    router.refresh();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
        : 'bg-white/70 backdrop-blur-md border-b border-gray-100/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="gio-no-mono" width={36} height={36} className="rounded-lg" />
            <span className="font-bold text-xl text-gray-800">gio-no-mono</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/#servicios">Servicios</NavLink>
            <NavLink href="/galeria">Galería</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
            {token ? (
              <>
                <NavLink href="/cotizador">Cotizador</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/perfil">Perfil</NavLink>
                {userRol === 'admin' && <NavLink href="/admin">Admin</NavLink>}
                <span className="text-sm text-gray-300 mx-2">|</span>
                <span className="text-sm text-gray-600">{userName}</span>
                <button onClick={logout}
                  className="ml-3 px-4 py-1.5 rounded-lg font-medium text-sm bg-indigo-700 text-white hover:bg-indigo-600 transition shadow-md shadow-indigo-700/20">
                  Salir
                </button>
              </>
            ) : (
              <>
                <NavLink href="/login">Ingresar</NavLink>
                <Link href="/registro"
                  className="ml-3 px-5 py-1.5 rounded-lg font-medium text-sm bg-indigo-700 text-white hover:bg-indigo-600 transition shadow-md shadow-indigo-700/20">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2 rounded-xl p-4 mb-2 bg-white/95 backdrop-blur-md border border-gray-100">
            <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>Inicio</MobileNavLink>
            <MobileNavLink href="/#servicios" onClick={() => setMenuOpen(false)}>Servicios</MobileNavLink>
            <MobileNavLink href="/galeria" onClick={() => setMenuOpen(false)}>Galería</MobileNavLink>
            <MobileNavLink href="/contacto" onClick={() => setMenuOpen(false)}>Contacto</MobileNavLink>
            {token ? (
              <>
                <MobileNavLink href="/cotizador" onClick={() => setMenuOpen(false)}>Cotizador</MobileNavLink>
                <MobileNavLink href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</MobileNavLink>
                <MobileNavLink href="/perfil" onClick={() => setMenuOpen(false)}>Perfil</MobileNavLink>
                {userRol === 'admin' && <MobileNavLink href="/admin" onClick={() => setMenuOpen(false)}>Admin</MobileNavLink>}
                <button onClick={() => { logout(); setMenuOpen(false); }}
                  className="text-left text-indigo-700 font-medium py-2">Salir</button>
              </>
            ) : (
              <>
                <MobileNavLink href="/login" onClick={() => setMenuOpen(false)}>Ingresar</MobileNavLink>
                <MobileNavLink href="/registro" onClick={() => setMenuOpen(false)}>Registrarse</MobileNavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href}
      className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: string }) {
  return (
    <Link href={href} onClick={onClick}
      className="text-gray-700 hover:text-indigo-700 font-medium py-2 px-2 rounded-lg hover:bg-indigo-50 transition">
      {children}
    </Link>
  );
}
