import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizador Online",
  description: "Solicita una cotización automática para impresión 3D. Elige material, calidad y cantidad.",
};

export default function CotizadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
