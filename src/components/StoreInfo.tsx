"use client";

import React from "react";
import { STORE_INFO } from "@/data/storeInfo";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Navigation,
  CheckCircle,
} from "lucide-react";

export const StoreInfo: React.FC = () => {
  return (
    <section id="ubicacion" className="py-16 md:py-24 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Punto Físico & Taller</span>
          </div>
          <h2 className="font-headline font-black text-2xl sm:text-4xl text-white tracking-tight">
            Visítanos en nuestro local en Rosario
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-400 mt-2">
            Estamos en {STORE_INFO.address}, Rosario. Vení a retirar tus compras o traé tu equipo para diagnóstico inmediato.
          </p>
        </div>

        {/* Info Grid + Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact, Address, & Hours Cards */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl glass-panel-orange border border-orange-500/25 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-white mb-1">
                    Dirección Física
                  </h3>
                  <p className="font-body text-slate-200 text-sm font-semibold">
                    {STORE_INFO.address}
                  </p>
                  <p className="font-body text-slate-400 text-xs mt-0.5">
                    {STORE_INFO.city}, {STORE_INFO.country} (Zona Sur / Centro)
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={STORE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 text-black text-xs font-bold hover:bg-orange-400 transition-colors shadow-glow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Cómo llegar en Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-navy-800 text-orange-400 border border-orange-500/30 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h3 className="font-headline font-bold text-lg text-white mb-2">
                    Horarios de Atención
                  </h3>
                  <div className="space-y-2 text-xs">
                    {STORE_INFO.hours.map((h, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-1 border-b border-white/5 last:border-0"
                      >
                        <span className="text-slate-400 font-medium">{h.days}:</span>
                        <span className="font-mono text-orange-400 font-semibold">
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel hover:glass-panel-orange transition-all border border-white/10 flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    WhatsApp Directo
                  </span>
                  <p className="font-mono font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                    {STORE_INFO.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel hover:glass-panel-orange transition-all border border-white/10 flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase">
                    Instagram Oficial
                  </span>
                  <p className="font-mono font-bold text-sm text-white group-hover:text-orange-400 transition-colors">
                    {STORE_INFO.instagramHandle}
                  </p>
                </div>
              </a>
            </div>

          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-6 flex flex-col h-full rounded-2xl overflow-hidden glass-panel border border-white/10">
            <div className="relative w-full h-72 sm:h-80 bg-navy-950">
              <iframe
                title="Ubicación Shurian Rosario"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.886472654388!2d-60.66249592358897!3d-32.977797773580544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab478f7e7f6f%3A0x8e8eb4b711583ff!2sBv.+Jos%C3%A9+Segui+1501%2C+S2000+Rosario%2C+Santa+Fe!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-85 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>

            <div className="p-5 bg-[#060b17]/90 backdrop-blur-md flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Estacionamiento en la zona</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Cobro con QR y Transferencia</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Colocación de vidrios sin cargo</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Presupuestos en el acto</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
