import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { INITIAL_PRODUCTS } from "@/data/products";
import { STORE_INFO } from "@/data/storeInfo";
import {
  Sparkles,
  ArrowRight,
  Wrench,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";

export default function HomePage() {
  // Select 4-8 featured products for the home preview
  const featuredProducts = INITIAL_PRODUCTS.slice(0, 8);

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Products Section */}
      <section className="py-16 sm:py-20 bg-zinc-50/50 border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Novedades & Más Vendidos</span>
              </div>
              <h2 className="font-headline font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight">
                Productos Destacados
              </h2>
              <p className="font-body text-sm sm:text-base text-zinc-600 mt-1">
                Accesorios certificados y tecnología con entrega inmediata en Rosario.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-headline font-bold text-zinc-950 hover:text-orange-600 group transition-colors self-start sm:self-auto"
            >
              <span>Explorar todo el catálogo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid of featured products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Catalog CTA */}
          <div className="text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span>Ver todos los productos ({INITIAL_PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Technical Service Feature Banner */}
      <section className="py-16 sm:py-20 bg-white border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold uppercase mb-4">
                <Wrench className="w-3.5 h-3.5" />
                <span>Laboratorio Shurian</span>
              </div>
              <h2 className="font-headline font-black text-2xl sm:text-4xl tracking-tight mb-4">
                ¿Tu celular, notebook o PC no funciona bien?
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
                En nuestro taller de Bv. Segui 1501 realizamos diagnósticos sin cargo en el acto. Cambiamos pantallas, baterías, pines de carga y hacemos service térmico completo con garantía escrita.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/servicio-tecnico"
                  className="px-6 py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-headline font-bold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Ir a Servicio Técnico & Cotizar</span>
                </Link>

                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                    "Hola Shurian! Quisiera consultar sobre el servicio técnico."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-zinc-850 hover:bg-zinc-800 text-zinc-200 hover:text-white font-headline font-semibold text-sm border border-zinc-700/60 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Physical Location Teaser */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold uppercase mb-3">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Punto Físico Oficial</span>
              </div>
              <h2 className="font-headline font-black text-2xl sm:text-3xl text-zinc-950 tracking-tight mb-2">
                Atención y Retiros en Bv. Segui 1501, Rosario
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                Vení a retirar tus compras online, comprar accesorios o traer tu equipo a reparar.
                Horarios: Lun a Vie 09:00 a 13:00 / 16:30 a 20:00 hs. Sábados 09:30 a 13:30 hs.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-xs shadow-sm transition-all"
              >
                <span>Ver Mapa y Horarios de Atención</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-orange-600 mb-2" />
                <h4 className="font-bold text-xs text-zinc-950 mb-1">Garantía Escrita</h4>
                <p className="text-[11px] text-zinc-500">Respaldamos cada trabajo realizado.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <Zap className="w-5 h-5 text-orange-600 mb-2" />
                <h4 className="font-bold text-xs text-zinc-950 mb-1">Reparación Rápida</h4>
                <p className="text-[11px] text-zinc-500">Trabajos en el día con turno previo.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <Clock className="w-5 h-5 text-orange-600 mb-2" />
                <h4 className="font-bold text-xs text-zinc-950 mb-1">Horario Extendido</h4>
                <p className="text-[11px] text-zinc-500">Mañana y tarde de lunes a viernes.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <Phone className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-xs text-zinc-950 mb-1">WhatsApp Activo</h4>
                <p className="text-[11px] text-zinc-500">Respuestas rápidas para tus dudas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
