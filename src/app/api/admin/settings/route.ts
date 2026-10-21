import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Global in-memory cache for serverless environments (e.g. Vercel)
declare global {
  var __shurianSettings: any;
}

const LOCAL_SETTINGS_PATH = path.join(process.cwd(), "src", "data", "settings.json");
const TMP_SETTINGS_PATH = path.join("/tmp", "shurian_settings.json");

const defaultSettings = {
  isOpenOverride: "auto",
  holidayMode: false,
  holidayMessage: "Hoy cerrado por feriado. Retomamos la atención habitual el próximo día hábil.",
  hoursWeekdays: "09:00 - 13:00 hs y 16:30 - 20:00 hs",
  hoursSaturday: "09:30 - 13:30 hs",
  hoursSunday: "Cerrado",
  phoneDisplay: "341 755-1501",
  whatsappNumber: "5493417551501",
  whatsappRepairNumber: "5493417551501",
  instagramHandle: "@shurian.pc",
  instagramUrl: "https://www.instagram.com/shurian.pc/",
  address: "Bv. Segui 1501",
  city: "Rosario, Santa Fe",
  topBanner: {
    enabled: true,
    badge: "PROMO",
    text: "10% de descuento abonando en efectivo en el local (Bv. Segui 1501)",
    link: "/catalogo",
    variant: "orange",
  },
  updatedAt: 1,
};

function readSettings(): any {
  // 1. Check in-memory global cache first
  if (globalThis.__shurianSettings) {
    return { ...defaultSettings, ...globalThis.__shurianSettings };
  }

  // 2. Check /tmp file (writable on Vercel lambda)
  try {
    if (fs.existsSync(TMP_SETTINGS_PATH)) {
      const data = fs.readFileSync(TMP_SETTINGS_PATH, "utf-8");
      const parsed = JSON.parse(data);
      globalThis.__shurianSettings = parsed;
      return { ...defaultSettings, ...parsed };
    }
  } catch (e) {
    // Ignore error
  }

  // 3. Check local bundled file
  try {
    if (fs.existsSync(LOCAL_SETTINGS_PATH)) {
      const data = fs.readFileSync(LOCAL_SETTINGS_PATH, "utf-8");
      const parsed = JSON.parse(data);
      globalThis.__shurianSettings = parsed;
      return { ...defaultSettings, ...parsed };
    }
  } catch (e) {
    // Ignore error
  }

  return defaultSettings;
}

function saveSettings(settings: any): boolean {
  globalThis.__shurianSettings = settings;

  // 1. Try saving to /tmp (works in Vercel lambda)
  try {
    fs.writeFileSync(TMP_SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
  } catch (e) {
    // Ignore error
  }

  // 2. Try saving to local file (works in development)
  try {
    const dir = path.dirname(LOCAL_SETTINGS_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
  } catch (e) {
    // Catch read-only filesystem error on Vercel silently
  }

  return true;
}

export async function GET() {
  const settings = readSettings();
  return NextResponse.json(settings, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = readSettings();
    const updated = {
      ...current,
      ...body,
      topBanner: {
        ...current.topBanner,
        ...(body.topBanner || {}),
      },
      updatedAt: body.updatedAt || Date.now(),
    };

    saveSettings(updated);

    return NextResponse.json({
      success: true,
      settings: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al guardar configuraciones en el servidor" },
      { status: 500 }
    );
  }
}
