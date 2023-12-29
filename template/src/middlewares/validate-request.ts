import { catchAsync } from '@utils';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export function validateRequest(schema: AnyZodObject) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);

    next();
  });
}
