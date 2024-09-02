import { Router } from 'express';
import { authCtrl } from '../controllers/auth.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const authRouter = Router();

authRouter.post('/register', authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/session', validarJWT, authCtrl.session);
authRouter.post('/logout', authCtrl.logout);

export default authRouter;