"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORE_INFO } from "@/data/storeInfo";

export interface BusinessSettings {
  // Estado y Horarios
  isOpenOverride: "auto" | "open" | "closed";
  holidayMode: boolean;
  holidayMessage: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  hoursSunday: string;

  // Contacto & Redes
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappRepairNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  address: string;
  city: string;

  // Anuncios y Promociones
  topBanner: {
    enabled: boolean;
    text: string;
    badge: string;
    link: string;
    variant: "orange" | "dark" | "emerald";
  };
}

export type Timeframe = "7d" | "30d" | "month" | "year";

interface AdminState {
  settings: BusinessSettings;
  timeframe: Timeframe;
  updateSettings: (newSettings: Partial<BusinessSettings>) => void;
  resetSettings: () => void;
  setTimeframe: (tf: Timeframe) => void;
}

const defaultSettings: BusinessSettings = {
  isOpenOverride: "auto",
  holidayMode: false,
  holidayMessage: "Hoy cerrado por feriado. Retomamos la atención habitual el próximo día hábil.",
  hoursWeekdays: "09:00 - 13:00 hs y 16:30 - 20:00 hs",
  hoursSaturday: "09:30 - 13:30 hs",
  hoursSunday: "Cerrado",

  phoneDisplay: STORE_INFO.phoneDisplay,
  whatsappNumber: STORE_INFO.whatsappNumber,
  whatsappRepairNumber: STORE_INFO.whatsappNumber,
  instagramHandle: STORE_INFO.instagramHandle,
  instagramUrl: STORE_INFO.instagramUrl,
  address: STORE_INFO.address,
  city: STORE_INFO.city,

  topBanner: {
    enabled: true,
    badge: "PROMO",
    text: "10% de descuento abonando en efectivo en el local (Bv. Segui 1501)",
    link: "/catalogo",
    variant: "orange",
  },
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      timeframe: "30d",
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
      setTimeframe: (timeframe) => set({ timeframe }),
    }),
    {
      name: "shurian_admin_settings_v2",
    }
  )
);
