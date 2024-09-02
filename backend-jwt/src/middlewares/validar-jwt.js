import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../configs/env.config.js';
import { connectDB } from '../database/database.js';

// Middleware para verificar el token JWT
export const validarJWT = (req, res, next) => {
    try {
        console.log(req.session);
        console.log('-----------');
        console.log(req.cookies);
        const token = req.cookies.authToken || req.session.token;

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        // Se busca al usuario en la base de datos
        const user = connectDB.user.find(user => user.id === decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = user; // Agrega la información del usuario decodificada al request
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};