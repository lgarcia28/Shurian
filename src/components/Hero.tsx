"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Zap,
  MapPin,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-minimal-dots opacity-30 pointer-events-none"></div>

      {/* Subtle Warm Amber Light Aura */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-100/40 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm hover:bg-orange-100 transition-colors"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>Local Oficial Rosario · Bv. Segui 1501</span>
            </Link>

            {/* Headline */}
            <h1 className="font-headline font-black text-4xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.12] mb-6">
              Venta de tecnología, accesorios y{" "}
              <span className="text-orange-500">
                servicio técnico especializado
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-body text-base sm:text-lg text-zinc-600 mb-8 max-w-2xl leading-relaxed">
              Expertos en reparación de celulares (iPhone, Android) y computadoras (PC Gamer, Notebooks). 
              Catálogo completo de accesorios certificados con entrega inmediata en Rosario y garantía escrita.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-zinc-950 hover:bg-orange-500 text-white font-headline font-bold text-base shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 group"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/servicio-tecnico"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-zinc-50 border border-zinc-300 hover:border-zinc-950 text-zinc-900 font-headline font-semibold text-base transition-all duration-300 group shadow-sm"
              >
                <Wrench className="w-4 h-4 group-hover:rotate-45 transition-transform text-orange-500" />
                <span>Consultar Reparación</span>
              </Link>
            </div>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-xs sm:text-sm text-zinc-700 font-medium">
                  Diagnóstico sin cargo
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-xs sm:text-sm text-zinc-700 font-medium">
                  Reparaciones en el día
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-xs sm:text-sm text-zinc-700 font-medium">
                  Garantía por escrito
                </span>
              </div>
            </div>
          </div>

          {/* Right Minimalist Card Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-white border border-zinc-200 shadow-soft-lg p-6 sm:p-8">
              
              {/* Service Cards Overview */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-sm shrink-0">
                    <img
                      src="/images/shurian-logo.jpg"
                      alt="SHURIAN Laboratorio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-zinc-950 text-base">
                      Laboratorio Técnico Shurian
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono">
                      Bv. Segui 1501 · Rosario
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  ABIERTO HOY
                </span>
              </div>

              {/* Quick service options in hero */}
              <div className="space-y-3 mb-6">
                <Link
                  href="/servicio-tecnico"
                  className="p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200/80 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500 text-white shadow-sm group-hover:scale-105 transition-transform">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                        Celulares & Tablets
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Módulos OLED, baterías, pines de carga y microelectrónica
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </Link>

                <Link
                  href="/servicio-tecnico"
                  className="p-3.5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200/80 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-950 text-white shadow-sm group-hover:scale-105 transition-transform">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                        Notebooks & PC Gamer
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Mantenimiento térmico, ampliación SSD/RAM y formateos
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </Link>
              </div>

              {/* Delivery info banner */}
              <Link
                href="/contacto"
                className="p-3.5 rounded-2xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 flex items-center gap-3 text-orange-950 transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold text-zinc-950">Retiro o Envíos:</span>{" "}
                    <span className="text-zinc-700">
                      Retiro en local por Bv. Segui 1501 o coordinamos envío por cadetería en Rosario.
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
