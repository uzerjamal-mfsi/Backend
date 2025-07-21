import { Request, Response, NextFunction } from 'express';

export function handleError(err: any, req: Request, res: Response, next: NextFunction): void {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.log(err);

  res.status(status).json({ error: message });
}
