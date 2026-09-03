"use client";

import React, { useState } from "react";
import { SHURIAN_WHATSAPP_NUMBER } from "@/utils/whatsapp";
import { MessageCircle, X } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Small popover tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-panel-orange bg-[#0b1329]/95 border border-orange-500/40 text-xs shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
          <span className="text-slate-200">
            ¿Dudas con una reparación o producto?{" "}
            <strong className="text-orange-400">¡Escribinos!</strong>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 p-0.5"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${SHURIAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "¡Hola Shurian! Vengo desde su página web y quería hacerles una consulta."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Shurian"
        className="relative group p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-emerald-400/30"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
        </span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-black" />
      </a>
    </div>
  );
};
