import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const URI = process.env.MONGODB_URI;