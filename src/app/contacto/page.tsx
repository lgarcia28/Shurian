import React from "react";
import { Metadata } from "next";
import { StoreInfo } from "@/components/StoreInfo";
import { STORE_INFO } from "@/data/storeInfo";
import { MapPin, Phone, Instagram, Clock, ShieldCheck, CreditCard, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Ubicación & Contacto | SHURIAN Rosario",
  description:
    "Visítanos en Bv. Segui 1501, Rosario, Santa Fe. Atención técnica, retiro de compras y consultas directas por WhatsApp.",
};

export default function ContactoPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-white min-h-screen">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold uppercase mb-3">
          <MapPin className="w-3.5 h-3.5 text-orange-500" />
          <span>Bv. Segui 1501 · Rosario, Santa Fe</span>
        </div>
        <h1 className="font-headline font-black text-3xl sm:text-5xl text-zinc-950 tracking-tight">
          Punto Físico, Laboratorio y Contacto
        </h1>
        <p className="font-body text-base text-zinc-600 mt-2 max-w-2xl">
          Encontranos en nuestro local comercial en Rosario para retirar pedidos, colocar vidrios templados o recibir un diagnóstico técnico sin cargo.
        </p>
      </div>

      {/* Main Store & Map Section */}
      <StoreInfo />

      {/* Extra Services & FAQs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-headline font-bold text-lg text-zinc-950 mb-2">
              Retiro Inmediato Sin Costo
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Todos los productos del catálogo web están listos para retirar en el día en nuestro local sin cargos adicionales.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-800 border border-zinc-200 flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="font-headline font-bold text-lg text-zinc-950 mb-2">
              Medios de Pago Aceptados
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Aboná con Transferencia Bancaria / Alias (0% recargo), Efectivo en el mostrador o Tarjeta de débito/crédito.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h2 className="font-headline font-bold text-lg text-zinc-950 mb-2">
              Atención Personalizada
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Escribinos al WhatsApp <span className="font-mono font-bold text-zinc-900">+54 9 341 755-1501</span> ante cualquier duda técnica previa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
