import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shurian.com.ar"),
  title: "SHURIAN | Tecnología, Accesorios y Servicio Técnico en Rosario",
  description:
    "Especialistas en venta de tecnología, accesorios para celulares y notebooks, y servicio técnico profesional en Rosario (Bv. Segui 1501). Diagnóstico sin cargo y reparaciones con garantía.",
  keywords: [
    "Shurian",
    "Servicio técnico Rosario",
    "Reparación celulares Rosario",
    "Accesorios para celulares",
    "Reparación PC y notebook Rosario",
    "Vidrios templados",
    "Fundas",
    "Cargadores iPhone Samsung",
    "Bv Segui 1501"
  ],
  authors: [{ name: "SHURIAN" }],
  icons: {
    icon: "/images/shurian-logo.jpg",
    apple: "/images/shurian-logo.jpg",
  },
  openGraph: {
    title: "SHURIAN | Tecnología y Servicio Técnico en Rosario",
    description:
      "Venta de accesorios, tecnología y servicio técnico especializado en celulares y computadoras. Rosario, Santa Fe.",
    type: "website",
    locale: "es_AR",
    siteName: "SHURIAN",
    images: [
      {
        url: "/images/shurian-logo.jpg",
        width: 100,
        height: 100,
        alt: "SHURIAN Servicio Técnico",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#060b17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-slate-100 font-body antialiased selection:bg-orange-500/30 selection:text-orange-300 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
