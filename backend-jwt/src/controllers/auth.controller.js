import { connectDB } from '../database/database.js';
import { generarJWT } from '../helpers/generar-jwt.js';

export const authCtrl = {};

authCtrl.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await connectDB();
        await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

        return res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};

authCtrl.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await connectDB();
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        const user = rows[0];

        // Validación de usuario
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = await generarJWT(user.id);

        // Almacenar el token en la sesión del servidor
        req.session.token = token;

        // Almacenar el token en una cookie segura
        res.cookie('authToken', token, {
            httpOnly: true, // La cookie no es accesible desde JavaScript
            secure: false, // Cambiar a true en producción con HTTPS
            maxAge: 3600000 // Expiración en milisegundos (1 hora)
        });

        return res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};

// Endpoint para validar la sesión
authCtrl.session = async (req, res) => {
    console.log(req.user);
    return res.json({ message: 'Acceso permitido a área protegida', user: req.user });
};

// Endpoint de cierre de sesión (logout)
authCtrl.logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar sesión' });
            }

            res.clearCookie('authToken');
            return res.json({ message: 'Cierre de sesión exitoso' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};