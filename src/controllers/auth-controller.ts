import { Request, Response, NextFunction } from 'express';
import { createUser, authenticateUser } from '../services/auth-service';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

    const { password: __removedPassword, __v, ...publicUserData } = user.toObject();

    res.status(201).json({ message: 'User registered successfully', user: publicUserData });
  } catch (error) {
    next(error);
  }
}

export async function handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const { user, token } = await authenticateUser({ email, password });
    const { password: __removedPassword, __v, ...publicUserData } = user.toObject();
    res.status(200).json({ message: 'Login successful', user: publicUserData, token });
  } catch (error) {
    next(error);
  }
}
