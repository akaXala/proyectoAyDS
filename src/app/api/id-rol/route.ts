import { NextRequest } from "next/server";
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
    const rol = payload.rol as string;

    if (!id) {
      return new Response("ID no válido en el token", { status: 400 });
    }

    if (!rol) {
        return new Response("Rol no válido en el token", { status: 400 });
      }

    // Retornar únicamente el ID
    return new Response(JSON.stringify({ id, rol }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return new Response("Token inválido o expirado", { status: 401 });
  }
};
