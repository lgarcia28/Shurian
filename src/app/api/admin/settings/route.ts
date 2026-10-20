import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SETTINGS_FILE_PATH = path.join(process.cwd(), "src", "data", "settings.json");

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
};

function readSettingsFromFile() {
  try {
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const fileData = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
      return { ...defaultSettings, ...JSON.parse(fileData) };
    }
  } catch (error) {
    console.error("Error reading settings.json:", error);
  }
  return defaultSettings;
}

function writeSettingsToFile(data: any) {
  try {
    const dir = path.dirname(SETTINGS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing settings.json:", error);
    return false;
  }
}

export async function GET() {
  const settings = readSettingsFromFile();
  return NextResponse.json(settings, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = readSettingsFromFile();
    const updated = {
      ...current,
      ...body,
      topBanner: {
        ...current.topBanner,
        ...(body.topBanner || {}),
      },
    };

    writeSettingsToFile(updated);

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
