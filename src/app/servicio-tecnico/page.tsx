"use client";

import React, { useState } from "react";
import Link from "next/link";
import { generateRepairWhatsAppUrl } from "@/utils/whatsapp";
import { DeviceType, RepairInquiry } from "@/types";
import {
  Wrench,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Gamepad2,
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";

export default function ServicioTecnicoPage() {
  const [inquiry, setInquiry] = useState<RepairInquiry>({
    deviceType: "celular",
    brandModel: "",
    issueType: "Cambio de Pantalla / Módulo táctil",
    description: "",
    customerName: "",
    customerPhone: "",
    urgency: "normal",
  });

  const [validationError, setValidationError] = useState("");

  const DEVICE_OPTIONS: { type: DeviceType; label: string; icon: React.ReactNode }[] = [
    { type: "celular", label: "Celular / Smartphone", icon: <Smartphone className="w-5 h-5" /> },
    { type: "notebook", label: "Notebook / Laptop", icon: <Laptop className="w-5 h-5" /> },
    { type: "pc-escritorio", label: "PC Gamer / Escritorio", icon: <Monitor className="w-5 h-5" /> },
    { type: "tablet", label: "Tablet / iPad", icon: <Tablet className="w-5 h-5" /> },
    { type: "consola", label: "Consola / Joystick", icon: <Gamepad2 className="w-5 h-5" /> },
  ];

  const COMMON_ISSUES_MAP: Record<DeviceType, string[]> = {
    celular: [
      "Cambio de Pantalla / Módulo táctil",
      "Cambio de Batería (baja duración/inflada)",
      "Pin de Carga / No carga",
      "No enciende / Problema de placa",
      "Tapa trasera rota / Vidrio de cámara",
      "Mojado / Daño por líquidos",
      "Otro problema",
    ],
    notebook: [
      "Mantenimiento térmico y limpieza de coolers",
      "Cambio de Pantalla rota",
      "No enciende / Falla en placa",
      "Batería o cargador defectuoso",
      "Ampliación de memoria RAM y disco SSD",
      "Formateo, instalación de Windows y programas",
      "Teclado o bisagras rotas",
    ],
    "pc-escritorio": [
      "Mantenimiento térmico completo & pasta térmica",
      "No da video / Pantalla azul",
      "Armado o actualización de componentes",
      "Limpieza profunda con alcohol isopropílico",
      "Formateo y optimización Windows para gaming",
      "Falla en fuente de poder o placa madre",
    ],
    tablet: [
      "Cambio de Pantalla / Vidrio táctil",
      "Pin de carga dañado",
      "Cambio de Batería",
      "No enciende",
    ],
    consola: [
      "Mantenimiento térmico y limpieza de cooler",
      "Problema de lectura de disco / HDMI",
      "Reparación de Joystick (Drift)",
      "No enciende / Luz roja o azul",
    ],
  };

  const handleDeviceChange = (type: DeviceType) => {
    setInquiry({
      ...inquiry,
      deviceType: type,
      issueType: COMMON_ISSUES_MAP[type][0],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.brandModel.trim()) {
      setValidationError("Por favor ingresa la marca y modelo del equipo.");
      return;
    }

    setValidationError("");
    const url = generateRepairWhatsAppUrl(inquiry);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-left max-w-3xl pt-6 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-semibold uppercase mb-4 shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-orange-500" />
            <span>Laboratorio Shurian · Rosario</span>
          </div>
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-[1.1]">
            Servicio Técnico Especializado en Celulares y Computadoras
          </h1>
          <p className="font-body text-base sm:text-lg text-zinc-600 mt-4 leading-relaxed">
            Diagnóstico sin cargo en nuestro local de <strong>Bv. Segui 1501</strong>. 
            Reparaciones en el día, repuestos de alta calidad y garantía escrita en cada trabajo.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-zinc-950 mb-1">
              Diagnóstico Sin Cargo
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Revisamos tu celular, notebook o PC sin compromiso antes de realizar cualquier intervención.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-800 border border-zinc-200 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-zinc-950 mb-1">
              Reparaciones en el Día
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Módulos, baterías y limpiezas térmicas en tiempos récord con turno coordinado.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-zinc-950 mb-1">
              Garantía Escrita
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Respaldamos repuestos y mano de obra para tu tranquilidad y confianza absoluta.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 text-white flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="font-headline font-bold text-base text-zinc-950 mb-1">
              Laboratorio Propio
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Herramientas de precisión, soldadura microelectrónica y banco de pruebas propio.
            </p>
          </div>
        </div>

        {/* Interactive Quote Builder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left Form: Direct Quote Wizard */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-zinc-200 shadow-soft-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
              <div className="p-3 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-headline font-black text-xl sm:text-2xl text-zinc-950">
                  Cotizador Rápido de Reparaciones
                </h2>
                <p className="text-xs text-zinc-500 font-mono">
                  Calculá tu presupuesto y coordiná directamente por WhatsApp
                </p>
              </div>
            </div>

            {validationError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-xs font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
              {/* Device Selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-2">
                  1. ¿Qué equipo necesitas reparar? <span className="text-orange-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEVICE_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.type}
                      onClick={() => handleDeviceChange(opt.type)}
                      className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                        inquiry.deviceType === opt.type
                          ? "bg-zinc-950 border-zinc-950 text-white shadow-sm font-semibold"
                          : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300"
                      }`}
                    >
                      <span className={inquiry.deviceType === opt.type ? "text-orange-400" : "text-zinc-500"}>
                        {opt.icon}
                      </span>
                      <span className="text-xs">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Model */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  2. Marca y Modelo exacto <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={inquiry.brandModel}
                  onChange={(e) => setInquiry({ ...inquiry, brandModel: e.target.value })}
                  placeholder="Ej: iPhone 13 Pro, Samsung Galaxy A54, Lenovo IdeaPad 3, PC Ryzen 5..."
                  className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs sm:text-sm"
                />
              </div>

              {/* Issue Selection */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  3. Falla principal que presenta <span className="text-orange-500">*</span>
                </label>
                <select
                  value={inquiry.issueType}
                  onChange={(e) => setInquiry({ ...inquiry, issueType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl minimal-input text-xs bg-white cursor-pointer"
                >
                  {COMMON_ISSUES_MAP[inquiry.deviceType].map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  4. Detalles o síntomas adicionales (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={inquiry.description}
                  onChange={(e) => setInquiry({ ...inquiry, description: e.target.value })}
                  placeholder="Ej: La pantalla no responde al tacto, se calienta demasiado al jugar, se cayó al agua..."
                  className="w-full px-3.5 py-2 rounded-xl minimal-input text-xs resize-none"
                ></textarea>
              </div>

              {/* Name and Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-zinc-800 mb-1">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    value={inquiry.customerName}
                    onChange={(e) => setInquiry({ ...inquiry, customerName: e.target.value })}
                    placeholder="Ej: Martín"
                    className="w-full px-3 py-2 rounded-xl minimal-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-800 mb-1">
                    Prioridad del servicio
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setInquiry({ ...inquiry, urgency: "normal" })}
                      className={`flex-1 py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                        inquiry.urgency === "normal"
                          ? "bg-zinc-950 border-zinc-950 text-white font-semibold"
                          : "bg-zinc-50 border-zinc-200 text-zinc-600"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiry({ ...inquiry, urgency: "urgente" })}
                      className={`flex-1 py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                        inquiry.urgency === "urgente"
                          ? "bg-orange-50 border-orange-500 text-orange-700 font-bold shadow-sm"
                          : "bg-zinc-50 border-zinc-200 text-zinc-600"
                      }`}
                    >
                      ⚡ Urgente
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-headline font-black text-sm shadow-sm flex items-center justify-center gap-2.5 transition-all active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enviar Consulta de Presupuesto a WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Info: Process & Workshop */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step-by-step process */}
            <div className="p-6 sm:p-7 rounded-3xl bg-zinc-50 border border-zinc-200/80">
              <h3 className="font-headline font-bold text-lg text-zinc-950 mb-4">
                ¿Cómo funciona el servicio?
              </h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex gap-3 items-start">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-950 text-white font-mono font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-zinc-900">Traé o enviá tu equipo</h4>
                    <p className="text-zinc-500 text-xs mt-0.5">
                      Podés acercarlo a Bv. Segui 1501 o coordinamos el retiro por cadetería en Rosario.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white font-mono font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-zinc-900">Diagnóstico en el laboratorio</h4>
                    <p className="text-zinc-500 text-xs mt-0.5">
                      Revisamos la falla exacta y te enviamos el presupuesto con repuesto original o alternativo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-950 text-white font-mono font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-zinc-900">Reparación & Calibración</h4>
                    <p className="text-zinc-500 text-xs mt-0.5">
                      Una vez aprobado el costo, ejecutamos el trabajo y realizamos test de carga y sensores.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-zinc-900">Entrega con Garantía Escrita</h4>
                    <p className="text-zinc-500 text-xs mt-0.5">
                      Retirás tu dispositivo 100% funcional y con respaldo técnico garantizado.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location highlight */}
            <div className="p-6 rounded-3xl bg-orange-50 border border-orange-200">
              <h4 className="font-headline font-bold text-zinc-950 text-sm mb-1">
                ¿Preferís pasar directamente?
              </h4>
              <p className="text-xs text-zinc-700 leading-relaxed mb-3">
                No hace falta turno previo para dejar tu equipo. Te esperamos en <strong>Bv. Segui 1501, Rosario</strong>.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:text-orange-900 underline underline-offset-4"
              >
                Ver mapa y horarios de atención →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
