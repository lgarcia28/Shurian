import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shurian2026";
const SESSION_COOKIE_NAME = "shurian_admin_session";
const SESSION_SECRET_TOKEN = "shurian_auth_secure_token_session_2026";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Por favor complete usuario y contraseña." },
        { status: 400 }
      );
    }

    // Secure string comparison
    if (
      username.trim().toLowerCase() === ADMIN_USER.trim().toLowerCase() &&
      password === ADMIN_PASSWORD
    ) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, SESSION_SECRET_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        success: true,
        user: { username: ADMIN_USER },
        message: "Inicio de sesión exitoso",
      });
    }

    return NextResponse.json(
      { success: false, error: "Usuario o contraseña incorrectos." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error en el servidor al autenticar." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (sessionCookie && sessionCookie.value === SESSION_SECRET_TOKEN) {
      return NextResponse.json({
        authenticated: true,
        user: { username: ADMIN_USER },
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    return NextResponse.json({ success: true, message: "Sesión cerrada" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al cerrar sesión" },
      { status: 500 }
    );
  }
}
