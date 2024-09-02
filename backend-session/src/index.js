import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import authRouter from './routes/auth.routes.js';
import { PORT } from './configs/env.config.js';
import { connectDB } from './database/database.js';
import { corsOptions } from './configs/cors.config.js';
import { sessionMiddleware } from './middlewares/session.middleware.js';

const app = express();

const __dirname = path.resolve();

// Middlewares 
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);

// Routes
app.use('/api', authRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}🚀`);
});