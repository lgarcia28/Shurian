"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminStore } from "@/store/useAdminStore";
import {
  ArrowRight,
  Wrench,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  Code2,
  Globe,
  ShoppingCart,
  Cpu,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const Hero: React.FC = () => {
  const { settings } = useAdminStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
      {/* Background Gradient & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f1f23_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Presentation */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {mounted && settings.holidayMode && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold shadow-xl text-left">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold block text-amber-300 uppercase font-mono text-[10px] tracking-wider">
                  Aviso Especial de Atención / Feriado
                </span>
                <span>{settings.holidayMessage}</span>
              </div>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Bienvenido a Shurian</span>
          </div>

          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-4">
            ¿Qué estás <span className="text-orange-500">buscando hoy?</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Elegí el servicio que necesitás o explorá nuestras soluciones tecnológicas en Rosario.
          </p>
        </div>

        {/* 3 Portal Windows / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-14">
          
          {/* Card 1: Catálogo */}
          <Link
            href="/catalogo"
            className="group flex flex-col rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/80 transition-all duration-300 shadow-xl hover:shadow-glow-orange hover:-translate-y-1.5 overflow-hidden"
          >
            {/* Image Header */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-800">
              <Image
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
                alt="Catálogo de Productos Shurian"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-700/60 text-orange-400 text-xs font-mono font-bold uppercase shadow-sm">
                <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
                <span>Tienda Online</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <h2 className="font-headline font-black text-2xl text-white group-hover:text-orange-400 transition-colors mb-2">
                  Catálogo
                </h2>
                <p className="font-body text-sm text-zinc-300 leading-relaxed mb-5">
                  Accesorios certificados, tecnología, periféricos gamer y componentes con stock y entrega inmediata en Rosario.
                </p>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                    Entrega en Rosario
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                    Periféricos & Audio
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                    Garantía Escrita
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="w-full py-3.5 px-5 rounded-2xl bg-zinc-800 group-hover:bg-orange-500 text-white font-headline font-bold text-sm flex items-center justify-between transition-all duration-300 shadow-sm">
                  <span>Ver Catálogo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Servicio Técnico */}
          <Link
            href="/servicio-tecnico"
            className="group flex flex-col rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/80 transition-all duration-300 shadow-xl hover:shadow-glow-orange hover:-translate-y-1.5 overflow-hidden"
          >
            {/* Image Header */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-800">
              <Image
                src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop"
                alt="Laboratorio de Servicio Técnico Shurian"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-700/60 text-orange-400 text-xs font-mono font-bold uppercase shadow-sm">
                <Wrench className="w-3.5 h-3.5 text-orange-400" />
                <span>Laboratorio Especializado</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <h2 className="font-headline font-black text-2xl text-white group-hover:text-orange-400 transition-colors mb-2">
                  Servicio Técnico
                </h2>
                <p className="font-body text-sm text-zinc-300 leading-relaxed mb-5">
                  Reparación experta de celulares (iPhone y Android), Notebooks y PCs. Diagnóstico sin cargo en el acto y garantía por escrito.
                </p>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                    iPhone & Android
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
                    Notebooks & PC Gamer
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                    Diagnóstico Sin Cargo
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="w-full py-3.5 px-5 rounded-2xl bg-zinc-800 group-hover:bg-orange-500 text-white font-headline font-bold text-sm flex items-center justify-between transition-all duration-300 shadow-sm">
                  <span>Consultar Reparación</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: Shurian Labs */}
          <a
            href="https://www.shurianlabs.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-3xl bg-zinc-900/90 border border-orange-500/30 hover:border-orange-500 transition-all duration-300 shadow-xl hover:shadow-glow-orange hover:-translate-y-1.5 overflow-hidden relative"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Image Header */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-800">
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                alt="Shurian Labs Desarrollo de Software"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-orange-500/40 text-orange-400 text-xs font-mono font-bold uppercase shadow-sm">
                <Code2 className="w-3.5 h-3.5 text-orange-400" />
                <span>Software & Desarrollo</span>
              </div>

              {/* External Link Pill */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700 text-zinc-300 group-hover:text-orange-400 group-hover:border-orange-500 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card Content */}
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-headline font-black text-2xl text-white group-hover:text-orange-400 transition-colors">
                    Shurian Labs
                  </h2>
                </div>

                {/* Highlighted Services Box */}
                <div className="mb-4 p-3.5 rounded-2xl bg-zinc-950/80 border border-orange-500/30">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-orange-400 font-bold mb-2">
                    Servicios Especializados:
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Globe className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Páginas Web</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <ShoppingCart className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Tiendas Online</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Cpu className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Sistemas a Medida</span>
                    </div>
                  </div>
                </div>

                <p className="font-body text-xs text-zinc-400 leading-relaxed mb-4">
                  Ingeniería y soluciones digitales profesionales para impulsar y modernizar tu negocio.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="w-full py-3.5 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-headline font-bold text-sm flex items-center justify-between transition-all duration-300 shadow-md">
                  <span>Ir a shurianlabs.com.ar</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </a>

        </div>

        {/* Bottom Trust Indicators Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-zinc-850">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-500 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Diagnóstico en el acto</p>
              <p className="text-[11px] text-zinc-400">Sin cargo ni compromiso</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-500 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Garantía Escrita</p>
              <p className="text-[11px] text-zinc-400">En repuestos y services</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-500 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Local en Rosario</p>
              <p className="text-[11px] text-zinc-400">Bv. Segui 1501</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-500 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Entrega Inmediata</p>
              <p className="text-[11px] text-zinc-400">Retiro o cadetería local</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
