import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import path from 'path';

import authRouter from './routes/auth.routes.js';
import { PORT } from './configs/env.config.js';
import { connectDB } from './database/database.js';

const app = express();

const __dirname = path.resolve();

// Middlewares 
app.use(cors({ // Permitir solicitudes desde el front-end
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Habilitar envío de cookies
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // true solo si usas HTTPS
        httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
        // sameSite: 'lax' // permite envío de cookies en navegadores modernos
    }
}));

// Routes
app.use('/api', authRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}🚀`);
});