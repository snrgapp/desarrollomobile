import connectDB from '@repo/db/lib/mongodb';
import { UserModel } from '@repo/db/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { verifyApiToken } from "@/lib/api-jwt-middleware";


export async function GET(req) {
  console.log("Authorization header buscar usuarios:", req.headers.get("authorization"));

  const { error, decodedToken } = await verifyApiToken(req);

  if (error) {
    return NextResponse.json({ message: "Unauthorized", error }, { status: 401 });
  }

  console.log("Authenticated user ID (from JWT):", decodedToken.id);

  if (!decodedToken.isAdmin) {
    return NextResponse.json({ error: "Acceso restringido a administradores" }, { status: 403 });
  }

  try {
    await connectDB();

    const now = new Date();
    const usersTotal = await UserModel.countDocuments();
    const login24h = await UserModel.countDocuments({ lastLogin: { $gte: new Date(now - 24 * 60 * 60 * 1000) } });
    const login72h = await UserModel.countDocuments({ lastLogin: { $gte: new Date(now - 72 * 60 * 60 * 1000) } });
    const matched = await UserModel.countDocuments({ hasMatch: true });

    const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const activity = await UserModel.aggregate([
      { $match: { createdAt: { $gte: oneWeekAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({ usersTotal, login24h, login72h, matched, activity }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}
