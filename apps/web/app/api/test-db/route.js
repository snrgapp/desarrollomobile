// apps/web/app/api/test-db/route.js
// O apps/web/pages/api/test-db.js (para Pages Router, renombra a handler)

// AJUSTE LA RUTA AHORA:
//import dbConnect from '../../libs/mongodb'; // <<-- ESTE ES EL CAMBIO


import dbConnect from '@repo/db/lib/mongodb'; // Ajusta la ruta según tu estructura de carpetas

import mongoose from 'mongoose'; // Necesario para crear un esquema/modelo de prueba

// Define un esquema y modelo simple de prueba
const TestSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);

export async function GET(request) {
  try {
    await dbConnect(); // Conecta a la base de datos

    const result = await Test.create({ message: 'Conexión exitosa y documento insertado.' });

    console.log('✅ Documento de prueba insertado:', result);

    return new Response(JSON.stringify({
      message: 'Conexión a la base de datos exitosa y documento de prueba insertado.',
      insertedId: result._id,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('❌ Error al conectar o insertar en la DB:', error);
    return new Response(JSON.stringify({ error: 'Error al conectar o insertar en la DB.', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}