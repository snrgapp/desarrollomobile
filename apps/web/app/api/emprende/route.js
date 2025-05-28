
import dbConnect from "@repo/db/lib/mongodb";
import { NextResponse } from "next/server";
import { UserModel } from "@repo/db/models/user";
import { EmprendeModel } from "@repo/db/models/emprendimiento";

import { verifyApiToken } from "@/lib/api-jwt-middleware";




//METODO POST api/user Crear un nuevo usuario
export async function POST(req) {
  // const { error, decodedToken } = await verifyApiToken(req);

  //   if (error) {
  //       return NextResponse.json({ message: 'Unauthorized', error }, { status: 401 });
  //   }
    
  try {
    // ✅ Conexión a la base de datos primero
    await dbConnect();

    // ✅ Extrae y valida el body
    const body = await req.json();
    console.log("llega por Body", body);

    // ✅ Verifica que el body tenga los campos requeridos

    const requiredFields = ['name', 'instagram', 'pagweb', 'actvivity', 'time', 'challenge'];
    const missingField = requiredFields.find(field => !body[field]);

    if (missingField) {
      return NextResponse.json({ error: `Falta el campo: ${missingField}` }, { status: 400 });
    }

    //Logica para traerme el userNumber del registro anterior
        let nextUserNumber;

        // 1. Encontrar el usuario con el userNumber más alto
        // Ordenamos por userNumber de forma descendente (-1) y limitamos a 1
        const lastUser = await UserModel.findOne().sort({ userNumber: -1 }).limit(1);

        if (lastUser) {
            // Si hay un último usuario, incrementa su userNumber
            nextUserNumber = lastUser.userNumber 
        }

    // ✅ Verifica si ya existe un emprendimiento registrado con ese nombre
    const existingempren = await EmprendeModel.findOne({ name: body.name });
    if (existingempren) {
      return NextResponse.json({ error: "Emprendimiento ya Registrado" }, { status: 400 });
    }

    console.log("userNumber", nextUserNumber);
    // ✅ Crea el nuevo emprendimiento
    const newBody = {
        ...body, 
        userNumber : nextUserNumber
    }

    // --- LOGICA PARA EL CAMPO 'instagram' ---
    if (newBody.instagram) {
        // Definimos el prefijo deseado
        const instagramPrefix = "https://www.instagram.com/";

        // Verificamos si la URL ya empieza con el prefijo completo
        if (!newBody.instagram.startsWith(instagramPrefix)) {
            // Si no empieza con el prefijo, asumimos que es solo el nombre de usuario
            // y le añadimos el prefijo.
            // También podemos añadir una pequeña validación para evitar '//' dobles
            if (!newBody.instagram.startsWith('instagram.com/') && !newBody.instagram.startsWith('www.instagram.com/')) {
                newBody.instagram = instagramPrefix + newBody.instagram.replace(/^@/, ''); // Elimina el '@' si el usuario lo ingresó
            } else if (newBody.instagram.startsWith('instagram.com/')) {
                newBody.instagram = 'https://www.' + newBody.instagram;
            } else if (newBody.instagram.startsWith('www.instagram.com/')) {
                newBody.instagram = 'https://' + newBody.instagram;
            }
        }
    }
    // --- FIN LOGICA PARA EL CAMPO 'instagram' ---

    // Crea el nuevo emprendimiento
    const newemprende = await EmprendeModel.create(newBody);
    // Aquí puedes agregar lógica adicional si es necesario, como enviar un correo de bienvenida

    
    
    // ✅ Respuesta exitosa
    return NextResponse.json({ message: "Empredimiento creado", emprendimiento: newemprende }, { status: 201 });

  } catch (error) {
    console.error("Error al crear el usuario", error);
    return NextResponse.json({ error: "Error interno al crear el usuario" }, { status: 500 });
  }
}

//METODO GET api/user Buscar todo los usuarios

export async function GET(req) {

   console.log("Authorization header:", req.headers.authorization);

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

