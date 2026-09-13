"use client";

import React from "react";
import { STORE_INFO } from "@/data/storeInfo";
import { useCartStore } from "@/store/useCartStore";
import {
  Wrench,
  MapPin,
  Phone,
  Instagram,
  ArrowUp,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { openRepairModal, setSelectedCategory } = useCartStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs relative pt-16 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Official Avatar */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-sm shrink-0">
                <img
                  src="/images/shurian-logo.jpg"
                  alt="SHURIAN Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-headline font-black text-xl text-white tracking-tight">
                  SHURIAN
                </span>
                <span className="block text-[10px] font-mono text-orange-500 font-bold tracking-wider">
                  SERVICIO TÉCNICO & ACCESORIOS
                </span>
              </div>
            </div>
            <p className="font-body text-zinc-400 leading-relaxed text-xs">
              {STORE_INFO.description}
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-orange-400 border border-zinc-800 transition-colors"
                aria-label="Instagram de Shurian"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-400 border border-zinc-800 transition-colors"
                aria-label="WhatsApp de Shurian"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                aria-label="Ubicación de Shurian"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div>
            <h4 className="font-headline font-bold text-white text-sm uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => scrollToSection("catalogo")}
                  className="hover:text-white transition-colors"
                >
                  Catálogo de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("celulares");
                    scrollToSection("catalogo");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Celulares & Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("perifericos");
                    scrollToSection("catalogo");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Periféricos & Gaming
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("cables-cargadores");
                    scrollToSection("catalogo");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Cargadores Rápidos & Cables
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("fundas-vidrios");
                    scrollToSection("catalogo");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Fundas y Vidrios Templados
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Service */}
          <div>
            <h4 className="font-headline font-bold text-white text-sm uppercase tracking-wider mb-4">
              Servicio Técnico
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={openRepairModal}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-orange-400 font-bold"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Solicitar Presupuesto Online</span>
                </button>
              </li>
              <li>
                <span className="text-zinc-400">Cambio de Módulos y Pantallas</span>
              </li>
              <li>
                <span className="text-zinc-400">Baterías y Pines de Carga</span>
              </li>
              <li>
                <span className="text-zinc-400">Limpieza y Pasta Térmica PC/Notebook</span>
              </li>
              <li>
                <span className="text-zinc-400">Formateos y Microelectrónica</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Location & Hours */}
          <div>
            <h4 className="font-headline font-bold text-white text-sm uppercase tracking-wider mb-4">
              Local en Rosario
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}, Rosario, Santa Fe</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{STORE_INFO.phoneDisplay}</span>
              </div>
              <div className="pt-2 text-[11px] text-zinc-400 leading-relaxed">
                <p className="font-bold text-white">Horarios:</p>
                <p>Lun a Vie: 09:00 - 13:00 / 16:30 - 20:00 hs</p>
                <p>Sáb: 09:30 - 13:30 hs</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} SHURIAN · Todos los derechos reservados. Rosario, Santa Fe, Argentina.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[11px] font-mono transition-all"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
