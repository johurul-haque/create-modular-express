import { RequestHandler } from 'express';

export function catchAsync(fn: RequestHandler) {
  const reqHandler: RequestHandler = (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

  return reqHandler;
}
