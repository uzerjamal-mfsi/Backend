import { Router } from 'express';
import { handleLogin, register } from '../controllers/auth-controller.js';
import validate from '../middleware/validator.js';
import { registerSchema, loginSchema } from '../validators/auth-validator.js';

export const authRouter = Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), handleLogin);
