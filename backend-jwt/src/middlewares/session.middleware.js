import session from 'express-session';
import { SECRET_KEY } from '../configs/env.config.js';

export const sessionMiddleware = session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // true solo si usas HTTPS
        httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
        // sameSite: 'lax' // permite envío de cookies en navegadores modernos
    }
});