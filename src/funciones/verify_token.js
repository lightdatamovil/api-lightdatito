// src/middleware/verifyToken.js
import jwt from 'jsonwebtoken';
import { Status } from '../../models/status.js';


const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res
            .status(Status.unauthorized)
            .json({ title: 'Sin token', message: 'Token de autorización faltante' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        // opcional: cargar info de usuario en req.user
        req.user = { id: payload.sub };
        next();
    } catch (err) {
        return res
            .status(Status.unauthorized)
            .json({ title: 'Token inválido', message: err.message });
    }
}
