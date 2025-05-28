// packages/db/lib/mongodb.js
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from 'mongodb'; // <-- ¡Añade esta importación!

// Configuración global para Mongoose
mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.DB_COMPASS;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DB_COMPASS environment variable inside .env.local'
  );
}

// Variables globales para cachear tanto Mongoose como MongoClient
let cachedMongoose = global.mongoose;
let cachedMongoClient = global.mongoClient; // <-- Nueva variable para MongoClient

if (!cachedMongoose) {
  cachedMongoose = global.mongoose = { conn: null, promise: null };
}
if (!cachedMongoClient) { // Inicializa el caché de MongoClient
    cachedMongoClient = global.mongoClient = { conn: null, promise: null };
}


// Función de conexión para Mongoose (la que ya tenías)
async function dbConnect() {
  if (cachedMongoose.conn) {
    console.log("Mongoose ya está conectado (reutilizando conexión existente)");
    return cachedMongoose.conn;
  }

  if (!cachedMongoose.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 50000,
      socketTimeoutMS: 55000,
    };

    cachedMongoose.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('🎉🎉🎉 Mongoose CONECTADO a MongoDB Atlas 🎉🎉🎉');
        console.log('######################');
        console.log(`###### DB: ${mongooseInstance.connection.name || 'Synergy_DB'} ######`);
        console.log('######################');
        return mongooseInstance;
      })
      .catch(error => {
        console.error('❌❌❌ ERROR AL CONECTAR Mongoose a MongoDB Atlas:', error.message);
        cachedMongoose.conn = null;
        cachedMongoose.promise = null;
        throw error;
      });
  }

  cachedMongoose.conn = await cachedMongoose.promise;
  return cachedMongoose.conn;
}

// Nueva función o promesa para el cliente nativo de MongoDB
// Esto es lo que NextAuth.js Adapter espera
async function getMongoClientPromise() {
    if (cachedMongoClient.conn) {
        return cachedMongoClient.conn;
    }

    if (!cachedMongoClient.promise) {
        const client = new MongoClient(MONGODB_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        cachedMongoClient.promise = client.connect();
    }
    cachedMongoClient.conn = await cachedMongoClient.promise;
    return cachedMongoClient.conn;
}

export default dbConnect; // Exporta tu función de conexión de Mongoose
export const clientPromise = getMongoClientPromise(); // <-- Exporta la promesa del cliente nativo