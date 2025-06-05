import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  console.log("esto es session:", session);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // ✅ Asegura que todos los campos estén presentes antes de usarlos
  const { user } = session;
  const userId = user?.id;
  const email = user?.email;
  const name = user?.name;
  const typeofuser = user?.typeofuser || "user"; // valor por defecto si falta
  const provider = user?.provider || "google"; // fallback si no está definido

  if (!userId || !email) {
    return NextResponse.json({ message: "User data incomplete" }, { status: 400 });
  }

  // ✅ Usa un secreto distinto para JWTs de la app móvil
  const apiSecret = process.env.API_JWT_SECRET || "fallback_api_jwt_secret_please_change_me";
  if (apiSecret === "fallback_api_jwt_secret_please_change_me") {
    console.warn("WARNING: API_JWT_SECRET is not set. Please define it in your .env file.");
  }

  const token = jwt.sign(
    {
      id: userId,
      email,
      name,
      provider,
      typeofuser,
    },
    apiSecret,
    { expiresIn: "1h" }
  );

  console.log("✅ Token generado para la app móvil:", token);

  return NextResponse.json({ token });
}
