import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import { NextFunction, Request, Response } from 'express';

import { errorHandler, ErrorStatus, handleError } from './error.handler';
import { NotFound } from 'http-errors';
import { ErrorObject } from './interfaces';

describe('ErrorHttpHandler', () => {
  // --------------------------------
  // Test suite for errorHandler
  // --------------------------------
  describe('errorHandler', () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    let next: NextFunction;

    beforeEach(() => {
      res = httpMocks.createResponse();
      next = () => {};
    });

    it('should return a 404 error', () => {
      const expected: ErrorObject = {
        code: 404,
        status: ErrorStatus.NOT_FOUND,
        message: 'not found',
      };

      const error: Error = new NotFound('not found');
      errorHandler(error, req, res, next);

      const gotten: ErrorObject = res._getData() as ErrorObject;
      expect(gotten).toStrictEqual(expected);
    });

    it('should return a 500 error', () => {
      const expected: ErrorObject = {
        code: 500,
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
        message: 'what is this error?',
      };

      const error: Error = new Error('what is this error?');
      errorHandler(error, req, res, next);

      const gotten: ErrorObject = res._getData() as ErrorObject;
      expect(gotten).toStrictEqual(expected);
    });
  });

  // --------------------------------
  // Test suite for handleError
  // --------------------------------
  describe('handleError', () => {
    it('should return a 404 error', () => {
      const expected: ErrorObject = {
        code: 404,
        status: ErrorStatus.NOT_FOUND,
        message: 'not found',
      };

      const gotten: ErrorObject = handleError(new NotFound('not found'));

      expect(gotten).toStrictEqual(expected);
    });

    it('should return a 500 error', () => {
      const expected: ErrorObject = {
        code: 500,
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
        message: 'what is this error?',
      };

      const gotten: ErrorObject = handleError(new Error('what is this error?'));

      expect(gotten).toStrictEqual(expected);
    });
  });
});
