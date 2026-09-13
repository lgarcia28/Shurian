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
    <section id="ubicacion" className="py-16 md:py-24 bg-zinc-50/60 border-t border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Punto Físico & Taller</span>
          </div>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight">
            Visítanos en nuestro local en Rosario
          </h2>
          <p className="font-body text-sm sm:text-base text-zinc-600 mt-2">
            Estamos en {STORE_INFO.address}, Rosario. Vení a retirar tus compras o traé tu equipo para diagnóstico inmediato.
          </p>
        </div>

        {/* Info Grid + Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact, Address, & Hours Cards */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-zinc-950 mb-1">
                    Dirección Física
                  </h3>
                  <p className="font-body text-zinc-900 text-sm font-semibold">
                    {STORE_INFO.address}
                  </p>
                  <p className="font-body text-zinc-500 text-xs mt-0.5">
                    {STORE_INFO.city}, {STORE_INFO.country} (Zona Sur / Centro)
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    <a
                      href={STORE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-bold hover:bg-orange-500 transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5 text-orange-400" />
                      <span>Cómo llegar en Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-zinc-100 text-zinc-800 border border-zinc-200 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h3 className="font-headline font-bold text-lg text-zinc-950 mb-2">
                    Horarios de Atención
                  </h3>
                  <div className="space-y-2 text-xs">
                    {STORE_INFO.hours.map((h, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-1 border-b border-zinc-100 last:border-0"
                      >
                        <span className="text-zinc-600 font-medium">{h.days}:</span>
                        <span className="font-mono text-zinc-950 font-bold">
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
                className="p-4 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 shadow-sm transition-all flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
                    WhatsApp Directo
                  </span>
                  <p className="font-mono font-bold text-sm text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {STORE_INFO.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 shadow-sm transition-all flex items-center gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold">
                    Instagram Oficial
                  </span>
                  <p className="font-mono font-bold text-sm text-zinc-900 group-hover:text-orange-600 transition-colors">
                    {STORE_INFO.instagramHandle}
                  </p>
                </div>
              </a>
            </div>

          </div>

          {/* Right: Clean Embedded Google Map */}
          <div className="lg:col-span-6 flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
            <div className="relative w-full h-72 sm:h-80 bg-zinc-100">
              <iframe
                title="Ubicación Shurian Rosario"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.886472654388!2d-60.66249592358897!3d-32.977797773580544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab478f7e7f6f%3A0x8e8eb4b711583ff!2sBv.+Jos%C3%A9+Segui+1501%2C+S2000+Rosario%2C+Santa+Fe!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="p-5 bg-white flex-1 flex flex-col justify-center border-t border-zinc-100">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-zinc-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Estacionamiento en la zona</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cobro con QR y Transferencia</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Colocación de vidrios sin cargo</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
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
