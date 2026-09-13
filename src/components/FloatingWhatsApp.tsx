"use client";

import React, { useState } from "react";
import {
  SHURIAN_WHATSAPP_NUMBER,
  SHURIAN_INSTAGRAM,
} from "@/utils/whatsapp";
import { X } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Small popover tooltip above WhatsApp */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-zinc-200 text-xs shadow-soft-lg animate-in fade-in slide-in-from-bottom-2 duration-300 text-zinc-800">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span>
            ¿Dudas con una reparación o producto?{" "}
            <strong className="text-orange-600 font-bold">¡Escribinos!</strong>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-zinc-900 ml-1 p-0.5"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Action Buttons Stack */}
      <div className="flex flex-col items-center gap-2.5">
        {/* 1. Instagram Floating Button */}
        <a
          href={SHURIAN_INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ir al Instagram de Shurian (@shurian.pc)"
          title="Seguinos en Instagram @shurian.pc"
          className="group relative p-3 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white"
        >
          {/* Official Instagram SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-none stroke-white stroke-[2] stroke-linecap-round stroke-linejoin-round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        {/* 2. WhatsApp Floating Button with Official Brand Logo */}
        <a
          href={`https://wa.me/${SHURIAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
            "¡Hola Shurian! Vengo desde su página web y quería hacerles una consulta."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chatear por WhatsApp con Shurian"
          title="Contactar por WhatsApp"
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white"
        >
          {/* Notification Ping Badge */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
          </span>

          {/* Official WhatsApp SVG Logo */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
