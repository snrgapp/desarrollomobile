import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    let filePath;

    if (process.env.NODE_ENV === 'development') {
      // Ruta para entorno de desarrollo
      filePath = path.join(process.cwd(), '..', '..', 'packages', 'swagger-doc', 'swagger.json');
    } else {
      // Ruta para producción, por ejemplo dentro del build o en otra carpeta
      filePath = path.join(process.cwd(), 'public', 'swagger.json');
    }

    console.log('📂 Cargando swagger.json desde:', filePath);

    const jsonData = await fs.readFile(filePath, 'utf8');
    const swaggerDocument = JSON.parse(jsonData);

    return NextResponse.json(swaggerDocument);
  } catch (error) {
    console.error('❌ Error cargando swagger.json:', error);
    return new NextResponse('Error al cargar Swagger JSON', { status: 500 });
  }
}
