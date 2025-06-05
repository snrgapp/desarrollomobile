import { verifyApiToken } from "@/lib/api-jwt-middleware";
import { usernumber } from "@/lib/generateusernumber";
import dbConnect from "@repo/db/lib/mongodb";
import { UserModel } from "@repo/db/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// export const runtime = 'nodejs'; // 👈 MUY IMPORTANTE para que Mongoose funcione
// export const dynamic = 'force-dynamic'; // 👈 Evita el cacheo de Next.js

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("📥 Body recibido:", body);

    const isWeb = body.source === 'web';
    const requiredFields = isWeb
      ? ['email', 'password', 'source']
      : ['name', 'lastname', 'email', 'phone', 'password', 'source'];

    const missingField = requiredFields.find(field => !body[field]);
    if (missingField) {
      return NextResponse.json(
        { error: `Falta el campo: ${missingField}` },
        { status: 400 }
      );
    }
    const bodytypeuser = body.typeofuser
    const existingUser = await UserModel.findOne({ email: body.email });

    if (isWeb && bodytypeuser === 'admin') {
      const adminCheck = await UserModel.findOne({ typeofuser: 'admin' });
      if (adminCheck) {
        return NextResponse.json({ error: "Ya existe un Administrador de Plataforma." }, { status: 400 });
      }
    }

    if (existingUser) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await UserModel.create({
      ...body, 
         password: hashedPassword, 
         userNumber: await usernumber(),
         lastLogin: new Date(),
    });

    const { password, ...userWithoutPassword } = newUser._doc;
    console.log("✅ Usuario creado:", userWithoutPassword);

    return NextResponse.json({ message: "Usuario creado", user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    return NextResponse.json({ error: "Error interno al crear el usuario" }, { status: 500 });
  }
}


//METODO GET api/user Buscar todo los usuarios

export async function GET(req) {
  console.log("Authorization header buscar usuarios:", req.headers);

  const { error, decodedToken } = await verifyApiToken(req); // Verifica el JWT de tu API

  if (error) {
    return NextResponse.json(
      { message: "Unauthorized", error },
      { status: 401 }
    );
  }

  // El decodedToken contendrá el id, email, name que pusiste en el JWT personalizado
  console.log("Authenticated user ID (from JWT):", decodedToken.id);

  try {
    // ✅ Conexión a la base de datos

    await dbConnect();

    //Consulta a la base de datos
    // console.log(mongoose.connection.readyState)
    const allUsers = await UserModel.find();
    //  console.log(mongoose.connection.readyState)

    // Validación de la respuesta
    // if (!allUsers){
    //   return NextResponse.json({message: "Por el momento no hay usuarios"}, {status: 404})
    // }

    //Mostramos la respuesta

    return NextResponse.json(
      { message: "Lista de usuarios Registrados", data: allUsers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    return NextResponse.json(
      { error: "Error interno al obtener los usuarios" },
      { status: 500 }
    );
  }
}
