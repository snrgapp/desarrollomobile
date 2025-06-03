
import dbConnect from "@repo/db/lib/mongodb";
import { NextResponse } from "next/server";
import { UserModel } from "@repo/db/models/user";
import { verifyApiToken } from "@/lib/api-jwt-middleware";
import bcrypt from 'bcrypt';
import { usernumber } from "@/lib/generateusernumber";


// export const runtime = 'nodejs'; // 👈 MUY IMPORTANTE para que Mongoose funcione
// export const dynamic = 'force-dynamic'; // 👈 Evita el cacheo de Next.js


//METODO POST api/user Crear un nuevo usuario
export async function POST(req) {
  try {
    // Conexion a la base de datos
    await dbConnect();
    // Verifica el body 
    const body = await req.json();
    console.log("📥 Body recibido:", body);

    // 🕵️‍♂️ Verificar el origen del usuario
    const isWeb = body.source === 'web';

    body.typeofuser = isWeb ? 'admin' : 'user';

    // 🧪 Validar campos requeridos
    const requiredFields = isWeb
      ? ['email', 'password', 'source']
      : ['name', 'lastname', 'email', 'phone', 'password', 'source'];

    // Verificar si faltan campos requeridos
    const missingField = requiredFields.find(field => !body[field]);
    if (missingField) {
      return NextResponse.json({ error: `Falta el campo: ${missingField}` }, { status: 400 });
    }

    // 🛑 Verificar duplicados
    if (isWeb) {
      const existingUser = await UserModel.findOne({
        $or: [{ email: body.email }, { typeofuser: 'admin' }]
      });

      if (existingUser) {
        if (existingUser.email === body.email) {
          return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
        }
        if (existingUser.typeofuser === 'admin') {
          return NextResponse.json({ error: "Ya existe un Administrador creado" }, { status: 400 });
        }
      }
    } else {
      const existingUser = await UserModel.findOne({ email: body.email });
      if (existingUser) {
        return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
      }
    }

    // 🔐 Encriptar contraseña y crear usuario
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Generar un número de usuario único
    const newUser = await UserModel.create({
      ...body,
      password: hashedPassword,
      userNumber: await usernumber(),
    });

    // Eliminar el campo de contraseña del objeto de usuario antes de enviarlo
    // Esto es importante para no exponer la contraseña en la respuesta
    const { password, ...userWithoutPassword } = newUser._doc;
    console.log("✅ Usuario creado:", userWithoutPassword);

    // Respuesta exitosa
    return NextResponse.json({ message: "Usuario creado", user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    return NextResponse.json({ error: "Error interno al crear el usuario" }, { status: 500 });
  }
}

//METODO GET api/user Buscar todo los usuarios

export async function GET(req) {

   ///console.log("Authorization header buscar usuarios:", req.headers.authorization);

  const { error, decodedToken } = await verifyApiToken(req); // Verifica el JWT de tu API

    if (error) {
        return NextResponse.json({ message: 'Unauthorized', error }, { status: 401 });
    }

    // El decodedToken contendrá el id, email, name que pusiste en el JWT personalizado
    console.log('Authenticated user ID (from JWT):', decodedToken.id);

  try {

    // ✅ Conexión a la base de datos

    await dbConnect()

    //Consulta a la base de datos
   // console.log(mongoose.connection.readyState)
    const allUsers = await UserModel.find()
  //  console.log(mongoose.connection.readyState)

    // Validación de la respuesta
    // if (!allUsers){
    //   return NextResponse.json({message: "Por el momento no hay usuarios"}, {status: 404})
    // }

    //Mostramos la respuesta

    return NextResponse.json({message: "Lista de usuarios Registrados", data: allUsers},{status:200})
    
    
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    return NextResponse.json({ error: "Error interno al obtener los usuarios" }, { status: 500 });
    
  }
}

