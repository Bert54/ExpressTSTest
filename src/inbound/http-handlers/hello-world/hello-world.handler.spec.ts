import { HelloWorldService } from '../../../core/hello-world/services';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Request, Response, NextFunction } from 'express';
import { getHelloHandler, getHelloJsonHandler } from './hello-world.handler';
import { Hello } from '../../../core/hello-world/interfaces';

describe('HelloWorldHttpHandlers', () => {
  let helloWorldHandler: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  let helloWorldService: DeepMocked<HelloWorldService>;
  let req: DeepMocked<Request>;
  let res: DeepMocked<Response>;
  let next: NextFunction;

  beforeEach(() => {
    helloWorldService = createMock<HelloWorldService>();
    req = createMock<Request>();
    res = createMock<Response>();
    next = () => {};
  });

  // --------------------------------
  // Test suite for getHelloHandler
  // --------------------------------
  describe('getHelloHandler', () => {
    beforeEach(() => {
      helloWorldHandler = getHelloHandler(helloWorldService);
    });

    it('Should work', () => {
      const usedString: string = 'hi :D';
      helloWorldService.getHello.mockReturnValue(usedString);
      helloWorldHandler(req, res, next);

      expect(helloWorldService.getHello).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
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
      const usedInterface: Hello = {
        hello: 'hi :D',
      };
      helloWorldService.getHelloInterface.mockReturnValue(usedInterface);
      helloWorldHandler(req, res, next);

      expect(helloWorldService.getHelloInterface).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
    });
  });
});
