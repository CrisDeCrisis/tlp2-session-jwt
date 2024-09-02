export const corsOptions = { // Permitir solicitudes desde el front-end
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Habilitar envío de cookies
}