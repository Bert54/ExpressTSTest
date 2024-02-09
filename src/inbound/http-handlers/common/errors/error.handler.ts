import express from 'express';
import { NotFound } from 'http-errors';

import { ErrorObject } from './interfaces';

enum ErrorStatus {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export function getRouteNotFoundHandler() {
  // just throw an error here to let the error handler do the work
  return (req: express.Request): void => {
    throw new NotFound(`'(${req.method}) ${req.path}' was not found`);
  };
}

export function getErrorHandler() {
  return (
    err: Error,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    const handledError: ErrorObject = handleError(err);
    res.status(handledError.code).send(handledError);
    next();
  };
}

function handleError(error: Error): ErrorObject {
  if (error instanceof NotFound) {
    return newNotFoundError(error);
  }

  return newInternalServerError(error);
}

function newNotFoundError(error: Error): ErrorObject {
  return {
    code: 404,
    status: ErrorStatus.NOT_FOUND,
    message: error.message,
  };
}

function newInternalServerError(error: Error): ErrorObject {
  return {
    code: 500,
    status: ErrorStatus.INTERNAL_SERVER_ERROR,
    message: error.message,
  };
}
