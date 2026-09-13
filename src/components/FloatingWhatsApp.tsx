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

      {/* Floating Button */}
      <a
        href={`https://wa.me/${SHURIAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "¡Hola Shurian! Vengo desde su página web y quería hacerles una consulta."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con Shurian"
        className="relative group p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
};
