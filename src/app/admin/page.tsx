"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminStore, Timeframe } from "@/store/useAdminStore";
import { formatARS } from "@/utils/currency";
import {
  TrendingUp,
  Users,
  MessageCircle,
  Wrench,
  DollarSign,
  Smartphone,
  Laptop,
  Monitor,
  Gamepad2,
  Clock,
  Settings,
  BarChart3,
  Store,
  Save,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Eye,
  EyeOff,
  ShoppingBag,
  Bell,
  RotateCcw,
  Lock,
  LogOut,
  UserCheck,
  ShieldAlert,
} from "lucide-react";

export default function AdminPage() {
  const {
    settings,
    timeframe,
    updateSettings,
    resetSettings,
    setTimeframe,
    fetchSettings,
  } = useAdminStore();

  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login form state
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Dashboard state
  const [activeTab, setActiveTab] = useState<"metrics" | "settings">("metrics");
  const [formData, setFormData] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Check auth session on mount
  useEffect(() => {
    setMounted(true);
    fetchSettings().then(() => {
      setFormData(useAdminStore.getState().settings);
    });

    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, [settings]);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setLoginPass("");
      } else {
        setLoginError(data.error || "Usuario o contraseña inválidos.");
      }
    } catch (err) {
      setLoginError("Error de conexión al servidor.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setLoginPass("");
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  // Sync formData inputs
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de restablecer las configuraciones a sus valores originales?")) {
      resetSettings();
      setFormData(settings);
    }
  };

  // Mock analytics dataset based on selected timeframe
  const metricsData = {
    "7d": {
      visits: 742,
      visitsGrowth: "+12.4%",
      whatsappClicks: 104,
      whatsappRate: "14.0%",
      repairsQuotes: 32,
      cartsCreated: 48,
      totalQuotedARS: 462000,
      avgTicketARS: 27500,
      trafficDays: [
        { day: "Lun", visits: 98, inquiries: 14 },
        { day: "Mar", visits: 112, inquiries: 18 },
        { day: "Mié", visits: 125, inquiries: 20 },
        { day: "Jue", visits: 105, inquiries: 16 },
        { day: "Vie", visits: 140, inquiries: 22 },
        { day: "Sáb", visits: 118, inquiries: 11 },
        { day: "Dom", visits: 44, inquiries: 3 },
      ],
    },
    "30d": {
      visits: 2840,
      visitsGrowth: "+18.4%",
      whatsappClicks: 418,
      whatsappRate: "14.7%",
      repairsQuotes: 126,
      cartsCreated: 195,
      totalQuotedARS: 1850000,
      avgTicketARS: 28500,
      trafficDays: [
        { day: "Sem 1", visits: 680, inquiries: 92 },
        { day: "Sem 2", visits: 720, inquiries: 105 },
        { day: "Sem 3", visits: 740, inquiries: 115 },
        { day: "Sem 4", visits: 700, inquiries: 106 },
      ],
    },
    month: {
      visits: 3120,
      visitsGrowth: "+21.2%",
      whatsappClicks: 460,
      whatsappRate: "14.7%",
      repairsQuotes: 142,
      cartsCreated: 218,
      totalQuotedARS: 2040000,
      avgTicketARS: 29000,
      trafficDays: [
        { day: "Sem 1", visits: 750, inquiries: 102 },
        { day: "Sem 2", visits: 810, inquiries: 118 },
        { day: "Sem 3", visits: 780, inquiries: 120 },
        { day: "Sem 4", visits: 780, inquiries: 120 },
      ],
    },
    year: {
      visits: 31400,
      visitsGrowth: "+45.0%",
      whatsappClicks: 4850,
      whatsappRate: "15.4%",
      repairsQuotes: 1480,
      cartsCreated: 2240,
      totalQuotedARS: 21600000,
      avgTicketARS: 26800,
      trafficDays: [
        { day: "Ene", visits: 2400, inquiries: 360 },
        { day: "Feb", visits: 2600, inquiries: 390 },
        { day: "Mar", visits: 2900, inquiries: 430 },
        { day: "Abr", visits: 2750, inquiries: 410 },
        { day: "May", visits: 3100, inquiries: 480 },
        { day: "Jun", visits: 3200, inquiries: 490 },
      ],
    },
  }[timeframe];

  // Loading state
  if (!mounted || checkingAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center pt-28 pb-24 font-body">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-zinc-400 font-mono">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // LOGIN SCREEN (When user is not authenticated)
  // ============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center pt-32 sm:pt-36 md:pt-20 pb-20 px-4 font-body">
        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Logo & Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-black border border-zinc-800 overflow-hidden shadow-lg p-0.5 mb-4">
              <img
                src="/images/shurian-logo.jpg"
                alt="SHURIAN Logo"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h1 className="font-headline font-black text-2xl text-white tracking-tight">
              SHURIAN ADMIN
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Ingresa tus credenciales para acceder al panel de control
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Ej. admin"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-headline font-bold text-sm transition-all shadow-glow-orange-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 text-center pt-4 border-t border-zinc-800/80">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-orange-400 transition-colors"
            >
              ← Volver a la tienda pública
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ============================================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24 font-body pt-44 sm:pt-48 md:pt-24">
      {/* Top Admin Header */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/90 backdrop-blur-md sticky top-36 sm:top-40 md:top-16 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Title & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-glow-orange-sm">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-headline font-black text-xl text-white tracking-tight">
                    SHURIAN
                  </h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    PANEL DE GESTIÓN
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Panel administrativo de métricas y configuraciones operativas
                </p>
              </div>
            </div>

            {/* Actions: Store Status, Session & Logout */}
            <div className="flex items-center gap-2.5">
              {/* Store Status Indicator */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                <span className="relative flex h-2 w-2">
                  {settings.isOpenOverride === "closed" ? (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                  ) : (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </>
                  )}
                </span>
                <span className="text-zinc-300 font-mono text-[11px]">
                  {settings.isOpenOverride === "closed"
                    ? "Forzado Cerrado"
                    : settings.isOpenOverride === "open"
                    ? "Forzado Abierto"
                    : "Automático"}
                </span>
              </div>

              {/* User Logged In Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-mono">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>admin</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/20 hover:text-rose-300 text-zinc-400 text-xs font-semibold border border-zinc-700/80 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 border-t border-zinc-800/60 pt-3">
            <button
              onClick={() => setActiveTab("metrics")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "metrics"
                  ? "bg-orange-500 text-white shadow-glow-orange-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Métricas y Estadísticas</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-orange-500 text-white shadow-glow-orange-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración del Negocio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* ============================================================ */}
        {/* TAB 1: METRICS & STATISTICS                                  */}
        {/* ============================================================ */}
        {activeTab === "metrics" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Filter Timeframe Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80">
              <div>
                <h2 className="text-base font-headline font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  Rendimiento y Actividad de SHURIAN
                </h2>
                <p className="text-xs text-zinc-400">
                  Seguimiento de tráfico, consultas por WhatsApp y demanda de reparaciones.
                </p>
              </div>

              {/* Timeframe Buttons */}
              <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-medium">
                {(
                  [
                    { id: "7d", label: "7 días" },
                    { id: "30d", label: "30 días" },
                    { id: "month", label: "Este Mes" },
                    { id: "year", label: "Año 2026" },
                  ] as const
                ).map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setTimeframe(tf.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      timeframe === tf.id
                        ? "bg-zinc-800 text-orange-400 font-semibold shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Visitas Totales */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-400">Visitas a la Web</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-headline font-extrabold text-white">
                    {metricsData.visits.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    {metricsData.visitsGrowth}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Tráfico total registrado en Rosario y alrededores
                </p>
              </div>

              {/* Card 2: Clics a WhatsApp */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-400">Clics a WhatsApp</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-headline font-extrabold text-white">
                    {metricsData.whatsappClicks.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">
                    {metricsData.whatsappRate} conv.
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Clientes que iniciaron chat con mensaje prearmado
                </p>
              </div>

              {/* Card 3: Cotizaciones Servicio Técnico */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-400">Cotizaciones Taller</span>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-headline font-extrabold text-white">
                    {metricsData.repairsQuotes}
                  </span>
                  <span className="text-xs font-semibold text-orange-400 font-mono">
                    Wizard activo
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Consultas por celulares, notebooks y PC recibidas
                </p>
              </div>

              {/* Card 4: Volumen Cotizado */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-400">Volumen en Carritos</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-headline font-extrabold text-white">
                    {formatARS(metricsData.totalQuotedARS)}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Ticket prom: <span className="text-zinc-300 font-mono">{formatARS(metricsData.avgTicketARS)}</span> ({metricsData.cartsCreated} pedidos)
                </p>
              </div>
            </div>

            {/* Activity Chart & Trends */}
            <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-sm font-headline font-bold text-white">
                    Evolución de Tráfico y Contactos
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Visitas totales vs. personas que enviaron consulta
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" />
                    <span className="text-zinc-300">Visitas Web</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
                    <span className="text-zinc-300">Consultas WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Visual Bars Chart */}
              <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-6 border-b border-zinc-800">
                {metricsData.trafficDays.map((item, i) => {
                  const maxVisits = Math.max(...metricsData.trafficDays.map((d) => d.visits));
                  const visitHeight = Math.round((item.visits / maxVisits) * 100);
                  const inquiryHeight = Math.round((item.inquiries / maxVisits) * 350);

                  return (
                    <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                        {/* Bar 1: Visits */}
                        <div
                          style={{ height: `${visitHeight}%` }}
                          className="w-full max-w-[28px] bg-orange-500/80 hover:bg-orange-500 rounded-t-md transition-all relative group-hover:shadow-glow-orange-sm"
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[10px] font-mono px-1.5 py-0.5 rounded border border-zinc-800 pointer-events-none transition-opacity whitespace-nowrap z-10">
                            {item.visits}
                          </span>
                        </div>
                        {/* Bar 2: Inquiries */}
                        <div
                          style={{ height: `${Math.max(inquiryHeight, 8)}%` }}
                          className="w-full max-w-[20px] bg-emerald-500/80 hover:bg-emerald-500 rounded-t-md transition-all relative"
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 text-emerald-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-zinc-800 pointer-events-none transition-opacity whitespace-nowrap z-10">
                            {item.inquiries}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Analytics Grid (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Col A: Servicio Técnico Breakdown */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-headline font-bold text-white flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-orange-400" />
                    Demanda del Servicio Técnico
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-mono">Últimas cotizaciones</span>
                </div>

                {/* Device Breakdown */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-300">
                    Dispositivos más consultados
                  </span>
                  {[
                    { name: "Celulares (iPhone / Samsung / Xiaomi)", pct: 52, icon: <Smartphone className="w-3.5 h-3.5 text-blue-400" /> },
                    { name: "Notebooks (Cargadores, Pantallas, Bisagras)", pct: 26, icon: <Laptop className="w-3.5 h-3.5 text-orange-400" /> },
                    { name: "PC de Escritorio / Gamer (Armado, Placas)", pct: 16, icon: <Monitor className="w-3.5 h-3.5 text-purple-400" /> },
                    { name: "Consolas (PS4, PS5, Xbox)", pct: 6, icon: <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" /> },
                  ].map((dev, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-300 flex items-center gap-2">
                          {dev.icon}
                          {dev.name}
                        </span>
                        <span className="font-mono text-white font-bold">{dev.pct}%</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-orange-500 h-full rounded-full"
                          style={{ width: `${dev.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Common Issues Breakdown */}
                <div className="pt-2 border-t border-zinc-800 space-y-2.5">
                  <span className="text-xs font-semibold text-zinc-300">
                    Fallas más frecuentes cotizadas en el Wizard
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { issue: "Pantalla / Módulo roto", count: "44%", tag: "Alta demanda" },
                      { issue: "Cambio de Batería", count: "21%", tag: "Frecuente" },
                      { issue: "Limpieza & Pasta térmica", count: "18%", tag: "Servicio PC" },
                      { issue: "No enciende / Placa madre", count: "12%", tag: "Complejo" },
                    ].map((issue, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-orange-400 font-bold">{issue.count}</span>
                          <span className="text-[10px] text-zinc-500">{issue.tag}</span>
                        </div>
                        <p className="text-zinc-300 text-[11px] truncate">{issue.issue}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Urgency Ratio */}
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-orange-300 font-medium">
                    <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>32% de los clientes solicita reparación "En el día / Urgente"</span>
                  </div>
                </div>
              </div>

              {/* Col B: E-Commerce & Tráfico Breakdown */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-headline font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    Catálogo y Origen de Clientes
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-mono">Ranking de interés</span>
                </div>

                {/* Top Products */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-zinc-300">
                    Productos más visitados / cotizados
                  </span>
                  {[
                    { name: "Cargador Rápido 20W Type-C", cat: "Cables/Cargadores", price: "$18.500", clicks: 182 },
                    { name: "Vidrio Templado Cerámico 9D", cat: "Fundas/Vidrios", price: "$4.500", clicks: 145 },
                    { name: "Auriculares Gamer RGB Micrófono", cat: "Audio", price: "$32.900", clicks: 128 },
                    { name: "Funda Case Antigolpes Silicone", cat: "Fundas/Vidrios", price: "$7.200", clicks: 110 },
                    { name: "Soporte de Celular para Auto Imantado", cat: "Accesorios", price: "$8.900", clicks: 94 },
                  ].map((prod, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs"
                    >
                      <div className="truncate pr-2">
                        <p className="font-semibold text-white truncate">{prod.name}</p>
                        <span className="text-[10px] text-zinc-500">{prod.cat} · {prod.price}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-emerald-400 font-bold text-[11px]">
                          {prod.clicks} consultas
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Referral Traffic */}
                <div className="pt-2 border-t border-zinc-800 space-y-3">
                  <span className="text-xs font-semibold text-zinc-300">
                    Canal de llegada a la página
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <span className="block font-headline font-bold text-orange-400 text-sm">65%</span>
                      <span className="text-[10px] text-zinc-400">Instagram (@shurian.pc)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <span className="block font-headline font-bold text-blue-400 text-sm">23%</span>
                      <span className="text-[10px] text-zinc-400">Google & Maps</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <span className="block font-headline font-bold text-emerald-400 text-sm">12%</span>
                      <span className="text-[10px] text-zinc-400">Directo / WhatsApp</span>
                    </div>
                  </div>
                </div>

                {/* Device Type */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Dispositivo de navegación:</span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-zinc-200">📱 84% Móvil</span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-zinc-200">💻 16% PC</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: BUSINESS SETTINGS                                     */}
        {/* ============================================================ */}
        {activeTab === "settings" && (
          <form onSubmit={handleSave} className="space-y-8 animate-fadeIn">
            {/* Top Bar Save Confirmation */}
            {saveSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  ¡Configuraciones guardadas con éxito! Los cambios ya se aplican en la web.
                </span>
              </div>
            )}

            {/* Header intro */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80">
              <div>
                <h2 className="text-base font-headline font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-orange-500" />
                  Configuraciones Generales de la Tienda y Taller
                </h2>
                <p className="text-xs text-zinc-400">
                  Modifica los horarios, datos de contacto, aviso de vacaciones y anuncios.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold border border-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer</span>
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-glow-orange-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </div>

            {/* Settings Sections (Sin políticas de pago ni cadetería) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* SECTION 1: Horarios & Estado en Vivo */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-headline font-bold text-white">
                      Estado del Local & Horarios
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Controla lo que ve el cliente sobre la apertura de Bv. Segui 1501
                    </p>
                  </div>
                </div>

                {/* Forzar Estado Switch */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Modo de Apertura
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "auto", label: "Automático (Por hora)" },
                      { id: "open", label: "Forzar ABIERTO" },
                      { id: "closed", label: "Forzar CERRADO" },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => handleInputChange("isOpenOverride", opt.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          formData.isOpenOverride === opt.id
                            ? "bg-orange-500/20 border-orange-500 text-orange-300 font-bold"
                            : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Modo Feriado / Vacaciones */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-semibold text-zinc-200">
                        Modo Feriado / Vacaciones
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.holidayMode}
                        onChange={(e) => handleInputChange("holidayMode", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
                    </label>
                  </div>
                  {formData.holidayMode && (
                    <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                      <label className="text-[11px] text-zinc-400">
                        Mensaje explicativo para el cliente:
                      </label>
                      <textarea
                        rows={2}
                        value={formData.holidayMessage}
                        onChange={(e) => handleInputChange("holidayMessage", e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  )}
                </div>

                {/* Horarios Editables */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Lunes a Viernes
                    </label>
                    <input
                      type="text"
                      value={formData.hoursWeekdays}
                      onChange={(e) => handleInputChange("hoursWeekdays", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Sábados
                    </label>
                    <input
                      type="text"
                      value={formData.hoursSaturday}
                      onChange={(e) => handleInputChange("hoursSaturday", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Canales de Contacto */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-headline font-bold text-white">
                      Canales de Atención & Redes
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      A dónde se derivan los mensajes y consultas de la web
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      WhatsApp Principal (Ventas & Pedidos)
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                      placeholder="5493417551501"
                    />
                    <span className="text-[10px] text-zinc-500">
                      Formato internacional sin signos (ej. 5493417551501)
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      WhatsApp Taller / Servicio Técnico
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappRepairNumber}
                      onChange={(e) => handleInputChange("whatsappRepairNumber", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                      placeholder="5493417551501"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Teléfono Visible en Web
                    </label>
                    <input
                      type="text"
                      value={formData.phoneDisplay}
                      onChange={(e) => handleInputChange("phoneDisplay", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={formData.instagramHandle}
                      onChange={(e) => handleInputChange("instagramHandle", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Dirección en Rosario
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Banner Promocional Superior */}
              <div className="bg-zinc-900/70 border border-zinc-800 p-6 rounded-2xl space-y-5 lg:col-span-2">
                <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-headline font-bold text-white">
                      Banner Superior de Avisos (Top Bar)
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Barra de anuncios fijada en la parte superior del sitio
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                    <div>
                      <span className="text-xs font-semibold text-zinc-200 block">
                        Mostrar Banner en la Tienda
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        Activa una franja de notificación en la cabecera
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.topBanner.enabled}
                        onChange={(e) =>
                          handleNestedChange("topBanner", "enabled", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
                    </label>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Etiqueta / Badge (ej: PROMO, AVISO, NOVEDAD)
                    </label>
                    <input
                      type="text"
                      value={formData.topBanner.badge}
                      onChange={(e) =>
                        handleNestedChange("topBanner", "badge", e.target.value)
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs text-zinc-400 block mb-1">
                      Texto del Anuncio
                    </label>
                    <input
                      type="text"
                      value={formData.topBanner.text}
                      onChange={(e) =>
                        handleNestedChange("topBanner", "text", e.target.value)
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Color / Variante
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "orange", label: "Naranja Shurian" },
                        { id: "dark", label: "Azul Oscuro" },
                        { id: "emerald", label: "Verde Éxito" },
                      ].map((variant) => (
                        <button
                          type="button"
                          key={variant.id}
                          onClick={() => handleNestedChange("topBanner", "variant", variant.id)}
                          className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                            formData.topBanner.variant === variant.id
                              ? "bg-orange-500/20 border-orange-500 text-orange-300 font-bold"
                              : "bg-zinc-950 border-zinc-800 text-zinc-400"
                          }`}
                        >
                          {variant.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Enlace de destino (opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.topBanner.link}
                      onChange={(e) =>
                        handleNestedChange("topBanner", "link", e.target.value)
                      }
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
                      placeholder="/catalogo"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Save Button */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-glow-orange-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar y Aplicar Todos los Cambios</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
