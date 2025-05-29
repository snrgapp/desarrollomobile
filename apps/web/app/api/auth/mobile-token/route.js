
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route"; // Importa tus opciones de auth
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(request) {
    const session = await getServerSession(authOptions);

    console.log("esto es session",session)

    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    // Aquí creamos un JWT personalizado para tu app móvil
    // El secreto DEBE ser diferente al NEXTAUTH_SECRET (para seguridad)
    // O puedes usar el mismo secreto pero ser consciente de los riesgos.
    // Se recomienda un secreto solo para JWTs de API.
    const apiSecret = process.env.API_JWT_SECRET || 'fallback_api_jwt_secret_please_change_me';
    if (apiSecret === 'fallback_api_jwt_secret_please_change_me') {
      console.warn('WARNING: API_JWT_SECRET is not set in .env.local. Please set a strong, unique secret.');
    }

    //console.log(session)

    // Incluimos si el usuario se autenticó con Google
    const provider = session.user?.provider || "credentials"; // Fallback a "credentials" si no hay info

    const token = jwt.sign(
        {
            id: session.user.id, // ID del usuario de MongoDB
            email: session.user.email,
            name: session.user.name,
            provider: provider, // puede ser 'google' o 'credentials'
           // regisession: "2", // si es 2 es porque es un usuario registrado desde la google auth
            // ... cualquier otra información relevante del usuario que quieras en el token
        },
        apiSecret,
        { expiresIn: '1h' } // Token expira en 1 hora
    );
console.log("Token generado para la app móvil:", token);
    return NextResponse.json({ token });
}