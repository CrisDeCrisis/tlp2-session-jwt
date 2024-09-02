import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { authCtrl } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/register', authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/session', validarJWT, authCtrl.session);
authRouter.post('/logout', authCtrl.logout);

export default authRouter;