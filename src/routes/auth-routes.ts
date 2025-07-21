import { Router } from 'express';
import { handleLogin, register } from '../controllers/auth-controller';
import validate from '../middleware/validator';
import { registerSchema, loginSchema } from '../validators/auth-validator';

export const authRouter = Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), handleLogin);
