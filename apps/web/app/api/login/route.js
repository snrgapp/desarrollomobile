import dbConnect from "@repo/db/lib/mongodb"; // Ajusta la ruta si es diferente
import { UserModel } from "@repo/db/models/user"; // Ajusta la ruta si es diferente
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const apiSecret =
  process.env.API_JWT_SECRET || "fallback_api_jwt_secret_please_change_me";

export async function POST(req) {
  try {
    console.log("entrando a la ruta de login");
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // ✅ Crear JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      apiSecret,
      { expiresIn: "1d" } // puedes ajustar el tiempo de expiración
    );

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error al hacer login:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
