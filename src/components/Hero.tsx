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
          {/* Holiday Alert Card if active */}
          {mounted && settings.holidayMode && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold shadow-xl text-left animate-in fade-in">
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
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
              <img
                src="/images/catalogo-bg.png"
                alt="Catálogo y Repuestos Shurian"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                  DISPONIBILIDAD INMEDIATA
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-2xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Catálogo & Repuestos
                </h3>
                <p className="font-body text-sm text-zinc-400 leading-relaxed">
                  Explorá accesorios para celulares, periféricos, memorias, fuentes, almacenamiento y componentes informáticos con garantía.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-sm font-semibold text-orange-400">
                <span>Ver productos disponibles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 2: Servicio Técnico */}
          <Link
            href="/servicio-tecnico"
            className="group flex flex-col rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/80 transition-all duration-300 shadow-xl hover:shadow-glow-orange hover:-translate-y-1.5 overflow-hidden"
          >
            {/* Image Header */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
              <img
                src="/images/taller-bg.png"
                alt="Laboratorio Servicio Técnico Shurian"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                  LABORATORIO PROPIO
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-2xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Servicio Técnico
                </h3>
                <p className="font-body text-sm text-zinc-400 leading-relaxed">
                  Reparación experta de celulares, notebooks, computadoras y consolas en Rosario. Diagnóstico sin cargo y reparaciones express.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-sm font-semibold text-orange-400">
                <span>Cotizar reparación online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 3: Software / Web Solutions (New Portal Window) */}
          <div className="group flex flex-col rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/80 transition-all duration-300 shadow-xl hover:shadow-glow-orange hover:-translate-y-1.5 overflow-hidden md:col-span-2 lg:col-span-1">
            {/* Image Header */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
              <img
                src="/images/software-bg.png"
                alt="Desarrollo Web y Software Shurian"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md">
                  SOLUCIONES DIGITALES
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-2xl text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Desarrollo & Sistemas
                </h3>
                <p className="font-body text-sm text-zinc-400 leading-relaxed">
                  Creamos páginas web, tiendas online y sistemas de gestión a medida para potenciar negocios, comercios y profesionales.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-sm font-semibold text-blue-400">
                <a
                  href={`https://wa.me/${settings.whatsappNumber || "5493417551501"}?text=${encodeURIComponent("Hola Shurian! Me interesa consultar por desarrollo web o sistemas de software.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full hover:underline"
                >
                  <span>Consultar por proyectos</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-zinc-850/80 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Garantía Escrita</p>
              <p className="text-zinc-400 text-[11px]">En todos los trabajos</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Reparación en el Día</p>
              <p className="text-zinc-400 text-[11px]">Servicio express</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Bv. Segui 1501</p>
              <p className="text-zinc-400 text-[11px]">Rosario, Santa Fe</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Diagnóstico Gratis</p>
              <p className="text-zinc-400 text-[11px]">Sin compromiso</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
