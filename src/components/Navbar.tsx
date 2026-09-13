"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Home,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // If user starts typing and is not in /catalogo, navigate there smoothly
    if (value.trim() && pathname !== "/catalogo") {
      router.push("/catalogo");
    }
  };

  const navLinks = [
    { href: "/", label: "Inicio", icon: <Home className="w-4 h-4" /> },
    { href: "/catalogo", label: "Catálogo", icon: <Sparkles className="w-4 h-4" /> },
    { href: "/servicio-tecnico", label: "Servicio Técnico", icon: <Wrench className="w-4 h-4" /> },
    { href: "/contacto", label: "Ubicación & Contacto", icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-zinc-950 border-b border-zinc-850 text-white transition-all duration-300 ${
        isScrolled
          ? "shadow-lg shadow-black/20 py-3"
          : "py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo with Official Profile Avatar */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-black border border-zinc-800 group-hover:border-orange-500 transition-all duration-300 shrink-0">
                <img
                  src="/images/shurian-logo.jpg"
                  alt="SHURIAN Logo Oficial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
                    SHURIAN
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    PC
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 tracking-wider uppercase">
                  Servicio Técnico & Accesorios · Rosario
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Buscar celulares, fundas, accesorios..."
                className="w-full pl-10 pr-10 py-2 text-sm rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white px-1.5 py-0.5 rounded-full bg-zinc-800"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-zinc-800 text-white font-semibold shadow-inner border border-zinc-700/60"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {link.href === "/servicio-tecnico" ? (
                    <span className="text-orange-400">{link.icon}</span>
                  ) : null}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Direct CTA */}
            <a
              href={`https://wa.me/${SHURIAN_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400/20" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button with Count Badge */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-all shadow-sm active:scale-95"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart className="w-4 h-4 text-zinc-300" />
              {totalItems > 0 && (
                <span className="hidden sm:inline font-mono font-bold text-xs text-white">
                  {formatARS(totalPrice)}
                </span>
              )}
              {totalItems > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-orange-500 text-white font-mono font-bold text-[11px] shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900"
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
        <div className="lg:hidden mt-3 pt-2 border-t border-zinc-850">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar productos o repuestos..."
              className="w-full pl-10 pr-9 py-2 text-sm rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full px-4 py-3 rounded-xl flex items-center justify-between text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-800 text-white font-bold border border-zinc-700"
                      : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-orange-400" : "text-zinc-400"}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <span className="text-xs text-zinc-500">→</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-zinc-800 flex items-center gap-2">
              <a
                href={`https://wa.me/${SHURIAN_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href={SHURIAN_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-semibold text-center"
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
