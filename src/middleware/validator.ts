import { Request, Response, NextFunction } from 'express';

function validate(schema: any, source: string = 'body') {
  return (req: Request | any, res: Response, next: NextFunction) => {
    const data = req[source];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const err: any = new Error('ValidationError');
      err.statusCode = 400;
      err.isJoi = true;
      err.message = error.details.map((detail: any) => detail.message).join(', ');
      return next(err);
    }
    next();
  };
}

export default validate;
