import { NextResponse } from "next/server";
import { fetchElitCategoriesAndBrands } from "@/services/elit";

export async function GET() {
  try {
    const data = await fetchElitCategoriesAndBrands();
    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("API /api/categories error:", error);
    return NextResponse.json(
      { success: false, categorias: [], marcas: [] },
      { status: 500 }
    );
  }
}
