// packages/db/lib/mongodb.js
// O app/libs/mongodb.js - Asegúrate de que esta sea la ruta correcta donde tienes tu dbConnect

import mongoose from "mongoose";

// Configuración global para Mongoose
mongoose.set("strictQuery", false);

// Asegúrate de que tu URL de conexión a MongoDB esté definida en tus variables de entorno (.env.local, .env)
const MONGODB_URI = process.env.DB_COMPASS; // Ajusta el nombre de la variable si es diferente

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DB_COMPASS environment variable inside .env.local'
  );
}

// Verifica si estamos en un entorno de desarrollo (NODE_ENV no es 'production')
const isDevelopment = process.env.NODE_ENV !== 'production';

// Usa una variable global para cachear la conexión solo en desarrollo,
// pero con un enfoque más "limpio" para evitar problemas de HMR
// Para producción, se comportará como el patrón global.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function dbConnect() {
  // En producción, siempre usa la conexión cacheada.
  // En desarrollo, también intentará usar la cacheada primero para eficiencia,
  // pero la diferencia principal es que si el HMR la rompe,
  // la siguiente solicitud simplemente volverá a intentar conectar.

  // Si ya tenemos una conexión cacheada, la reutilizamos
  if (cached.conn) {
    console.log("Mongoose ya está conectado (reutilizando conexión existente)");
    return cached.conn;
  }

  // Si no hay una promesa de conexión en curso, iniciamos una nueva
  if (!cached.promise) {
    const opts = {
      bufferCommands: true, // Esto es crucial: Mongoose esperará a que la conexión esté lista
      serverSelectionTimeoutMS: 50000, // 30 segundos para encontrar el servidor
      socketTimeoutMS: 55000, // 45 segundos para operaciones de lectura/escritura
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('🎉🎉🎉 Mongoose CONECTADO a MongoDB Atlas 🎉🎉🎉');
        console.log('######################');
        console.log(`###### DB: ${mongooseInstance.connection.name || 'Synergy_DB'} ######`);
        console.log('######################');
        return mongooseInstance;
      })
      .catch(error => {
        console.error('❌❌❌ ERROR AL CONECTAR Mongoose a MongoDB Atlas:', error.message);
        // Si hay un error, reseteamos el caché para que la próxima llamada intente una nueva conexión
        cached.conn = null;
        cached.promise = null;
        throw error; // Propagamos el error
      });
  }

  // Esperamos a que la conexión se resuelva
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// const dbConnect = async () => {
//     try {
//         await mongoose.connect(process.env.DB_COMPASS);
//         console.log('Mongoose is connected');
//         console.log("######################");
//         console.log("###### API REST ######");
//         console.log("######################");

//         // Llamar a la función de actualización del esquema después de la conexión
//       //  await updateSchema();
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error; // Relanzar el error para que pueda ser manejado en el contexto superior
//     }
// };

// export default dbConnect;
