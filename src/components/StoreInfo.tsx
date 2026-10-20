"use client";

import React, { useState, useEffect } from "react";
import { STORE_INFO } from "@/data/storeInfo";
import { useAdminStore } from "@/store/useAdminStore";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Navigation,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export const StoreInfo: React.FC = () => {
  const { settings } = useAdminStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hoursList = mounted
    ? [
        { days: "Lunes a Viernes", time: settings.hoursWeekdays },
        { days: "Sábados", time: settings.hoursSaturday },
        { days: "Domingos y Feriados", time: settings.hoursSunday },
      ]
    : STORE_INFO.hours;

  const currentAddress = mounted ? settings.address : STORE_INFO.address;
  const currentCity = mounted ? settings.city : STORE_INFO.city;
  const currentPhone = mounted ? settings.phoneDisplay : STORE_INFO.phoneDisplay;
  const currentWhatsapp = mounted ? settings.whatsappNumber : STORE_INFO.whatsappNumber;
  const currentInstagram = mounted ? settings.instagramUrl : STORE_INFO.instagramUrl;

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
            Estamos en {currentAddress}, {currentCity}. Vení a retirar tus compras o traé tu equipo para diagnóstico inmediato.
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
                    {currentAddress}
                  </p>
                  <p className="font-body text-zinc-500 text-xs mt-0.5">
                    {currentCity}, Argentina (Zona Sur / Centro)
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    <a
                      href={STORE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-bold hover:bg-orange-500 transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Cómo Llegar en Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours Card with Holiday Alert */}
            <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-zinc-100 text-zinc-800 border border-zinc-200 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-headline font-bold text-lg text-zinc-950">
                      Horarios de Atención
                    </h3>
                    {mounted && settings.holidayMode && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 uppercase">
                        Feriado Activo
                      </span>
                    )}
                  </div>

                  {mounted && settings.holidayMode && (
                    <div className="mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{settings.holidayMessage}</span>
                    </div>
                  )}

                  <div className="space-y-2 text-xs">
                    {hoursList.map((h, i) => (
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
                href={`https://wa.me/${currentWhatsapp}`}
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
                    {currentPhone}
                  </p>
                </div>
              </a>

              <a
                href={currentInstagram}
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
                    @shurian.pc
                  </p>
                </div>
              </a>
            </div>

          </div>

          {/* Right: Embedded Google Maps */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-zinc-200 shadow-sm relative min-h-[360px] lg:min-h-full bg-zinc-100 flex flex-col">
            <iframe
              title="Ubicación Shurian Rosario"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.5458022791884!2d-60.66532412356191!3d-32.96962387358482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab464972e293%3A0xe543fa7a7b8dfa19!2sBv.%20Jos%C3%A9%20Segu%C3%AD%201501%2C%20S2000%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1715000000000!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", flex: 1 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            
            {/* Overlay Info Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md text-white p-3.5 rounded-2xl border border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <span className="font-semibold">{currentAddress}, Rosario</span>
              </div>
              <span className="text-zinc-400 font-mono text-[11px]">Local Comercial</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
