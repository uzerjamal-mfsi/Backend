import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Response, NextFunction } from 'express';

function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(new createError.Unauthorized('Invalid Token'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new createError.Unauthorized('Invalid Token'));
  }

  const jwtSecret = config.jwtSecret;
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
      return next(new createError.Forbidden('Invalid token'));
    }
    req.user = user;
    next();
  });
}

export default authenticateToken;
