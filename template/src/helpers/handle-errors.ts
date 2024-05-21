import { env } from '@/config/env';
import { ErrorResponse } from '@/interface/errors';
import { AppError } from '@utils';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

function getStack(stack: string | undefined) {
  return env.IS_DEV ? stack : undefined;
}

export function appError(error: AppError): ErrorResponse {
  return {
    status: error.status,
    message: error.message,
    error: {
      sources: [],
      stack: getStack(error.stack),
    },
  };
}

export function serverError(error: Error): ErrorResponse {
  return {
    status: 500,
    message: error.message,
    error: {
      sources: [],
      stack: getStack(error.stack),
    },
  };
}

export function zodError(error: ZodError): ErrorResponse {
  const sources = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    status: 403,
    message: 'Zod validation error',
    error: {
      sources,
      stack: getStack(error.stack),
    },
  };
}

export function mongooseError(
  error: mongoose.Error.ValidationError
): ErrorResponse {
  const sources = Object.values(error.errors).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });

  return {
    status: 403,
    message: 'Mongoose validation error',
    error: {
      sources,
      stack: getStack(error.stack),
    },
  };
}

export function castError(error: mongoose.CastError): ErrorResponse {
  const sources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    status: 400,
    message: 'Invalid data type provided',
    error: {
      sources,
      stack: getStack(error.stack),
    },
  };
}

export function duplicateError(error: any): ErrorResponse {
  const { keyValue } = error;
  const sources = Object.keys(keyValue).map((path) => {
    return {
      path,
      message: `${keyValue[path]} already exists`,
    };
  });

  return {
    status: 409,
    message: 'E11000 duplicate key error',
    error: {
      sources,
      stack: getStack(error.stack),
    },
  };
}
