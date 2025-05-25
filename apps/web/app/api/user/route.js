
import dbConnect from "@repo/db/lib/mongodb";
import { NextResponse } from "next/server";
import { UserModel } from "@repo/db/models/user";


//METODO POST api/user Crear un nuevo usuario
export async function POST(req) {
  try {
    // ✅ Conexión a la base de datos primero
    await dbConnect();

    // ✅ Extrae y valida el body
    const body = await req.json();
    console.log("llega por Body", body);

    // ✅ Verifica que el body tenga los campos requeridos

    const requiredFields = ['name', 'lastname', 'email', 'phone', 'password'];
    const missingField = requiredFields.find(field => !body[field]);

    if (missingField) {
      return NextResponse.json({ error: `Falta el campo: ${missingField}` }, { status: 400 });
    }

     // --- Lógica para generar el userNumber ---
        let nextUserNumber;

        // 1. Encontrar el usuario con el userNumber más alto
        // Ordenamos por userNumber de forma descendente (-1) y limitamos a 1
        const lastUser = await UserModel.findOne().sort({ userNumber: -1 }).limit(1);

        if (lastUser) {
            // Si hay un último usuario, incrementa su userNumber
            nextUserNumber = lastUser.userNumber + 1;
        } else {
            // Si la colección está vacía, el primer userNumber es 100001
            nextUserNumber = 100001;
        }

    // ✅ Verifica si ya existe un usuario con ese email
    const existingUser = await UserModel.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
    }

    console.log("userNumber", nextUserNumber);
    // ✅ Crea el nuevo usuario
    const newBody = {
        ...body, 
        userNumber : nextUserNumber
    }
    const newUser = await UserModel.create(newBody);
    // Aquí puedes agregar lógica adicional si es necesario, como enviar un correo de bienvenida

    // ✅ Respuesta exitosa
    // Elimina el campo password antes de enviar la respuesta
    const { password, ...userWithoutPassword } = newUser._doc;

    console.log("Usuario creado", userWithoutPassword);

    return NextResponse.json({ message: "Usuario creado", user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("Error al crear el usuario", error);
    return NextResponse.json({ error: "Error interno al crear el usuario" }, { status: 500 });
  }
}

//METODO GET api/user Buscar todo los usuarios
