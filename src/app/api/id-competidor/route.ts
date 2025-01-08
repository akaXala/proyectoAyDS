import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || "tu-clave-secreta");

export const GET = async (req: NextRequest) => {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.get("auth")?.value;

    if (!token) {
      return new Response("Token no encontrado", { status: 401 });
    }

    // Verificar el token y extraer la carga útil
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // Asegurar que el token contiene un campo `id`
    const id = payload.id as string;
    if (!id) {
      return new Response("ID no válido en el token", { status: 400 });
    }

    // Retornar únicamente el ID
    return new Response(id, { status: 200 });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return new Response("Token inválido o expirado", { status: 401 });
  }
};
