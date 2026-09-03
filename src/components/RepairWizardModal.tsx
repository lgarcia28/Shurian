"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { generateRepairWhatsAppUrl } from "@/utils/whatsapp";
import { DeviceType, RepairInquiry } from "@/types";
import {
  X,
  Wrench,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Gamepad2,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export const RepairWizardModal: React.FC = () => {
  const { isRepairModalOpen, closeRepairModal } = useCartStore();

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRepairModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeRepairModal]);

  if (!isRepairModalOpen) return null;

  const DEVICE_OPTIONS: { type: DeviceType; label: string; icon: React.ReactNode }[] = [
    { type: "celular", label: "Celular", icon: <Smartphone className="w-5 h-5" /> },
    { type: "notebook", label: "Notebook", icon: <Laptop className="w-5 h-5" /> },
    { type: "pc-escritorio", label: "PC Gamer / Escritorio", icon: <Monitor className="w-5 h-5" /> },
    { type: "tablet", label: "Tablet / iPad", icon: <Tablet className="w-5 h-5" /> },
    { type: "consola", label: "Consola", icon: <Gamepad2 className="w-5 h-5" /> },
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
    closeRepairModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeRepairModal}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      ></div>

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-orange border border-orange-500/35 p-6 sm:p-8 bg-[#0b1329]/95 shadow-2xl z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={closeRepairModal}
          className="absolute top-4 right-4 p-2 rounded-full glass-panel text-slate-400 hover:text-white hover:bg-slate-800 transition-all z-20"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-orange-500/40 shadow-glow-sm shrink-0">
            <img
              src="/images/shurian-logo.jpg"
              alt="Shurian Servicio Técnico"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-headline font-black text-xl sm:text-2xl text-white">
              Consultar Servicio Técnico Shurian
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Diagnóstico sin cargo · Laboratorio en Bv. Segui 1501, Rosario
            </p>
          </div>
        </div>

        {validationError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          {/* Step 1: Device Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              1. Selecciona el tipo de equipo <span className="text-orange-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DEVICE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.type}
                  onClick={() => handleDeviceChange(opt.type)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    inquiry.deviceType === opt.type
                      ? "bg-orange-500/20 border-orange-500 text-white shadow-glow-sm font-semibold"
                      : "glass-panel border-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className={inquiry.deviceType === opt.type ? "text-orange-400" : "text-slate-400"}>
                    {opt.icon}
                  </span>
                  <span className="text-xs">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Brand and Model */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              2. Marca y Modelo exacto <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              required
              value={inquiry.brandModel}
              onChange={(e) => setInquiry({ ...inquiry, brandModel: e.target.value })}
              placeholder="Ej: iPhone 13 Pro Max, Samsung A54, Lenovo IdeaPad 3, PC Gamer..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
            />
          </div>

          {/* Step 3: Issue Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              3. ¿Cuál es la falla principal? <span className="text-orange-400">*</span>
            </label>
            <select
              value={inquiry.issueType}
              onChange={(e) => setInquiry({ ...inquiry, issueType: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-navy-950 cursor-pointer"
            >
              {COMMON_ISSUES_MAP[inquiry.deviceType].map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Additional Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              4. Comentarios o síntomas adicionales (Opcional)
            </label>
            <textarea
              rows={2}
              value={inquiry.description}
              onChange={(e) => setInquiry({ ...inquiry, description: e.target.value })}
              placeholder="Ej: Se cayó de altura, la batería se descarga en 2 horas, recalienta al jugar..."
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs resize-none"
            ></textarea>
          </div>

          {/* Step 5: Name and Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tu Nombre
              </label>
              <input
                type="text"
                value={inquiry.customerName}
                onChange={(e) => setInquiry({ ...inquiry, customerName: e.target.value })}
                placeholder="Ej: Lucas"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Prioridad
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInquiry({ ...inquiry, urgency: "normal" })}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                    inquiry.urgency === "normal"
                      ? "bg-navy-800 border-orange-500/50 text-orange-300"
                      : "glass-panel border-white/5 text-slate-400"
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setInquiry({ ...inquiry, urgency: "urgente" })}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                    inquiry.urgency === "urgente"
                      ? "bg-orange-500/25 border-orange-500 text-orange-400 font-bold shadow-glow-sm"
                      : "glass-panel border-white/5 text-slate-400"
                  }`}
                >
                  ⚡ Urgente
                </button>
              </div>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="p-3 rounded-xl bg-navy-950/60 border border-orange-500/25 flex items-center gap-2.5 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              Te responderemos en WhatsApp con el costo estimado y tiempos de entrega.
            </span>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>Consultar presupuesto por WhatsApp</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
