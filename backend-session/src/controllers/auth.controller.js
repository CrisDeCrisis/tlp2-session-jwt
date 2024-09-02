import { connectDB } from '../database/database.js';

export const authCtrl = {};

authCtrl.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await connectDB();
        const [result] = await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        const user = { id: result.insertId, username };

        return res.json({
            message: 'Usuario registrado exitosamente',
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error al registrar usuario',
            err: err.message
        });
    }
};

authCtrl.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await connectDB();
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (rows.length > 0) {
            const user = rows[0];
            req.session.userId = user.id;
            req.session.username = user.username;

            return res.json({
                message: 'Inicio de sesión exitoso',
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Error al iniciar sesión',
            err: err.message
        });
    }
};

authCtrl.session = async (req, res) => {
    try {
        if (req.session.userId) {
            return res.json({
                loggedIn: true,
                user: {
                    id: req.session.userId,
                    username: req.session.username
                }
            });
        } else {
            return res.status(401).json({
                loggedIn: false,
                message: 'No hay sesión activa'
            });
        }
    } catch (err) {
        return res.status(500).json({
            loggedIn: false,
            message: 'Error del servidor',
            err: err.message
        });
    }
};

authCtrl.logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar la sesión' });
            }
            res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
            return res.json({ message: 'Sesión cerrada exitosamente' });
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error del servidor',
            err: err.message
        });
    }
};