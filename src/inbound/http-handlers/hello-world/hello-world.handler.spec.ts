import { createMock, DeepMocked } from '@golevelup/ts-jest';

import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import { Request, Response } from 'express';

import { getHelloHandler, getHelloJsonHandler } from './hello-world.handler';
import { Hello } from '../../../core/hello-world/interfaces';
import { HelloWorldService } from '../../../core/hello-world/services';

describe('HelloWorldHttpHandlers', () => {
  let helloWorldHandler: (req: Request, res: Response) => void;
  let helloWorldService: DeepMocked<HelloWorldService>;
  let req: MockRequest<Request>;
  let res: MockResponse<Response>;

  beforeEach(() => {
    helloWorldService = createMock<HelloWorldService>();
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  // --------------------------------
  // Test suite for getHelloHandler
  // --------------------------------
  describe('getHelloHandler', () => {
    beforeEach(() => {
      helloWorldHandler = getHelloHandler(helloWorldService);
    });

    it('Should work', () => {
      const expected: string = 'hi :D';
      helloWorldService.getHello.mockReturnValue(expected);

      helloWorldHandler(req, res);
      const gotten: string = res._getData() as string;

      expect(gotten).toStrictEqual(expected);
      expect(helloWorldService.getHello).toHaveBeenCalledTimes(1);
    });
  });

  // --------------------------------
  // Test suite for getHelloJsonHandler
  // --------------------------------
  describe('getHelloJsonHandler', () => {
    beforeEach(() => {
      helloWorldHandler = getHelloJsonHandler(helloWorldService);
    });

    it('Should work', () => {
      const expected: Hello = {
        hello: 'hi :D',
      };
      helloWorldService.getHelloInterface.mockReturnValue(expected);

      helloWorldHandler(req, res);
      const gotten: Hello = res._getData() as Hello;

      expect(gotten).toStrictEqual(expected);
      expect(helloWorldService.getHelloInterface).toHaveBeenCalledTimes(1);
    });
  });
});
