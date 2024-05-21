import * as handle from '@helpers/handle-errors';
import { AppError } from '@utils';
import { Request, Response } from 'express';
import { ErrorResponse } from 'interface/errors';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

let errorResponse: ErrorResponse = {
  success: false,
  status: 500,
  message: 'Internal server error',
  error: {
    sources: [],
    stack: undefined,
  },
};

export function globalCatch(
  error:
    | ZodError
    | mongoose.Error.ValidationError
    | mongoose.Error.CastError
    | AppError
    | Error,
  req: Request,
  res: Response
) {
  if (error instanceof ZodError) {
    const zError = handle.zodError(error);

    errorResponse = { ...errorResponse, ...zError };
  } else if (error instanceof mongoose.Error.ValidationError) {
    const mongooseError = handle.mongooseError(error);

    errorResponse = { ...errorResponse, ...mongooseError };
  } else if (error instanceof mongoose.Error.CastError) {
    const castError = handle.castError(error);

    errorResponse = { ...errorResponse, ...castError };
  } else if ('code' in error && error.code === 11000) {
    const e11000 = handle.duplicateError(error);

    errorResponse = { ...errorResponse, ...e11000 };
  } else if (error instanceof AppError) {
    const appError = handle.appError(error);

    errorResponse = { ...errorResponse, ...appError };
  } else if (error instanceof Error) {
    const serverError = handle.serverError(error);

    errorResponse = {
      ...errorResponse,
      ...serverError,
    };
  }

  const { status, ...response } = errorResponse;

  return res.status(status).json(response);
}
