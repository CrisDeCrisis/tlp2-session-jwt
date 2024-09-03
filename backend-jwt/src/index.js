import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

import { PORT } from './configs/env.config.js';
import { connectDB } from './database/database.js';
import { corsOptions } from './configs/cors.config.js';

const app = express();

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRouter);

// Servidor escuchando
app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
