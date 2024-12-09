import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "@/config/database"; // Conexión a PostgreSQL

const SECRET_KEY = process.env.SECRET_KEY || "tu-clave-secreta";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, contrasena } = body;

    if (!email || !contrasena) {
      return NextResponse.json(
        { success: false, error: "Correo y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    // Obtener el rol del dominio del correo
    const domain = email.split("@")[1]?.split(".")[0]; // Obtener el dominio del correo
    let rol = domain;

    // Asignar el rol como "competidor" si no coincide con los roles conocidos
    if (!["instructor", "organizador", "administrador"].includes(rol)) {
      rol = "competidor";
    }

    let query = "";
    let idColumn = "";

    // Ajustar consulta y columna `id` según el rol
    if (rol === "instructor") {
      query = `SELECT id_instructor AS id, contraseña FROM instructor WHERE email = $1`;
      idColumn = "id_instructor";
    } else if (rol === "organizador") {
      query = `SELECT id_organizador AS id, contraseña FROM organizador WHERE email = $1`;
      idColumn = "id_organizador";
    } else if (rol === "administrador") {
      query = `SELECT id_administrador AS id, contraseña FROM administrador WHERE email = $1`;
      idColumn = "id_administrador";
    } else {
      query = `SELECT id_competidor AS id, contraseña FROM competidor WHERE email = $1`;
      idColumn = "id_competidor";
    }

    let result;
    try {
      result = await pool.query(query, [email]);
    } catch (dbError) {
      console.error("Error en la consulta de la base de datos:", dbError);
      return NextResponse.json(
        { success: false, error: "Error al consultar la base de datos" },
        { status: 500 }
      );
    }

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Correo no registrado" },
        { status: 404 }
      );
    }

    const { id, contraseña: hashedPassword } = result.rows[0];

    const isPasswordValid = await bcrypt.compare(contrasena, hashedPassword);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    console.log("Generando token con:", { id, email, rol });

    let token;
    try {
      token = jwt.sign({ id, email, rol }, SECRET_KEY, { expiresIn: "1h" });
    } catch (error) {
      console.error("Error al generar el token:", error);
      return NextResponse.json(
        { success: false, error: "Error al generar el token" },
        { status: 500 }
      );
    }

    // Determinar la URL de redirección según el rol
    const redirectUrl =
      rol === "instructor"
        ? "/instructor"
        : rol === "organizador"
        ? "/organizador"
        : rol === "administrador"
        ? "/administrador"
        : "/competidor";

    const response = NextResponse.json({
      success: true,
      message: "Sesión iniciada correctamente",
      redirectUrl, // URL de redirección basada en el rol
    });

    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
