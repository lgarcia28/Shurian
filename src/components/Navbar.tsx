"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatARS } from "@/utils/currency";
import {
  SHURIAN_WHATSAPP_NUMBER,
  SHURIAN_INSTAGRAM,
} from "@/utils/whatsapp";
import {
  ShoppingCart,
  Search,
  Wrench,
  Sparkles,
  MapPin,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    getTotalItems,
    getTotalPrice,
    openCart,
    openRepairModal,
    searchQuery,
    setSearchQuery,
  } = useCartStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#060b17]/95 backdrop-blur-xl border-b border-orange-500/20 shadow-lg shadow-navy-950/50 py-3"
          : "bg-[#060b17]/80 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Brand Logo with Official Profile Avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden bg-navy-900 border border-orange-500/50 shadow-glow-sm group-hover:border-orange-400 group-hover:shadow-glow transition-all duration-300">
                <img
                  src="/images/shurian-logo.jpg"
                  alt="SHURIAN Logo Oficial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping opacity-75"></span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
                    SHURIAN
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    PC
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                  Servicio Técnico & Accesorios · Rosario
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar celulares, fundas, teclados, repuestos..."
                className="w-full pl-10 pr-10 py-2 text-sm rounded-xl glass-input placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => scrollToSection("catalogo")}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
            >
              Catálogo
            </button>
            <button
              onClick={() => openRepairModal()}
              className="px-3 py-2 rounded-lg text-sm font-medium text-orange-400 hover:text-white hover:bg-orange-500/20 border border-orange-500/40 transition-all flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Servicio Técnico</span>
            </button>
            <button
              onClick={() => scrollToSection("ubicacion")}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-orange-400 hover:bg-orange-500/10 transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Local</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Direct CTA */}
            <a
              href={`https://wa.me/${SHURIAN_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button with Count Badge */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-300 hover:text-white transition-all shadow-glow-sm hover:shadow-glow active:scale-95"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="hidden sm:inline font-mono font-bold text-xs">
                  {formatARS(totalPrice)}
                </span>
              )}
              {totalItems > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-orange-500 text-black font-mono font-extrabold text-[11px] shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-3 pt-2 border-t border-white/5">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos o servicios..."
              className="w-full pl-10 pr-9 py-2 text-sm rounded-xl glass-input placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel border border-orange-500/25 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => scrollToSection("catalogo")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-orange-500/10 hover:text-orange-400 flex items-center justify-between text-sm"
            >
              <span>Ver Catálogo Completo</span>
              <Sparkles className="w-4 h-4 text-orange-400" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openRepairModal();
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-300 flex items-center justify-between text-sm font-semibold"
            >
              <span>Consultar Reparación de Celular / PC</span>
              <Wrench className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("ubicacion")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-orange-500/10 hover:text-orange-400 flex items-center justify-between text-sm"
            >
              <span>Ubicación y Horarios (Bv. Segui 1501)</span>
              <MapPin className="w-4 h-4 text-orange-400" />
            </button>
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <a
                href={`https://wa.me/${SHURIAN_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Shurian</span>
              </a>
              <a
                href={SHURIAN_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-semibold text-center"
              >
                Instagram
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
