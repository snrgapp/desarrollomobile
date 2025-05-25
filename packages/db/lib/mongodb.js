// app/libs/mongodb.js
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

// Asegúrate de que tu URL de conexión a MongoDB esté definida en tus variables de entorno (.env.local)
const MONGODB_URI = process.env.DB_COMPASS;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DB_COMPASS environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // console.log("Mongoose is already connected (reusing existing connection)"); // Puedes descomentar esto para ver cuando se reutiliza
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true, // Deshabilita el buffering de comandos
      // useNewUrlParser: true, // Ya es el valor por defecto en versiones recientes de Mongoose
      // useUnifiedTopology: true, // Ya es el valor por defecto en versiones recientes de Mongoose
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Mongoose is connected');
      console.log('######################');
      console.log('###### DB Synergy ######');
      console.log('######################');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;