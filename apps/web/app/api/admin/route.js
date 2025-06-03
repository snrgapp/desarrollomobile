import connectDB from '@repo/db/lib/mongodb';
import { UserModel } from '@repo/db/models/user';
import jwt from 'jsonwebtoken'; // Aunque no se usa directamente aquí, puede ser para otras funciones.
import { NextResponse } from 'next/server';
import { verifyApiToken } from "@/lib/api-jwt-middleware";

export async function GET(req) {
  console.log("Authorization header buscar usuarios:", req.headers.get("authorization"));

  const { error, decodedToken } = await verifyApiToken(req);

  if (error) {
    return NextResponse.json({ message: "Unauthorized", error }, { status: 401 });
  }

  console.log("Authenticated user ID (from JWT):", decodedToken.id);

  if (!decodedToken.isAdmin && decodedToken.typeofuser !== 'admin') {
    return NextResponse.json({ error: "Acceso solo administradores" }, { status: 403 });
  }

  try {
    await connectDB();

    // 1. Obtener los parámetros de consulta de la URL
    const url = new URL(req.url);
    const dateRange = url.searchParams.get('dateRange') || 'all'; // '24h', '7d', '30d', 'all'
    const userType = url.searchParams.get('userType') || 'all';   // 'all', 'web', 'mobile'

    const now = new Date();

    // 2. Construir los filtros de MongoDB dinámicamente
    let baseFilter = {}; // Filtro base que se aplicará a todas las consultas

    // A. Filtro por tipo de usuario (userType)
    if (userType !== 'all') {
      // Asumiendo que tu UserModel tiene un campo 'source' o similar que indica 'web' o 'mobile'
      baseFilter.source = userType;
    }

    // B. Filtro por rango de fecha (dateRange) para todas las métricas
    let dateFilter = {};
    if (dateRange === '24h') {
      dateFilter = { createdAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } };
    } else if (dateRange === '7d') {
      dateFilter = { createdAt: { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } };
    } else if (dateRange === '30d') {
      dateFilter = { createdAt: { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } };
    }
    // Si dateRange es 'all', no se añade filtro de fecha específico al baseFilter
    // (ya que no queremos limitar por fecha en ese caso)

    // Combinar el filtro base con el filtro de fecha para las consultas generales
    const combinedFilter = { ...baseFilter, ...dateFilter };


    // 3. Aplicar los filtros a las consultas de estadísticas individuales

    // usersTotal: Total de usuarios que cumplen con los filtros
    const usersTotal = await UserModel.countDocuments(combinedFilter);

    // login24h, login72h: Filtrar también por tipo de usuario si aplica
    // Nota: El filtro de tiempo para lastLogin se sigue aplicando individualmente
    // porque dateFilter es para 'createdAt'.
    const login24h = await UserModel.countDocuments({
      ...baseFilter, // Aplica el filtro de userType
      lastLogin: { $gte: new Date(now - 24 * 60 * 60 * 1000) }
    });
    const login72h = await UserModel.countDocuments({
      ...baseFilter, // Aplica el filtro de userType
      lastLogin: { $gte: new Date(now - 72 * 60 * 60 * 1000) }
    });

    // matched: Filtrar también por tipo de usuario y fecha si aplica
    const matched = await UserModel.countDocuments({ hasMatch: true, ...combinedFilter });


    // 4. Adaptar la agregación 'activity' para incluir los filtros
    // La agregación 'activity' se basa en `createdAt`, por lo que el `combinedFilter` le va bien.
    // Además, la agregación solo muestra datos de los últimos 7 días. Si dateRange es 'all'
    // o '30d', la actividad debería reflejar ese rango.
    let activityDateMatch = {};
    if (dateRange === '24h') {
      activityDateMatch = { createdAt: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) } };
    } else if (dateRange === '7d') {
      activityDateMatch = { createdAt: { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } };
    } else if (dateRange === '30d') {
      activityDateMatch = { createdAt: { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } };
    }
    // Si 'all', no se aplica filtro de fecha aquí para la actividad, lo que significa
    // que mostrará toda la actividad agrupada por día.

    const activity = await UserModel.aggregate([
      { $match: { ...baseFilter, ...activityDateMatch } }, // Aplica filtro de tipo de usuario y el rango de fecha específico para actividad
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);


    // 5. Añadir un nuevo gráfico: Usuarios por Fuente (para el BarChart)
    const usersBySource = await UserModel.aggregate([
      { $match: combinedFilter }, // Aplica el filtro combinado
      {
        $group: {
          _id: "$source", // Agrupa por el campo 'source' (ej: 'web', 'mobile')
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Opcional: ordenar por el nombre de la fuente
    ]);


    return NextResponse.json(
      {
        usersTotal,
        login24h,
        login72h,
        matched,
        activity,
        usersBySource // ✅ Nuevo dato para el BarChart
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error al obtener datos del dashboard:", err); // Log más detallado del error
    return NextResponse.json({ error: "Error interno del servidor al obtener datos del dashboard" }, { status: 500 });
  }
}