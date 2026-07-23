import CatalogoCards from '@/components/CatalogoCards';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl float-anim" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-anim-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl float-anim-slow" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-32 md:py-40">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm text-indigo-200 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Impresión 3D profesional en Ecuador
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1]">
                De la idea al
                <span className="gradient-text"> objeto </span>
                en tus manos
              </h1>
              <p className="text-xl md:text-2xl mt-6 text-gray-300 leading-relaxed max-w-2xl">
                Transformamos tus ideas en realidad con impresión 3D de alta precisión, 
                modelado personalizado y fabricación digital en Ricaurte.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <a href="/cotizador"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25 glow-indigo">
                  Cotiza Ahora
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#servicios"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 transition backdrop-blur-sm">
                  Ver Servicios
                </a>
              </div>
              <div className="flex items-center gap-6 mt-12 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Entrega rápida
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Alta precisión
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Atención personalizada
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 md:py-28 bg-gray-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-indigo-600 font-semibold text-sm tracking-widest uppercase">Servicios</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
                Soluciones 3D completas
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                Ofrecemos servicios profesionales de impresión 3D y diseño para particulares, 
                empresas e instituciones educativas.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <CatalogoCards />
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dots" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <FadeIn>
            <span className="text-indigo-600 font-semibold text-sm tracking-widest uppercase">¿Por qué nosotros?</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Tecnología y dedicación
            </h2>
            <p className="text-gray-500 mb-16 max-w-2xl mx-auto text-lg">
              En gio-no-mono combinamos tecnología de punta con atención personalizada en cada proyecto.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Precisión', desc: 'Impresiones de alta calidad con tolerancias milimétricas y acabados profesionales.' },
              { icon: '⚡', title: 'Rapidez', desc: 'Prototipado rápido con tiempos de entrega competitivos sin sacrificar calidad.' },
              { icon: '🤝', title: 'Atención Personalizada', desc: 'Asesoría en cada proyecto, desde el diseño hasta el producto final.' },
            ].map((item) => (
              <FadeIn key={item.title}>
                <div className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-5">{item.title}</h3>
                  <p className="text-gray-500 mt-3 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
              Solicita una cotización gratuita para tu proyecto de impresión 3D y descubre lo que podemos crear juntos.
            </p>
            <a href="/cotizador"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition shadow-2xl text-lg">
              Solicitar Cotización
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
