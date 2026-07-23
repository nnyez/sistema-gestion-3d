import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "gio-no-mono | Impresión 3D y Diseño 3D",
    template: "%s | gio-no-mono",
  },
  description: "Impresión 3D, diseño 3D y fabricación digital en Ricaurte. Transformamos tus ideas en realidad con prototipado rápido y modelado 3D personalizado.",
  keywords: ["impresión 3D", "diseño 3D", "prototipado rápido", "Ricaurte", "fabricación digital", "PLA", "resina"],
  openGraph: {
    title: "gio-no-mono | Impresión 3D y Diseño 3D",
    description: "Transformamos tus ideas en realidad. Prototipado rápido, modelado 3D y fabricación digital.",
    type: "website",
    locale: "es_EC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "gio-no-mono",
    description: "Impresión 3D, diseño 3D y fabricación digital",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ricaurte",
      addressRegion: "Molinopamba Alto",
      addressCountry: "EC",
    },
    url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  };

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 pt-16">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
