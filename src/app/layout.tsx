import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductModal } from "@/components/ProductModal";
import { RepairWizardModal } from "@/components/RepairWizardModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

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
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-zinc-900 font-body antialiased selection:bg-orange-500/20 selection:text-orange-600 min-h-screen flex flex-col">
        {/* Global Black Header */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Modals & Overlays */}
        <CartDrawer />
        <ProductModal />
        <RepairWizardModal />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
