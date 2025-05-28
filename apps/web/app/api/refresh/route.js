import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_secret';
const apiSecret = process.env.API_JWT_SECRET || 'fallback_api_jwt_secret_please_change_me';

export async function GET() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return Response.json({ message: 'Refresh token missing' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(refreshToken, refreshSecret);

        // Creamos un nuevo access token
        const accessToken = jwt.sign({
            id: decoded.id,
            email: decoded.email,
            name: decoded.name
        }, apiSecret, { expiresIn: '15m' });

        return Response.json({ accessToken });
    } catch (err) {
        return Response.json({ message: 'Invalid or expired refresh token' }, { status: 401 });
    }
}
