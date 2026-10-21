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

  updatedAt?: number;
}

export type Timeframe = "7d" | "30d" | "month" | "year";

interface AdminState {
  settings: BusinessSettings;
  timeframe: Timeframe;
  fetchSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<BusinessSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
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
  updatedAt: 1,
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      timeframe: "30d",

      fetchSettings: async () => {
        try {
          const res = await fetch("/api/admin/settings", { cache: "no-store" });
          if (res.ok) {
            const serverSettings = await res.json();
            const currentLocal = get().settings;
            const localTimestamp = currentLocal?.updatedAt || 0;
            const serverTimestamp = serverSettings?.updatedAt || 0;

            // Only overwrite if server has newer or equal timestamp
            if (serverTimestamp >= localTimestamp) {
              set({ settings: { ...defaultSettings, ...serverSettings } });
            } else if (localTimestamp > serverTimestamp) {
              // Local is newer: sync local to server
              fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentLocal),
              }).catch(() => {});
            }
          }
        } catch (err) {
          console.error("Error fetching admin settings from server:", err);
        }
      },

      updateSettings: async (newSettings) => {
        const timestamp = Date.now();
        const current = get().settings;
        const merged: BusinessSettings = {
          ...current,
          ...newSettings,
          topBanner: {
            ...current.topBanner,
            ...(newSettings.topBanner || {}),
          },
          updatedAt: timestamp,
        };

        // 1. Immediately update local store (persists in localStorage)
        set({ settings: merged });

        // 2. Persist to API
        try {
          const res = await fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(merged),
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.settings) {
              set({ settings: { ...merged, ...data.settings } });
            }
          }
        } catch (err) {
          console.error("Error saving settings to server:", err);
        }
      },

      resetSettings: async () => {
        const resetData: BusinessSettings = {
          ...defaultSettings,
          updatedAt: Date.now(),
        };
        set({ settings: resetData });
        try {
          await fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resetData),
          });
        } catch (err) {
          console.error("Error resetting settings on server:", err);
        }
      },

      setTimeframe: (timeframe) => set({ timeframe }),
    }),
    {
      name: "shurian_admin_settings_v3",
    }
  )
);
