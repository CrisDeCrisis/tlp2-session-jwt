import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../configs/env.config.js';

export const generarJWT = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            const payload = { userId };
            jwt.sign(payload, SECRET_KEY, {
                expiresIn: '5h'
            }, (error, token) => {
                if (error) {
                    console.log(error);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            });
        } catch (error) {
            console.log(error);
            reject('Error al intentar generar el token');
        }
    });
};