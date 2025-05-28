import jwt from 'jsonwebtoken';

const apiSecret = process.env.API_JWT_SECRET || 'fallback_api_jwt_secret_please_change_me';

export const verifyApiToken = async (req) => {
    const authHeader = req.headers.get('authorization');
    console.log("🔍 Authorization header:", authHeader);

    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { error: 'Authorization header missing or invalid.', decodedToken: null };
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, apiSecret);
        return { error: null, decodedToken: decoded };

    } catch (err) {
        console.error('❌ Error verifying token:', err);
        if (err.name === 'TokenExpiredError') {
            return { error: 'TokenExpiredError', decodedToken: null };
        }
        return { error: err.message, decodedToken: null };
    
    }
};
// Este middleware verifica el JWT de la API y devuelve el token decodificado o un error