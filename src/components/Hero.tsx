"use client";

import React from "react";
import { useCartStore } from "@/store/useCartStore";
import {
  ArrowRight,
  Wrench,
  ShieldCheck,
  Zap,
  MapPin,
  Cpu,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export const Hero: React.FC = () => {
  const { openRepairModal } = useCartStore();

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById("catalogo");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Glows and Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-40 pointer-events-none"></div>
      
      {/* Top Orange & Navy Light Flares */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-orange-500/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-48 right-10 w-[350px] h-[350px] bg-blue-700/15 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-glow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>Local Oficial Rosario · Bv. Segui 1501</span>
            </div>

            {/* Headline */}
            <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] mb-6">
              Venta de tecnología, accesorios y{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 text-glow-orange">
                servicio técnico especializado
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-body text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Expertos en reparación de celulares (iPhone, Android) y computadoras (PC Gamer, Notebooks). 
              Catálogo completo de accesorios certificados con entrega inmediata en Rosario y garantía escrita.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-[#060b17] font-headline font-bold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 active:scale-95 group"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={openRepairModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl glass-panel hover:bg-orange-500/10 border border-orange-500/30 hover:border-orange-500 text-orange-300 font-headline font-semibold text-base transition-all duration-300 group"
              >
                <Wrench className="w-5 h-5 group-hover:rotate-45 transition-transform text-orange-400" />
                <span>Consultar Reparación</span>
              </button>
            </div>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Diagnóstico sin cargo
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Reparaciones en el día
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Garantía por escrito
                </span>
              </div>
            </div>
          </div>

          {/* Right Bento / Interactive Card Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl glass-panel-orange p-6 sm:p-8 overflow-hidden">
              
              {/* Internal Orange Glow Effect */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Service Cards Overview */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-orange-500/40 shadow-glow-sm shrink-0">
                    <img
                      src="/images/shurian-logo.jpg"
                      alt="SHURIAN Laboratorio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-white text-base">
                      Laboratorio Técnico Shurian
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">
                      Bv. Segui 1501 · Rosario
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ABIERTO HOY
                </span>
              </div>

              {/* Quick service options in hero */}
              <div className="space-y-3 mb-6">
                <div
                  onClick={openRepairModal}
                  className="p-3.5 rounded-xl bg-navy-850/80 hover:bg-navy-800 border border-white/5 hover:border-orange-500/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/15 text-orange-400 group-hover:scale-105 transition-transform">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        Celulares & Tablets
                      </h3>
                      <p className="text-xs text-slate-400">
                        Módulos OLED, baterías, pines de carga y microelectrónica
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-orange-400 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>

                <div
                  onClick={openRepairModal}
                  className="p-3.5 rounded-xl bg-navy-850/80 hover:bg-navy-800 border border-white/5 hover:border-orange-500/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600/15 text-blue-400 group-hover:scale-105 transition-transform">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        Notebooks & PC Gamer
                      </h3>
                      <p className="text-xs text-slate-400">
                        Mantenimiento térmico, ampliación SSD/RAM y formateos
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-orange-400 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>

              {/* Delivery info banner */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-950/40 to-navy-900/60 border border-orange-500/30 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-white">Retiro o Envíos:</span>{" "}
                  <span className="text-slate-300">
                    Retiro en local por Bv. Segui 1501 o coordinamos envío por cadetería en Rosario.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
