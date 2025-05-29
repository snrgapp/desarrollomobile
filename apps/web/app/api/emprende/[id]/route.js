import dbConnect from "@repo/db/lib/mongodb";
import { NextResponse } from "next/server";
import { UserModel } from "@repo/db/models/user";

//METODO PUT api/user/:id Actualizar un usuario por email

export async function PUT(req, {params}){
  const { error, decodedToken } = await verifyApiToken(req); // Verifica el JWT de tu API
  
      if (error) {
          return NextResponse.json({ message: 'Unauthorized', error }, { status: 401 });
      }
  
      // El decodedToken contendrá el id, email, name que pusiste en el JWT personalizado
      console.log('Authenticated user ID (from JWT):', decodedToken.id);

  try {

        // ✅ Conexión a la base de datos
        await dbConnect();

        // ✅ ¡ESTA ES LA LÍNEA CRUCIAL PARA QUITAR LA ADVERTENCIA!
        // Primero, espera la resolución del objeto params
        const resolvedParams = await params; 

        // Luego, desestructura o accede a la propiedad 'id' (que es tu email)
        const { id: email } = resolvedParams; 
        // O si prefieres: const email = resolvedParams.id;

        console.log("USUARIO email a actualizar: ", email); // Esto ahora será la cadena de email directamente

        // ✅ Verificamos que el email sea válido
        if (!email) {
        return NextResponse.json({ error: "Falta el email para poder realizar la actualizacion" }, { status: 400 });
        }
        // ✅ Verificamos que el body tenga los campos requeridos
        const body = await req.json();
        console.log("Datos para actualizar", body);

        //Actualizo la informacion del usuario por el email
        const userUpdate = await UserModel.findOneAndUpdate(
            {email: email},
            body, 
            {new :true, runValidators:true} // new:true devuelve el documento actualizado, runValidators:true aplica las validaciones del modelo

        )

        //Sino encontro el usuario, devolvemos un error
        if (!userUpdate) {
        return NextResponse.json({ error: "Usuario no encontrado para actualizar" }, { status: 404 });
        }

        return NextResponse.json({message: "Datos actualizados",userUpdate}, { status: 200 });
    
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
        return NextResponse.json({ error: "Error interno al actualizar el usuario" }, { status: 500 });
    
  }
}

//METODO DELETE api/user/:id Eliminar un usuario por email

export async function DELETE(req, {params}){

   const { error, decodedToken } = await verifyApiToken(req); // Verifica el JWT de tu API
  
      if (error) {
          return NextResponse.json({ message: 'Unauthorized', error }, { status: 401 });
      }
  
      // El decodedToken contendrá el id, email, name que pusiste en el JWT personalizado
      console.log('Authenticated user ID (from JWT):', decodedToken.id);

  try {
     // ✅ Conexión a la base de datos
        await dbConnect();

        // ✅ ¡ESTA ES LA LÍNEA CRUCIAL PARA QUITAR LA ADVERTENCIA!
        // Primero, espera la resolución del objeto params
        const resolvedParams = await params; 

        // Luego, desestructura o accede a la propiedad 'id' (que es tu email)
        const { id: email } = resolvedParams; 
        // O si prefieres: const email = resolvedParams.id;

        console.log("USUARIO email a eliminar: ", email); // Esto ahora será la cadena de email directamente

        // ✅ Verificamos que el email sea válido
        if (!email) {
        return NextResponse.json({ error: "Falta el email para eliminar usuario" }, { status: 400 });
        }

    //Buscamos al usuario para eliminar en la BD 
    const userUpdate = await UserModel.findOneAndDelete(
        {email: email},
        {runValidators:true} // runValidators:true aplica las validaciones del modelo
    )

    //Sino encontro el usuario, devolvemos un error
    if (!userUpdate) {
      return NextResponse.json({ error: "Usuario no encontrado para eliminar" }, { status: 404 });
    }

    return NextResponse.json({message: "Datos Eliminados de la Synergy_DB",userUpdate}, { status: 200 });
    
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    return NextResponse.json({ error: "Error interno al actualizar el usuario" }, { status: 500 });
    
  }
}